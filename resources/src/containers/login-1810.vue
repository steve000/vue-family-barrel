<template>
    <div class="login-page">
        <img class="bg-img" src="../layouts/images/new_bg.png"/>
        <div class="page-main" @click="isActive = false">
            <div class="main-content">
                <div v-if="showUserTipInfo || showVerifyTipInfo" class="show-error">
                    <span v-if="showUserTipInfo">
                        <i class="icon-tishi"></i>
                        <span>账户或密码有误，请重新输入</span>
                    </span>
                    <span v-if="showVerifyTipInfo">
                        <i class="icon-tishi"></i>
                        <span>验证码有误，请重新输入</span>
                    </span>
                </div>
                <div class="login-form">
                    <el-form
                        ref="userForm"
                        :model="userForm">
                        <el-form-item>
                            <el-input
                                v-model.trim="userForm.username"
                                placeholder="OA账号/NGOC外协账号"
                                auto-complete="off"
                                @keyup.enter.native="onLogin()"
                                @keyup.native="checkLoginMes()"></el-input>
                        </el-form-item>
                        <!-- 用来欺骗浏览器记住用户信息 -->
                        <input type="text" value="admin" style="position: absolute;z-index: -1;height: 0;display: none"
                               disabled autocomplete="off"/><!-- 这个username会被浏览器记住，我随便用个admin-->
                        <input type="password" value="aaa"
                               style="position: absolute;z-index: -1;height: 0;display: none"
                               disabled autocomplete="off"/>
                        <el-form-item class="password-input">
                            <el-input
                                :maxlength="20"
                                v-model.trim="userForm.password"
                                type="password"
                                placeholder="登入密码"
                                auto-complete="off"
                                @keyup.native="checkCapitalKey"
                                @keypress.native="capitalKey"
                                @keyup.enter.native="onLogin()"></el-input>
                            <p v-if="isCapitalKeyOpen" class="capital-key-tips">大写锁定已开启</p>
                        </el-form-item>
                        <el-form-item v-if="userForm.num >= 3">
                            <el-input
                                :maxlength="10"
                                v-model.trim="userForm.verify"
                                type="text"
                                placeholder="验证码"
                                auto-complete="off"
                                class="verify-code"
                                @keyup.enter.native="onLogin()"
                                @keyup.native="checkLoginMes()">
                                <img id="verify-dom" slot="suffix" :src="srcUrl" alt=" "
                                     style="width: 80px; height: 28px; margin-right: 2px;cursor: pointer"
                                     @click="changPin">
                            </el-input>
                        </el-form-item>
                        <el-button
                            v-show="!isLoginIn"
                            :disabled="isDisableClick"
                            :class="{disabled: isDisableClick}"
                            class="login-btn"
                            @click="onLogin">登 录
                        </el-button>
                        <div v-show="isLoginIn" class="loginAnimator">
                            <div id="lottie" ></div>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="service-tip">系统登陆及其他问题请联系 邮箱：ngoc.support@migu.cn</div>
            <div class="ban-quan">Copyright © 2018 咪咕TSG成都研发事业部</div>
        </div>
        <div class="customer_service-icon">
            <img class="service" src="../layouts/images/new_service.png" @click="isActive = !isActive"/>
        </div>
        <div
            v-if="isActive"
            class="customer_service-container">
            <p class="login-customer_service_title">微信客服</p>
            <div class="bnefit-box">
                <p>问题反馈群</p>
            </div>
            <div class="phone-service">
                <p>反馈邮箱</p>
                <p>ngoc.support@migu.cn</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import utils from '../utils/misc'
import cookies from '../utils/cookies'
import MessageMixins from '~/mixins/messages'
import {ROLE_CONST_VALUE} from '~/constants/systemRoleConst'
import * as CODE from '~/constants/apiCodeConst'
import Lottie from '~/utils/lottie_light'
import storage from '../utils/storage'
import AnimationData from '~/utils/animation.json'
import 'es6-promise'
export default {
    name: 'Login1810',
    mixins: [MessageMixins],
    data() {
        return {
            userForm: { // 登录输入内容
                username: '',
                password: '',
                verify: '',
                num: 1
            },
            isActive: false, // 客服二维码 是否显示
            showUserTipInfo: false, // 登录用户名或密码错误，显示错误提示
            showVerifyTipInfo: false, // 登录验证码错误，显示错误提示
            srcUrl: '', // 验证码图片，base64格式
            isCapitalKeyOpen: false, // 输入密码框 大小写锁定 判断
            isDisableClick: true, // 登录按钮只能按一次，
            isLoginIn: false,
            loginLoading: [],
            totalToDoCount: 0,
            totalMyCreateCount: 0,
            storageData: '' // 存放登录成功返回的数据
        }
    },
    computed: {
        ...mapState({
            isSuperAdmin: ({root}) => root.isSuperAdmin
        })
    },
    watch: {
        isLoginIn(val) {
            val ? this.loginAnimator.play() : this.loginAnimator.stop()
        }
    },
    mounted() {
        // 检查 设置登录按钮是否可点击
        this.checkLoginMes()
        // 检查有没有cookie 没有cookie 则删除验证码错误统计
        let cookie = cookies.getCookie('nng')
        if (!cookie) {
            storage.getDefaultStorage().remove('num')
        }
        let num = storage.getDefaultStorage().get('num')
        this.userForm.num = num ? Number(num) : 1
        // 登录失败次数大于2 显示验证码登录，否则清空cookie
        if (this.userForm.num > 2) {
            this.changPin()
        } else {
            cookies.delCookie('nng')
        }
        // 配置登录动画
        this.configLoginAnimator()
        // 清除定时器
        clearTimeout(storage.getDefaultStorage().get('timer'))
    },
    methods: {
        ...mapActions(['login', 'getLoginImage', 'getUserEntityList',
            'changeCurrentUser', 'changeCurrentUserId', 'changeCurrentUserRole',
            'changeCurrentEntity', 'changeCurrentEntityId',
            'queryToDoCountAction', 'queryCountCreatedByMe']),
        onLogin() {
            if (!this.userForm.username) {
                this.showWarning('请输入用户名')
            } else if (!this.userForm.password) {
                this.showWarning('请输入密码')
            } else if (this.userForm.num >= 3 && !this.userForm.verify) {
                this.showWarning('请输入验证码')
            } else {
                this.doLogin()
            }
        },
        // 配置登录动画
        configLoginAnimator() {
            this.loginAnimator = Lottie.loadAnimation({
                container: document.getElementById('lottie'),
                loop: true,
                autoplay: false,
                animationData: AnimationData
                // path: 'demo.json'
            })
        },
        doLogin() {
            this.isDisableClick = true
            this.showUserTipInfo = false
            this.showVerifyTipInfo = false
            this.isLoginIn = true
            let pss = utils.rsaEncrypt(this.userForm.password)
            this.login({
                username: this.userForm.username,
                password: pss,
                captchaCode: this.userForm.verify,
                num: this.userForm.num
            }).then(resp => {
                if (resp && resp.sessionId && resp.groupId) {
                    this.storageData = resp
                    // 设置cookies过期时间为 5 个小时
                    cookies.setCookie('nng', 'nng', 5)
                    this.getEntity()
                } else if (resp && !resp.groupId) {
                    this.showError('没有操作权限，请联系系统管理员！')
                    this.isLoginIn = false
                    this.isDisableClick = false
                } else {
                    this.showError('登录失败，请重新登录！')
                    this.isLoginIn = false
                    this.isDisableClick = false
                }
            }).catch(e => {
                // session 验证错误，就是 前面登录未登出cookies还有效，重新登录 第一次登录清cookie，再一次登录登录成功
                if (e.code === 1007) {
                    this.doLogin()
                } else {
                    this.userForm.num++
                    storage.getDefaultStorage().put('num', this.userForm.num)
                    this.isLoginIn = false
                    this.loginLoading = []
                    this.userForm.verify = ''
                    if (this.userForm.num >= 3) {
                        this.changPin()
                    }
                    this.isDisableClick = false
                    this.checkLoginMes()
                    if (e.code === CODE.VERIFY_ERROR) {
                        this.showVerifyTipInfo = true
                    } else if (e.code === CODE.USERNAME_OR_PASSWORD_ERROR || e.code === CODE.OA_USERNAME_OR_PASSWORD_ERROR || e.code === CODE.USERNAME_ERROR) {
                        this.showUserTipInfo = true
                    }
                }
            })
        },
        // 通过用户id 获取用户所有的 业务实体
        getEntity() {
            if (this.storageData.uid) {
                this.changeCurrentUserId(this.storageData.uid)
                this.getUserEntityList({uid: this.storageData.uid}).then(resp => {
                    if (resp && resp.result && resp.result.length > 0) {
                        let item = resp.result.filter(one => `${one.userGroupId}` === `${this.storageData.groupId}`)[0]
                        if (item && item.roleType) {
                            this.storageData['roleType'] = item.roleType
                            this.storageData['roleId'] = item.roleId
                            this.doStorageData()
                            this.shiftTabPage(item.roleType)
                        } else {
                            this.showError('用户业务实体信息不一致!')
                            this.clearLoginForm()
                            this.isLoginIn = false
                            this.isDisableClick = false
                        }
                    } else {
                        this.showError('暂无业务实体，或业务实体信息有误!')
                        this.clearLoginForm()
                        this.isLoginIn = false
                        this.isDisableClick = false
                    }
                }).catch(e => {
                    console.log(e)
                    this.isLoginIn = false
                    this.isDisableClick = false
                })
            } else {
                this.showError('登录成功，但返回的用户信息有误!')
                this.clearLoginForm()
                this.isLoginIn = false
                this.isDisableClick = false
            }
        },
        // 登录成功后 根据角色和条件 跳转到不同页面
        async shiftTabPage(roleType) {
            const nextURL = this.$route.query.next
            if (nextURL) {
                const array = nextURL.match(/uId=(.*)&userGroupId=(.*)/)
                if (array != null) {
                    const prevUserId = array[1]
                    const prevEntityId = array[2]
                    const cache = storage.getDefaultStorage()
                    const currentUserId = cache.get('userId')
                    const currentEntityId = cache.get('entityId')
                    if (prevUserId === currentUserId && prevEntityId === currentEntityId) {
                        this.redirectToPreviousPage()
                        return
                    }
                }
            }
            if (ROLE_CONST_VALUE.SUPER_ADMIN !== roleType) {
                await this.getWorkflowDataCount()
            }
            setTimeout(() => {
                if (ROLE_CONST_VALUE.SUPER_ADMIN === roleType) { // 超级管理员进行系统设置页面
                    this.$router.push(utils.setPath('/system/entity'))
                } else {
                    if (this.totalToDoCount) { // 有待办事项，进入待办事项
                        this.$router.push(utils.setPath('/workflows/toDoMatter'))
                    } else if (this.totalMyCreateCount) { // 没有待办事项，有由我创建，进入由我创建
                        this.$router.push(utils.setPath('/workflows/myCreated'))
                    } else { // 没有待办事项和由我创建，进入统计页面
                        this.$router.push(utils.setPath('/index/Home'))
                    }
                }
                this.clearLoginForm()
            }, 1000)
        },
        // 获取数据，用于登录成功后判断打开什么页面
        async getWorkflowDataCount() {
            let roleType = storage.getDefaultStorage().get('roleType')
            let isCommonUser = `${roleType}` === `${ROLE_CONST_VALUE.NORMAL_USER}`
            await Promise.all([this.queryToDoCountAction(), this.queryCountCreatedByMe()]).then(res => {
                res[0] && res[0].forEach(one => {
                    // 非普通用户可以查看所有代办事项
                    if (!isCommonUser) {
                        this.totalToDoCount += one.count
                    } else { // 普通用户不可以查看待入库1、待出库2的待办事项，可以查看待审批0、地址信息异常3的待办事项
                        if (one.type === 0 || one.type === 3) {
                            this.totalToDoCount += one.count
                        }
                    }
                })
                res[1] && res[1].forEach(one => {
                    this.totalMyCreateCount += one.count
                })
            }).catch(e => {
                this.showError(`(${e.code})获取统计数量失败`)
            })
        },
        // 更新验证码图片
        changPin() {
            // this.srcUrl = `${GET_LOGIN_IMAGE}?t=${Math.random()}`
            this.getLoginImage({dataType: {responseType: 'blob'}}).then(res => {
                let url = this.arrayBufferToBase64(res.data)
                // 设置 获取验证码的cookie 过期
                cookies.setCookie('nng', 'nng', 5)
                this.srcUrl = `data:image/jpeg;base64,${url}`
            }).catch(e => {
            })
        },
        // 返回二进制图片转换成base64格式
        arrayBufferToBase64(buffer) {
            let binary = ''
            let bytes = new Uint8Array(buffer)
            let len = bytes.byteLength
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i])
            }
            return window.btoa(binary)
        },
        // 存储系统运行需要的数据
        doStorageData() {
            let resp = this.storageData
            const storageInstance = storage.getDefaultStorage()
            this.$store.commit({type: 'CLEAR_ALL_DATA'})
            storageInstance.put('checkUser', `${resp.uid}` + `${resp.groupId}`)
            storageInstance.remove('num')
            storageInstance.remove('tabCaches')
            storageInstance.remove('tabCachesReload')
            storageInstance.put('userName', resp.uname)
            storageInstance.put('userId', resp.uid)
            storageInstance.put('groupId', resp.groupId)
            storageInstance.put('utype', resp.utype)
            storageInstance.put('entityId', resp.groupId)
            storageInstance.put('entityName', resp.groupName)
            storageInstance.put('mold', resp.mold)
            storageInstance.put('bizSignList', resp.bizSignList)
            storageInstance.put('roleType', resp.roleType)
            storageInstance.put('roleId', resp.roleId)
            this.changeCurrentUserRole(resp.roleType)
            this.changeCurrentUser(resp.uname)
            this.changeCurrentUserId(resp.uid)
            this.changeCurrentEntity(resp.groupName)
            this.changeCurrentEntityId(resp.groupId)
        },
        // 清空登录输入
        clearLoginForm() {
            this.userForm.username = ''
            this.userForm.password = ''
            this.userForm.verify = ''
        },
        // 判断大写锁定
        capitalKey() {
            let e = window.event
            let valueCapsLock = e.keyCode ? e.keyCode : e.which // 按键
            let valueShift = e.shiftKey ? e.shiftKey : ((valueCapsLock === 16) ? 1 : 0) // shift键是否按住
            // if的前一个条件 输入了大写字母，并且shift键没有按住，说明Caps Lock打开
            if (((valueCapsLock >= 65 && valueCapsLock <= 90) && !valueShift) || ((valueCapsLock >= 97 && valueCapsLock <= 122) && valueShift)) { // 输入了小写字母，并且按住 shift键，说明Caps Lock打开
                this.isCapitalKeyOpen = true
            } else {
                this.isCapitalKeyOpen = false
            }
        },
        checkCapitalKey() {
            let e = window.event
            if (e.keyCode === 20) { // 大写锁定键按下
                this.isCapitalKeyOpen = !this.isCapitalKeyOpen
            }
            this.checkLoginMes()
        },
        // 登录按钮是否可点击判断
        checkLoginMes() {
            // 输入用户名、密码、验证码、错误次数大于2次
            const condition1 = this.userForm.username.length > 0 && this.userForm.password.length > 0 && this.userForm.verify.length === 5 && this.userForm.num > 2
            // 输入用户名、密码、错误次数小于3次
            const condition2 = this.userForm.username.length > 0 && this.userForm.password.length > 0 && this.userForm.num < 3
            if (condition1 || condition2) {
                this.isDisableClick = false
            } else {
                this.isDisableClick = true
            }
        },

        // 通过点击邮件登入时，返回之前页面超时的页面
        redirectToPreviousPage() {
            let {next} = this.$route.query
            if (next) {
                window.location.href = decodeURIComponent(next)
            }
        }
    }
}
</script>

<style lang="scss">
    .login-page {
        width: 100%;
        height: 100%;
        position: relative;
        .bg-img {
            width: 100%;
            height: 100%;
            z-index: -1;
            position: absolute;
            top: 0px;
            left: 0px;
        }
        .page-main {
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;
            .main-content {
                position: absolute;
                z-index: 10;
                right: 11%;
                top: 31%;
                /*min-height: 290px;*/
                height: 32%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .show-error {
                    color: #E12B2B;
                    line-height: 20px;
                    height: 20px;
                    font-size: 12px;
                    width: 100%;
                    display: inline-block;
                }
                .login-form {
                    width: 220px;
                    .el-form .el-form-item .el-input {
                        height: 36px;
                        line-height: 36px;
                        .el-input__inner {
                            border-radius: 8px;
                            box-shadow: 0px -4px 0px 1px #05052F;
                            height: 36px;
                            line-height: 36px;
                        }
                    }
                    .login-btn {
                        float: right;
                        height: 35px;
                        width: 112px;
                        border-radius: 5px;
                        background-color: #BA912D;
                        color: #fff;
                        border: none
                    }
                    .disabled {
                        background-color: #ccc;
                        opacity: 0.7;
                    }
                    .capital-key-tips {
                        position: absolute;
                        top: 42px;
                        left: 0px;
                        height: 12px;
                        font-size: 12px;
                        color: rgba(59, 140, 255, 1);
                        line-height: 12px;
                    }
                }
            }
            .service-tip {
                color: #999;
                position: absolute;
                right: 17%;
                top: 65%;
                opacity: 0.7;
            }
            .ban-quan {
                text-align: center;
                font-size: 13px;
                color: #a5caff;
                height: 20px;
                position: absolute;
                bottom: 10px;
                width: 100%;
            }
        }

        .customer_service-icon {
            position: absolute;
            padding-right: 50px;
            padding-top: 25px;
            top: 0px;
            z-index: 998;
            right: 0px;
            .service {
                width: 25px;
                height: 25px;
            }
        }
        .customer_service-container {
            background: #ffffff;
            box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.1);
            width: 260px;
            height: 265px;
            padding: 24px 20px;
            position: absolute;
            z-index: 100;
            top: 70px;
            right: 60px;
            .login-customer_service_title {
                background: url("../layouts/images/weixin_customer.png") no-repeat;
                background-size: 20px 100%;
                width: 100%;
                height: 20px;
                font-size: 14px;
                color: #333333;
                line-height: 20px;
                padding-left: 32px;
            }
            .bnefit-box {
                padding: 111px 0px 27px;
                background: url("../layouts/images/erweima.png") no-repeat center 24px;
                background-size: 80px 80px;
                p {
                    font-size: 12px;
                    color: #3c3c3c;
                    text-align: center;
                }
            }
            .phone-service {
                width: 100%;
                padding-left: 33px;
                background: url("../layouts/images/mail.png") no-repeat 0px 10px;
                background-size: 24px 24px;
                p:nth-child(1) {
                    font-size: 14px;
                    color: #333333;
                    margin-bottom: 5px;
                }
                p:nth-child(2) {
                    font-size: 12px;
                    color: #ff8d09;
                }
            }
        }
    }
    .loginAnimator {
        width: 112px;
        height: 35px;
        position: relative;
        float: right;
    }

    #lottie {
        width: 224px;
        height: 80px;
        position: absolute;
        top: -23px;
        right: -56px;
    }
</style>
