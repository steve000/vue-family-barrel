import {
    IMG_SRC
} from '~/constants/const'
import Viewer from 'viewerjs'
import '../../node_modules/viewerjs/dist/viewer.min.css'

const utils = {
    // 灯箱， urls为要展示的图片地址， index展示的索引（默认从0开始），options 灯箱工具栏配置参数
    previewImages(urls, index = 0, options = {
        rotatable: false,
        scalable: false,
        fullscreen: false
    }) {
        const divBox = document.createElement('div')
        urls.forEach((i, k) => {
            if (i) {
                const img = document.createElement('img')
                img.src = i
                divBox.appendChild(img)
            }
        })
        const viewer = new Viewer(divBox, {
            hide() {
                viewer.destroy()
            },
            shown() {
                viewer.view(index)
            },
            ...options
        })
        viewer.show()
    },
    formatYearOne(date) {
        return utils.dateFormatMethod(date, 'yyyy-MM-dd')
    },
    formatFullDate(date) {
        return utils.dateFormatMethod(date, 'yyyy/MM/dd HH:mm:ss')
    },
    formatFullDateAnother(date) {
        return utils.dateFormatMethod(date, 'yyyy-MM-dd HH:mm:ss')
    },
    /*
     * yyyy/MM/dd HH:mm:ss
     * yyyy-MM-dd HH:mm:ss
     */
    //  时间格式化
    dateFormatMethod(date, format = 'yyyy-MM-dd') {
        if (typeof date === 'string') return date
        if (date !== undefined && date != null && date !== '') {
            date = typeof date === 'string' ? Number(date) : date
            date = new Date(date)
            var map = {
                'M+': date.getMonth() + 1, // 月份
                'd+': date.getDate(), // 日
                'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
                'H+': date.getHours(), // 小时
                'm+': date.getMinutes(), // 分
                's+': date.getSeconds(), // 秒
                'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                S: date.getMilliseconds() // 毫秒
            }
            var week = {
                '0': '/u65e5',
                '1': '/u4e00',
                '2': '/u4e8c',
                '3': '/u4e09',
                '4': '/u56db',
                '5': '/u4e94',
                '6': '/u516d'
            }
            if (/(y+)/.test(format)) {
                format = format.replace(
                    RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length)
                )
            }
            if (/(E+)/.test(format)) {
                format = format.replace(
                    RegExp.$1,
                    (RegExp.$1.length > 1 ?
                        RegExp.$1.length > 2 ?
                        '/u661f/u671f' :
                        '/u5468' :
                        '') + week[date.getDay() + '']
                )
            }
            for (var k in map) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(
                        RegExp.$1,
                        RegExp.$1.length === 1 ?
                        map[k] :
                        ('00' + map[k]).substr(('' + map[k]).length)
                    )
                }
            }
        } else {
            format = ''
        }
        return format
    },
    // 获取时间
    getTime(type = 'now') {
        let date = new Date()
        let nowYear = date.getFullYear()
        let myMonth = date.getMonth()
        let nowDay = date.getDate()
        let nowDayOfWeek = date.getDay()
        switch (type) {
            case 'tomo': // 明天
                transDate(1)
                break
            case 'pre': // 昨天
                transDate(-1)
                break
            case 'oneDaysAgo': // 一天前
                transDate(-2)
                break
            case 'TwoDaysAgo': // 两天前
                transDate(-3)
                break
            case 'ThreeDaysAgo': // 三天前
                transDate(-4)
                break
            case 'weekAgo': // 一周前
                transDate(-7)
                break
            case 'year': // 90天前
                transDate(-90)
                break
            case 'week':
                date = new Date(nowYear, myMonth, nowDay - nowDayOfWeek + 1)
                break
            case 'month':
                date = new Date(nowYear, myMonth, 1)
                break
        }

        function transDate(num) {
            date.setTime(date.getTime() + 24 * 3600 * 1000 * num)
        }
        const year = date.getFullYear()
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)
        return `${year}-${month}-${day}`
    },
    // 获取对象的一部分数据
    /* eslint-disable no-sequences */
    getPartAttr: (obj, arr) =>
        arr.reduce(
            (iter, val) => (val in obj && (iter[val] = obj[val]), iter), {}
        ),

    // 比较日志详情的列表不同项
    comparePreAfter(row, content, propName, value, isPre = false) {
        if (!content) {
            return
        }
        // 编辑前只是删除项标红
        if (isPre) {
            const item = content.find(val => val.orderSkuId === row.orderSkuId)
            if (!item) return true
            return false
        }
        let items = {}
        if (row.orderSkuId) {
            items = content.find(val => val.orderSkuId === row.orderSkuId)
        } else {
            items = content.find(
                val => val.serialNo === row.serialNo && val.skuId === row.skuId
            )
        }
        if (!items) return true
        if (String(items[propName]) !== String(value)) {
            return true
        } else {
            return false
        }
    },
    // 去除字符串前后空格
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
    },
    // 判断传入数据是不是json
    isJson(obj) {
        var isjson =
            typeof obj === 'object' &&
            Object.prototype.toString.call(obj).toLowerCase() ===
            '[object object]' &&
            !obj.length
        return isjson
    },
    // 模糊匹配数组里的字符串
    matchStrOfArr(arr, str) {
        return arr.findIndex(i => (i ? i.match(str) : false))
    },
    // 验证字符串里面是否含有非数字
    ifNoNum(s) {
        var patrn = /(^[1-9](\d){0,6}(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d([\d])?$)/
        if (!patrn.test(s)) return false
        return true
    },
    // 验证字符串里面是否是整数最多5位
    isDigit(s) {
        var patrn = /^\d{0,7}$/
        if (!patrn.test(s)) return false
        return true
    },
    // 验证字符串里面是否是整数
    isNum(s) {
        var patrn = /^\d+$/
        if (!patrn.test(s)) return false
        return true
    },
    // 乘法不丢失精度
    mul(arg1, arg2) {
        if (arg1 !== undefined && arg2 !== undefined) {
            var m = 0
            var s1 = arg1.toString()
            var s2 = arg2.toString()
            try {
                m += s1.split('.')[1].length
            } catch (e) {}
            try {
                m += s2.split('.')[1].length
            } catch (e) {}
            return (
                (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
                Math.pow(10, m)
            )
        }
    },
    // 验证金额，7位整数，2位小数
    registerPrice(price) {
        const reg = /(^[1-9](\d{0,6})?(\.\d{1,2})?$)|(^0$)|(^0\.\d{1,2}$)/
        if (!reg.test(price)) {
            return !1
        }
        return !0
    },
    // 根据文件类型返回图片icon类型
    fileTypeReturnIcon(str) {
        return IMG_SRC[str.substr(str.lastIndexOf('.') + 1)]
    },
    // 延时
    delay(time) {
        return new Promise(function (resolve) {
            const timer = setTimeout(function () {
                clearTimeout(timer)
                resolve()
            }, time)
        })
    }
}
export default utils
