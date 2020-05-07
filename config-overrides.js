const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // 针对antd 实现按需打包 ：根据import来打包(使用babel-plugin-import)
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  //使用less-loader对源码中的less的变量进行重新指定
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#fcc'
    }
  })
);