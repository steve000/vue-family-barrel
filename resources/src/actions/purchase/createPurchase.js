/**
 * Created by issuser on 2018/4/4.
 */
import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 查询全部sku列表
    querySkuList: createAction(C.SKU_LIST, Api.querySkuList),
    // 根据skuId查询sku详情
    querySkuDetail: createAction(C.SKU_DETAIL, Api.querySkuDetail),
    // 修改采购订单
    editPurchaseOrder: createAction(C.SAVE_PURCHASE_ORDER, Api.editPurchaseOrder),
    // 创建采购订单
    createProcureOrder: createAction(C.CREATE_PURCHASE_ORDER, Api.createProcureOrder),
    // 新增或修改采购订单
    savePurchaseOrder: createAction(C.SAVE_PURCHASE_ORDERS, Api.savePurchaseOrder),
    // 提交采购订单审批
    approvePurchaseOrder: createAction(C.APPROVE_PURCHASE_ORDER, Api.approvePurchaseOrder)
}
