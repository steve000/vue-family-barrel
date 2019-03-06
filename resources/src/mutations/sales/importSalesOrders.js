import * as C from '../../constants/api'
const state = {
    uploadOrdersResult: '',
    importOrdersDataQueryResult: '',
    dataConfirmImport: [],
    resultDownload: []
}
const mutations = {
    [C.IMPORT_SALES_ORDERS](state, {
        payload
    }) {
        state.uploadOrdersResult = payload.data
    },
    [C.IMPORT_ORDERS_DATA_QUERY](state, {
        payload
    }) {
        state.importOrdersDataQueryResult = payload.data
    },
    [C.GET_DATA_CONFIRM_IMPORT](state, {
        payload
    }) {
        state.dataConfirmImport = payload.data
    },
    [C.GET_RESULT_DOWNLOAD](state, {
        payload
    }) {
        state.resultDownload = payload.data
    },
    // 取消导入订单
    [C.DO_CANCEL_IMPORT](state, {
        payload
    }) {
    },
    // 刷新导入结果数据
    [C.DO_REFRESH_IMPORT_DATA](state, {
        payload
    }) {
    },
    // 查询补全/地址严重缺失地址信息订单
    [C.QUERY_ERROR_TYPE_INFO](state, {
        payload
    }) {
    },
    [C.DO_UPDATE_ADDRESS_SIGN](state, {
        payload
    }) {
    }
}
export default {
    state,
    mutations
}
