import * as C from '../../constants/api'

const state = {
    transferList: {},

    transferDetail: {},
    transferLogQuery: {},
    createTransferAll: {}

}

const mutations = {
    [C.GET_ALL_TRANSFER_LIST](state, {
        payload
    }) {

    },
    [C.GET_STATE_STATISTIC](state, {
        payload
    }) {

    },
    [C.QUIT_ALLOT_SHEET](state, {
        payload
    }) {

    },
    [C.GET_TRANSFER_LIST](state, {
        payload
    }) {
        state.transferList = payload
    },
    [C.DELETE_TRANSFER](state, {
        payload
    }) {

    },
    [C.VIEW_TRANSFER](state, {
        payload
    }) {
        state.transferDetail = payload
    },
    [C.CREATE_TRANSFER](state, {
        payload
    }) {

    },
    [C.TRANSFET_LOG_QUERY](state, {
        payload
    }) {

    },
    [C.CREATE_TRANSFER_ALL](state, {
        payload
    }) {

    }

}

export default {
    state,
    mutations
}
