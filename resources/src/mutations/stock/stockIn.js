/**
 * Created by issuser on 2018/3/19.
 */
import * as C from '../../constants/api'
const state = {
    storageList: []
}
const mutations = {
    [C.QUERY_STOCK_IN_LIST](state, {
        payload
    }) {
        state.storageList = payload
    },
    [C.CREATE_STOCK_IN](state, {
        payload
    }) {},
    [C.QUERY_STOCK_IN_DETAIL](state, {
        payload
    }) {},
    [C.AllOTCHECK](state, {
        payload
    }) {},
    [C.QUERY_RELATEDSHEET_LIST](state, {
        payload
    }) {},
    [C.QUERY_PURCHASE_ORDER_DETAIL](state, {
        payload
    }) {},
    [C.REVOKE_STOCK_IN](state, {
        payload
    }) {},
    [C.QUERY_WAIT_STOCK_PRODUCT](state, {
        payload
    }) {
        payload.skuList && payload.skuList.map((item) => {
            let attr = Object.values(item.attrInfo)
            let str = ''
            for (let i = 0; i < attr.length; i++) {
                i !== attr.length - 1 ? str += attr[i] + ',' : str += attr[i]
            }
            item.attr = str
            return item
        })
        state.stockInProductList = payload
    },
    [C.QUERY_STOCK_IN_BASIC_DETAIL](state, {
        payload
    }) {

    },
    [C.QUERY_STOCK_IN_LIST_DETAIL](state, {
        payload
    }) {

    },
    [C.QUERY_SN_LIST](state, {
        payload
    }) {

    },
    [C.QUERT_STOCK_IN_PRODUCT_LIST](state, {
        payload
    }) {

    },
    [C.CANCEL_STOCK_IN](state, {
        payload
    }) {

    },
    [C.RETRY_STOCK_IN](state, {
        payload
    }) {

    },
    [C.UPLOAD_FLIE](state, {
        payload
    }) {

    },
    [C.PARSE_BACK_STOCK_EXCEL](state, {
        payload
    }) {

    },
    [C.GET_ATTACHMENT_LIST](state, {
        payload
    }) {

    },
    [C.DOWNLOAD_FILE](state, {
        payload
    }) {

    },
    [C.STOCKIN_STATUS_LIST](state, {
        payload
    }) {

    },
    [C.SHOW_STOCK_IN_DETAIL](state, {
        payload
    }) {

    },
    [C.QUERY_STOCKIN_LOG](state, {
        payload
    }) {

    },
    [C.CALCEL_STOCKIN_APPROVE](state, {
        payload
    }) {

    },
    [C.EXPORT_STOCKIN](state, {
        payload
    }) {

    }
}
export default {
    state,
    mutations
}
