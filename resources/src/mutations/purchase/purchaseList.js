/**
 * Created by issuser on 2018/4/4.
 */
import * as C from '../../constants/api'
const state = {
    purchaseList: [],
    basePage: {
        totalCount: 0
    },
    PurchaseBatchStockIn: {},
    QueryCountStatusNum: {},
    PurchaseAttachList: []
}
const mutations = {
    [C.PURCHASE_ATTACH_LIST](state, {
        payload
    }) {

    },
    [C.QUERY_COUNT_STATUS_NUM](state, {
        payload
    }) {

    },
    [C.PURCHASE_BATCH_STOCK_IN](state, {
        payload
    }) {

    },
    [C.QUERY_PURCHASE_ORDER_LIST](state, {
        payload
    }) {
        state.purchaseList = payload && payload.orderList
        // && payload.orderList.map((item)=>{
        //     item.planArrivalTime=item.planArrivalTime.split(" ")[0];
        //     return item
        // });
        state.basePage.totalCount = payload.total
    },
    [C.DELETE_PURCHASE_ORDER](state, {
        payload
    }) {

    },
    // [C.UPDATE_PURCHASE_ORDER](state, { payload }) {
    //
    // },
    [C.UPDATE_MODIFYARRIVEDTIME](state, {
        payload
    }) {

    },
    [C.UPDATE_MODIFYCOMMENT](state, {
        payload
    }) {

    },
    [C.EXPORT_PURCHASE_ORDER](state, {
        payload
    }) {

    },
    [C.CANCEL_PURCHASEORDER](state, {
        payload
    }) {

    }

}
export default {
    state,
    mutations
}
