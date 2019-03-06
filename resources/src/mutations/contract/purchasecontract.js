import * as C from '../../constants/api'

const state = {
    queryContractList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },
    queryEntityContractList: {
        result: []
    },
    EnableEffectiveContract: {},
    QueryPurchaseOrderDetailList: {},
    SavePurchseContract: {},
    SearchGoodsList: {
        result: []
    },
    SearchPurchaseContract: {},
    AddPurchaseContract: {},
    QueryVendorList: {},
    ModifyPurchaseContract: {},
    QueryContractProductList: {},
    ContractSeqPurchaseList: {},
    ParseProductFile: {}
}
const mutations = {
    [C.PARSE_PRODUCT_FILE](state, {
        payload
    }) {
        state.ParseProductFile = payload
    },
    [C.QUERY_CONTRACT_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.queryContractList.pageNo = pageNo
        state.queryContractList.pageSize = pageSize
        state.queryContractList.total = total
        state.queryContractList.result = result
    },
    [C.QUERY_ENTITY_CONTRACT_LIST](state, {
        payload
    }) {
        const {
            result
        } = payload
        state.queryEntityContractList.result = result
    },
    [C.ENABLE_EFFECTIVE_CONTRACT](state, {
        payload
    }) {
        state.EnableEffectiveContract = payload
    },
    [C.QUERY_PURCHASE_ORDER_DETAILS_LIST](state, {
        payload
    }) {
        state.QueryPurchaseOrderDetailList = payload
    },
    [C.SAVE_PURCHASE_CONTRACT](state, {
        payload
    }) {
        state.SavePurchseContract = payload
    },
    [C.SEARCH_GOODS_LIST](state, {
        payload
    }) {
        const {
            result
        } = payload
        state.SearchGoodsList.result = result
    },
    [C.SEARCH_PURCHASE_CONTRACT](state, {
        payload
    }) {
        state.SearchPurchaseContract = payload
    },
    [C.ADD_PURCHASE_CONTRACT](state, {
        payload
    }) {
        state.AddPurchaseContract = payload
    },
    [C.QUERY_VENDOR_LIST](state, {
        payload
    }) {
        state.QueryVendorList = payload
    },
    [C.MODIFY_PURCHASE_CONTRACT](state, {
        payload
    }) {
        state.ModifyPurchaseContract = payload
    },
    [C.QUERY_CONTRACT_PRODUCT_LIST](state, {
        payload
    }) {
        state.QueryContractProductList = payload
    },
    [C.CONTRACT_SEQ_PURCHASE_LIST](state, {
        payload
    }) {
        state.ContractSeqPurchaseList = payload
    },
    [C.CONTRACT_PURCHASE_SKU_LIST](state, {
        payload
    }) {}
}

export default {
    state,
    mutations
}
