/**
 * Created by issuser on 2018/3/26.
 */
import * as C from '../../constants/api'
const state = {
    virtualCate: {},
    entityCate: {}
}
const mutations = {
    [C.QUERY_CATE_ALL](state, {
        payload
    }) {
        let result = payload.result
        for (let i = 0; i < result.length; i++) {
            let resultItem = result[i]
            if (resultItem.cateType === 1) {
                state.entityCate = resultItem.cateList
            } else if (resultItem.cateType === 2) {
                state.virtualCate = resultItem.cateList
            }
        }
    }
}
export default {
    state,
    mutations
}
