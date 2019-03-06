/**
 * Created by issuser on 2018/4/4.
 */
import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 分页获取采购订单列表
    queryPurchaseOrderList: createAction(C.QUERY_PURCHASE_ORDER_LIST, Api.queryPurchaseOrderList),
    // 删除采购订单
    deletePurchaseOrder: createAction(C.DELETE_PURCHASE_ORDER, Api.deletePurchaseOrder),
    // 修改时间
    updatePurchaseOrderArrivedTime: createAction(C.UPDATE_MODIFYARRIVEDTIME, Api.updatePurchaseOrderArrivedTime),
    // 修改备注
    updatePurchaseOrderComment: createAction(C.UPDATE_MODIFYCOMMENT, Api.updatePurchaseOrderComment),
    // 导出采购订单
    exportPurchaseOrder: createAction(C.EXPORT_PURCHASE_ORDER, Api.exportPurchaseOrder),
    // 取消采购订单
    cancelPurchaseOrder: createAction(C.CANCEL_PURCHASEORDER, Api.cancelPurchaseOrder),
    // 采购订单批量入库
    PurchaseBatchStockIn: createAction(C.PURCHASE_BATCH_STOCK_IN, Api.PurchaseBatchStockIn),
    // 获取采购订单状态的数据条数
    QueryCountStatusNum: createAction(C.QUERY_COUNT_STATUS_NUM, Api.QueryCountStatusNum),
    // 查询业务关联附件列表
    PurchaseAttachList: createAction(C.PURCHASE_ATTACH_LIST, Api.PurchaseAttachList)
}
