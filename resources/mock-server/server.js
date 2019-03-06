var path = require('path')
var fs = require('fs')
var mock = require('mockjs')
var app = require('express')()
var port = process.argv.slice(2)[0] || 8080
app.listen(port, function() {
    console.info('Mock server is listening at ' + port)
})

const prefix = '/api'

var api = {}
var apiPath = path.join(__dirname, './api.json')
function getApis() {
    fs.readFile(apiPath, 'utf-8', function(_, content) {
        api = JSON.parse(content)
    })
}
// 监听api.json变化
fs.watchFile(apiPath, function(curr) {
    getApis()
})
getApis()

// 支持callback
app.set('jsonp callback name', 'callback')
app.use(function(req, res) {
    var data
    var delay = 0
    for (var group in api) {
        if (api[group].find(function(reqData) {
            if (reqData.regexp) {
                if (!new RegExp(reqData.url).test(req.originalUrl)) {
                    return false
                }
            } else if (req.originalUrl !== (prefix + reqData.url)) {
                return false
            }
            var apiRes = reqData.res
            data = reqData.mock !== false ? mock.mock(apiRes) : apiRes
            delay = reqData.delay || 0
            return true
        }) !== undefined) {
            break
        }
    }
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    data !== undefined ? setTimeout(() => res.jsonp(data), delay) : res.sendStatus(404)
})
