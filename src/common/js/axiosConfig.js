import axios from 'axios';
import { format } from '../js/i18n';
import { systemErrCode, timeoutErrCode, cancelErrCode, networkErrCode } from '@/config/constant';
const CancelToken = axios.CancelToken;
axios.defaults.headers.common.platform = 'android';
// 所有api都走这个url
axios.defaults.baseURL = 'https://test.more.buzz/api';
axios.defaults.timeout = 30000;
window.axios = axios;

const lockUrl = {};
window.lockUrl = {};
// 后到优先策略：取消前一个未完成的ajax请求，然后发送新的ajax请求
const s1 = /^@.+/;

// 节约型策略：即共享类型，由同类型的第一个请求发送ajax，（在第一个ajax返回之前的）后续的同类型共享ajax返回结果
const s2 = /^\!.+/;

const detailLockKey = (config, promise) => {
  const { lockKey } = config;
  if (!lockKey) {
    return promise;
  }
  lockUrl[lockKey] = lockUrl[lockKey] || [];
  const cur = lockUrl[lockKey].slice(0);
  // 取消前面的请求
  if (cur.length && s1.test(lockKey)) {
    cur.forEach(one => {
      one.config.source.cancel();
    });
    lockUrl[lockKey] = [];
  }
  if (cur.length && s2.test(lockKey)) {
    const p = cur[0].promise;
    p.then(
      () => {
        lockUrl[lockKey] = [];
      },
      () => {
        lockUrl[lockKey] = [];
      }
    );
    config.source.cancel();
    return cur[0].promise;
  }
  lockUrl[lockKey].push({
    promise,
    config,
  });
  return promise;
};

// 添加时间戳
axios.interceptors.request.use(
  function(config) {
    // 先从window上取默认值，如果取到就用window上的
    const operatorId = global.operatorId || 1;
    const productId = global.productId || 1;
    // const country = globalConfig.fullCountry;
    // const lang = globalConfig.lang;
    const params = config.params || {};
    let headers = config.headers || {};
    // 圈子需要 productId参数
    if (config.url.startsWith('/quanzi/')) {
      headers.productId = productId;
    }
    // 先写死1，后期添加国家会有多种
    headers.OperId = operatorId;
    // headers['country'] = country;
    // headers.lang = lang;
    params._t = +new Date();
    config.params = params;
    config.headers = headers;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(res) {
    const systemErrInfo = format('ajax.system');
    const data = res.data;
    const status = res.status;
    // 将statusCode放上
    if (typeof data === 'object') {
      data.statusCode = status;
    }
    if ((status >= 200 && status < 300) || status === 401) {
      if (!data || (typeof data === 'string' && data.indexOf('<!DOCTYPE') >= 0)) {
        return {
          bizCode: systemErrCode,
          message: systemErrInfo,
        };
      }
      // 返回数据没有bizCode字段认为出错了
      if (typeof data === 'object' && !data.bizCode && !data.result) {
        return {
          bizCode: systemErrCode,
          message: systemErrInfo,
        };
      }
      return data;
    }
    return {
      bizCode: systemErrCode,
      message: systemErrInfo,
    };
  },
  function(err) {
    const timeoutErrInfo = format('ajax.timeout');
    const systemErrInfo = format('ajax.system');
    const networkErrInfo = format('ajax.network');
    if (axios.isCancel(err)) {
      return {
        bizCode: cancelErrCode,
        message: '',
      };
    }
    // console.dir(err);
    const message = err.message;
    // 超时错误
    // message是axios写的
    if (message.startsWith('timeout of')) {
      return {
        bizCode: timeoutErrCode,
        message: timeoutErrInfo,
      };
    }
    // 没有响应网络错误
    if (message.startsWith('Network Error')) {
      return {
        bizCode: networkErrCode,
        message: networkErrInfo,
      };
    }
    // 请求被打断
    if (message.startsWith('Request aborted')) {
      return {
        bizCode: systemErrCode,
        message: systemErrInfo,
      };
    }
    // 系统错误
    return {
      bizCode: systemErrCode,
      message: systemErrInfo,
    };
  }
);

const req = axios.Axios.prototype.request;
/**
 * 覆盖全局request的方法，方便处理异常出现的情况
 */
axios.Axios.prototype.request = function(config) {
  if (config.lockKey) {
    const source = CancelToken.source();
    config.source = source;
    config.cancelToken = source.token;
  }
  const promise = req.call(this, config);
  return detailLockKey(config, promise);
};
