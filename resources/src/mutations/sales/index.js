// 订单导入
import importSalesOrders from './importSalesOrders'
// 退货
import returnList from './returnList'
// 换货
import changeList from './changeList'
// 销售
import sales from './salesList'
// 销售模块公共
import saleCommon from './common'
// 商品模块状态管理
import goodsDetail from './goodsDetail'
// 查询日志详情
import logRecord from './logRecord'

export default {
    importSalesOrders,
    logRecord,
    returnList,
    changeList,
    sales,
    saleCommon,
    goodsDetail
}
