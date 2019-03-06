/**
 * Created by issuser on 2018/4/4.
 */
import * as C from '../../constants/api'
const state = {
    skuList: [],
    skuDetail: [],
    salesOrder: null
}
const mutations = {
    [C.SKU_LIST](state, {
        payload
    }) {
        state.skuList = payload.data
    },
    [C.SKU_DETAIL](state, {
        payload
    }) {
        state.skuDetail = payload.data
    },
    [C.SAVE_PURCHASE_ORDER](state, {
        payload
    }) {},
    [C.CREATE_PURCHASE_ORDER](state, {
        payload
    }) {},
    [C.SAVE_PURCHASE_ORDERS](state, {
        payload
    }) {},
    [C.APPROVE_PURCHASE_ORDER](state, {
        payload
    }) {},
    SALE_TO_PURCHASE(state, payload) {
        state.salesOrder = payload
    }
}
export default {
    state,
    mutations
}
