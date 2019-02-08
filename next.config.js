const withImages = require('next-images')

const isDevMode=process.env.NODE_ENV === 'development'
const serverBaseUrl=isDevMode ? 'http://118.24.127.237:8080/tblog':'http://118.24.127.237:8080/tblog'
const serverApiUrl=isDevMode ? 'http://118.24.127.237:8080/tblog/api':'http://118.24.127.237:8080/tblog/api'

const nextConfig={
    serverRuntimeConfig:{
        //config for server only
    },
    publicRuntimeConfig: {
        serverBaseUrl:serverBaseUrl,
        serverApiUrl: serverApiUrl,
    }
}

module.exports = withImages(nextConfig)



