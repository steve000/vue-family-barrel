export default {
    data() {
        return {
            curStockSelectGoods: []
        }
    },
    methods: {
        downloadFtpFile(res, cb, fileName = '导出订单', extension = '.xls') {
            const blob = new Blob([res])
            const a = document.createElement('a')
            a.download = `${fileName}${extension}`
            a.href = window.URL.createObjectURL(blob)
            a.id = 'downloadExportExcel'
            document.getElementsByTagName('body')[0].appendChild(a)
            a.click()
            document.getElementsByTagName('body')[0].removeChild(document.getElementById('downloadExportExcel'))
            if (cb && typeof cb === 'function') cb()
        }
        // // 返回选中的
        // returnSelect() {
        //     return new Promise((resolve, reject) => resolve(this.curStockSelectGoods))
        // }
    }
}
