import {
    Message
} from 'element-ui'

export default {
    methods: {
        showWarning(message) {
            this.$message.warning({
                message,
                showClose: true
            })
        },
        showError(message) {
            this.$message.error({
                message,
                showClose: true
            })
        },
        showSuccess(message = '操作成功') {
            this.$message.success({
                message,
                showClose: true
            })
        },
        showQuit(message = '已取消') {
            this.$message.info({
                message,
                showClose: true
            })
        },
        confirmWarning({
            title = '删除提示',
            content = '',
            confirmButtonText = '确定',
            cancelButtonText = '取消',
            showConfirmButton = true,
            showCancelButton = true,
            customClass = 'custom-message-box',
            type = 'warning',
            confirmButtonClass = 'el-button--danger confirm'
        }) {
            return this.$confirm(content, title, {
                showConfirmButton,
                showCancelButton,
                confirmButtonText,
                cancelButtonText,
                customClass,
                type,
                confirmButtonClass
            })
        },

        /**
         * 关闭所有的错误或者警告提示
         */
        closeAllMessageTips() {
            Message.closeAll()
        }
    }
}
