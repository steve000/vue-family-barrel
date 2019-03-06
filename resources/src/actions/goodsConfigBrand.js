import * as C from '../constants/api'
import Api, {
    createAction
} from '../utils/api'

export default {
    // 查询实体商品配置下的品牌管理列表
    goodsConfigBrand: createAction(C.GOODS_CONFIG_BRAND, Api.goodsConfigBrand)
}
