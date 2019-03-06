import * as AC from '../constants/actions'
import * as C from '../constants/api'
import {
    ROLE_CONST_VALUE
} from '../constants/systemRoleConst'
import storageSession from '~/utils/storage'
const state = {
    pageLoading: false,
    pageLoadingText: '',
    currentUser: '',
    currentUserId: '',
    tabCaches: [],
    userEntityList: [],
    currentEntity: '',
    currentEntityId: '',
    currentUserRole: '',

    isSuperAdmin: false, // 是否超级管理员
    isAdmin: false, // 是否管理员
    isStockAdmin: false, // 是否仓库管理员
    isNormalUser: false // 是否普通用户
}

const mutations = {
    [C.USER_LOGIN](state, {
        payload
    }) {

    },
    [C.USER_LOGOUT](state, {
        payload
    }) {

    },
    [C.EDIT_PASSWORD](state, {
        payload
    }) {

    },
    [C.GET_LOGIN_IMAGE](state, {
        payload
    }) {

    },
    [AC.SHOW_PAGE_LOADING](state, {payload}) {
        state.pageLoading = true
        state.pageLoadingText = typeof (payload) === 'object' ? payload.text : ''
    },
    [AC.HIDE_PAGE_LOADING](state) {
        // state.pageLoading = false
        // setTimeout(() => {
        state.pageLoading = false
        // }, 1000)
    },

    [AC.CHANGE_CURRENT_USER](state, {
        payload
    }) {
        state.currentUser = payload
    },
    [AC.CHANGE_CURRENT_USER_ID](state, {
        payload
    }) {
        state.currentUserId = payload
    },
    [AC.CHANGE_CURRENT_USER_ROLE](state, {
        payload
    }) {
        state.currentUserRole = payload
        state.isStockAdmin = +payload === +ROLE_CONST_VALUE.STOCK_ADMIN
        state.isSuperAdmin = +payload === +ROLE_CONST_VALUE.SUPER_ADMIN
        state.isAdmin = +payload === +ROLE_CONST_VALUE.ADMIN
        state.isNormalUser = +payload === +ROLE_CONST_VALUE.NORMAL_USER
    },
    [AC.TAB_CACHE_ADDED](state, {
        payload
    }) {
        const tabCaches = state.tabCaches
        const isExists = tabCaches.some(cache => {
            return cache.name === payload.name && cache.path === payload.path
        })
        if (isExists) {
            for (let i = 0; i < state.tabCaches.length; i++) {
                if (state.tabCaches[i].name === payload.name && state.tabCaches[i].path === payload.path) {
                    state.tabCaches[i].vm = payload.vm
                }
            }
        }!isExists && state.tabCaches.push(payload)
        let newTabCaches = []
        for (let i = 0; i < tabCaches.length; i++) {
            let tab = tabCaches[i]
            let item = Object.assign({}, tab)
            item.vm = ''
            newTabCaches.push(item)
        }
        let tabCachesString = JSON.stringify(newTabCaches)
        storageSession.getDefaultStorage().put('tabCaches', tabCachesString)
    },
    [AC.TAB_CACHE_REMOVED](state, {
        payload
    }) {
        state.tabCaches.splice(payload, 1)
        let tabCaches = state.tabCaches
        let newTabCaches = []
        for (let i = 0; i < tabCaches.length; i++) {
            let tab = tabCaches[i]
            let item = Object.assign({}, tab)
            item.vm = ''
            newTabCaches.push(item)
        }
        let tabCachesString = JSON.stringify(newTabCaches)
        storageSession.getDefaultStorage().put('tabCaches', tabCachesString)
    },

    [AC.TAB_CACHE_CLEAR](state, {
        payload
    }) {
        state.tabCaches.splice(0, state.tabCaches.length)
    },
    [C.GET_USER_ENTITY_LIST](state, {
        payload
    }) {
        state.userEntityList = payload.result
    },

    [AC.CHANGE_CURRENT_ENTITY](state, {
        payload
    }) {
        state.currentEntity = payload
    },

    [AC.CHANGE_CURRENT_ENTITY_ID](state, {
        payload
    }) {
        state.currentEntityId = payload
    },
    [C.SWITCH_GROUP](state, {
        payload
    }) {

    },
    [C.IS_SEND_EMAIL](state, {
        payload
    }) {

    },
    [C.QUERY_IS_SEND_EMAIL](state, {
        payload
    }) {

    },
    [AC.CLEAR_ALL_DATA](state, {payload}) {
        state.pageLoading = false
        state.currentUser = ''
        state.currentUserId = ''
        state.tabCaches = []
        state.userEntityList = []
        state.currentEntity = ''
        state.currentEntityId = ''
        state.currentUserRole = ''
        state.isSuperAdmin = false // 是否超级管理员
        state.isAdmin = false // 是否管理员
        state.isStockAdmin = false // 是否仓库管理员
        state.isNormalUser = false // 是否普通用户
    }
}
export default {
    state,
    mutations
}
