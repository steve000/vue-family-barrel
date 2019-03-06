import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 组合商品列表
    queryMergeList: createAction(C.QUERY_MERGE_LIST, Api.queryMergeList),
    // 新增组合商品
    createMerge: createAction(C.CREATE_MERGE, Api.createMerge),
    // 编辑组合商品
    editMerge: createAction(C.EDIT_MERGE, Api.editMerge),
    // 删除组合商品
    deleteMerge: createAction(C.DELETE_MERGE, Api.deleteMerge),
    // 组合商品详情
    mergeDetail: createAction(C.MERGE_DETAIL, Api.mergeDetail)
}
