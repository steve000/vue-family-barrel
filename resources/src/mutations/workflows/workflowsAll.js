import * as C from '../../constants/api'

const state = {}

const mutations = {
    /* 待办事项  */
    // 待审批
    // 采购订单审批列表
    [C.QUERY_TODO_PURCHASE_ORDER_LIST](state, {
        payload
    }) {},
    // 销售订单审批列表
    [C.QUERY_TODO_SALE_ORDER_LIST](state, {
        payload
    }) {},
    // 商品审批
    [C.QUERY_TODO_GOODS_LIST](state, {
        payload
    }) {},
    // 入库单审批列表
    [C.QUERY_TODO_STOCKIN_ORDER_LIST](state, {
        payload
    }) {},
    // 出库单审批列表
    [C.QUERY_TODO_STOCKOUT_ORDER_LIST](state, {
        payload
    }) {},
    // 待审批数量统计接口
    [C.QUERY_TODO_APPROVE_COUNT](state, {
        payload
    }) {},
    // 待入库
    // 待入库的订单数量接口
    [C.QUERY_TODO_STOCKIN_COUNT](state, {
        payload
    }) {},
    // 待出库
    // 待出库的订单数量统计
    [C.QUERY_TODO_STOCKOUT_COUNT](state, {
        payload
    }) {},

    // 待办事项订单数量统计接口
    [C.QUERY_TODO_COUNT](state, {
        payload
    }) {},

    // 我已审批
    // 我已审批的采购订单列表
    [C.QUERY_APPROVEBUME_PURCHASE_ORDER](state, {
        payload
    }) {},
    // 我已审批的销售订单列表
    [C.QUERY_APPROVEBUME_SALE_ORDER](state, {
        payload
    }) {},
    // 我已审批的入库单列表
    [C.QUERY_APPROVEBUME_STOCKIN_ORDER](state, {
        payload
    }) {},
    // 我已审批的出库单列表
    [C.QUERY_APPROVEBUME_STOCKOUT_ORDER](state, {
        payload
    }) {},
    // 我已审批的各类单据数量统计接口
    [C.QUERY_APPROVEBUME_COUNT](state, {
        payload
    }) {},

    // 由我创建
    // 统一的由我创建列表数量统计接口
    [C.QUERY_COUNT_CREATED_BY_ME](state, {
        payload
    }) {},
    // 查询由我创建的采购订单
    [C.QUERY_PURCHASE_LIST_BY_ME](state, {
        payload
    }) {},
    // 查询由我创建的销售订单
    [C.QUERY_SALELIST_BY_ME](state, {
        payload
    }) {},
    // 查询由我创建的换货
    [C.QUERY_EXCHANGE_LIST_BY_ME](state, {
        payload
    }) {},
    // 查询由我创建的退货
    [C.QUERY_RETURN_LIST_BY_ME](state, {
        payload
    }) {},
    // 查询由我创建的入库
    [C.QUERY_INSTORE_LIST_BY_ME](state, {
        payload
    }) {},
    // 查询由我创建的出库
    [C.QUERY_OUTSTORE_LIST_BY_ME](state, {
        payload
    }) {},

    // 查询上一个审批人接口
    [C.QUERY_LAST_APPROVE_USER](state, {
        payload
    }) {},

    // 查询某用户审批过的单据ID列表接口
    [C.QUERY_ORDER_LIST_APPROVEBYME](state, {
        payload
    }) {},

    // 查询审批意见
    [C.QUERY_APPROVE_COMMENT](state, {
        payload
    }) {}
}

export default {
    state,
    mutations
}
