/*
 用于element-ui表格,表头固定且表体按窗口高度出现滚动条
 */

export default {
    data() {
        return {
            tableHeight: '300' // 默认表体高度
        }
    },
    methods: {
        setTableHeight(height) { // height 是除表体外 页面其他元素占的高度
            setTimeout(() => {
                this.tableHeight = window.document.documentElement.offsetHeight - parseInt(height) + ''
                let tmp = document.getElementsByClassName('el-table__body')[0]
                let tableBodyHeight = 0
                if (tmp && tmp.offsetHeight) {
                    tableBodyHeight = tmp.offsetHeight
                }
                if (tableBodyHeight && this.tableHeight > tableBodyHeight + 36) {
                    this.tableHeight = tableBodyHeight + 40
                }
            }, 80)

            let THIS = this
            let res
            window.addEventListener('resize', function () {
                if (res) {
                    clearTimeout(res)
                }
                res = setTimeout(function () {
                    let curHeight = window.document.documentElement.offsetHeight
                    let tmp = document.getElementsByClassName('el-table__body')[0]
                    let tableBodyHeight = 0
                    if (tmp && tmp.offsetHeight) {
                        tableBodyHeight = tmp.offsetHeight
                    }
                    THIS.$nextTick(() => {
                        THIS.tableHeight = curHeight - parseInt(height) + ''
                        if (tableBodyHeight && THIS.tableHeight > tableBodyHeight + 36) {
                            THIS.tableHeight = tableBodyHeight + 40
                        }
                    })
                }, 80)
            })
        }
    }
}
