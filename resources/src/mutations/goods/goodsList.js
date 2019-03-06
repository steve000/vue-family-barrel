import * as C from '../../constants/api'

const state = {
    list: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },

    newList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },

    oneList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },
    entityProductList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        data: []
    },
    virtualSkuList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        data: []
    },
    GoodsManageExport: {}
}

const mutations = {
    [C.GOODS_MANAGE_EXPORT](state, {
        payload
    }) {},
    [C.QUERY_SKU_LIST_BY_CONDITION_PRODUCT](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            data
        } = payload
        state.entityProductList.pageNo = pageNo
        state.entityProductList.pageSize = pageSize
        state.entityProductList.total = total
        state.entityProductList.data = data
    },
    [C.VIRTUAL_SKU_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            data
        } = payload
        state.virtualSkuList.pageNo = pageNo
        state.virtualSkuList.pageSize = pageSize
        state.virtualSkuList.total = total
        state.virtualSkuList.data = data
    },
    [C.GOODS_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.list.pageNo = pageNo
        state.list.pageSize = pageSize
        state.list.total = total
        state.list.result = result
    },

    [C.GOODS_LIST_NEW](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.list.pageNo = pageNo
        state.list.pageSize = pageSize
        state.list.total = total
        state.list.result = result
    },

    [C.ONE_GOODS_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.oneList.pageNo = pageNo
        state.oneList.pageSize = pageSize
        state.oneList.total = total
        state.oneList.result = result
    },

    [C.GOODS_LIST_SKU](state, {
        payload
    }) {

    },
    [C.PRODUCT_APPROVE_QUERY](state, {
        payload
    }) {},
    [C.SET_GOODS_SHELVES](state, {
        payload
    }) {},
    [C.GOODS_SHELVES_LIST](state, {
        payload
    }) {}
}

export default {
    state,
    mutations
}
