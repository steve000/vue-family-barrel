/**
 * Created by issuser on 2018/4/4.
 */
import * as C from '../../constants/api'
const state = {
    salesList: [],
    basePage: {
        totalCount: 0
    },
    createOrderList: [],
    CompletionAddressInserious: [],
    CompletionAddressInfor: [],
    CompletionAddressInforStatus: ''
}
const getters = {
    importSalesOrderStatus: state => state.importSalesOrderStatus
}
const mutations = {
    [C.UPDATE_SALES_ORDER](state, {
        payload
    }) {

    },
    [C.UPDATE_MODIFYARRIVEDTIME](state, {
        payload
    }) {

    },
    [C.UPDATE_MODIFYCOMMENT](state, {
        payload
    }) {

    },
    [C.GET_ORDER_RETURN](state, {
        payload
    }) {

    },
    [C.QUERY_SALE_ORDER_WITHID](state, {
        payload
    }) {

    },
    [C.QUERY_ORDER_ATTR](state, {
        payload
    }) {

    },
    [C.QUERY_SALES_CHANGE_LIST](state, {
        payload
    }) {

    },
    [C.QUERY_SALE_ORDER](state, {
        payload
    }) {

    },
    [C.QUERY_SALE_MENUORDERNUM](state, {
        payload
    }) {

    },
    [C.QUERY_SALES_ORDER_LIST](state, {
        payload
    }) {

    },
    [C.QUERY_CHANNEL_ADDRESSBYID](state, {
        payload
    }) {

    },
    [C.UPDATE_CHANNEL_ADDRESS](state, {
        payload
    }) {

    },
    [C.CREATE_CHANNEL_ADDRESS](state, {
        payload
    }) {

    },
    [C.UPDATE_CHANNEL_ADDRESSSTATUS](state, {
        payload
    }) {

    },
    [C.UPDATE_CHANNEL_DEFALUTADDRESS](state, {
        payload
    }) {

    },
    [C.QUERY_CHANNEL_BYSEARCH](state, {
        payload
    }) {

    },
    [C.QUERY_SALES_GOODSLIST](state, {
        payload
    }) {

    },
    [C.UPDATE_SALES_ORDER](state, {
        payload
    }) {

    },
    [C.CREATE_SALES_ORDER_ORDERADD](state, {
        payload
    }) {

    },
    [C.QUERY_SALES_CHANGE_LIST](state, {
        payload
    }) {

    },
    [C.QUERY_SALES_OUTSTORELIST](state, {
        payload
    }) {

    },
    [C.EDIT_ORDER_STATUS](state, {
        payload
    }) {

    },
    [C.QUERY_SALES_ORDER_LIST](state, {
        payload
    }) {

    },
    [C.QUERTY_CHANNEL_TEMPLATE](state, {
        payload
    }) {

    },
    [C.QUERTY_ROUTER_LIST](state, {
        payload
    }) {

    },
    [C.UPDATE_ORDER_ADDRESS](state, {
        payload
    }) {

    },
    [C.UPDATA_SALES_ERROEREFUSE](state, {
        payload
    }) {

    },
    [C.EXPORT_SALES_ORDER](state, {
        payload
    }) {

    },
    [C.QUERY_PUSH_STATUS](state, {
        payload
    }) {

    },
    [C.PUSH_SALEORDER](state, {
        payload
    }) {

    },
    [C.ADDRESS_RESOLVE](state, {
        payload
    }) {

    },
    [C.QUERY_SOURCECHANNEL_LIST](state, {
        payload
    }) {

    },
    IMPORT_SALES_ORDER_SUCESS(state, payload) {
        state.importSalesOrderStatus = payload
    },
    CREATE_SALE_ORDERID(state, payload) {
        state.createOrderList = payload
    },
    COMPLETION_ADDRESS_INFOR(state, payload) {
        state.CompletionAddressInfor = payload
    },
    COMPLETION_ADDRESS_INFOR_SERIOUS(state, payload) {
        state.CompletionAddressInserious = payload
    },
    COMPLETION_ADDRESS_INFOR_STATUS(state, payload) {
        state.CompletionAddressInforStatus = payload
    }
}
export default {
    state,
    getters,
    mutations
}
