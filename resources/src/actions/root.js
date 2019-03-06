import * as AC from '../constants/actions'
import * as C from '../constants/api'
import Api, {
    createAction
} from '../utils/api'

export default {
    // 登录登出
    // 登录
    login: createAction(C.USER_LOGIN, Api.loginin),
    // 登出
    logout: createAction(C.USER_LOGOUT, Api.logout),
    // 修改密码
    editUserPassword: createAction(C.EDIT_PASSWORD, Api.editUserPassword),
    // 验证码
    getLoginImage: createAction(C.GET_LOGIN_IMAGE, Api.getLoginImage),
    // 查询用户下所有业务实体列表
    getUserEntityList: createAction(C.GET_USER_ENTITY_LIST, Api.getUserEntityList),
    changeCurrentEntity: createAction(AC.CHANGE_CURRENT_ENTITY, curEntity => Promise.resolve(curEntity)),
    changeCurrentEntityId: createAction(AC.CHANGE_CURRENT_ENTITY_ID, curEntityId => Promise.resolve(curEntityId)),
    showPageLoading: createAction(AC.SHOW_PAGE_LOADING, params => params),
    hidePageLoading: createAction(AC.HIDE_PAGE_LOADING),
    changeCurrentUser: createAction(AC.CHANGE_CURRENT_USER, user => Promise.resolve(user)),
    changeCurrentUserId: createAction(AC.CHANGE_CURRENT_USER_ID, userId => Promise.resolve(userId)),
    changeCurrentUserRole: createAction(AC.CHANGE_CURRENT_USER_ROLE, userRole => Promise.resolve(userRole)),
    addTabCache: createAction(AC.TAB_CACHE_ADDED, params => Promise.resolve(params)),
    removeTabCache: createAction(AC.TAB_CACHE_REMOVED, params => Promise.resolve(params)),
    clearTabCache: createAction(AC.TAB_CACHE_CLEAR, params => Promise.resolve(params)),
    switchGroup: createAction(C.SWITCH_GROUP, Api.switchGroup),
    sendEmailConfig: createAction(C.IS_SEND_EMAIL, Api.sendEmailConfig),
    queryIsSendEmail: createAction(C.QUERY_IS_SEND_EMAIL, Api.queryIsSendEmail),
    clearAllData: createAction(AC.CLEAR_ALL_DATA, params => Promise.resolve(params))
}
