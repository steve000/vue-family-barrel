<!--
 审批弹窗附件
参数 validFileType允许的类型，字符串类型如 'doc/pdf/xml'
    maxLen 最大允许上传的文件个数
    suffixBgObj 不同文件类型对应的小图标class,可扩充默认值
    getAttachmentList 回传附件列表数据
  -->
<template>
    <div :class="{'have-fold':canFold}" class="upload-attach">
        <el-upload ref="uploader" :limit="maxLen" :before-upload="beforeUpload" :show-file-list="false" :on-exceed="overSum" :file-list="fileList" action=" " class="attachment-upload pb10 ">
            <span class="primary ">
                <i class="icon-fujian "></i>
                <span>上传附件</span>
            </span>
        </el-upload>
        <div v-if="fileList.length>0 && expandFlag" :class="{'can-flod':canFold}" class="attach-wrap">
            <div v-for="item in fileList" :key="item.uid" :style="{'width':widthPercent}" class="list-item">
                <div class="item-cell">
                    <span :class="item.bgSrc" class="common-bg"></span>
                </div>
                <div class="item-cell">
                    <p class="row1">
                        <span class="file-name">{{ item.upFileName }}</span>
                        <span class="file-size">({{ Math.round(item.fileSize / 1024) }}KB)</span>
                    </p>
                    <p class="row2" @click="deleteFile(item)">
                        删除
                    </p>
                </div>
            </div>
        </div>
        <div v-if="fileList.length>0 && canFold" class="expand-flod">
            <div v-show="!expandFlag" class="to-expand" @click="expandFlag=true">
                <i class="el-icon-caret-bottom"></i>
                展开查看已上传的附件
            </div>
            <div v-show="expandFlag" class="to-close" @click="expandFlag=false">
                <i class="el-icon-caret-top"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import MessageMixins from '~/mixins/messages'
export default {
    name: 'UploaderAttachment',
    mixins: [MessageMixins],
    props: {
        validFileType: String,
        maxLen: Number,
        suffixBgObj: {
            type: Object,
            default: () => {
                return {
                    doc: 'background_word',
                    docx: 'background_word',
                    xls: 'background_xls',
                    xlsx: 'background_xls',
                    csv: 'background_xls',
                    pdf: 'background_pdf',
                    png: 'background_image',
                    jpg: 'background_image'
                }
            }
        },
        widthPercent: {
            type: String,
            default: '50%'
        },
        getAttachmentList: {
            type: Function
        },
        canFold: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            fileList: [],
            expandFlag: true
        }
    },
    methods: {
        ...mapActions(['uploadStockFile', 'showPageLoading', 'hidePageLoading']),
        overSum (file, fileList) {
            this.showWarning(`最多只能上传${this.maxLen}个附件`)
        },
        beforeUpload (file) {
            let validFileTypeArr = this.validFileType.split('/')
            const typeValidater = validFileTypeArr.some(item => {
                let reg = new RegExp(`${item}$`, 'g')
                return reg.test(file.name.toLowerCase())
            })
            if (!typeValidater) {
                this.showWarning(`文件类型只能是：${this.validFileType}`)
                return false
            }
            if (file.size > 104857600) {
                this.showWarning('附件大小不能超过100M')
                return false
            }
            // 同名校验
            // const duplicateFile =
            //     this.fileList && this.fileList.length ? this.fileList.some(_file => _file.name === file.name) : false
            // if (duplicateFile) {
            //     this.showWarning('已有同名文件')
            //     return false
            // }
            let _this = this
            const callback = function (res) {
                let item = { ...res }
                let fileSuffix = ''
                if (item.upFileName) {
                    let index = item.upFileName.lastIndexOf('.')
                    if (index > -1) {
                        fileSuffix = item.upFileName.substring(index + 1)
                    }
                }
                item.bgSrc = _this.suffixBgObj[fileSuffix]
                _this.fileList.push(item)
                _this.getAttachmentList(_this.fileList)
            }
            this.onUpload(file, callback)
            return false
        },
        onUpload (file, callback) {
            this.showPageLoading()
            let formData = new FormData()
            formData.append('file', file)
            this.uploadStockFile(formData)
                .then(res => {
                    this.hidePageLoading()
                    this.showSuccess('上传成功！')
                    callback(res)
                })
                .catch(() => {
                    this.hidePageLoading()
                    this.showError('上传失败!')
                })
        },
        deleteFile (file, index) {
            this.confirmWarning({ title: '提示', content: `确定删除${file.upFileName}文件?` }).then(() => {
                // 删除接口 ？？？
                this.fileList.splice(index, 1)
                this.getAttachmentList(this.fileList)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.upload-attach {
  &.have-fold {
    .attachment-upload {
      padding: 0 30px 30px;
    }
    .can-flod {
      border-top: 1px solid rgba(243, 243, 243, 1);
      padding: 20px 30px;
    }
  }
  .primary {
    color: #3b8cff;
  }
  .attach-wrap {
    .list-item {
      display: inline-block;
      .common-bg {
        background-size: 24px 30px;
        background-position: 50% 0;
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        display: inline-block;
      }
      .background_image {
        background-size: 24px 24px;
      }
      .item-cell {
        display: table-cell;
        vertical-align: top;
        font-size: 12px;
        line-height: 12px;
        &:first-child {
          width: 36px;
        }
        .row1 {
          line-height: 17px;
          color: #9c9c9c;
          padding-bottom: 2px;
          .file-name {
            max-width: 170px;
            overflow: hidden;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            vertical-align: top;
          }
        }
        .row2 {
          display: inline-block;
          color: #3b8cff;
          cursor: pointer;
          line-height: 14px;
        }
      }
    }
  }
  .expand-flod {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    border-top: 1px solid rgba(243, 243, 243, 1);
    i {
      font-size: 14px;
    }
    .to-expand {
      color: #3b8cff;
    }
    .to-close {
      color: #aaaaaa;
    }
  }
}
</style>
