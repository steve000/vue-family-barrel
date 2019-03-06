// const getApi = (url) => `${window.config.context}/${url}.jhtml`;
const getApi = url => `${window.config.context}/${url}`

export const HOST_BASE = `${location.protocol}//${location.host}`

export const CODE_STATUS_OK = 0
export const CODE_SESSION_TIME_OUT = 1008
export const RESPONSE_TYPE_FILE = 'arraybuffer'

// 获取登录验证码
export const CODE_IMG = 'http://t.cn/R8MNl4Z'

// 事件类型映射
export const EVENTS_TYPES_MAPPING = {
    user_login: '用户登录',
    user_switch: '帐号切换',
    user_quit: '用户退出',
    user_read: '用户阅读',
    user_play: '点击视频',
    user_search: '用户搜索',
    user_follow: '用户关注',
    user_uFollow: '用户取消关注',
    user_listen_to_music: '用户试听',
    user_download_music: '下载音乐'
    // user_provili_usermana:'用户管理',//权限下的用户管理
}

export const RSA_MODULUS = [
    '0099f1afd474c7436186',
    '9ce7b29c512c67bcddb5',
    '31e769a0ca0927736b27',
    '334fdff79e490846314e',
    'a9e8c78f2eaeb7102277',
    'cff98271117af0ed7166',
    '74a69f592e0506b66f80',
    'f5d65e7a2088ff4cf49a',
    '2d6119f8803a74db7b16',
    '6d6e59afd135d65687b5',
    '170aa8e6d6e28c9f02cb',
    '98a080371ab8a4103266',
    '7190818a0f9ef5cdcb'
].join('')

export const RSA_COMPONENT = '010001'

export const RSA_KEY_LENGTH = 1024

/** 用户登入登出 */
// 登录
export const USER_LOGIN = getApi('portal/login')
// 登出
export const USER_LOGOUT = getApi('portal/logout')
// 修改密码
export const EDIT_PASSWORD = getApi('portal/sys/user/updatePwd')
// 查询用户下所有业务实体列表
export const GET_USER_ENTITY_LIST = getApi('portal/sys/user/queryUserGroup')
// 获取验证码
export const GET_LOGIN_IMAGE = getApi('portal/captcha-image')
// 切换业务实体
export const SWITCH_GROUP = getApi('portal/sys/user_group/switch')
// 设置当前业务实体是否接收邮件
export const IS_SEND_EMAIL = getApi('portal/sys/user_group/isSendEmail')
// 查询用户邮件是否邮件审批
export const QUERY_IS_SEND_EMAIL = getApi(
    'portal/sys/user_group/queryIsSendEmail'
)
// 邮件审批token 换 session
export const LOGIN_BY_TOKEN = getApi('portal/EmailUrl')

/** 旧的用户模块  */
// 获取用户列表
export const USER_LIST = getApi('portal/user/list')
// 新增用户
export const USER_ADDED = getApi('portal/user/add')
// 修改用户
export const USER_MODIFY = getApi('portal/user/modify')
// 删除用户
export const USER_DEL = getApi('portal/user/del')
// 重置密码
export const USER_MODIFY_PWD = getApi('portal/user/modifyPwd')
// 更新状态
export const USER_UPDATE_STATUS = getApi('portal/user/updateUserStatus')
// 查询用户列表
export const PROCUREMENTS_LIST = getApi('')
/** 旧的角色模块 */
// 获取角色列表
export const ROLES_LIST = getApi('portal/role/list')
// 新增角色
export const ROLES_ADDED = getApi('portal/role/save')
// 修改角色
export const ROLES_EDIT = getApi('portal/role/save')
// 删除角色
export const ROLES_DELETE = getApi('portal/role/delete')
// 角色管理 - 指定用户
export const ROLES_IDENTIFY = getApi('portal/role/getUserList')
// 角色管理 - 设置权限 - 根据角色id获取该角色的菜单
export const ROLES_GETMENULIST = getApi('portal/role/getMenuList')
// 角色管理 - 设置权限 - 为角色授权菜单权限
export const ROLES_GRANTMENU = getApi('portal/role/grant')
// 角色管理 - 设置权限 - 为角色添加用户
export const ROLES_ADDUSER = getApi('portal/role/addUserByRoleId')
/**  旧的权限模块  */
// 获取系统配置信息
export const ROLES_SETTINGINFO = getApi('portal/sys/getInfo')
// 保存系统配置信息
export const SETTING_SAVE = getApi('portal/sys/saveInfo')
// 根据角色id获取该角色下没有的uerList
export const ROLES_GETNOUSERLIST = getApi('portal/role/getUserListByRid')
// 获取权限系列表
export const PRIVILEGE_LIST = getApi('portal/menu/list')
// 新增/保存权限系列表
export const PRIVILEGE_ADD = getApi('portal/menu/save')
// 批量删除权限系列表
export const PRIVILEGE_DELETE = getApi('portal/menu/delete')
// 上下移
export const PRIVILEGE_MOVEUPDOWN = getApi('portal/menu/orderNum')
/**  旧的实体商品模块 */
// 实体商品配置 - 品牌管理
export const GOODS_CONFIG_BRAND = getApi('portal/user/list')
// 实体商品配置 - 计量单位管理
export const GOODS_CONFIG_UNIT_QUERY = getApi('portal/unit/query')
// 获取商品实例列表
export const GOODS_LIST = getApi('portal/product/pro/query')
// 商品管理的导出功能
export const GOODS_MANAGE_EXPORT = getApi('portal/export/pro/exportProduct')

/**  商品模块  */
// [v1.1.0]根据条件查询虚拟商品列表
export const VIRTUAL_SKU_LIST = getApi('portal/product/pro/queryVirtualSkuList')
// [v1.1.0]查询虚拟商品详细信息
export const VIRTUAL_SKU_DETAILS = getApi(
    'portal/product/pro/queryVirtualSkuDetail'
)
export const PRODUCT_APPROVE_QUERY = getApi('portal/product/pro/sysAdminApprove/query')
// 查询全部sku列表
export const SKU_LIST = getApi('portal/product/pro/queryAllSkuList')
// 根据skuId查询sku详情
export const SKU_DETAIL = getApi('portal/product/pro/queryRecordSkuBySkuId')
// 获取商品实例列表
export const GOODS_LIST_NEW = getApi('portal/product/newquery')
// 上架其它业务实体商品列表
export const GOODS_SHELVES_LIST = getApi('portal/product/pro/usergroup/queryShelfSku')
// 根据商品Id查询sku列表
export const GOODS_LIST_SKU = getApi('portal/product/pro/querySkuListByProductId')
// 其它业务实体商品上架操作
export const SET_GOODS_SHELVES = getApi('portal/product/pro/usergroup/shelfSku')
// 获取一个商品实例子列表
export const ONE_GOODS_LIST = getApi('portal/oneproduct/newquery')
// 根据商品编码查询商品信息
export const QUERY_GOODS_INFO_MODIFY = getApi(
    'portal/product/pro/queryByProductId'
)
//  商品新建
export const GOODS_CREATE = getApi('portal/product/pro/save')
// 商品新建审批
export const GOODS_CREATE_APPROVAL = getApi('portal/product/pro/approve')
// 编辑商品信息查询
export const QUERY_GOODS_EDIT = getApi('portal/product/pro/queryRecordSpuInfoBySpuId')
// 根据商品编码查询操作日志
export const QUERY_GOODS_LOG = getApi('portal/product/log/queryProductLog')
// 查询商品修改详情日志
export const QUERY_GOODS_EDIT_DETAILLOG = getApi('portal/product/log/queryProductDetailLog')
// 查询所有品牌
export const QUERY_ALL_BRANDS = getApi('portal/product/brand/query')
// 新建品牌
export const ADD_BRANDS = getApi('portal/product/brand/add')
// 查询类目
export const QUERY_CATE = getApi('protal/product/cate/query')
// 查询全部类目
export const QUERY_CATE_ALL = getApi('portal/product/cate/queryAll')
// 查询颜色等属性
export const QUERY_GOODS_ATTR = getApi('portal/product/attr/queryByAttrName')
// 查询计量单位
export const QUERY_GOODS_UNIT = getApi('portal/product/unit/query')

/** 组合商品模块 */
// 组合商品列表展示
export const QUERY_MERGE_LIST = getApi('portal/product/merger/list')
// 新增组合商品
export const CREATE_MERGE = getApi('portal/product/merger/addMergerSku')
// 编辑组合商品
export const EDIT_MERGE = getApi('portal/product/merger/editMergerSku')
// 删除组合商品
export const DELETE_MERGE = getApi('portal/product/merger/delMergerSku')
// 组合商品详情
export const MERGE_DETAIL = getApi('portal/product/merger/showDetail')
/** 入库 */
// 入库撤销
export const REVOKE_STOCK_IN = getApi('portal/stock/in/per/revoke')
// 分页获取入库单列表
export const QUERY_STOCK_IN_LIST = getApi('portal/stock/in/queryList')
// 创建入库单
export const CREATE_STOCK_IN = getApi('portal/stock/in/create')
// 查看入库单
export const QUERY_STOCK_IN_DETAIL = getApi('portal/stock/in/queryDetail')
// 根据条件查询商品列表
export const QUERY_SKU_LIST_BY_CONDITION = getApi(
    'portal/sale/channel/querySkuListByCondition'
)
export const QUERY_SKU_LIST_BY_CONDITION_PRODUCT = getApi(
    'portal/product/pro/querySkuListByCondition'
)
// 删除入库单
export const DELETE_STOCK_IN = getApi('portal/stock/in/delete')
// 确认单次调拨入库
export const AllOTCHECK = getApi('portal/stock/in/allotCheck')
// 根据关联单号查询入库通知单商品列表
export const QUERY_WAIT_STOCK_PRODUCT = getApi(
    'portal/stock/in/queryStockInProductListByReleatedId'
)
// 查询待入库的关联单号列表
export const QUERY_RELATEDSHEET_LIST = getApi(
    'portal/stock/in/queryRelatedSheetList'
)
// 查看采购订单信息
export const QUERY_PURCHASE_ORDER_DETAIL = getApi('portal/purchase/order/query')
// 查询入库通知单基本信息
export const QUERY_STOCK_IN_BASIC_DETAIL = getApi(
    'portal/stock/in/queryInNoticDetail'
)
// 查询入库通知单入库详情
export const QUERY_STOCK_IN_LIST_DETAIL = getApi(
    'portal/stock/in/queryStockPerInList'
)
// 查询入库单商品的串码信息
export const QUERY_SN_LIST = getApi('portal/stock/in/querySnList')
// 查询入库通知单商品列表
export const QUERT_STOCK_IN_PRODUCT_LIST = getApi(
    'portal/stock/in/queryStockInProductList'
)
// 消单次入库单号
export const CANCEL_STOCK_IN = getApi('portal/stock/in/per/removeInitStore')
// 重传入库单
export const RETRY_STOCK_IN = getApi('portal/stock/in/retryStockIn')
// 编辑入库单（数据回显）
export const SHOW_STOCK_IN_DETAIL = getApi('portal/stock/in/queryPerDetailByStockPerInId')
// 上传文件
export const UPLOAD_FLIE = getApi('portal/upload/uploadToFtpTemp')
// 解析上传文件
export const PARSE_BACK_STOCK_EXCEL = getApi(
    'portal/stock/in/parseBeginStockExcelSkuList'
)
// 出入库单附件列表
export const GET_ATTACHMENT_LIST = getApi(
    'portal/stock/in/queryAttamentBySheetId'
)
// [v1.5.0]入库状态统计
export const STOCKIN_STATUS_LIST = getApi('portal/stock/in/queryInStatusList')
// 下载
export const DOWNLOAD_FILE = getApi('portal/upload/downloadFtpFile')
// 入库导出
export const EXPORT_STOCKIN = getApi('portal/stock/in/export')
// [v1.5.0]查询入库操作日志编辑信息
export const QUERY_STOCKIN_LOG = getApi('portal/stock/in/queryStockInOpLog')
// 查询业务关联附件列表
export const QUERY_MODULE_ATTRLIST = getApi('portal/addition/attachment/query')
// 删除业务关联附件列表
export const DELETE_MODULE_ATTRLIST = getApi(
    'portal/addition/attachment/delete'
)
export const PURCHASE_ATTACH_LIST = getApi('portal/addition/attachment/query')
// [v.1.5.0]取消单次入库
export const CALCEL_STOCKIN_APPROVE = getApi('portal/stock/in/cancleInApproval')

/** 库存管理改版 新 */
// [v1.0.2，修改]分页查询商品维度查询商品库存情况
export const QUERY_PRODUCT_INVENTORY_LIST = getApi(
    'portal/stock/manager/product/stock'
)
// [v1.0.2]查询商品库存分布
export const QUERY_PRODUCT_DISTRIBUTION = getApi(
    'portal/stock/manager/product/totalStock'
)
// [v1.0.2]分页查询代发仓库的商品列表
export const QUERY_DISTRIBUTION_PRODUCT_LIST = getApi(
    'portal/stock/manager/product/proxy/stock'
)
// [v1.0.2.1]同步中移物流库存数据
export const SYNCHRO_LOGISTICS = getApi('portal/stock/manager/syn_logistics')
// [v1.0.2.2]根据仓库id分页查询串码列表
export const QUERY_STOCK_SN_LIST = getApi(
    'portal/stock/manager/product/query_imei'
)
// [v1.0.2.2]搜索指定仓库的商品
export const QUERY_PRODUCT_SEARCH = getApi(
    'portal/stock/manager/product/search'
)
// [v1.0.2.2]查询指定仓库中商品的可用库存
export const QUERY_PRODUCT_EFFECTIVESTOCK = getApi(
    'portal/stock/manager/product/effectiveStock'
)
// 库存管理的左边导航
export const STOCK_MANAGE_LEFT_NAVE = getApi(
    'portal/stock/manager/storehouse/list'
)
// 查询用户组下所有仓库列表包含代发仓
export const QUERY_STOREHOUSE_MENU_LIST = getApi(
    'portal/stock/storehouse/queryMenuList'
)

/** 库存管理改版 新 */

/** 库存管理 */
// 以商品维度查询商品库存情况
export const QUERY_STOCK_PRODUCT_LIST = getApi(
    'portal/stock/manager/listByProduct'
)
// 以仓库维度分页查询商品库存
export const QUERY_STOCKID_LIST = getApi('portal/stock/manager/listByStock')
// 查看盘点记录列表
export const QUERY_PANDIAN_LIST = getApi('portal/stock/inventory/queryList')
// 根据盘点Id查询盘点详情
export const QUERY_PANDIANID_DETAIL_LIST = getApi(
    'portal/stock/inventory/queryDetail'
)
// 创建盘点
export const CREAT_PANDIAN = getApi('portal/stock/inventory/create')
// 更新盘点
export const UPDATA_PANDIAN = getApi('portal/stock/inventory/update')
// 结束盘点
export const FINSH_PANDIAN = getApi('portal/stock/inventory/finish')
// 根据条件查询库存商品
export const QUERY_STOCK_PRODUCT_BY_CONDITION = getApi(
    'portal/stock/manager/listProduct'
)
// 获取未盘点的商品数量
export const GET_UNINVENTORY_NUM = getApi('portal/stock/inventory/uninventory')
// 库存导出
export const STOCK_INVENTORY_EXPORT = getApi(
    'portal/stock/manager/product/stockProductExport'
)
/** 库存管理 */

/** 查看采购订单详情 **/
// 获取采购订单状态的数据条数
export const QUERY_COUNT_STATUS_NUM = getApi(
    'portal/purchase/order/countStatusNum'
)
// 采购订单批量入库
export const PURCHASE_BATCH_STOCK_IN = getApi('portal/stock/in/batchStockIn')
// 查看采购订单详情
export const QUERY_PURCHASE_DETAILS = getApi(
    'portal/purchase/order/queryDetail'
)
// 获取采购订单操作日志列表
export const QUERY_PURCHASE_LOG = getApi('portal/purchase/order/queryLogList')
// 根据采购操作日志id获取修改
export const QUERY_PURCHASE_ID_MODIFY = getApi(
    'portal/purchase/order/logRecord'
)
// 根据采购操作日志id获取修改2
export const QUERY_PURCHASE_ID_MODIFY_TWO = getApi(
    'portal/purchase/order/logRecord/two'
)
// 根据采购操作日志id获取修改3
export const QUERY_PURCHASE_ID_MODIFY_THREE = getApi(
    'portal/purchase/order/logRecord/three'
)
// 根据关联单号查询单次入库列
export const QUERY_SINGLE_PUTSTORAGE = getApi(
    'portal/stock/in/queryDetailByRelatedId'
)
// [v1.0.2.1]获取采购订单审批记录
export const QUERY_PURCHASE_APPROVE_LOG = getApi(
    'portal/purchase/order/approve/log'
)
/** 查看采购订单详情 **/

/** 出库管理接口 */
// 分页获取出库单列表  ('获取出库单')
export const QUERY_STOCKOUTSHEET = getApi('portal/stock/out/list')
// 查询出库单详情
export const QUERY_STOCKOUTSHEETDETAIL = getApi('portal/stock/out/queryDetail')
// 删除出库单
export const STOCKOUTSHEET_DELETE = getApi('portal/stock/out/delete')
// 撤销出库单
export const STOCKOUTSHEET_CANCEL = getApi('portal/stock/out/per/revoke')
// 取消出库单
export const CALCEL_STOCKOUT_APPROVE = getApi('portal/stock/out/cancleOutApproval')
// 创建出库单
export const STOCKOUTSHEET_CREATE = getApi('portal/stock/out/create')
// 确认单次调拨出库
export const ALLOT_CHECK = getApi('portal/stock/out/allotCheck')
// 查询待出库商品列表
export const QUERY_WAITSTOCKOUT_PRODUCT = getApi(
    'portal/stock/out/queryWaitStockOutProduct'
)
// 初始化待出库商品列表
export const QUERY_INNIT_PRODUCT = getApi('portal/stock/out/createTotal')
// 查询出库单商品的串码信息
export const QUERY_OUTSN_LIST = getApi('portal/stock/out/querySnList')
// 重新出库【入库超时后调用】
export const STOCKOUT_RETRY = getApi('portal/stock/out/retryStockOut')
// 出库导出
export const EXPORT_OUTBOUND = getApi('portal/stock/out/export')
// 调拨出库根据关联单号跳转至销售
export const DIAOBO_RELATEDSHEETID = getApi(
    'portal/stock/allot/queryAllotRelatedSheetId'
)
// 请求中移物流日志接口
export const STOCK_ITEM_STATUS = getApi(
    'portal/logistics/queryLisInvokeLog'
)
// 查询本地仓库出库的出库单快递单号和承运商
export const QUERY_LOCAL_EXPRESSINFO = getApi(
    'portal/logistics/deliverRouter/queryExpressByRelatedSheetId'
)
// [v1.5.0]出库状态统计
export const STOCKOUT_STATUSLIST = getApi('portal/stock/out/queryOutStatusList')
// [v1.5.0]]查询出库操作日志编辑信息
export const STOCKOUT_EDIT_LOG = getApi('portal/stock/out/queryStockOutOpLog')
/** 调拨管理 */
// 查看调拨列表[1.4.0]
export const GET_ALL_TRANSFER_LIST = getApi('portal/stock/allot/queryAllotList')
// 调拨状态统计[1.4.0]
export const GET_STATE_STATISTIC = getApi('portal/stock/allot/countAllotStatus')
// 调拨取消
export const QUIT_ALLOT_SHEET = getApi('portal/stock/allot/revokeAllotSheet')
// 查询调拨列表
export const GET_TRANSFER_LIST = getApi('portal/stock/allot/queryList')
// 删除调拨记录
export const DELETE_TRANSFER = getApi('portal/stock/allot/updateStatus')
// 新增调拨单
export const CREATE_TRANSFER = getApi('portal/stock/allot/add')
// 查看调拨单
// export const VIEW_TRANSFER = getApi('portal/stock/allot/queryDetail');
export const VIEW_TRANSFER = getApi('portal/stock/allot/queryDetailByAllotId')

// [V1.4.0]根据调拨单ID查看详情操作日志
// export const TRANSFET_LOG_QUERY = getApi('portal/stock/allotLog/logQuery');
export const TRANSFET_LOG_QUERY = getApi('portal/stock/allot/queryStockLog')
// [v1.4.0]新增调拨申请单
export const CREATE_TRANSFER_ALL = getApi('portal/stock/allot/createAllot')

/** 设置 */
/** 仓库设置 */
// [v1.0.2]获取用户实体下的仓库列表       (左边导航部分，分成‘本地仓’、‘中移物流仓’，及‘普通仓’、‘不良品仓’,和待发仓)
export const QUERY_STOREHOUSE_LIST = getApi('portal/stock/storehouse/list')
// [v1.0.2.1]查询用户实体下的全部仓库列表 （主页列表部分，信息比较全）
export const QUERY_ALL_STOREHOUSE_LIST = getApi(
    'portal/stock/storehouse/usergroup/queryAll'
)
// [v1.0.2.1]修改仓库状态
export const CHANGE_STOREHOUSE_STATUS = getApi(
    'portal/stock/storehouse/change_status'
)
// [v1.0.2.1]根据仓库id获取仓库信息 v1.4.0出库查询仓库详情
export const QUERY_STOREHOUSE_BY_ID = getApi(
    'portal/stock/storehouse/queryStoreHouse'
)
// [v1.0.2.1]校验外部仓库信息           （校验中移物流仓的仓库编码和地址编码正确否）
export const CHECK_EXT_STOREHOUSE = getApi('portal/stock/storehouse/ext/check')
// [v1.0.2.1]修改仓库
export const MODIFY_STOREHOUSE = getApi('portal/stock/storehouse/modify')
// [v1.0.2.1]创建仓库
export const CREATE_STOREHOUSE = getApi('portal/stock/storehouse/add')
// [v1.0.2]查询用户实体下仓库列表        (下拉框部分，包含仓库id，仓库名，仓库类型)
export const GET_STOREHOUSE_LIST = getApi('portal/stock/storehouse/query')
// 修改仓库联系人
export const MODIFY_STOREHOUSE_LINK = getApi(
    'portal/stock/storehouse/link/modify'
)
// 删除仓库联系人
export const DELETE_STOREHOUSE_LINK = getApi(
    'portal/stock/storehouse/link/delete'
)
// 新增仓库联系人
export const ADD_STOREHOUSE_LINK = getApi('portal/stock/storehouse/link/add')
// 根据仓库名称查询仓库（列表）
export const QUERY_STOREHOUSE_MENU = getApi('portal/stock/storehouse/menuList')

/** 供应商 */
// 获取业务实体供应商列表      （主页列表部分，信息比较全）
export const QUERY_VENDOR_LIST = getApi(
    'portal/purchase/vendor/usergroup/queryList'
)
// 查询业务实体下供应商列表
export const QUERY_ENTITY_VENDOR_LIST = getApi(
    'portal/purchase/vendor/usergroup/queryIncludeUserGroupList'
)
// 获取所有供应商列表         （下拉列表部分，接口内容是供应商id和名称列表）
export const QUERY_ALL_SUPPLIER_LIST = getApi('portal/purchase/vendor/search')
// 新增供货商
export const ADD_SUPPLIER = getApi('portal/purchase/vendor/add')
// 查看供货商
export const QUERY_SUPPLIER_DETAIL = getApi(
    'portal/purchase/supplier/queryDetail'
)
// 查看业务实体下供应商详情
export const QUERY_GROUP_SUPPLIER_DETAIL = getApi(
    'portal/purchase/vendor/usergroup/queryDetail'
)
// 修改业务实体的供应商地址
export const MODIFY_SUPPLIER_ADDRESS = getApi(
    'portal/purchase/vendor/usergroup/modifyAddress'
)
// 新增业务实体的供应商地址信息
export const ADD_SUPPLIER_ADDRESS = getApi(
    'portal/purchase/vendor/usergroup/addAddress'
)
// [v1.0.2.1]修改业务实体的供应商信息
export const MODIFY_SUPPLIER_INFO = getApi(
    'portal/purchase/vendor/usergroup/modify'
)
// [v1.0.2.1]修改业务实体的供应商状态
export const MODIFY_SUPPLIER_STATUS = getApi(
    'portal/purchase/vendor/usergroup/modify_status'
)
// 查看供应商基础详情
export const QUERY_SUPPLIER_BASE_DETAIL = getApi(
    'portal/purchase/vendor/queryBaseDetail'
)

/** 商品设置模块 */
// 查询业务实体下的商品列表
export const QUERY_USER_RELATION_PRODUCT = getApi(
    'portal/product/pro/usergroup/query'
)
// 修改业务实体关联商品状态
export const CHANGE_DOWM_USER_RELARION_PRODUCT = getApi(
    'portal/product/pro/usergroup/modifyStatus'
)
// 查询未添加到业务实体的商品
export const QUERY_USER_UNRELATION_PRODUCT = getApi(
    'portal/product/pro/usergroup/unRelationSkuList'
)
// 业务实体关联商品
export const USER_RELATION_PRODUCT = getApi(
    'portal/product/pro/usergroup/relation'
)
// 同步中移物流
export const UPDATE_RELATION_INFO = getApi(
    'portal/logistics/updateSkuRelationInfo'
)
// 商品设置批量导出
export const EXPORT_USER_GROUP_SKU = getApi(
    'portal/export/pro/exportUserGroupSku'
)

// 客户设置
// 查询客户列表
export const QUERY_CUSTOMER_LIST = getApi('portal/sale/customer/list')
// 查看客户详情
export const QUERY_CUSTOMER_DETAIL = getApi('portal/sale/customer/get')
// 新增客户
export const CREATE_CUSTOMER = getApi('portal/sale/customer/add')
// 修改客户
export const UPDATE_CUSTOMER = getApi('portal/sale/customer/update')
// 删除客户
export const DELETE_CUSTOMER = getApi('portal/sale/customer/del')
// 设置默认地址
export const SET_CUSTOMER_ADDRESS_DEFAULT = getApi(
    'portal/sale/customer/address/setDefault'
)
// 删除客户地址
export const DELETE_CUSTOMER_ADDRESS = getApi(
    'portal/sale/customer/address/del'
)
// 新增客户地址
export const ADD_CUSTOMER_ADDRESS = getApi('portal/sale/customer/address/add')
// 新增客户地址
export const UPDATE_CUSTOMER_ADDRESS = getApi(
    'portal/sale/customer/address/update'
)
// 客户名称查重
export const QUERY_COUSTOMER_REPEAT = getApi('portal/sale/customer/repeat')

/** 审批设置 */
// 查看审批配置[1.5.0]
export const QUERY_APPROVE_CONFIG = getApi(
    'portal/addition/approve/queryApproveConfig'
)
// 保存审批配置[1.5.0]
export const SAVE_APPROVE_CONFIG = getApi(
    'portal/addition/approve/saveApproveConfig'
)
// 审批详情[1.5.0]
export const QUERY_APPROVE_DETAIL = getApi(
    'portal/addition/approve/queryApproveDetail'
)

// 新增采购订单
export const CREATE_PURCHASE_ORDER = getApi('portal/purchase/order/add')
// 修改采购订单
export const SAVE_PURCHASE_ORDER = getApi('portal/purchase/order/modify')
// 修改或者新增采购订单
export const SAVE_PURCHASE_ORDERS = getApi('portal/purchase/order/save')
// 提交采购订单审批
export const APPROVE_PURCHASE_ORDER = getApi('portal/purchase/order/approve')
// 采购导出
export const EXPORT_PURCHASE_ORDER = getApi('portal/purchase/order/export')
// 取消采购订单
export const CANCEL_PURCHASEORDER = getApi('portal/purchase/order/cancel')

/** 采购列表 */
// 分页获取采购订单列表
export const QUERY_PURCHASE_ORDER_LIST = getApi(
    'portal/purchase/order/queryList'
)
// 删除采购订单
export const DELETE_PURCHASE_ORDER = getApi('portal/purchase/order/delete')
// 修改时间
export const UPDATE_MODIFYARRIVEDTIME = getApi(
    'portal/purchase/order/modifyArrivedTime'
)
// 修改备注
export const UPDATE_MODIFYCOMMENT = getApi(
    'portal/purchase/order/modifyComment'
)

/** 系统设置 */
// 查询所有业务实体列表
export const QUERY_USER_GROUP = getApi('portal/sys/user_group/list')
// 查询用户列表
export const QUERY_ENTITY_USER_LIST = getApi('portal/sys/user/list')
// 查询所有用户列表
export const QUERY_ALL_ENTITY_USER_LIST = getApi('portal/sys/user/queryAllUser')
// 新增oa用户
export const ADD_CREATE_FORM_OA_USER = getApi('portal/sys/user/createFromOaUser')
// 编辑用户
export const EDIT_ENTITY_USER = getApi('portal/sys/user/modify')
// 创建用户
export const ADD_ENTITY_USER = getApi('portal/sys/user/create')
// 解绑用户
export const REMOVE_ENTITY_USER = getApi('portal/sys/user_group/remove_user')
// 查询公司列表
export const REQURY_COMPANY_LIST = getApi('portal/sys/company/list')
// 创建业务实体
export const CREATE_ENTITY = getApi('portal/sys/user_group/create')
// 关联用户
export const ASSOCIATE_USER = getApi('portal/sys/user_group/add_user')
// 查询oa账号信息
export const SEARCH_OA_COUNT = getApi('portal/sys/user/query_oa_user')
// 查询业务实体下角色
export const QUERY_USER_GROUP_ROLE = getApi('portal/sys/user_group/queryRole')

/** 合同管理 */
// 搜索业务实体的所有采购合同列表
export const QUERY_ENTITY_CONTRACT_LIST = getApi(
    'portal/purchase/contract/usergroup/search'
)
// 查询业务实体的采购合同列表
export const QUERY_CONTRACT_LIST = getApi(
    'portal/purchase/contract/usergroup/queryList'
)
// 修改业务实体的采购合同状态
export const ENABLE_EFFECTIVE_CONTRACT = getApi(
    'portal/purchase/contract/usergroup/updateStatus'
)
// 查询采购合同详情
export const QUERY_PURCHASE_ORDER_DETAILS_LIST = getApi(
    'portal/purchase/contract/queryByContractNo'
)
// 保存采购合同
export const SAVE_PURCHASE_CONTRACT = getApi('portal/purchase/contract/add')
// 搜索业务实体下的商品列表
export const SEARCH_GOODS_LIST = getApi('portal/product/pro/usergroup/search')
// 搜索采购 合同
export const SEARCH_PURCHASE_CONTRACT = getApi(
    'portal/purchase/contract/search'
)
// 新增业务实体的采购合同
export const ADD_PURCHASE_CONTRACT = getApi(
    'portal/purchase/contract/usergroup/add'
)
// 修改业务实体的采购合同
export const MODIFY_PURCHASE_CONTRACT = getApi(
    'portal/purchase/contract/usergroup/modify'
)
// [v1.0.2]根据条件查询合同的商品列表
export const QUERY_CONTRACT_PRODUCT_LIST = getApi(
    'portal/purchase/contract/usergroup/querySkuListByCondition'
)
// [v1.0.2]根据合同序号获取采购订单列表
export const CONTRACT_SEQ_PURCHASE_LIST = getApi(
    'portal/purchase/order/contract/list'
)
// [v1.0.2]根据合同序号查询还允许采购商品列表
export const CONTRACT_PURCHASE_SKU_LIST = getApi(
    'portal/purchase/contract/query/allow_purchase_skus'
)
// 解析采购合同导入商品文件
export const PARSE_PRODUCT_FILE = getApi('portal/purchase/contract/parseProductFile')

// 地址组件接口
// [v1.0.2]获取全国省列表
export const QUERY_PROVINCE_LIST = getApi('portal/ms/area/province/query')
// [v1.0.2]获取省里市列表
export const QUERY_CITY_LIST = getApi('portal/ms/area/province/city/query')
// [v1.0.2]获取市里区列表
export const QUERY_AREA_LIST = getApi('portal/ms/area/province/city/area/query')

/** -----------销售业务 分割线-----------------**/

/*  销售模块 */
// 查询菜单订单数量
export const QUERY_SALE_MENUORDERNUM = getApi(
    'portal/sale/order/statisticsOrder'
)
// 修改订单收货地址
export const UPDATE_ORDER_ADDRESS = getApi(
    'portal/sale/order/updateOrderAddress'
)
// 下载导入数据解析结果
export const GET_RESULT_DOWNLOAD = getApi('portal/sale/import/resultDownload')
// 根据上级行政区获取下级行政区列表
export const QUERY_PROVINCECITYAREA = getApi('portal/ms/area/queryDistrict')

/*  销售订单  */
// 分页获取销售订单列表
export const QUERY_SALES_ORDER_LIST = getApi('portal/sale/order/orderList')
// 新增销售订单
export const CREATE_SALES_ORDER_ORDERADD = getApi('portal/sale/order/orderAdd')
// 编辑销售订单
export const UPDATE_SALES_ORDER = getApi('portal/sale/order/orderUpdate')
// 销售订单-根据订单ID获取订单信息
export const QUERY_SALES_ORDER = getApi('portal/sale/order/orderQuery')
// 销售订单-根据订单ID编辑备注
export const UPDATE_SALES_ORDER_REMARK = getApi(
    'portal/sale/order/updateOrderRemark'
)
// 销售订单-模糊查询商品列表
export const QUERY_SALES_GOODSLIST = getApi(
    'portal/product/pro/usergroup/search'
)
// 导出销售订单
export const EXPORT_SALES_ORDER = getApi('portal/sale/order/export')
// 导入销售订单
export const IMPORT_SALES_ORDERS = getApi('portal/sale/import/dataImport')
// 导入数据查询
export const IMPORT_ORDERS_DATA_QUERY = getApi('portal/sale/import/dataquery')
// 查询销售订单属性
export const QUERY_ORDER_ATTR = getApi('portal/sale/order/orderAttributeQuery')
// 导入数据生成销售订单
export const GET_DATA_CONFIRM_IMPORT = getApi(
    'portal/sale/import/dataConfirmImport'
)
// 导入取消接口
export const DO_CANCEL_IMPORT = getApi('portal/sale/import/cancleImport')
// 刷新导入结果数据
export const DO_REFRESH_IMPORT_DATA = getApi('portal/sale/import/refreshImportData')
// 修改补全地址信息标识
export const DO_UPDATE_ADDRESS_SIGN = getApi('portal/sale/order/updateAddressSign')
// 查询补全/地址严重缺失地址信息订单
export const QUERY_ERROR_TYPE_INFO = getApi('portal/sale/import/queryErrorAddressInfo')
// 获取出库的物流单记录
export const QUERTY_OUTBOUND_ROUTER_LIST = getApi(
    'portal/logistics/queryRouterByStockPerOutId'
)
// 只显示渠道设置中选择了导入模板的渠道
export const QUERTY_CHANNEL_TEMPLATE = getApi(
    'portal/sale/channel/channelQueryWithTemplate'
)
// 查询已使用的渠道模板
export const QUERTY_ON_LINE_CHANNEL_COUNT = getApi(
    'portal/sale/channel/queryOnLineChannelCount'
)
// 获取物流记录
export const QUERTY_ROUTER_LIST = getApi('portal/sale/order/queryRouter')
//  异常订单已拒收确认拒收
export const UPDATA_SALES_ERROEREFUSE = getApi(
    'portal/sale/order/confirmRefuse'
)
// 查询发货状况
export const QUERY_PUSH_STATUS = getApi(
    'portal/sale/order/queryPushOrderStatus'
)
// 推送订单
export const PUSH_SALEORDER = getApi('portal/sale/order/orderPush')
// 地址解析
export const ADDRESS_RESOLVE = getApi(
    'portal/sale/customer/address/resolveAddress'
)
// 获取二级渠道列表
export const QUERY_SOURCECHANNEL_LIST = getApi(
    'portal/sale/channel/querySourceChannelList'
)

/* 退货订单 */
// 新增退货订单
export const POST_NEW_REFUSE_ORDER = getApi('portal/sale/order/returnOrderAdd')
// 退货列表
export const RETURN_LIST = getApi('portal/sale/order/returnOrderList')
// 通过退货订单ID查询退货商品清
export const QUERY_FEFUND_GOODS = getApi('portal/sale/order/returnSkuList')
// 退货订单不同状态的数量
export const QUERY_RETURN_ORDER_COUNT = getApi(
    'portal/sale/order/returnOrderCount'
)
// 根据退货订单ID编辑备注信息
export const EDIT_REFUND = getApi('portal/sale/order/returnRemarkUpdate')
// 根据退货订单ID编辑状态
export const CHANGE_REFUND_STATUS = getApi(
    'portal/sale/order/returnStatusUpdate'
)
// 查询销售订单的退货列表
export const GET_ORDER_RETURN = getApi('portal/sale/order/returnByOrderId')
// 编辑订单状态
export const EDIT_ORDER_STATUS = getApi('portal/sale/order/updateOrderStatus')
// 批量编辑订单状态
export const EDIT_ORDER_BATCH_UPDATESTATUS = getApi(
    'portal/sale/order/updateOrderStatusBatch'
)
// 根据主键ID查询退货单详细信息
export const QUERY_REFUND_DETAIL = getApi('portal/sale/order/returnOrderQuery')
// 编辑退货订单
export const UPADTE_RETURN_ORDER = getApi('portal/sale/order/returnOrderUpdate')
// 根据销售订单id获取退货商品
export const QUERY_RETURN_PROLIST_ORDER_ID = getApi(
    'portal/sale/order/queryReturnProListByOrderId'
)
// 根据退货订单ID编辑状态
export const POST_RETURN_STATUS_UPDATE = getApi(
    'portal/sale/order/returnStatusUpdate'
)
// 查看查看订单-商品清单
export const QUERY_SALE_ORDER = getApi('portal/sale/order/orderPluList')
// 退货-订单扭转
export const POST_RETURN_PUSH = getApi('portal/sale/order/returnPush')

/* 换货订单  */
// 获取换货列表数量
export const QUERY_CHANGE_ORDER_COUNT = getApi(
    'portal/sale/order/changeOrderCount'
)
// 分页获取换货订单列表
export const QEURY_CHANGE_LIST = getApi('portal/sale/order/changeOrderList')
// 根据主键ID查询换货订单详情
export const QUERY_CHANGE_DETAIL = getApi('portal/sale/order/changeOrderQuery')
// 根据换货订单ID查询换货商品清单列表
export const QUERY_CHANGE_LIST = getApi('portal/sale/order/changeSkuList')
// 根据换货订单ID编辑状态
export const EDIT_CHANGE_STATUS = getApi('portal/sale/order/changeStatusUpdate')
// 根据销售订单id查询换货列表
export const QUERY_SALES_CHANGE_LIST = getApi(
    'portal/sale/order/getChangesByOrderId'
)
// 新增换货订单
export const CREATE_CHANGE_ORDER = getApi('portal/sale/order/changeOrderAdd')
// 编辑换货单
export const EDIT_CHANGE_ORDER = getApi('portal/sale/order/changeOrderEdit')
// 更改换货收货地址
export const EDIT_CHANGE_ADDRESS = getApi(
    'portal/sale/order/updateChangeAddress'
)
// 入库单保存
export const POST_STORE_IN_SAVE = getApi('portal/sale/order/stockInSave')
// 更改换货订单备注
export const UPDATE_CHANGE_REMARK = getApi(
    'portal/sale/order/changeRemarkUpdate'
)
// 根据ID获取商品信息有换货数量的
export const QUERY_SALE_ORDER_WITH_COUNT = getApi(
    'portal/sale/order/queryReturnChangeListByOrderId'
)
// 获取换货订单详情，有可换货数量
export const QUERY_CHANGE_ORDER_WITH_COUNT = getApi(
    'portal/sale/order/changeOrderQueryForEdit'
)
// 查询换货订单入库记录
export const QUERY_CHANGE_ORDER_IN_STORE = getApi(
    'portal/stock/in/stockInQuery'
)
// 据订单id模糊查询订单列表
export const QUERY_ORDER_BLURRY = getApi(
    'portal/sale/order/queryOrderListByOrderId'
)
// 异常订单重新入库
export const IN_STOCK_AGAIN = getApi('portal/sale/order/retranInStock')
// 异常订单重新出库
export const OUT_STOCK_AGAIN = getApi('portal/sale/order/retranOutStock')
// 订单流转
export const PUSH_CHANGE_ORDER = getApi('portal/sale/order/changePush')

/*   出库  */
// 出库单保存
export const SAVE_SALES_STOREOUT = getApi('portal/sale/order/stockOutSave')
// 查询仓库列表
export const QUERY_STORE_STORELIST = getApi('portal/stock/storehouse/storeList')
// 按条件查询渠道
export const QUERY_CHANNEL_ADDRESSBYID = getApi(
    'portal/sale/channel/getAddressBychannelId'
)
// 批量出库单保存
export const SAVE_SALES_STOREOUTBATCH = getApi(
    'portal/sale/order/storeOutBatch'
)
// 根据销售订单商品生成出货单信息
export const QUERY_SALES_OUTSTORELIST = getApi(
    'portal/sale/storeOut/storeOutList'
)
// 根据仓库id获取仓库信息详情
export const QEURY_STORE_BY_ID = getApi(
    'portal/stock/storehouse/queryStoreHouse'
)
// 换货出库接口
export const CHANGE_OUT_STORE = getApi('portal/sale/order/stockOutSave')
// 获取订单详情出库记录
export const GET_OUT_STORE_RECORD = getApi('portal/stock/out/storeOutQuery')
// 大代发出库单保存
export const SAVE_PROXYSALES_STOREOUT = getApi('portal/stock/allot/create')

/*  渠道   */
// 查询所有渠道
export const QUERY_CHANNEL_ALLCHANNEL = getApi(
    'portal/sale/channel/channelQueryAll'
)
// 根据搜索获取渠道
export const QUERY_CHANNEL_BYSEARCH = getApi('portal/sale/channel/channelQuery')
// 根据channelId查询channel信息
export const QUERY_CHANNEL_BYID = getApi('portal/sale/channel/queryChannelById')
// 获取分类渠道数据
export const GETSTATUSCHANNEL = getApi('portal/sale/channel/channelQuery')
// 改变渠道状态
export const UPDATACHANNE_STATUS = getApi(
    'portal/sale/channel/startOrStopChannel'
)
// 编辑渠道
export const UPDATE_CHANNEL = getApi('portal/sale/channel/channelUpdate')
// 新增渠道
export const ADDCHANNE = getApi('portal/sale/channel/channelAdd')
// 下载订单模板
export const DOWNLOADORDERTEMPLATE = getApi(
    'portal/sale/import/downloadTemplate'
)
// 查询用户未关联实体
export const QUERY_USED_RELATED_GROUP = getApi(
    'portal/sale/channel/queryUsedRelatedGroup'
)

/* 渠道地址  */
// 新增渠道收貨地址
export const CREATE_CHANNEL_ADDRESS = getApi(
    'portal/sale/channel/channelAddressAdd'
)
// 设置渠道默认地址
export const UPDATE_CHANNEL_DEFALUTADDRESS = getApi(
    'portal/sale/channel/setDefaultAddress'
)
// 编辑渠道地址
export const UPDATE_CHANNEL_ADDRESS = getApi(
    'portal/sale/channel/channelAddressUpdate'
)
// 更改渠道收货地址状态
export const UPDATE_CHANNEL_ADDRESSSTATUS = getApi(
    'portal/sale/channel/updateChannelAddressStatus'
)
// 查询渠道收货地址
export const QUERY_SALES_RECEIVING_ADDRESS = getApi(
    'portal/sale/channel/getAddressBychannelId'
)

/* 渠道商品  */
// 导入渠道商品
export const POST_IMPORT_CHANNEL_GOODS = getApi(
    'portal/sale/channel/dataImport'
)
// 导入渠道商品-下载模板
export const QUERY_IMPORT_CHANNEL_GOODS_TEMPLATE = getApi(
    'portal/sale/channel/downloadTemplate'
)
// 导入数据生成渠道商品
export const POST_DATA_CONFIRM_IMPORT = getApi(
    'portal/sale/channel/dataConfirmImport'
)
// 根据ID获取商品信息
export const QUERY_SALE_ORDER_WITHID = getApi('portal/sale/order/orderQuery')
// 通过渠道ID查商品
export const SEARCHMERCHANDISE = getApi('portal/sale/channel/channelSkuList')
// 新增渠道商品
export const CREATE_CHANNEL_GOOD = getApi('portal/sale/channel/channelSkuAdd')
// 编辑渠道商品
export const UPDATE_CHANNEL_GOOD = getApi(
    'portal/sale/channel/channelSkuUpdate'
)
// 查询所有实体
export const QUERY_USERGROUP_ALL = getApi('portal/userGroup/queryList')
// 通过渠道商品ID查询商品信息
export const QUERY_GOODMSG_BYCHANNELSKUID = getApi(
    'portal/sale/channel/selectChannelSkuById'
)
// 售卖/停售商品
export const START_OR_STOP_CHANNEL_GOODS = getApi(
    'portal/sale/channel/startOrStopChannelSku'
)
// 查询所有发货方
export const QUERY_SALE_ALLVENDOR = getApi(
    'portal/sale/channel/queryVendorList'
)
// 根据渠道id查询渠道下商品
export const QUERY_CHANNELGOOD_BYCHANNELID = getApi(
    'portal/sale/channel/queryAllSkusByChannelId'
)
// 删除渠道商品
export const DELETE_CHANNELSKU = getApi('portal/sale/channel/channelSkuDelete')
// 导出渠道商品
export const EXPORT_CHANNELGOODS = getApi('portal/sale/channel/export')

/*  日志  */
// 查询某个订单的操作日志
export const QUERY_ORDER_LOG = getApi('portal/sale/log/logList')
// 查询销售订单-日志详情
export const QUERY_ORDER_LOG_DETAIL = getApi('portal/sale/log/logQuery')
// 消息操作人
export const QUERY_OPERATORS = getApi('portal/sys/user/currentUserGroupUser')

/*  首页  */
// 首页--统计滞留订单
export const QUERY_RETENTIONORDERCOUNT = getApi(
    'portal/sale/order/retentionOrderCount'
)
// 渠道订单量分布
export const QUERY_SALES_ORDER_ECHARTS = getApi(
    'portal/sale/order/querySaleOrderEcharts'
)
// 异常订单
export const QUERY_ORDER_AND_ERROR_COUNT = getApi(
    'portal/sale/order/queryOrderAndErrorCount'
)

/* 消息中心  */
// 消息列表
export const QUERY_MESSAGE_LIST = getApi('portal/message/messageList')
// 获取消息操作类型
export const QUERY_MESSAGE_OPERATE_TYPE = getApi(
    'portal/message/operateTypeList'
)
// 消息中心，获取未读数量
export const QUERY_MESSAGE_NOT_READ = getApi('portal/message/queryNotReaded')
//  设置已读
export const SET_MESSAGE_READED = getApi('portal/message/setIsReaded')
// 获取下载文件流
export const GET_DOENLOAD_FILE = getApi('portal/message/download')

// 文件服务器
// 下载
export const DOWNLOAD_FTPFILE = getApi('portal/upload/downloadFtpFile')

/* 待办事项  */
// 待审批
// 采购订单审批列表
export const QUERY_TODO_PURCHASE_ORDER_LIST = getApi(
    'portal/workbench/todo/approve/queryPurchaseOrderList'
)
// 销售订单审批列表
export const QUERY_TODO_SALE_ORDER_LIST = getApi(
    'portal/workbench/todo/approve/querySaleOrderList'
)
// 商品审批
export const QUERY_TODO_GOODS_LIST = getApi(
    'portal/workbench/todo/approve/querySkuList'
)
// 入库单审批列表
export const QUERY_TODO_STOCKIN_ORDER_LIST = getApi(
    'portal/workbench/todo/approve/queryStockInOrderList'
)
// 出库单审批列表
export const QUERY_TODO_STOCKOUT_ORDER_LIST = getApi(
    'portal/workbench/todo/approve/queryStockOutOrderList'
)
// 待审批数量统计接口
export const QUERY_TODO_APPROVE_COUNT = getApi(
    'portal/workbench/todo/approve/queryCount'
)
// 待入库
// 待入库的订单数量接口
export const QUERY_TODO_STOCKIN_COUNT = getApi(
    'portal/workbench/todo/stockin/queryCount'
)
// 待出库
// 待出库的订单数量统计
export const QUERY_TODO_STOCKOUT_COUNT = getApi(
    'portal/workbench/todo/stockout/queryCount'
)

// 待办事项订单数量统计接口
export const QUERY_TODO_COUNT = getApi('portal/workbench/todo/queryCount')

// 我已审批
// 我已审批的采购订单列表
export const QUERY_APPROVEBUME_PURCHASE_ORDER = getApi(
    'portal/workbench/approvebyme/queryPurchaseOrder'
)
// 我已审批的销售订单列表
export const QUERY_APPROVEBUME_SALE_ORDER = getApi(
    'portal/workbench/approvebyme/querySaleOrder'
)
// 我已审批的入库单列表
export const QUERY_APPROVEBUME_STOCKIN_ORDER = getApi(
    'portal/workbench/approvebyme/queryStockInOrder'
)
// 我已审批的出库单列表
export const QUERY_APPROVEBUME_STOCKOUT_ORDER = getApi(
    'portal/workbench/approvebyme/queryStockOutOrder'
)
// 我已审批的各类单据数量统计接口
export const QUERY_APPROVEBUME_COUNT = getApi(
    'portal/workbench/approvebyme/queryCount'
)

// 由我创建
// 统一的由我创建列表数量统计接口
export const QUERY_COUNT_CREATED_BY_ME = getApi(
    'portal/workbench/createdbyme/queryCount'
)
// 查询由我创建的采购订单
export const QUERY_PURCHASE_LIST_BY_ME = getApi(
    'portal/workbench/createdbyme/queryPurchaseCreatedByMe'
)
// 查询由我创建的销售订单
export const QUERY_SALELIST_BY_ME = getApi(
    'portal/workbench/createdbyme/querySaleOrderCreatedByMe'
)
// 查询由我创建的换货
export const QUERY_EXCHANGE_LIST_BY_ME = getApi(
    'portal/workbench/createdbyme/queryChangeOrderCreatedByMe'
)
// 查询由我创建的退货
export const QUERY_RETURN_LIST_BY_ME = getApi(
    'portal/workbench/createdbyme/queryReturnOrderCreatedByMe'
)
// 查询由我创建的入库
export const QUERY_INSTORE_LIST_BY_ME = getApi(
    'portal/workbench/createdbyme/queryStockInCreatedByMe'
)
// 查询由我创建的出库
export const QUERY_OUTSTORE_LIST_BY_ME = getApi(
    'portal/workbench/createdbyme/queryStockOutCreatedByMe'
)

// 查询上一个审批人接口
export const QUERY_LAST_APPROVE_USER = getApi('approve/queryLastApproveUser')

// 查询某用户审批过的单据ID列表接口
export const QUERY_ORDER_LIST_APPROVEBYME = getApi(
    'portal/addition/approve/queryOrderIdListApproveByMe'
)

// 查询审批意见
export const QUERY_APPROVE_COMMENT = getApi(
    'portal/addition/approve/queryApproveComment'
)
// 领导审批工单
export const PROCESS_APPROVE = getApi('portal/addition/approve/processApprove')
// [V1.5.0]取消审批工单
export const CANCEL_APPROVE = getApi('portal/addition/approve/cancelApprove')

// [V1.6.0]实体下商品接口（商品+组合商品）
export const QUERY_USERGROUP_PRODUCT = getApi('portal/sale/order/queryProductByUsergroup')
