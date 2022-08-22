import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false, // 跟踪所有的函数组件，不希望跟踪所有的，只希望跟踪部分
  });
}
