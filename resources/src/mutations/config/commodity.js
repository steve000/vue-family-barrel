import * as C from '../../constants/api'
const state = {
    commodity: {
        commodityListRelation: {
            commodityList: [],
            totalCount: 0
        },
        commodityListUnRelation: {
            commodityList: [],
            totalCount: 0
        }
    }
}
const mutations = {
    [C.QUERY_USER_RELATION_PRODUCT](state, {
        payload
    }) {
        state.commodity.commodityListRelation.commodityList = payload.result
        state.commodity.commodityListRelation.totalCount = payload.total
    },
    [C.CHANGE_DOWM_USER_RELARION_PRODUCT](state, {
        payload
    }) {},
    [C.QUERY_USER_UNRELATION_PRODUCT](state, {
        payload
    }) {
        state.commodity.commodityListUnRelation.commodityList = payload.result
        state.commodity.commodityListUnRelation.totalCount = payload.total
    },
    [C.USER_RELATION_PRODUCT](state, {
        payload
    }) {},
    [C.UPDATE_RELATION_INFO](state, {
        payload
    }) {

    },
    [C.EXPORT_USER_GROUP_SKU](state, {
        payload
    }) {

    }
}
export default {
    state,
    mutations
}
