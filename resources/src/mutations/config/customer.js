/**
 * Created by issuser on 2018/8/1.
 */
import * as C from '../../constants/api'
const state = {}
const mutations = {
    [C.QUERY_CUSTOMER_LIST](state, {
        payload
    }) {

    },
    [C.QUERY_CUSTOMER_DETAIL](state, {
        payload
    }) {},
    [C.CREATE_CUSTOMER](state, {
        payload
    }) {

    },
    [C.UPDATE_CUSTOMER](state, {
        payload
    }) {},
    [C.DELETE_CUSTOMER](state, {
        payload
    }) {},
    [C.SET_CUSTOMER_ADDRESS_DEFAULT](state, {
        payload
    }) {

    },
    [C.DELETE_CUSTOMER_ADDRESS](state, {
        payload
    }) {},
    [C.ADD_CUSTOMER_ADDRESS](state, {
        payload
    }) {},
    [C.UPDATE_CUSTOMER_ADDRESS](state, {
        payload
    }) {},
    [C.QUERY_COUSTOMER_REPEAT](state, {
        payload
    }) {}
}
export default {
    state,
    mutations
}
