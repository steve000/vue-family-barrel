import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 查询业务关联附件列表
    queryModuleAttrList: createAction(C.QUERY_MODULE_ATTRLIST, Api.queryModuleAttrList),
    // 删除业务关联附件列表
    deleteModuleAttrList: createAction(C.DELETE_MODULE_ATTRLIST, Api.DELETE_MODULE_ATTRLIST)
}
