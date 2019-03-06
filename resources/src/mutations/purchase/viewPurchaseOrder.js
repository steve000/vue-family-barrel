import * as C from '../../constants/api'

const state = {
    queryPurchaseDetails: {},
    queryPurchaseLog: {},
    queryPurchaseIdModify: {},
    querySinglePutstorage: {},
    queryPurchaseApproveLog: {}

}
const mutations = {
    [C.QUERY_PURCHASE_APPROVE_LOG](state, {
        payload
    }) {
        state.queryPurchaseApproveLog = payload
    },
    [C.QUERY_PURCHASE_DETAILS](state, {
        payload
    }) {
        state.queryPurchaseDetails = payload
    },
    [C.QUERY_PURCHASE_LOG](state, {
        payload
    }) {
        state.queryPurchaseLog = payload
    },
    [C.QUERY_PURCHASE_ID_MODIFY](state, {
        payload
    }) {
        state.queryPurchaseIdModify = payload
    },
    [C.QUERY_SINGLE_PUTSTORAGE](state, {
        payload
    }) {
        state.querySinglePutstorage = payload
    }
}

export default {
    state,
    mutations
}
