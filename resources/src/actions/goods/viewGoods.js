import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 根据商品编码查询商品信息
    queryGoodsInfoModify: createAction(C.QUERY_GOODS_INFO_MODIFY, Api.queryGoodsInfoModify),
    // 新增商品
    goodsCreate: createAction(C.GOODS_CREATE, Api.goodsCreate),
    // 查询所有的品牌
    queryAllBrands: createAction(C.QUERY_ALL_BRANDS, Api.queryAllBrands),
    // 新建品牌
    addBrands: createAction(C.ADD_BRANDS, Api.addBrands),
    // 查询类目
    queryCate: createAction(C.QUERY_CATE, Api.queryCate),
    // 查询单位
    queryGoodsUnit: createAction(C.QUERY_GOODS_UNIT, Api.queryGoodsUnit),
    // 查询商品属性
    queryGoodsAttr: createAction(C.QUERY_GOODS_ATTR, Api.queryGoodsAttr),
    // [v1.1.0]查询虚拟商品详细信息
    virtualSkuDetails: createAction(C.VIRTUAL_SKU_DETAILS, Api.virtualSkuDetails),
    // 根据商品编码查询操作日志
    queryGoodsLog: createAction(C.QUERY_GOODS_LOG, Api.queryGoodsLog),
    // 查询商品修改详情日志
    queryGoodsEditDetailLog: createAction(C.QUERY_GOODS_EDIT_DETAILLOG, Api.queryGoodsEditDetailLog)
}
