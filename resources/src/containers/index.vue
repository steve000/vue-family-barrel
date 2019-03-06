<template>
    <div class="page-content-wrapper">
        <div class="page-header">
            <header>
                <div class="logo">
                    <div class="logo-img"></div>
                </div>

                <el-menu key="menu1" :default-active="activeIndex" router background-color="#2f2f2f" text-color="#fff" class="nav-menu" mode="horizontal">
                    <template>
                        <el-menu-item index="/index/Home">统计</el-menu-item>
                    </template>

                    <div style="position: absolute; right: 0px;outline: none;">
                        <div class="avatar fs14">
                            <span style="opacity: 0.8">部门:</span>
                            <template v-if="userEntityList && userEntityList.length > 1">
                                <el-select v-model="curEntityId" :title="curEntityName" placeholder="请选择业务实体" size="small" class="entity-select" @change="changeEntity">
                                    <el-option v-for="item in userEntityList" :key="item.userGroupId" :title="item.groupName" :value="+item.userGroupId" :label="item.groupName"></el-option>
                                </el-select>
                            </template>
                            <template v-if="userEntityList && userEntityList.length === 1">
                                <span :title="userEntityList[0].groupName" class="single-entity row-show">{{ userEntityList[0].groupName }}</span>
                            </template>
                            <span class="separation"> | </span>
                        </div>

                        <el-submenu index="/user-operate" class="reset-submenu">
                            <template slot="title">
                                <i class="iconren icon-ren"></i>
                                <div class="row-show mr10" style="display: inline-block;max-width: 100px;">
                                    {{ currentUser }}
                                </div>
                            </template>
                            <!--
                            <el-menu-item index="/notification/Index">操作记录</el-menu-item>
                            -->
                            <el-menu-item v-if="!isSuperAdmin" index="">
                                <!-- 1 开启， 2 关闭 邮件审批  -->
                                <div @click="setIsSendEmail">{{ +isSendEmail === 1 ? '关闭邮件审批' : '开启邮件审批' }}</div>
                            </el-menu-item>
                            <el-menu-item v-if="userType == 0" index="">
                                <div @click="editPasswordDialogVisible = true">修改密码</div>
                            </el-menu-item>
                            <el-menu-item index="">
                                <div @click="onLogout">退出</div>
                            </el-menu-item>
                        </el-submenu>
                    </div>
                </el-menu>
                <!--
                <div class="message">
                    <div class="message-num-box" @click="$router.push('/notification/Index')">
                        <el-badge :value="notReadCount&&notReadCount.count" class="item">
                            <i class='iconfont1 icon-xiaoxi'></i>
                        </el-badge>
                        消息
                    </div>
                </div>
                -->
            </header>
            <router-tab refs="routerTab"></router-tab>
        </div>

        <div class="page-content">
            <keep-alive :include="cachedRoutes">
                <router-view></router-view>
            </keep-alive>
        </div>
        <change-password :dialog-visible="editPasswordDialogVisible" @closeDialog="editPasswordDialogVisible = false" @onLogout="onLogout"></change-password>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RouterTab from '../components/RouterTab'
import cookies from '../utils/cookies'
import MessageMixins from '../mixins/messages'
import ChangePassword from '../components/ChangePassword'
import storage from '../utils/storage'
import { ROLE_CONST_VALUE } from '~/constants/systemRoleConst'
import Api from '~/utils/api'
import utils from '../utils/misc'

const isSameUserEntity = params => {
    const cache = storage.getDefaultStorage()
    const { uId: userId, userGroupId: entityId } = params
    const currentUserId = cache.get('userId') || ''
    const currentEntityId = cache.get('entityId') || ''
    // 检测邮件审批用户和当前登入用户信息完全一致
    return userId === currentUserId && entityId === currentEntityId
}
export default {
    name: 'MainIndex',
    components: {
        RouterTab,
        ChangePassword
    },
    mixins: [MessageMixins],
    data () {
        return {
            curEntityId: '', // 当前业务实体id
            curEntityName: '', // 当前业务实体name
            editPasswordDialogVisible: false,
            userType: 1, // 用户类型，1是oa用户，0是NGOC用户
            totalToDoCount: 0, // 待办事项数量统计
            totalMyCreateCount: 0, // 由我创建数量统计
            isSendEmail: 1,
            roleType: '',
            userEntityList: '',
            curEntityInf: '', // 当前业务实体信息，包含业务实体和用户角色等信息
            storageData: '', // 存放token获取登录信息 返回的数据
            timer: ''
        }
    },
    computed: {
        ...mapState({
            currentUser: ({ root }) => root.currentUser,
            tabCaches: ({ root }) => root.tabCaches,
            notReadCount: ({ notification }) => notification.notReadCount,
            isSuperAdmin: ({ root }) => root.isSuperAdmin || '',
            isAdmin: ({ root }) => root.isAdmin,
            isStockAdmin: ({ root }) => root.isStockAdmin,
            isNormalUser: ({ root }) => root.isNormalUser
        }),
        activeIndex () {
            const path = this.$route.path
            const routesMapping = {
                '/goods/list': '/goods/list', // 商品
                '/goods/view': '/goods/list', // 商品
                '/goods/group': '/goods/group', // 组合商品
                '/purchase': '/purchase/purchaseorder', // 采购
                '/sales/order': '/sales/order', // 销售订单
                '/sales/import/salesOrders': '/sales/order', // 销售订单
                '/sales/check/salesOrder': '/sales/order', // 销售订单
                '/sales/return': '/sales/return', // 销售退货
                '/sales/change': '/sales/change', // 销售换货
                '/sales/proxy': '/sales/proxy', // 代发销售
                '/stock/storage': '/stock/storage', // 入库模块
                '/stock/outbound': '/stock/outbound', // 出库模块
                '/stock/CreateOutbound': '/stock/outbound',
                '/stock/ViewOutbound': '/stock/outbound',
                '/stock/OutboundPageDetail': '/stock/outbound',
                '/stock/SetOutboundPage': '/stock/outbound',
                '/stock/transfer': '/stock/transfer', // 调拨模块
                '/stock/management': '/stock/management', // 库存管理模块
                '/contract': '/contract', // 合同
                '/config/storehouse': '/config/storehouse', // 仓库模块
                '/config/supplier': '/config/supplier', // 供应商管理模块
                '/config/client': '/config/client', // 客户设置
                '/config/channel': '/config/channel/management', // 客户设置
                // '/config/commodity': '/config/commodity', // 商品设置
                '/workflows/toDoMatter': '/workflows/toDoMatter', // 待办事项
                '/system/approve': '/system/approve', // 超级管理员系统审批设置
                '/config/approve': '/config/approve', // 管理员审批设置
                '/system/entity': '/system/entity', // 系统设置
                '/system/goods': '/system/goods', // 超级管理员商品审批
                '/workflows/myCreated': '/workflows/myCreated' // 待办事项
            }
            for (let key in routesMapping) {
                if (path.indexOf(key) === 0) {
                    return routesMapping[key]
                }
            }
            return path
        },
        cachedRoutes () {
            return this.tabCaches.map(item => item.name)
        }
    },
    created () {
        !this.$route.query.token && this.loadEntity()
    },
    beforeRouteEnter(to, from, next) {
        if (to.query.token) {
            const { token, uId: userId, userGroupId: entityId } = to.query
            const cache = storage.getDefaultStorage()
            cache.remove('tabCachesReload')
            const isSameUser = isSameUserEntity(to.query)
            Api.loginByToken({ token: `${token},${userId},${entityId}` }).then(resp => {
                // token有效逻辑  设置session 5小时过期
                cookies.setCookie('nng', 'nng', 5)
                cache.put('entityId', resp.groupId)
                cache.put('groupId', resp.groupId)
                // 审批用户是当前用户 设置当前业务实体为
                if (isSameUser) {
                    next(vm => {
                        vm.loadEntity()
                    })
                } else { // 审批用户不是当前用户
                    next(vm => {
                        vm.$store.commit({ type: 'CLEAR_ALL_DATA' })
                        vm.clearAllData('router')
                        vm.storageData = resp
                        vm.doStorageData()
                        vm.userType = resp.mold
                        vm.curEntityId = +resp.groupId
                        vm.curEntityName = resp.groupName
                        vm.getEntity()
                    })
                }
            }).catch(() => {
                // token失效逻辑
                if (isSameUser) {
                    next(vm => {
                        vm.loadEntity()
                    })
                } else {
                    next(utils.redirectToLoginPage('email'))
                }
            })
        } else {
            next()
        }
    },

    mounted () {
        // 如果是通过邮件链接跳转过来，去掉token，不执行检查用户或业务实体变化
        if (/token=(.*?)/.test(location.href)) {
            // location.hash = location.hash.replace(/(?:token=.*?)&/, '')
            return
        }
        // 轮训检测用户实体和用户的ID是否发生变化，解决用户打开新标签页后切换用户实体，导致两个标签页的数据不同步的问题
        let userIdEntityId = ''
        const storageInstance = storage.getDefaultStorage()
        clearTimeout(storageInstance.get('timer'))
        const checkUserAndEntityChanged = () => {
            const tmpUserIdEntityId = storageInstance.get('checkUser') || ''
            // 初次赋值
            if (!userIdEntityId) {
                userIdEntityId = tmpUserIdEntityId
            }
            if (userIdEntityId !== tmpUserIdEntityId && !!tmpUserIdEntityId) {
                if (this.isChangingEntity) {
                    userIdEntityId = tmpUserIdEntityId
                    this.isChangingEntity = false
                } else {
                    sessionStorage.setItem('checkUser', tmpUserIdEntityId)
                    sessionStorage.setItem('oldCheckUser', userIdEntityId)
                    console.log(userIdEntityId, tmpUserIdEntityId)
                    this.$confirm('检测到登录用户或实体信息发生变化', '提示', {
                        confirmButtonText: '知道了',
                        showCancelButton: false,
                        showClose: false,
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: 'warning'
                    }).then(() => {
                        this.$store.commit({ type: 'CLEAR_ALL_DATA' })
                        // utils.redirectToLoginPage()
                        this.$router.push(utils.setPath('/login'))
                    }).catch(() => {
                    })
                    return
                }
            }
            this.timer = setTimeout(() => {
                checkUserAndEntityChanged()
            }, 2000)
            storageInstance.put('timer', this.timer)
        }
        checkUserAndEntityChanged()
    },

    methods: {
        ...mapActions([
            'changeCurrentUser',
            'changeCurrentUserId',
            'changeCurrentUserRole',
            'getUserEntityList',
            'changeCurrentEntity',
            'changeCurrentEntityId',
            'queryMessageNotRead',
            'logout',
            'clearTabCache',
            'showPageLoading',
            'hidePageLoading',
            'queryToDoCountAction',
            'queryCountCreatedByMe',
            'switchGroup',
            'queryIsSendEmail',
            'sendEmailConfig'
        ]),
        // 初次加载或刷新页面，先从缓存里加载业务实体信息 填充本页面，在从后台加载业务实体信息
        loadEntity () {
            const storageInstance = storage.getDefaultStorage()
            this.userType = storageInstance.get('mold')
            this.curEntityId = storageInstance.get('entityId')
            this.curEntityName = storageInstance.get('entityName')
            this.getEntity()
        },

        // 登出
        onLogout () {
            this.$router.push(utils.setPath('/login'))
            clearTimeout(this.timer)
            this.clearAllData()
            this.logout()
            cookies.delCookie('nng')
        },
        // 通过用户id 获取用户所有的 业务实体
        getEntity () {
            const userId = storage.getDefaultStorage().get('userId')
            if (userId) {
                this.getUserEntityList({ uid: userId }).then(res => {
                    if (res && res.result && res.result.length > 0) {
                        this.changeCurrentUserId(userId)
                        const userName = storage.getDefaultStorage().get('userName')
                        this.changeCurrentUser(userName)
                        this.userEntityList = res.result
                        this.setCurEntity()
                    } else {
                        this.showError('业务实体返回错误!')
                        utils.redirectToLoginPage()
                    }
                }).catch(() => {
                    utils.redirectToLoginPage()
                })
            } else {
                this.onLogout()
            }
        },
        // 设置当前的业务实体，如果缓存里的业务实体在业务实体列表里存在，则为当前业务实体，否则设业务实体列表里第一条为当前业务实体
        setCurEntity () {
            if (!this.userEntityList || this.userEntityList.length === 0) {
                this.onLogout()
                return
            }
            const entityId = storage.getDefaultStorage().get('entityId')
            if (entityId) {
                let res = this.userEntityList.filter(one => {
                    return `${one.userGroupId}` === `${entityId}`
                })
                if (res && res[0]) {
                    this.curEntityInf = res[0]
                    this.setEntityStorage()
                } else {
                    this.curEntityInf = this.userEntityList[0]
                    this.setEntityStorage()
                }
            } else {
                this.curEntityInf = this.userEntityList[0]
                this.setEntityStorage()
            }
            this.queryEmailApproveState()
        },
        // 切换业务实体，先访问后台进行判断能否切换
        changeEntity (userGroupId) {
            // 通知后台切换业务实体
            this.switchGroup({ userGroupId }).then(res => {
                if (res && res.userGroupId) {
                    // 切换业务实体标识
                    this.isChangingEntity = true
                    this.doChangeEntity(userGroupId)
                    this.totalToDoCount = 0
                    this.totalMyCreateCount = 0
                } else {
                    this.curEntityId = storage.getDefaultStorage().get('entityId')
                    this.showError('切换业务实体失败')
                }
            }).catch(e => {
                this.curEntityId = storage.getDefaultStorage().get('entityId')
                this.showError('切换业务实体失败 ', e)
            })
        },
        // 前台切换业务实体操作
        doChangeEntity (userGroupId) {
            for (let i = 0; i < this.userEntityList.length; i++) {
                let one = this.userEntityList[i]
                if (`${one.userGroupId}` === `${userGroupId}`) {
                    this.curEntityInf = one
                    this.setEntityStorage()
                    this.shiftTabPage()
                    this.queryEmailApproveState()
                    break
                }
            }
        },
        // 存储当前业务实体
        setEntityStorage () {
            const storageInstance = storage.getDefaultStorage()
            const userId = storageInstance.get('userId')
            storageInstance.put('checkUser', `${userId}` + `${this.curEntityInf.userGroupId}`)
            storageInstance.put('entityId', this.curEntityInf.userGroupId)
            storageInstance.put('groupId', this.curEntityInf.userGroupId)
            storageInstance.put('entityName', this.curEntityInf.groupName)
            storageInstance.put('roleType', this.curEntityInf.roleType)
            storageInstance.put('roleId', this.curEntityInf.roleId)
            this.changeCurrentEntityId(this.curEntityInf.userGroupId)
            this.changeCurrentEntity(this.curEntityInf.groupName)
            this.changeCurrentUserRole(this.curEntityInf.roleType)
            this.curEntityId = this.curEntityInf.userGroupId
            this.curEntityName = this.curEntityInf.groupName
            this.roleType = this.curEntityInf.roleType
        },
        // 切换业务实体后 关闭所有打开页签 根据角色和条件 跳转不同页面
        async shiftTabPage () {
            this.showPageLoading()
            this.closeAllTabPages()
            await this.getWorkflowDataCount()
            if (this.isSuperAdmin) { // 超级管理员进行系统设置页面
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
            this.hidePageLoading()
            // 获取发送邮件审批的状态
            this.queryEmailApproveState()
        },
        // 获取数据，用于切换业务实体后判断打开什么页面
        async getWorkflowDataCount () {
            let roleType = storage.getDefaultStorage().get('roleType')
            let isCommonUser = `${roleType}` === `${ROLE_CONST_VALUE.NORMAL_USER}`
            // 用promise.all 异步调用两个接口
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
        // 存储系统运行需要的数据
        doStorageData () {
            let resp = this.storageData
            const storageInstance = storage.getDefaultStorage()
            storageInstance.put('checkUser', `${resp.uid}` + `${resp.groupId}`)
            storageInstance.put('userName', resp.uname)
            storageInstance.put('userId', resp.uid)
            storageInstance.put('utype', resp.utype)
            storageInstance.put('entityId', resp.groupId)
            storageInstance.put('groupId', resp.groupId)
            storageInstance.put('entityName', resp.groupName)
            storageInstance.put('mold', resp.mold)
            storageInstance.put('bizSignList', resp.bizSignList)
            this.changeCurrentUser(resp.uname)
            this.changeCurrentUserId(resp.uid)
            this.changeCurrentEntity(resp.groupName)
            this.changeCurrentEntityId(resp.groupId)
        },
        // 登出，清空所有缓存数据
        clearAllData (flag = 'logout') {
            if (flag === 'logout') {
                this.$store.commit({ type: 'CLEAR_ALL_DATA' })
            }
            const storageInstance = storage.getDefaultStorage()
            storageInstance.remove('tabCaches')
            storageInstance.remove('tabCachesReload')
            storageInstance.remove('entityId')
            storageInstance.remove('groupId')
            storageInstance.remove('entityName')
            storageInstance.remove('userId')
            storageInstance.remove('userName')
            storageInstance.remove('mold')
            storageInstance.remove('userType')
            storageInstance.remove('utype')
            storageInstance.remove('checkUser')
            storageInstance.remove('roleId')
            storageInstance.remove('roleType')
            storageInstance.remove('bizSignList')
        },
        // 切换业务实体，关闭当下所有页签
        closeAllTabPages () {
            this.$store.commit({ type: 'TAB_CACHE_CLEAR' })
            const storageInstance = storage.getDefaultStorage()
            storageInstance.put('tabCaches', '[]')
            storageInstance.put('tabCachesReload', '[]')
            this.$router.push('/tmp')
        },
        // 查询未读消息
        getNotReadMessage () {
            this.queryMessageNotRead().then(res => { })
        },
        // 获取当前邮件审批状态
        queryEmailApproveState () {
            // 当前用户角色不是 超级管理员 才调用接口
            if (this.roleType !== ROLE_CONST_VALUE.SUPER_ADMIN) {
                this.queryIsSendEmail().then(res => {
                    this.isSendEmail = +res.isSendEmail
                })
            }
        },
        // 设置邮件审批
        setIsSendEmail () {
            // 1、2间转换  乘2余3 得到下一个状态
            this.isSendEmail = (2 * +this.isSendEmail) % 3
            this.sendEmailConfig({ isSendEmail: this.isSendEmail }).then(res => {
                this.queryEmailApproveState()
            })
        }
    }
}
</script>

<style lang='scss'>
.page-header {
  position: absolute;
  top: 0;
  z-index: 99;
  min-width: 100%;
  header {
    height: 60px;
    background-color: #2f2f2f;
    position: relative;
    .logo {
      height: 100%;
      width: 160px;
      overflow: hidden;
      display: inline-block;
      text-align: center;
      .logo-img {
        position: relative;
        top: 13px;
        margin-left: 20px;
        width: 69px;
        height: 33px;
        overflow: hidden;
        background: transparent url("../layouts/images/new_logo_title.png")
          center center no-repeat;
        background-size: contain;
      }
    }

    .el-menu {
      display: inline-block;
      border-bottom: none;
      position: static;
      vertical-align: top;
      .el-submenu .el-submenu__title {
        padding: 0px;
        font-size: 14px;
        background-color: #2f2f2f !important;
        height: 60px;
        line-height: 60px;
        i {
          color: inherit;
        }
      }
      li {
        padding: 0px;
        margin: 0 19px;
        font-size: 14px;
      }
      // 鼠标悬停样式
      .el-menu-item:hover {
        color: #333;
        background-color: #2f2f2f !important;
      }
      // 页面激活标题样式
      .el-menu-item.is-active,
      .el-submenu.is-active .el-submenu__title {
        border-bottom: 2px solid #3b8cff;
        color: #3b8cff;
        height: 46px;
        padding: 0;
        font-size: 14px;
        background-color: inherit;
      }
    }
    // 部门或业务实体
    .avatar {
      display: inline-block;
      padding-left: 35px;
      .entity-select {
        width: 126px;
        margin-right: 3px;
        text-overflow: ellipsis;
        * {
          background-color: #2f2f2f;
          border-color: #2f2f2f;
          line-height: inherit;
          color: #fff;
        }
        .el-input.is-focus .el-input__inner {
          border-color: #2f2f2f;
        }
        .el-input__inner {
          padding: 0 5px;
          color: #fff;
        }
      }
      .single-entity {
        max-width: 142px;
        text-align: left;
        margin-right: 10px;
        margin-left: 3px;
        display: inline-block;
        color: #fff;
        vertical-align: middle;
        font-size: 14px;
      }
      .separation {
        display: inline-block;
        margin-right: 15px;
      }
      .iconren {
        margin-top: 1px;
        margin-right: 1px;
        font-size: 14px;
        color: #fff;
      }
      span {
        text-align: center;
        color: #fff;
        line-height: 60px;
      }
    }
    // 用户
    .reset-submenu.el-submenu {
      float: right;
      margin: 0 20px 0 0;
      &.is-active .el-submenu__title {
        border-bottom: none !important;
        color: #fff !important;
      }
      .el-submenu__title {
        .el-submenu__icon-arrow {
          position: static;
          margin-top: 0px;
        }
      }
    }

    /*消息*/
    .message {
      position: absolute;
      top: 0;
      right: 265px;
      padding-left: 35px;
      color: #fff;
      line-height: 60px;
      cursor: pointer;
      .message-num-box {
        height: 34px;
        margin-top: 14px;
        line-height: 34px;
        font-size: 14px;
        .item {
          margin-right: 8px;
        }
        .icon-xiaoxi {
          font-size: 20px;
        }
      }
    }
  }
}

.page-content {
  width: 100%;
  position: absolute;
  background: #e9eef1;
  top: 97px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}

// 下拉框样式
.el-menu--horizontal {
  .el-menu.el-menu--popup {
    background-color: #fff !important;
    min-width: 120px;
    .el-menu-item {
      background-color: #fff !important;
      width: 120px;
      color: #666 !important;
      font-size: 12px;
      &.is-active {
        color: #333 !important;
        background-color: #f6fafe !important;
      }
      &:hover {
        color: #333 !important;
        background-color: #f6fafe !important;
      }
    }
  }
}
</style>
