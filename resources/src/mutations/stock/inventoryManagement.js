import * as C from '../../constants/api'

const state = {
    queryStockProductList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },
    StockManageLeftNave: {

    },
    queryStockIdList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },
    queryPandianList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },
    queryPandianIdDetailList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },
    queryProductInventoryLisy: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },
    queryProductDistribution: {
        result: {}
    },
    queryDistributionProductList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },
    QueryStockSnList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    }
}

const mutations = {
    [C.STOCK_MANAGE_LEFT_NAVE](state, {
        payload
    }) {},
    [C.QUERY_STOCK_SN_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.QueryStockSnList.pageNo = pageNo
        state.QueryStockSnList.pageSize = pageSize
        state.QueryStockSnList.total = total
        state.QueryStockSnList.result = result
    },
    [C.SYNCHRO_LOGISTICS](state, {
        payload
    }) {
        state.SynchroLogistics = payload
    },
    [C.QUERY_PRODUCT_INVENTORY_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.queryProductInventoryLisy.pageNo = pageNo
        state.queryProductInventoryLisy.pageSize = pageSize
        state.queryProductInventoryLisy.total = total
        state.queryProductInventoryLisy.result = result
    },
    [C.QUERY_PRODUCT_DISTRIBUTION](state, {
        payload
    }) {
        const {
            result
        } = payload
        state.queryProductDistribution.result = result
    },
    [C.QUERY_DISTRIBUTION_PRODUCT_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.queryDistributionProductList.pageNo = pageNo
        state.queryDistributionProductList.pageSize = pageSize
        state.queryDistributionProductList.total = total
        state.queryDistributionProductList.result = result
    },

    [C.QUERY_STOCK_PRODUCT_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.queryStockProductList.pageNo = pageNo
        state.queryStockProductList.pageSize = pageSize
        state.queryStockProductList.total = total
        state.queryStockProductList.result = result
    },
    [C.QUERY_STOCKID_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.queryStockIdList.pageNo = pageNo
        state.queryStockIdList.pageSize = pageSize
        state.queryStockIdList.total = total
        state.queryStockIdList.result = result
    },
    [C.QUERY_PANDIAN_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.queryPandianList.pageNo = pageNo
        state.queryPandianList.pageSize = pageSize
        state.queryPandianList.total = total
        state.queryPandianList.result = result
    },
    [C.QUERY_PANDIANID_DETAIL_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.queryPandianIdDetailList.pageNo = pageNo
        state.queryPandianIdDetailList.pageSize = pageSize
        state.queryPandianIdDetailList.total = total
        state.queryPandianIdDetailList.result = result
    },
    [C.UPDATA_PANDIAN](state, {
        payload
    }) {
        state.updataPandian = payload
    },
    [C.GET_UNINVENTORY_NUM](state, {
        payload
    }) {
        state.getUninventoryNum = payload
    },
    [C.FINSH_PANDIAN](state, {
        payload
    }) {
        state.finshPandian = payload
    },
    [C.QUERY_PRODUCT_SEARCH](state, {
        payload
    }) {
        state.searchProductStock = payload
    },
    [C.QUERY_PRODUCT_EFFECTIVESTOCK](state, {
        payload
    }) {
        state.searchProductEffectiveStock = payload
    },
    [C.STOCK_INVENTORY_EXPORT](state, {
        payload
    }) {}
}

export default {
    state,
    mutations
}
