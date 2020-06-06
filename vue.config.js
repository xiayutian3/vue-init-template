const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  configureWebpack: () => ({
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    },
    externals: {
      // 全局常量定义出，也可以是window下的实例
      AMap: 'AMap' // 高德地图配置
    }
  }),
  chainWebpack: config => {
    config.resolve.alias
      .set('@@', resolve('src/components'))
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'title名字'
        return args
      })
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/': {
        target: 'http://192.168.0.121:8085/',
        pathRewrite: { '^/api': '/' },
        xfwd: true,
        ws: false
      }
    }
  }
}
