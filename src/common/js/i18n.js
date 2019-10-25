// 多语言初始化

import React from 'react';
import { Text, I18nManager } from 'react-native';
import { createIntl, createIntlCache, RawIntlProvider, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import * as RNRestart from 'react-native-restart';
import DateFormat from '@/common/js/dateFormat';
import en_US from '@/locales/en';
import arLang from '@/locales/ar';
import frLang from '@/locales/fr';
import dateFormatCfg from '@/locales/timeFormat';
console.log(RNRestart);
FormattedMessage.defaultProps.tagName = Text;
// RN 不支持 动态写内容，所以这个标签就是废的，不要用
FormattedHTMLMessage.defaultProps.tagName = Text;
// rtl布局的语言
export const rtlLang = ['ar'];

const message = {
  en: en_US,
  ar: arLang,
  fr: frLang,
};
const langs = Object.keys(message);
let locale = global.lang || 'ar';
// 默认国际站-目前country字段没有用，先保留
let country = global.country || 'g';
// 缓存中语言出错,或者国家出错
if (langs.indexOf(locale) === -1 || !country) {
  locale = 'en';
  country = 'g';
}

let fallBackLocale = 'en';

// 自己管理provider
const intlCache = createIntlCache();
const createIntlWidthDefault = config => {
  const intl = Object.assign(createIntl(config, intlCache), {
    defaultMsgs: message[fallBackLocale],
  });
  const oldFormatMessage = intl.formatMessage;
  // add fallback default message
  intl.formatMessage = (...arg) => {
    const messageDescriptor = arg[0];
    if (!messageDescriptor.defaultMessage) {
      messageDescriptor.defaultMessage = message[fallBackLocale][messageDescriptor.id] || null;
    }
    return oldFormatMessage.apply(intl, arg);
  };
  const oldFormatHTMLMessage = intl.formatHTMLMessage;
  intl.formatHTMLMessage = (...arg) => {
    const messageDescriptor = arg[0];
    if (!messageDescriptor.defaultMessage) {
      messageDescriptor.defaultMessage = message[fallBackLocale][messageDescriptor.id] || null;
    }
    return oldFormatHTMLMessage.apply(intl, arg);
  };
  return intl;
};

let intl = createIntlWidthDefault({
  locale,
  textComponent: Text,
  messages: message[locale || 'en'],
});

Object.defineProperty(global, 'lang', {
  enumerable: true,
  configurable: true,
  get() {
    return locale;
  },
  set(lang) {
    if (langs.find(cur => cur === lang)) {
      locale = lang;
      intl = createIntlWidthDefault({
        locale,
        messages: message[locale],
      });
      if (global.__i18n__) {
        global.__i18n__.setState({
          locale: locale,
          intl,
        });
      }
    }
  },
});

Object.defineProperty(global, 'country', {
  enumerable: true,
  configurable: true,
  get() {
    return country;
  },
  set(c) {
    country = c;
    if (global.__i18n__) {
      global.__i18n__.setState({
        country: c,
      });
    }
  },
});

/**
 * @param [String] msgName 定义在语言包中的msg的名称
 * @param [Object] format所需要的data
 * @format [Object] 自定义格式样式，请看https://github.com/yahoo/intl-messageformat
 */
export const formatMessage = (msgName, data) => {
  return intl.formatMessage(
    {
      id: msgName,
    },
    data
  );
};

export const format = (msgName, data) => {
  return formatMessage(msgName, data);
};

export const formatHTMLMessage = (msgName, data) => {
  return intl.formatHTMLMessage(
    {
      id: msgName,
    },
    data
  );
};

export class I18n extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 语言
      locale,
      // 国家
      country,
      intl,
    };
    global.__i18n__ = this;
    this.initDir();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('i18n update');
    this.initDir(prevState);
  }
  initTime() {
    const { locale } = this.state;
    // 取不到默认英文格式化时间
    DateFormat.i18n = dateFormatCfg[locale] || dateFormatCfg.en;
  }
  // 初始化语言国家等等
  initDir(prevState = {}) {
    const { locale } = this.state;
    if (prevState.locale !== locale) {
      if (rtlLang.includes(locale)) {
        console.log('setting rtl true');
        I18nManager.forceRTL(true);
      } else {
        console.log('setting rtl false');
        I18nManager.forceRTL(false);
      }
      // RNRestart.Restart();
      console.log(I18nManager.isRTL, locale);
    }
  }
  render() {
    const { children } = this.props;
    const { locale, country } = this.state;
    return (
      <RawIntlProvider value={Object.assign(this.state.intl)} key={`${locale}-${country}`}>
        {children}
      </RawIntlProvider>
    );
  }
}

export default message;
