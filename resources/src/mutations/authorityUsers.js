import * as C from '../constants/api'

const state = {
    users: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    }
}

const mutations = {

    [C.USER_LIST](state, {
        payload
    }) {
        const {
            pageNo,
            total,
            result
        } = payload
        state.users.pageNo = pageNo
        state.users.total = total
        state.users.result = result

        // state.users.result = result.map(item => {
        //     item.sex = item.sex ? '男': '女'
        //     return item
        // })
        state.users.result = result.map(item => {
            item.sex = item.sex ? '男' : '女'
            return item
        })
    }
}

export default {
    state,
    mutations
}
