const cookies = {

    // 设置cookie, expireTimes 单位 小时
    setCookie(name, value, expireTimes) {
        const exDate = new Date()
        exDate.setTime(exDate.getTime() + expireTimes * 60 * 60 * 1000)
        document.cookie = name + '=' + escape(value) + ((expireTimes == null) ? '' : ';expires=' + exDate.toGMTString())
    },

    // 获取cookie、
    getCookie(name) {
        var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        var arr = document.cookie.match(reg)
        if (arr) {
            return (arr[2])
        } else {
            return null
        }
    },

    // 删除cookie
    delCookie(name) {
        var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = this.getCookie(name)
        if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
    }
}

export default cookies
