/**
 * Created by issuser on 2018/4/4.
 */
import * as C from '../../constants/api'
const state = {
    returnList: {},
    queryRefusedOrderDetails: {},
    queryReturnProListByOrderDetail: {}
}
const getters = {
    checkRToErrorStatus: state => () => state.checkRToErrorStatus
}
const mutations = {
    [C.RETURN_LIST](state, {
        payload
    }) {
        // state.returnList = payload ? payload : {};
    },
    [C.QUERY_REFUND_DETAIL](state, {
        payload
    }) {
        state.queryRefusedOrderDetails = payload || {}
    },
    [C.QUERY_RETURN_PROLIST_ORDER_ID](state, {
        payload
    }) {
        state.queryReturnProListByOrderDetail = payload || {}
    },
    [C.POST_RETURN_STATUS_UPDATE](state, {
        payload
    }) {

    },
    [C.QUERY_SALES_CHANGE_LIST](state, {
        payload
    }) {

    },
    // 退货订单不同状态的数量
    [C.QUERY_RETURN_ORDER_COUNT](state, {
        payload
    }) {

    },
    // 编辑退货单
    [C.UPADTE_RETURN_ORDER](state, {
        payload
    }) {

    },
    // 退货订单扭转
    [C.POST_RETURN_PUSH](state, {
        payload
    }) {

    },
    // 异常订单状态传递
    CHECKRETURNLIST_TO_SALESRETURN_ERRORSTATUS(state, payload) {
        state.checkRToErrorStatus = payload
    }
}
export default {
    state,
    mutations,
    getters
}
