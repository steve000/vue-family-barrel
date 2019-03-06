<!---
    导出Excel组件
    传入参数：1.data：生成Excel的数组，必传
              2.label：生成Excel的表头的数组
              3.propsArray：label对应的props属性
              4.excelName：导出Excel的名称
              5.downloadText：下载按钮显示的文本
-->
<template>
    <div class="download-excel">
        <!--  <el-button type="text" :disabled="autoFalse"> <i class="iconfont1 icon-xiazai"></i>{{downloadText}}</el-button> -->
        <a id="downloadExcel" @click="downloadExcel">
        <i class="iconfont1 icon-xiazai"></i>{{ downloadText }}</a>
    </div>
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
    name: 'DownloadExcel',
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        },
        label: {
            type: Array,
            default: function () {
                return []
            }
        },
        propsArray: {
            type: Array,
            default: function () {
                return []
            }
        },
        excelName: {
            type: String,
            default: ''
        },
        downloadText: {
            type: String,
            default: '下载'
        }
    },
    data () {
        return {
            tmpDown: '',
            autoFalse: false
        }
    },
    watch: {
        data (navl) {
            let _this = this
            this.createExcel(_this)
        }
    },
    mounted () {
        let _this = this
        setTimeout(function () {
            _this.createExcel(_this)
        }, 500)
    },
    methods: {
        downloadExcel () {
            FileSaver.saveAs(this.tmpDown, this.excelName + '.xlsx')
        },
        base64: function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format: function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p]
            })
        },
        s2ab (s) {
            // 字符串转字符流
            let buf = new ArrayBuffer(s.length)
            let view = new Uint8Array(buf)
            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
            return buf
        },
        createExcel (_this) {
            let dataCopy = []
            for (let i = 0; i < _this.data.length; i++) {
                let item = {
                    '串码': _this.data[i]
                }
                dataCopy.push(item)
            }
            const defaultCellStyle = {
                font: { name: 'Verdana', sz: 11, color: 'FF00FF88' },
                fill: { fgColor: { rgb: 'FFFFAA00' } }
            }
            const wopts = {
                bookType: 'xlsx',
                bookSST: false,
                type: 'binary',
                defaultCellStyle: defaultCellStyle,
                showGridLines: false
            }
            const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }
            wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(dataCopy)
            _this.tmpDown = new Blob([_this.s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' })
        }
    }
}
</script>

<style scoped='true' lang='scss'>
.download-excel {
  font-size: 13px;
  color: #3b8cff;
  i {
    font-size: 14px;
  }
}
</style>
