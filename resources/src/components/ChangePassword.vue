<template>
    <modal
        :value="editPasswordDialogVisible"
        :show-cancel-button="false"
        title="修改密码"
        ok-text="确认修改"
        width="560px"
        @close="closeEdit"
        @save="confirmEdit">
        <el-form
            ref="editPasswordForm"
            :model="editPassword"
            :rules="editPasswordForm"
            label-width="80px"
            label-position="left">
            <el-form-item label="用户名:">
                <label class="ml15">{{ currentUser }}</label>
            </el-form-item>
            <el-form-item
                label="原密码:"
                prop="oldPassword">
                <el-input
                    v-model.trim="editPassword.oldPassword"
                    type="password"
                    placeholder="请输入原密码"
                    size="small"></el-input>
            </el-form-item>
            <el-form-item
                label="新密码:"
                prop="newPassword">
                <el-input
                    v-model.trim="editPassword.newPassword"
                    type="password"
                    placeholder="请输入新密码(6到20位，包含数字、大小写、特殊字符中至少两种)"
                    size="small"></el-input>
            </el-form-item>
            <el-form-item
                label="确认密码:"
                prop="confirmPassword">
                <el-input
                    v-model.trim="editPassword.confirmPassword"
                    type="password"
                    placeholder="请输入重新输入新密码"
                    size="small"></el-input>
            </el-form-item>
        </el-form>
    </modal>
</template>

<script>
import Modal from '../components/common/Modal'
import utils from '../utils/misc'
import MessageMixins from '../mixins/messages'
import {mapActions, mapState} from 'vuex'
import storageSession from '~/utils/storage'

export default {
    name: 'ChangePassword',
    components: {Modal},
    mixins: [MessageMixins],
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        let validateOldPass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入原密码'))
            } else {
                callback()
            }
        }
        let validateNewPass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'))
            }
            if (value.length < 6 || value.length > 20) {
                callback(new Error('请输入6到20位的密码'))
            }
            const regNum = /[0-9]/
            const regLower = /[a-z]/
            const regUpper = /[A-Z]/
            const regTeShu = RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]")
            let res = 0
            if (regNum.test(value)) {
                ++res
            }
            if (regLower.test(value)) {
                ++res
            }
            if (regUpper.test(value)) {
                ++res
            }
            if (regTeShu.test(value)) {
                ++res
            }
            if (res < 2) {
                callback(new Error('密码需要包含数字、大写字母、小写字母、特殊字符中至少两种!'))
            } else {
                callback()
            }
        }
        let validateConfirm = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入新密码'))
            }
            if (value !== this.editPassword.newPassword) {
                callback(new Error('两次输入的密码不一致！'))
            } else {
                callback()
            }
        }
        return {
            editPasswordDialogVisible: this.dialogVisible,
            editPassword: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            editPasswordForm: {
                oldPassword: [{required: false, validator: validateOldPass, trigger: 'blur'}],
                newPassword: [{required: false, validator: validateNewPass, trigger: 'blur'}],
                confirmPassword: [{required: false, validator: validateConfirm, trigger: 'blur'}]
            }
        }
    },
    computed: {
        ...mapState({
            currentUser: ({root}) => root.currentUser
        })
    },
    watch: {
        dialogVisible: function (nval, oval) {
            this.editPasswordDialogVisible = nval
        }
    },
    methods: {
        ...mapActions(['editUserPassword']),
        // 关闭 修改密码 弹窗
        closeEdit() {
            this.$refs['editPasswordForm'].resetFields()
            this.editPasswordDialogVisible = false
            this.$emit('closeDialog')
        },
        // 点击确认修改密码
        confirmEdit() {
            this.$refs['editPasswordForm'].validate(res => {
                if (res) {
                    const userId = storageSession.getDefaultStorage().get('userId')
                    let params = {
                        uId: userId,
                        oldPassword: utils.rsaEncrypt(this.editPassword.oldPassword),
                        newPassword: utils.rsaEncrypt(this.editPassword.newPassword)
                    }
                    this.editUserPassword(params)
                        .then(resp => {
                            if (resp) {
                                this.showSuccess('修改密码成功，请重新登录')
                                this.closeEdit()
                                setTimeout(() => {
                                    this.$emit('onLogout')
                                }, 2000)
                            } else {
                                this.showError('修改密码失败')
                            }
                        })
                        .catch(e => {
                            this.showError(e.msg ? e.msg : '操作失败！')
                        })
                }
            })
        }
    }
}
</script>

<style lang="scss">

</style>
