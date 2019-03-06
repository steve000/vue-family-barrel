import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 分页获取出库单列表
    queryStockOutSheet: createAction(C.QUERY_STOCKOUTSHEET, Api.queryStockOutSheet),
    // 创建出库单
    createStockOutSheet: createAction(C.CREATE_STOREHOUSE, Api.createStockOutSheet),
    // 确认单次调拨出库
    allotOutCheck: createAction(C.ALLOT_CHECK, Api.allotOutCheck),
    // 获取出库单详情，出库调拨，调拨单
    queryStockOutSheetDetail: createAction(C.QUERY_STOCKOUTSHEETDETAIL, Api.queryStockOutSheetDetail),
    // 查询出库单商品的串码信息
    queryOutsnList: createAction(C.QUERY_OUTSN_LIST, Api.queryOutsnList),
    // 撤销出库单
    cancelStockOutSheet: createAction(C.STOCKOUTSHEET_CANCEL, Api.cancelStockOutSheet),
    // 查看出库单的物流单详情
    getOutboundRouterList: createAction(C.QUERTY_OUTBOUND_ROUTER_LIST, Api.getOutboundRouterList),
    // 重新入库【入库超时后调用】
    outboundRetry: createAction(C.STOCKOUT_RETRY, Api.outboundRetry),
    // 导出
    exportOutbound: createAction(C.EXPORT_OUTBOUND, Api.exportOutbound),
    // 调拨出库根据关联单号跳转至销售
    diaoboRelationId: createAction(C.DIAOBO_RELATEDSHEETID, Api.diaoboRelationId),
    // 获取物流信息
    queryLocalExpress: createAction(C.QUERY_LOCAL_EXPRESSINFO, Api.queryLocalExpress),
    // [v1.5.0]出库状态统计
    stockoutStatusList: createAction(C.STOCKOUT_STATUSLIST, Api.stockoutStatusList),
    // [v1.5.0]取消单次出库
    cancelOutApprove: createAction(C.STOCKOUT_STATUSLIST, Api.cancelOutApprove),
    // [v1.5.0]出库状态统计
    stockoutEditLog: createAction(C.STOCKOUT_EDIT_LOG, Api.stockoutEditLog)
}
