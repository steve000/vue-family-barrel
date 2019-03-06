import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 库存调拨模块
    // 查看调拨仓库列表[1.4.0]
    getAllTransferList: createAction(C.GET_ALL_TRANSFER_LIST, Api.getAllTransferList),
    // 调拨状态统计[1.4.0]
    getStateStatistic: createAction(C.GET_STATE_STATISTIC, Api.getStateStatistic),
    // 取消调拨
    quitAllotSheet: createAction(C.QUIT_ALLOT_SHEET, Api.quitAllotSheet),
    // 获取仓库调拨列表
    getTransferList: createAction(C.GET_TRANSFER_LIST, Api.getTransferList),
    // 删除调拨记录
    deleteTransfer: createAction(C.DELETE_TRANSFER, Api.deleteTransfer),
    // 新增调拨单
    createTransfer: createAction(C.CREATE_TRANSFER, Api.createTransfer),
    // 查看调拨单
    viewTransfer: createAction(C.VIEW_TRANSFER, Api.viewTransfer),
    // [V1.4.0]根据调拨单ID查看详情操作日志
    transferLogQuery: createAction(C.TRANSFET_LOG_QUERY, Api.transferLogQuery),
    // [v1.4.0]新增调拨申请单
    createTransferAll: createAction(C.CREATE_TRANSFER_ALL, Api.createTransferAll)

}
