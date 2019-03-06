import rootActions from './root'
import authorityUsers from './authorityUsers'
import authorityRoles from './authorityRoles'
import procurementsIndex from './procurementsIndex'
import goodsConfigBrand from './goodsConfigBrand'
import goodsConfigUnit from './goodsConfigUnit'
import goodsList from './goods/goodsList'
import viewGoods from './goods/viewGoods'
import cate from './goods/cate'
import transferManage from './stock/transferManage'
import inventoryManagement from './stock/inventoryManagement'
import outboundWarehouseList from './stock/outboundWarehouseList'
import stockIn from './stock/stockIn'
import purchaseList from './purchase/purchaseList'
import viewPurchaseOrder from './purchase/viewPurchaseOrder'
import createPurchase from './purchase/createPurchase'
import entityConfig from './system/entityConfig'
import purchasecontract from './contract/purchasecontract'
import common from './common'
import workflowsAll from './workflows/workflowsAll'
import groupGoods from './goods/groupGoods'
// 配置
import config from './config/index'
// 公共
import commmonSales from './common/index'
// 首页
import home from './index/home'
// 消息
import notification from './notification/index'
// 销售模块
import salesModule from './sales/index'
export default {
    ...rootActions,
    ...authorityUsers,
    ...authorityRoles,
    ...procurementsIndex,
    ...goodsConfigBrand,
    ...goodsConfigUnit,
    ...goodsList,
    ...cate,
    ...viewGoods,
    ...transferManage,
    ...inventoryManagement,
    ...outboundWarehouseList,
    ...stockIn,
    ...purchaseList,
    ...viewPurchaseOrder,
    ...createPurchase,
    ...entityConfig,
    ...purchasecontract,
    ...common,
    ...config,
    ...commmonSales,
    ...home,
    ...notification,
    ...salesModule,
    ...workflowsAll,
    ...groupGoods
}
