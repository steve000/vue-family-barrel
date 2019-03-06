/**
 * Created by issuser on 2018/4/4.
 */
import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    /* 待办事项  */
    // 待审批
    // 采购订单审批列表
    queryToDoPruchaseOrderListAction: createAction(
        C.QUERY_TODO_PURCHASE_ORDER_LIST,
        Api.queryToDoPruchaseOrderList
    ),
    // 销售订单审批列表
    queryToDoSaleOrderListAction: createAction(
        C.QUERY_TODO_SALE_ORDER_LIST,
        Api.queryToDoSaleOrderList
    ),
    // 商品审批
    queryToDoGoodsList: createAction(
        C.QUERY_TODO_GOODS_LIST,
        Api.queryToDoGoodsList
    ),
    // 入库单审批列表
    queryToDoStockInOrderListAction: createAction(
        C.QUERY_TODO_STOCKIN_ORDER_LIST,
        Api.queryToDoStockInOrderList
    ),
    // 出库单审批列表
    queryToDoStockOutOrderListAction: createAction(
        C.QUERY_TODO_STOCKOUT_ORDER_LIST,
        Api.queryToDoStockOutOrderList
    ),
    // 待审批数量统计接口
    queryToDoApproveCountAction: createAction(
        C.QUERY_TODO_APPROVE_COUNT,
        Api.queryToDoApproveCount
    ),
    // 待入库
    // 待入库的订单数量接口
    queryToDoStockInCountAction: createAction(
        C.QUERY_TODO_STOCKIN_COUNT,
        Api.queryToDoStockInCount
    ),
    // 待出库
    // 待出库的订单数量统计
    queryToDoStockOutCountAction: createAction(
        C.QUERY_TODO_STOCKOUT_COUNT,
        Api.queryToDoStockOutCount
    ),

    // 待办事项订单数量统计接口
    queryToDoCountAction: createAction(C.QUERY_TODO_COUNT, Api.queryToDoCount),

    // 我已审批
    // 我已审批的采购订单列表
    queryApproveByMePurchaseOrderAction: createAction(
        C.QUERY_APPROVEBUME_PURCHASE_ORDER,
        Api.queryApproveByMePurchaseOrder
    ),
    // 我已审批的销售订单列表
    queryApproveByMeSaleOrderAction: createAction(
        C.QUERY_APPROVEBUME_SALE_ORDER,
        Api.queryApproveByMeSaleOrder
    ),
    // 我已审批的入库单列表
    queryApproveByMeStockInOrderAction: createAction(
        C.QUERY_APPROVEBUME_STOCKIN_ORDER,
        Api.queryApproveByMeStockInOrder
    ),
    // 我已审批的出库单列表
    queryApproveByMeStockOutOrderAction: createAction(
        C.QUERY_APPROVEBUME_STOCKOUT_ORDER,
        Api.queryApproveByMeStockOutOrder
    ),
    // 我已审批的各类单据数量统计接口
    queryApproveCountAction: createAction(
        C.QUERY_APPROVEBUME_COUNT,
        Api.queryApproveCount
    ),

    // 由我创建
    // 统一的由我创建列表数量统计接口
    queryCountCreatedByMe: createAction(
        C.QUERY_COUNT_CREATED_BY_ME,
        Api.queryCountCreatedByMe
    ),
    // 查询由我创建的采购订单
    queryPurchaseListByMe: createAction(
        C.QUERY_PURCHASE_LIST_BY_ME,
        Api.queryPurchaseListByMe
    ),
    // 查询由我创建的销售订单
    querySaleListByMe: createAction(
        C.QUERY_SALELIST_BY_ME,
        Api.querySaleListByMe
    ),
    // 查询由我创建的换货
    queryExchangeListByMe: createAction(
        C.QUERY_EXCHANGE_LIST_BY_ME,
        Api.queryExchangeListByMe
    ),
    // 查询由我创建的退货
    queryReturnListByMe: createAction(
        C.QUERY_RETURN_LIST_BY_ME,
        Api.queryReturnListByMe
    ),
    // 查询由我创建的入库
    queryInstoreListByMe: createAction(
        C.QUERY_INSTORE_LIST_BY_ME,
        Api.queryInstoreListByMe
    ),
    // 查询由我创建的出库
    queryOutstoreListByMe: createAction(
        C.QUERY_OUTSTORE_LIST_BY_ME,
        Api.queryOutstoreListByMe
    ),

    // 查询上一个审批人接口
    queryLastApproveUserAction: createAction(
        C.QUERY_LAST_APPROVE_USER,
        Api.queryLastApproveUser
    ),

    // 查询某用户审批过的单据ID列表接口
    queryOrderListApproveByMeAction: createAction(
        C.QUERY_ORDER_LIST_APPROVEBYME,
        Api.queryOrderListApproveByMe
    ),

    // 查询审批意见
    queryApproveCommentAction: createAction(
        C.QUERY_APPROVE_COMMENT,
        Api.queryApproveComment
    )
}
