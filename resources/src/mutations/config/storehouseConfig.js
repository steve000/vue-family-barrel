import * as C from '../../constants/api'

const state = {
    storehouseList: {}
}

const mutations = {
    [C.GET_STOREHOUSE_LIST](state, {
        payload
    }) {
        state.storehouseList = payload
    },
    [C.QUERY_ALL_STOREHOUSE_LIST](state, {
        payload
    }) {

    },
    [C.CHANGE_STOREHOUSE_STATUS](state, {
        payload
    }) {

    },
    [C.QUERY_STOREHOUSE_BY_ID](state, {
        payload
    }) {

    },
    [C.CREATE_STOREHOUSE](state, {
        payload
    }) {

    },
    [C.CHECK_EXT_STOREHOUSE](state, {
        payload
    }) {

    },
    [C.MODIFY_STOREHOUSE_LINK](state, {
        payload
    }) {

    },
    [C.DELETE_STOREHOUSE_LINK](state, {
        payload
    }) {

    },
    [C.MODIFY_STOREHOUSE](state, {
        payload
    }) {

    },
    [C.ADD_STOREHOUSE_LINK](state, {
        payload
    }) {

    },
    [C.QUERY_STOREHOUSE_MENU](state, {
        payload
    }) {

    },
    [C.QUERY_STOREHOUSE_MENU_LIST](state, {
        payload
    }) {

    }
}

export default {
    state,
    mutations
}
