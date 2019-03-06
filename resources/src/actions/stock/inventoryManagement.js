import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    /* 库存管理 */
    // 以商品维度查询商品库存情况
    queryStockProductList: createAction(C.QUERY_STOCK_PRODUCT_LIST, Api.queryStockProductList),
    // 以仓库维度分页查询商品库存
    queryStockIdList: createAction(C.QUERY_STOCKID_LIST, Api.queryStockIdList),
    // 查看盘点记录列表
    queryPandianList: createAction(C.QUERY_PANDIAN_LIST, Api.queryPandianList),
    // 根据盘点Id查询盘点详情
    queryPandianIdDetailList: createAction(C.QUERY_PANDIANID_DETAIL_LIST, Api.queryPandianIdDetailList),
    // 更新盘点
    updataPandian: createAction(C.UPDATA_PANDIAN, Api.updataPandian),
    // 获取未盘点的商品数量
    getUninventoryNum: createAction(C.GET_UNINVENTORY_NUM, Api.getUninventoryNum),
    // 结束盘点
    finshPandian: createAction(C.FINSH_PANDIAN, Api.finshPandian),

    /** 库存管理改版 新 */
    // [v1.0.2，修改]分页查询商品维度查询商品库存情况
    queryProductInventoryLisy: createAction(C.QUERY_PRODUCT_INVENTORY_LIST, Api.queryProductInventoryLisy),
    // [v1.0.2]查询商品库存分布
    queryProductDistribution: createAction(C.QUERY_PRODUCT_DISTRIBUTION, Api.queryProductDistribution),
    // [v1.0.2]分页查询代发仓库的商品列表
    queryDistributionProductList: createAction(C.QUERY_DISTRIBUTION_PRODUCT_LIST, Api.queryDistributionProductList),
    // [v1.0.2.1]同步中移物流库存数据
    SynchroLogistics: createAction(C.SYNCHRO_LOGISTICS, Api.SynchroLogistics),
    // [v1.0.2.2]根据仓库id分页查询串码列表
    QueryStockSnList: createAction(C.QUERY_STOCK_SN_LIST, Api.QueryStockSnList),
    // [v1.0.2.2]搜索指定仓库的商品
    QueryProductSearch: createAction(C.QUERY_PRODUCT_SEARCH, Api.QueryProductSearch),
    // [v1.0.2.2]查询指定仓库中商品的可用库存
    QueryProductEffectiveStock: createAction(C.QUERY_PRODUCT_EFFECTIVESTOCK, Api.QueryProductEffectiveStock),
    // 库存管理的左边导航
    StockManageLeftNave: createAction(C.STOCK_MANAGE_LEFT_NAVE, Api.StockManageLeftNave),
    // 库存导出
    stockInventoryExport: createAction(C.STOCK_INVENTORY_EXPORT, Api.stockInventoryExport)
    /** 库存管理改版 新 */
}
