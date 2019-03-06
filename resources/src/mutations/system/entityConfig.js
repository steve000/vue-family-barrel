import * as C from '../../constants/api'
const state = {
    userGroupList: {},
    entityList: [],
    basePage: {
        totalCount: 0
    },
    companyList: []
}
const mutations = {
    [C.QUERY_USER_GROUP](state, {
        payload
    }) {
        state.userGroupList = payload.result
    },
    [C.QUERY_ENTITY_USER_LIST](state, {
        payload
    }) {
        state.entityList = payload && payload.result
        state.basePage.totalCount = payload.total
    },
    [C.EDIT_ENTITY_USER](state, {
        payload
    }) {

    },
    [C.ADD_ENTITY_USER](state, {
        payload
    }) {

    },
    [C.REMOVE_ENTITY_USER](state, {
        payload
    }) {

    },
    [C.REQURY_COMPANY_LIST](state, {
        payload
    }) {
        state.companyList = payload.data
    },
    [C.CREATE_ENTITY](state, {
        payload
    }) {

    },
    [C.ASSOCIATE_USER](state, {
        payload
    }) {

    },
    [C.SEARCH_OA_COUNT](state, {
        payload
    }) {

    },
    [C.QUERY_USER_GROUP_ROLE](state, {
        payload
    }) {

    },
    [C.QUERY_ALL_ENTITY_USER_LIST](state, {
        payload
    }) {

    },
    [C.ADD_CREATE_FORM_OA_USER](state, {
        payload
    }) {

    }
}
export default {
    state,
    mutations
}
