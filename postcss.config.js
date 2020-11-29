/**
 * Postcss
 */

module.exports = {
  plugins: {
    // 配置相关插件
    // autoprefixer: {
    //   // 自动添加浏览器厂商前缀，用来兼容不同的浏览器
    //   overrideBrowserslist: [
    //     'Android 4.1',
    //     'iOS 8.1',
    //     'Chrome > 31',
    //     'ff > 31',
    //     'ie >= 8'
    //   ]
    // },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
