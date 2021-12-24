module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'store': '@/store'
      }
    }
  },
  devServer: {
    port: 3000, //运行的端口
  }
}
