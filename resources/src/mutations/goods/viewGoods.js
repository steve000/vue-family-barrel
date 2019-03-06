import * as C from '../../constants/api'

const state = {
    queryGoodsInfoModify: {
        brandCnName: '',
        brandId: '',
        firtCateId: '',
        secondCateId: '',
        thirdCateId: '',
        productId: '',
        productName: '',
        productInfo: '',
        productDetails: ''
    },
    allBrandsList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        list: []
    },
    cateList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    },
    virtualSkuDetails: {},
    unitList: [],
    goodsAttr: {},
    logDetail: null
}

const mutations = {
    [C.VIRTUAL_SKU_DETAILS](state, {
        payload
    }) {
        state.virtualSkuDetails = payload
    },
    [C.QUERY_GOODS_INFO_MODIFY](state, {
        payload
    }) {
        const {
            brandCnName,
            brandId,
            firtCateId,
            secondCateId,
            thirdCateId,
            productId,
            productName,
            productInfo,
            productDetails
        } = payload
        state.queryGoodsInfoModify.brandCnName = brandCnName
        state.queryGoodsInfoModify.brandId = brandId
        state.queryGoodsInfoModify.firtCateId = firtCateId
        state.queryGoodsInfoModify.secondCateId = secondCateId
        state.queryGoodsInfoModify.thirdCateId = thirdCateId
        state.queryGoodsInfoModify.productId = productId
        state.queryGoodsInfoModify.productName = productName
        state.queryGoodsInfoModify.productInfo = productInfo
        state.queryGoodsInfoModify.productDetails = productDetails
    },
    [C.QUERY_ALL_BRANDS](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            list
        } = payload
        state.allBrandsList.pageNo = pageNo
        state.allBrandsList.pageSize = pageSize
        state.allBrandsList.total = total
        state.allBrandsList.list = list
    },
    [C.ADD_BRANDS](state, {
        payload
    }) {},
    [C.QUERY_CATE](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            pageSize,
            result
        } = payload
        state.cateList.pageNo = pageNo
        state.cateList.pageSize = pageSize
        state.cateList.total = total
        state.cateList.result = result
    },
    [C.GOODS_CREATE](state, {
        payload
    }) {},
    [C.QUERY_GOODS_UNIT](state, {
        payload
    }) {
        state.unitList = payload
    },
    [C.QUERY_GOODS_ATTR](state, {
        payload
    }) {
        state.goodsAttr = payload
    },
    [C.QUERY_GOODS_LOG](state, {
        payload
    }) {},
    [C.QUERY_GOODS_EDIT_DETAILLOG](state, {
        payload
    }) {
        state.logDetail = payload || {}
    }
}

export default {
    state,
    mutations
}
