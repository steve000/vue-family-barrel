<template>
    <div class="login-container">
        <div :style="{background: 'url(' + bgImg1 + ')'}"></div>
        <div class="login-container-box" @click="isActive=false">
            <div class="login-header">
                <div>
                    <a id="login_icon" href="javascript:void(0);"></a>
                </div>
            </div>
            <div id="loginCenter" :style="styleObject" class="login-center">
                <div class="login-left-container">
                    <!--
                    <img src="../layouts/images/login_center_text1.png"></img>
                    <img src="../layouts/images/login_center_text3.png"></img>
                    -->
                </div>
                <div class="login-box">
                    <div class="title">登 录</div>
                    <div class="tips">咪咕用户使用OA账户登录</div>
                    <div class="show-error">
                        <span v-if="showUserTipInfo">
                            <i class="icon-tishi"></i>
                            账户或密码有误，请重新输入
                        </span>
                        <span v-if="showVerifyTipInfo">
                            <i class="icon-tishi"></i>
                            验证码有误，请重新输入
                        </span>
                    </div>
                    <div class="login_form">
                        <el-form ref="userForm" :model="userForm">
                            <el-form-item>
                                <el-input v-model.trim="userForm.username" placeholder="OA账号/NGOC外协账号" autocomplete="off" @keyup.enter.native="onLogin()" @keyup.native="checkLoginMes()"></el-input>
                            </el-form-item>
                            <input type="text" value="admin" style="position: absolute;z-index: -1;height: 0" disabled autocomplete="off" />
                            <!-- 这个username会被浏览器记住，我随便用个admin-->
                            <input type="password" value="aaa" style="position: absolute;z-index: -1;height: 0" disabled autocomplete="off" />
                            <el-form-item class="password-input">
                                <el-input :maxlength="20" v-model.trim="userForm.password" type="password" placeholder="登入密码" autocomplete="off" @keyup.native="checkCapitalKey" @keypress.native="capitalKey" @keyup.enter.native="onLogin()"></el-input>
                                <p v-if="isCapitalKeyOpen" class="capital-key-tips">大写锁定已开启</p>
                            </el-form-item>
                            <el-form-item v-if="userForm.num >= 3">
                                <el-input :maxlength="10" v-model.trim="userForm.verify" type="text" placeholder="验证码" auto-complete="off" class="verify-code" @keyup.enter.native="onLogin()" @keyup.native="checkLoginMes()">
                                    <img id="verify-dom" slot="suffix" :src="srcUrl" alt=" " style="width: 80px; height: 28px; margin-right: 2px;cursor: pointer" @click="changPin">
                                </el-input>
                            </el-form-item>
                            <el-button :disabled="isDisableClick" :class="{disabled: isDisableClick}" @click="onLogin">登 录
                                <span v-if="isLoginIn">中</span>
                                <span v-if="isLoginIn" class="login-loading">
                                    <span>
                                        <i v-for="(_, index) in loginLoading" :key="index">. </i>
                                    </span>
                                </span>
                            </el-button>
                        </el-form>
                        <div class="login-tips">
                            <p>系统登录及其他问题请联系：</p>
                            <p>邮箱：ngoc.support@migu.cn</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="login-footer">
                Copyright © 2018 咪咕TSG成都研发事业部
            </div>
        </div>
        <div class="customer_service-icon">
            <a class="customer_service" @click="isActive = !isActive">
                <i class="icon-kefu"></i>
            </a>
        </div>
        <div v-if="isActive" class="customer_service-container">
            <p class="login-customer_service_title">微信客服</p>
            <div class="bnefit-box">
                <p>问题反馈群</p>
            </div>
            <div class="phone-service">
                <p>反馈邮箱</p>
                <p>ngoc.support@migu.cn</p>
            </div>
        </div>
        <img id="loadImgBg" :x-src="bgImgInterval" src="" height="0" width="0">
        <img id="loadImgBg2" :x-src="bgImg2" src="" height="0" width="0">
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import utils from '../utils/misc'
import cookies from '../utils/cookies'
import MessageMixins from '~/mixins/messages'
import { ROLE_CONST_VALUE } from '~/constants/systemRoleConst'
import storageSession from '~/utils/storage'
export default {
    name: 'LoginStart',
    mixins: [MessageMixins],
    data () {
        return {
            title: '', // 中间图片区域显示的标题，暂没用
            flag: '', // 中间图片区域显示的副标题，暂没用
            userForm: { // 登录输入内容
                username: '',
                password: '',
                verify: '',
                num: 1
            },
            isActive: false, // 客服二维码 是否显示
            styleObject: { // 中间图片区域默认显示背景图片，ie兼容
                background: ' url(' + require('../layouts/images/login_bg1.png') + ') no-repeat ',
                backgroundSize: '100% 100%'
            },
            showUserTipInfo: false, // 登录用户名或密码错误，显示错误提示
            showVerifyTipInfo: false, // 登录验证码错误，显示错误提示
            srcUrl: '', // 验证码图片，base64格式
            isCapitalKeyOpen: false, // 输入密码框 大小写锁定 判断
            isDisableClick: true, // 登录按钮只能按一次，
            isLoginIn: false,
            loginLoading: [],
            interval: null,
            bgImg1: require('../layouts/images/login_bg1.png'),
            bgImgInterval: require('../layouts/images/login_center_bg1.png'),
            bgImg2: require('../layouts/images/login_bg2.png'),
            totalToDoCount: 0,
            totalMyCreateCount: 0
        }
    },
    computed: {
        ...mapState({
            isSuperAdmin: ({ root }) => root.isSuperAdmin
        })
    },
    mounted () {
        this.title = 'NGOC销售管理系统'
        this.flag = '每一门生意，都要用心经营'
        this.changPin()
        this.checkLoginMes()
        this.userForm.num = storageSession.getDefaultStorage().get('num') ? Number(storageSession.getDefaultStorage().get('num')) : 1
        if (this.userForm.num >= 3) {
            this.changPin()
        }
        setTimeout(() => {
            let node = document.getElementById('loginCenter')
            node && node.classList.add('animate')
        }, 10000)
        setTimeout(() => {
            let Bg = document.getElementById('loadImgBg')
            Bg.attributes[0].value = Bg.attributes[1].value
            let Bg2 = document.getElementById('loadImgBg2')
            Bg2.attributes[0].value = Bg2.attributes[1].value
        }, 1500)

        this.queryToDoCountAction().then(resp => {
            resp && resp.forEach(one => {
                this.totalToDoCount += one.count
            })
        })
        this.queryCountCreatedByMe().then(resp => {
            resp && resp.forEach(one => {
                this.totalMyCreateCount += one.count
            })
        })
    },
    methods: {
        ...mapActions(['showPageLoading', 'hidePageLoading', 'login', 'getLoginImage', 'getUserEntityList',
            'changeCurrentUserId', 'changeCurrentUserRole', 'queryToDoCountAction', 'queryCountCreatedByMe']),
        onLogin () {
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
        doLogin () {
            this.isDisableClick = true
            this.showUserTipInfo = false
            this.showVerifyTipInfo = false
            this.showPageLoading()
            this.isLoginIn = true
            this.loadingCricle()
            let pss = utils.rsaEncrypt(this.userForm.password)
            this.login({
                username: this.userForm.username,
                password: pss,
                captchaCode: this.userForm.verify,
                num: this.userForm.num
            }).then(resp => {
                if (resp && resp.sessionId && resp.groupId) {
                    storageSession.getDefaultStorage().put('tabCaches', '[]')
                    storageSession.getDefaultStorage().put('userName', resp.uname)
                    storageSession.getDefaultStorage().put('userId', resp.uid)
                    storageSession.getDefaultStorage().put('groupId', resp.groupId)
                    storageSession.getDefaultStorage().put('ng', resp.sessionId)
                    storageSession.getDefaultStorage().put('entityId', resp.groupId)
                    storageSession.getDefaultStorage().put('entityName', resp.groupName)
                    storageSession.getDefaultStorage().put('mold', resp.mold)
                    storageSession.getDefaultStorage().put('bizSignList', resp.bizSignList)
                    cookies.setCookie('ng', resp.sessionId, 1)
                    storageSession.getDefaultStorage().remove('num')
                    this.getEntity(resp.uid, resp.groupId)
                } else if (!resp.groupId) {
                    this.showError('没有操作权限，请联系系统管理员！')
                    this.hidePageLoading()
                } else {
                    this.showError('登录失败，请重新登录！')
                    this.hidePageLoading()
                }
            }).catch(e => {
                this.userForm.num++
                storageSession.getDefaultStorage().put('num', this.userForm.num)
                this.isLoginIn = false
                clearInterval(this.interval)
                this.loginLoading = []
                this.changPin()
                this.userForm.verify = ''
                this.isDisableClick = true
                this.checkLoginMes()
                if (e.code === 1204) {
                    this.showVerifyTipInfo = true
                } else if (e.code === 1000 || e.code === 1015 || e.code === 1005) {
                    this.showUserTipInfo = true
                }
                this.hidePageLoading()
            })
        },
        // 通过用户id 获取用户所有的 业务实体
        getEntity (userId, userGroupId) {
            if (userId) {
                this.changeCurrentUserId(userId)
                this.getUserEntityList({ uid: userId }).then(resp => {
                    if (resp && resp.result && resp.result.length > 0) {
                        let item = resp.result.find(one => +one.userGroupId === +userGroupId)
                        if (item && item.roleId) {
                            this.changeCurrentUserRole(item.roleType)
                            storageSession.getDefaultStorage().put('roleType', item.roleType)
                            storageSession.getDefaultStorage().put('roleId', item.roleId)
                            this.shiftTabPage(item.roleType)
                        } else {
                            this.showError('用户业务实体信息不一致!')
                            this.clearLoginInput()
                            this.$route.query.next ? this.redirectToPreviousPage() : this.$router.push('/index/Home')
                        }
                    } else {
                        this.showError('暂无业务实体，或业务实体信息有误!')
                        this.clearLoginInput()
                    }
                }).catch(e => {
                    console.log(e)
                })
            } else {
                this.showError('登录成功，但返回的用户信息有误!')
                this.clearLoginInput()
            }
            this.hidePageLoading()
            this.isLoginIn = false
            this.isDisableClick = false
            clearInterval(this.interval)
        },
        // 登录成功后 根据角色和条件 跳转到不同页面
        shiftTabPage (roleType) {
            if (this.$route.query.next) {
                this.redirectToPreviousPage()
                return
            }
            if (ROLE_CONST_VALUE.SUPER_ADMIN === roleType) { // 超级管理员进行系统设置页面
                this.$router.push('/system/entity')
            } else {
                if (this.totalToDoCount) { // 有待办事项，进入待办事项
                    this.$router.push('/workflows/toDoMatter')
                } else if (this.totalMyCreateCount) { // 没有待办事项，有由我创建，进入由我创建
                    this.$router.push('/workflows/myCreated')
                } else { // 没有待办事项和由我创建，进入统计页面
                    this.$router.push('/index/Home')
                }
            }
        },
        // 登录中 动画
        loadingCricle () {
            let _this = this
            this.interval = setInterval(function () {
                _this.loginLoading.length === 3 ? _this.loginLoading = [] : _this.loginLoading.push(1)
            }, 300)
        },
        // 更新验证码图片
        changPin () {
            this.getLoginImage({ dataType: { responseType: 'blob' } }).then(res => {
                let url = this.arrayBufferToBase64(res.data)
                storageSession.getDefaultStorage().put('ng', res.headers.sessionid)
                this.srcUrl = `data:image/jpeg;base64,${url}`
            }).catch(e => {
            })
        },
        // 返回二进制图片转换成base64格式
        arrayBufferToBase64 (buffer) {
            let binary = ''
            let bytes = new Uint8Array(buffer)
            let len = bytes.byteLength
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i])
            }
            return window.btoa(binary)
        },
        // 清空登录输入
        clearLoginInput () {
            this.userForm.username = ''
            this.userForm.password = ''
            this.userForm.verify = ''
        },
        // 判断大写锁定
        capitalKey () {
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
        checkCapitalKey () {
            let e = window.event
            if (e.keyCode === 20) { // 大写锁定键按下
                this.isCapitalKeyOpen = !this.isCapitalKeyOpen
            }
            this.checkLoginMes()
        },
        // 登录按钮是否可点击判断
        checkLoginMes () {
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
        redirectToPreviousPage () {
            let { next } = this.$route.query
            if (next) {
                window.location.href = decodeURIComponent(next)
            }
        }
    }
}
</script>

<style lang="scss">
.login-container {
  background-color: #fff;
  box-sizing: border-box;
  height: 100%;
  .login-container-box {
    height: 100%;
  }
  .customer_service-icon {
    position: absolute;
    height: 70px;
    padding-right: 60px;
    width: auto;
    top: 0px;
    z-index: 998;
    right: 0px;
    display: flex;
    align-items: center;
    .customer_service {
      width: 28px;
      height: 28px;
      i {
        font-size: 28px;
        color: #333333;
      }
    }
  }
  .login-header {
    height: 70px;
    width: 100%;
    display: flex;
    div {
      display: flex;
      padding-left: 60px;
      padding-right: 61px;
      align-items: center;
      #login_icon {
        width: 91px;
        height: 32px;
        background: url("../layouts/images/login_icon.png");
        background-size: 100% 100%;
      }
    }
  }

  @keyframes lunbo_bg {
    0% {
      background: url("../layouts/images/login_bg1.png") no-repeat;
      background-size: 100% 100%;
    }
    40% {
      background: url("../layouts/images/login_bg1.png") no-repeat;
      background-size: 100% 100%;
    }
    50% {
      background: url("../layouts/images/login_center_bg1.png") no-repeat;
      background-size: 100% 100%;
    }
    60% {
      background: url("../layouts/images/login_bg2.png") no-repeat;
      background-size: 100% 100%;
    }
    100% {
      background: url("../layouts/images/login_bg2.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .animate {
    animation: lunbo_bg 4s infinite alternate;
    background-size: 100% 100%;
  }
  .login-center {
    position: relative;
    width: 100%;
    height: calc(100% - 150px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .login-left-container {
      position: absolute;
      width: auto;
      height: 83%;
      left: 11%;
      img {
        width: auto;
        height: 100%;
      }
    }

    .login-box {
      margin-right: 120px;
      height: 432px;
      width: 350px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      background-color: #ffffff;
      padding: 28px 30px 30px;
      text-align: left;
      .title {
        font-size: 18px;
        color: #000;
        line-height: 20px;
      }
      .tips {
        font-size: 14px;
        color: #666;
        padding-top: 10px;
      }
      .show-error {
        color: #d0021b;
        line-height: 28px;
        height: 26px;
        font-size: 12px;
        width: 100%;
      }
      .login_form {
        .el-form-item {
          margin-bottom: 20px;
          .el-input {
            height: 40px;
            font-size: 12px;
            input {
              color: #666666;
              &:focus {
                border-color: #3b8cff;
              }
              border-radius: 2px;
            }
            input:-webkit-autofill {
              box-shadow: 0 0 0px 1000px white inset;
              -webkit-text-fill-color: #666666;
            }
          }
          .verify-code {
            .el-input__suffix .el-input__suffix-inner {
              display: inline-block;
              height: 32px;
              vertical-align: middle;
            }
          }
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
        .el-button {
          width: 290px;
          text-align: center;
          font-size: 14px;
          color: #ffffff;
          background: #3b8cff;
          border-radius: 2px;
          border: none;
          &.disabled {
            opacity: 0.5;
            background-color: #666;
          }
        }
      }
      .login-tips {
        padding-top: 20px;
        p {
          font-size: 12px;
          color: #999999;
          line-height: 12px;
        }
        p:nth-child(1) {
          padding: 20px 0px 12px;
          border-top: 1px solid #f3f3f3;
        }
      }
    }
  }
  .login-footer {
    height: 80px;
    line-height: 80px;
    font-size: 12px;
    color: #999999;
    text-align: center;
  }
  .customer_service-container {
    background: #ffffff;
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.1);
    width: 260px;
    height: 265px;
    padding: 24px 20px;
    position: absolute;
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
  .login-loading {
    display: inline-block;
    width: 19px;
    height: 14px;
    overflow: hidden;
    text-align: left;
  }
}
</style>
