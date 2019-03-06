/**
 * Created by issuser on 2018/4/4.
 */
import * as C from '../../constants/api'
const state = {
    changeList: {},
    changeStatus: null,
    queryRefundGoodsDetail: [],
    validChangeId: null
}
const mutations = {
    [C.QEURY_CHANGE_LIST](state, {
        payload
    }) {
        state.changeList = payload || {}
    },
    [C.EDIT_CHANGE_STATUS](state, {
        payload
    }) {
        state.changeStatus = payload || {}
    },

    [C.QUERY_FEFUND_GOODS](state, {
        payload
    }) {
        state.queryRefundGoodsDetail = payload || {}
    },

    [C.QUERY_CHANGE_DETAIL](state, {
        payload
    }) {

    },
    [C.QUERY_CHANGE_LIST](state, {
        payload
    }) {

    },
    [C.CREATE_CHANGE_ORDER](state, {
        payload
    }) {

    },
    [C.EDIT_CHANGE_ORDER](state, {
        payload
    }) {

    },
    [C.EDIT_CHANGE_ADDRESS](state, {
        payload
    }) {

    },
    [C.UPDATE_CHANGE_REMARK](state, {
        payload
    }) {

    },
    [C.QUERY_SALE_ORDER_WITH_COUNT](state, {
        payload
    }) {

    },
    [C.QUERY_CHANGE_ORDER_WITH_COUNT](state, {
        payload
    }) {

    },
    [C.QUERY_CHANGE_ORDER_COUNT](state, {
        payload
    }) {

    },
    [C.POST_NEW_REFUSE_ORDER](state, {
        payload
    }) {

    },
    [C.PUSH_CHANGE_ORDER](state, {
        payload
    }) {

    },
    ValidChangeId(state, payload) {
        state.validChangeId = payload
    }
}
export default {
    state,
    mutations
}
