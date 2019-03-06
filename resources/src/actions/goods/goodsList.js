import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 查询实例商品列表
    queryGoodsList: createAction(C.GOODS_LIST, Api.queryGoodsList),
    queryGoodsListNew: createAction(C.GOODS_LIST_NEW, Api.queryGoodsListNew),
    queryGoodsListSku: createAction(C.GOODS_LIST_SKU, Api.queryGoodsListSku),
    querySkuListByConditionSearchProduct: createAction(C.QUERY_SKU_LIST_BY_CONDITION_PRODUCT, Api.querySkuListByConditionSearchProduct),
    virtualSkuList: createAction(C.VIRTUAL_SKU_LIST, Api.virtualSkuList),
    GoodsManageExport: createAction(C.GOODS_MANAGE_EXPORT, Api.GoodsManageExport),
    productApproveQuery: createAction(C.PRODUCT_APPROVE_QUERY, Api.productApproveQuery),
    queryGoodsShelvesListSku: createAction(C.GOODS_SHELVES_LIST, Api.queryGoodsShelvesListSku),
    querySetGoodsShelves: createAction(C.SET_GOODS_SHELVES, Api.querySetGoodsShelves)
}
