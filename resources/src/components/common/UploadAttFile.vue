<template>
    <div class="uploadAttachments">
        <el-upload :limit="2" :before-upload="beforeUpload" :disabled="isDisabled" :show-file-list="false" :file-list="fileList" class="select-file-div " action="" accept="file">
            <el-button class="add-file-button" @click="maxFileTips">
                <i class="iconfont1 icon-fujian"></i>添加附件
            </el-button>
        </el-upload>
        <div class="upload-file-list">
            <div v-for="(item,index) in attachmentList" :key="index" class="file-list-item">
                <div :class="item.imgSrc" class="background"></div>
                <div class="file-list-item-title">
                    <p>{{ item.upFileName }}({{ Math.round(item.fileSize / 1024) }}KB)</p>
                    <p @click="deleteFileItem(index)">删除</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import MessagesMixins from '~/mixins/messages'
import { VALID_FILE_TYPE, IMG_SRC } from '~/constants/const'

export default {
    name: 'UploadAttachments',
    mixins: [MessagesMixins],
    props: {
        serviceType: String,
        relationKeys: String
    },
    data () {
        return {
            fileList: [],
            attachmentList: [],
            isParseExcelDialogVisible: false,
            isDisabled: false
        }
    },
    methods: {
        ...mapActions(['showPageLoading', 'hidePageLoading', 'uploadStockFile', 'deleteModuleAttrList']),
        beforeUpload (file) {
            let fileName = file.name
            let index = fileName.lastIndexOf('.')
            let fileType = fileName.substring(index)
            if (VALID_FILE_TYPE.indexOf(fileType) < 0) {
                this.showWarning('上传的文件格式不正确，支持doc/docx/xls/xlsx/csv/pdf/png/jpg！')
                return false
            }
            let _this = this
            let calBackFunction = function (resp) {
                _this.hidePageLoading()
                _this.showSuccess('上传成功！')
                let item = { ...resp }
                let fileIndex = resp.upFileName.lastIndexOf('.')
                fileIndex = fileIndex + 1
                let fileType = resp.upFileName.substring(fileIndex)
                item.imgSrc = IMG_SRC[fileType]
                _this.attachmentList.push(item)
                if (_this.attachmentList.length >= 20) {
                    _this.isDisabled = true
                }
                _this.$emit('successFileList', _this.attachmentList)
            }
            this.uploadFile(file, calBackFunction)
            return false
        },
        uploadFile (file, callback) {
            let formData = new FormData()
            formData.append('file', file)
            this.showPageLoading()
            this.uploadStockFile(formData).then(resp => {
                callback(resp)
            }).catch(() => {
                this.hidePageLoading()
                this.showError('上传失败！')
            })
        },
        deleteFileItem (index) {
            // const obj = this.attachmentList[index]
            // const attachmentList = [{ id: this.attachmentList[index].id, ftpPath: obj.file }]
            // this.deleteModuleAttrList({ serviceType: this.serviceType, relationKeys: this.relationKeys, attachmentList }).then(res => {
            //     this.showSuccess(`删除成功`)
            // }).catch(() => {
            //     this.showError(`删除失败`)
            // })
            this.showSuccess(`删除成功`)
            this.attachmentList.splice(index, 1)
            this.attachmentList.length >= 20 ? this.isDisabled = true : this.isDisabled = false
            this.$emit('successFileList', this.attachmentList)
        },
        maxFileTips () {
            if (this.isDisabled) { this.showWarning('最多只能上传20个附件') }
        }
    }
}
</script>

<style lang="scss">
.uploadAttachments {
  .add-file-button {
    width: 98px;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 1px;
    border: 1px solid rgba(224, 224, 224, 1);
    padding: 0px;
    font-size: 14px;
    i {
      margin-right: 5px;
    }
  }
  //   .file-list div.file-list-item-title {
  //     line-height: 1;
  //     margin-left: 0;
  //     p:nth-child(1) {
  //       height: 14px;
  //       color: rgba(51, 51, 51, 1);
  //       margin-bottom: 8px;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //       white-space: nowrap;
  //     }
  //     p:nth-child(2) {
  //       height: 12px;
  //       cursor: pointer;
  //       color: rgba(83, 158, 255, 1);
  //     }
  //   }
}
</style>
