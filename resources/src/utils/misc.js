import findIndex from 'lodash.findindex'
import cloneDeep from 'lodash.clonedeep'
import dateUtils from 'element-ui/lib/utils/date'
import MD5 from 'blueimp-md5'
import * as C from '../constants/api'
import Base64Encoder from './base64'
import RSAEncrypt from './rsa'
// import moment from 'moment'

export default {
    findIndex(array, callback) {
        return findIndex(array, callback)
    },

    formatDate(date, format = 'yyyy-MM-dd HH:mm:ss') {
        return dateUtils.format(date, format)
    },

    // formatMomentData(data) {
    //     return moment(data).format('YYYY-MM-DD HH:mm:ss')
    // },

    parseDate(str, format = 'yyyy-MM-dd HH:mm:ss') {
        return dateUtils.parse(str, format)
    },

    trim(str) {
        return `${str}`.replace(/^\s*|\s*$/g, '')
    },

    md5(str) {
        return MD5(`${str}`)
    },

    rsaEncrypt(str) {
        const { RSAKeyPair, RSAConstants, encrypt } = RSAEncrypt
        const keyPair = new RSAKeyPair(
            C.RSA_COMPONENT,
            '',
            C.RSA_MODULUS,
            C.RSA_KEY_LENGTH
        )
        const value = encrypt(keyPair, str, RSAConstants.PKCS1Padding)
        const fn = Base64Encoder.encode
        return fn.call(window, value)
    },

    cloneDeep(obj) {
        return cloneDeep(obj)
    },
    getLength(val) {
        /*
        let len = 0;
        val = val + '';
        for (var i = 0; i < val.length; i++) {
            var patt = new RegExp(/[^\x00-\xff]/ig);
            var a = val[i];
            if (patt.test(a))
            {
                len += 2;
            }
            else
            {
                len += 1;
            }
        }
        return len;
        */
        return val.length
    },
    validatePrice(price, _this) {
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        if (price && !reg.test(price)) {
            _this.$message.error('请输入正确价格')
            return
        }
        let priceString = price !== undefined ? String(price).split('.')[0] : ''
        if (Number(price) > 9999999.99 || priceString.length > 8) {
            _this.$message.error('您输入的价格超过最大值，请重新输入')
            return
        }
        return true
    },

    isArray(val) {
        return Object.prototype.toString.call(val) === '[object Array]'
    },

    isEmpty(val) {
        return typeof val === 'undefined' || val === null
    },

    isEmptyObj(val) {
        return (typeof val === 'object' && !Object.keys(val).length) || (this.isArray(val) && !val.length)
    },
    uuid () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0
            let v = c === 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    },

    redirectToLoginPage(flag = 'redirect') {
        let suffix = ''
        if (flag === 'email' && /token=(.*?)/.test(location.href)) {
            let data = location.href
            let res = data.replace(/(?:token=.*?)&/, '')
            suffix = `?next=${encodeURIComponent(res)}`
        }
        if (flag === 'logout') {
            // 退出的时候 直接跳转到登录页，不加_t_
            window.location.href = `${location.origin}/#/login`
            return this.setPath('/login')
        } else {
            // _t_参数用来标记是退出到登录页面
            window.location.href = this.setPath(`${location.origin}/#/login` + suffix)
            return this.setPath('/login' + suffix)
        }
    },
    // 给router push的路由后添加_t_参数，参数专门作为从登录页面到其他页面，从其他页面到登录页面的标记
    // 只用在合法的登录相关页面跳转，其他地方不用 （合法的从登录页面跳到其他页面，合法的从其他页面跳到登录页面）
    setPath(path) {
        const reg = /\?/
        if (reg.test(path)) {
            return `${path}&_t_=${Math.random()}`
        } else {
            return `${path}?_t_=${Math.random()}`
        }
    }
}
