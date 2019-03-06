module.exports = {
    // 模拟数据，需要指明
    '/api/*': {
        // target: 'http://192.168.147.47:8021',
        // target: 'http://127.0.0.1:2618',
        target: 'http://10.148.160.133:8091', // 测试环境
        // target: 'http://10.148.160.133:8092', // 开发环境
        secure: false,
        pathRewrite: {
            '^/api': ''
        }
    },
    '/bpi/*': {
        target: 'http://10.148.160.133:8092', // 开发环境
        secure: false,
        pathRewrite: {
            '^/bpi': ''
        }
    },
    '/cpi/*': {
        target: 'http://10.148.160.133:8091', // 测试环境
        secure: false,
        pathRewrite: {
            '^/cpi': ''
        }
    },
    '/dpi/*': {
        target: 'http://127.0.0.1:2618',
        secure: false
    }
}
