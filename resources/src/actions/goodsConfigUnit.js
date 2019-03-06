//
import * as C from '../constants/api'
import Api, {
    createAction
} from '../utils/api'

export default {
    // 查询计量单位列表
    goodsConfigUnitQuery: createAction(C.GOODS_CONFIG_UNIT_QUERY, Api.goodsConfigUnitQuery)
}
