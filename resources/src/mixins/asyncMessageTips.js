import Api from '~/utils/api'
import 'es6-promise'
import {
    mapActions
} from 'vuex'
export default {
    methods: {
        ...mapActions(['showPageLoading', 'hidePageLoading']),
        /**
         * @param ids<Array> 需要轮循的出库单或者入库单id列表
         * @returns {Promise<any>}
         */
        queryItemStatus(sheetIds) {
            return new Promise((resolve, reject) => {
                let count = 0
                const query = () => {
                    Api.batchQueryItemStatus(sheetIds)
                        .then(res => {
                            this.showPageLoading()
                            const {
                                isDone,
                                result
                            } = res
                            if (isDone) {
                                const failedItems = result.filter(item => item.status === 1)
                                if (!failedItems.length) {
                                    resolve(failedItems.map(item => item.sheetId))
                                } else {
                                    reject(failedItems.map(item => item.sheetId))
                                }
                                this.hidePageLoading()
                            } else {
                                count++
                                if (count < 16) {
                                    setTimeout(query, 2000)
                                } else {
                                    const failedItems = result.filter(item => item.status === 1)
                                    if (!failedItems.length) {
                                        resolve(failedItems.map(item => item.sheetId))
                                    } else {
                                        reject(failedItems.map(item => item.sheetId))
                                    }
                                    this.hidePageLoading()
                                }
                            }
                        })
                        .catch(() => {
                            this.hidePageLoading()
                        })
                }
                query()
            })
        }
    }
}
