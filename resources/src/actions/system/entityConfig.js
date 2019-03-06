import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 查询全部类目
    queryConfigGroup: createAction(C.QUERY_USER_GROUP, Api.queryConfigGroup),
    // 分页获取用户列表
    queryEntityUserList: createAction(C.QUERY_ENTITY_USER_LIST, Api.queryEntityUserList),
    // 分页获取所有用户列表
    queryAllEntityUserList: createAction(C.QUERY_ALL_ENTITY_USER_LIST, Api.queryAllEntityUserList),
    // 新增oa用户
    addCreateFromOaUser: createAction(C.ADD_CREATE_FORM_OA_USER, Api.addCreateFromOaUser),
    // 编辑用户
    editEntity: createAction(C.EDIT_ENTITY_USER, Api.editEntity),
    // 添加用户
    addEntity: createAction(C.ADD_ENTITY_USER, Api.addEntity),
    // 解绑用户
    removeEntity: createAction(C.REMOVE_ENTITY_USER, Api.removeEntity),
    // 创建实体
    createEntity: createAction(C.CREATE_ENTITY, Api.createEntity),
    // 查询公司列表
    queryCompanyList: createAction(C.REQURY_COMPANY_LIST, Api.queryCompanyList),
    // 关联用户
    associateUsers: createAction(C.ASSOCIATE_USER, Api.associateUser),
    // 查询oa账号信息
    searchOaCount: createAction(C.SEARCH_OA_COUNT, Api.searchOaCount),
    // 查询业务实体下角色
    queryUserGroupRole: createAction(C.QUERY_USER_GROUP_ROLE, Api.queryUserGroupRole)
}
