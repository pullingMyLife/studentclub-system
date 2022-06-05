module.exports = {
    devServer: {
      port: 8820,
      host: "localhost", 
      https: false, 
      open: false, 
      proxy: {
        [ process.env.VUE_APP_BASE_API ]: {
         target: process.env.VUE_APP_SERVICE_URL,
         changOrigin: true, 
         pathRewrite: {
          [ '^' + process.env.VUE_APP_BASE_API ]: '/',
        }
       }
      }
   },
    lintOnSave: false, 
    productionSourceMap: false, 
  }



