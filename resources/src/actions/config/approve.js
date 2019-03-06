import * as C from '../../constants/api'
import Api, {createAction} from '../../utils/api'
export default {
    // 审批设置模块
    // 查看审批设置[1.5.0]
    queryApproveConfig: createAction(C.QUERY_APPROVE_CONFIG, Api.queryApproveConfig),
    // 保存审批设置[1.5.0]
    saveApproveConfig: createAction(C.SAVE_APPROVE_CONFIG, Api.saveApproveConfig),
    // 审批详情[1.5.0]
    queryApproveDetail: createAction(C.QUERY_APPROVE_DETAIL, Api.queryApproveDetail),
    // [V1.5.0]领导审批工单
    processApprove: createAction(C.PROCESS_APPROVE, Api.processApprove),
    // [V1.5.0]取消审批工单
    cancelApprove: createAction(C.CANCEL_APPROVE, Api.cancelApprove)
}
