import * as C from '../constants/api'
import Api, {
    createAction
} from '../utils/api'

export default {
    // 查询用户列表
    queryUserLists: createAction(C.USER_LIST, Api.queryUserList),
    // 新增用户
    addUser: createAction(C.USER_ADDED, Api.addUser)
}
