import 'es6-promise'
import Axios from 'axios'
import * as C from '../constants/api'
import cookies from './cookies'
import {
    Message
} from 'element-ui'
import utils from './misc'

const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}
Axios.defaults.timeout = 1000 * 60 * 10
Axios.interceptors.request.use(config => {
    var tmp = `${window.config.context}`
    var url = config.url.replace(tmp, '')
    const bb = config.data !== null ? (JSON.stringify(config.data) + url) : url
    const hexDigest = utils.md5(bb)
    config.headers['reqDigest'] = hexDigest
    return config
}, error => {
    return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
    if (response.config.url.indexOf('portal/captcha-image') !== -1) {
        return new Promise((resolve, reject) => {
            resolve(response)
        })
    }
    let {
        data: resp
    } = response
    let {
        responseType: resType
    } = response.config
    return new Promise((resolve, reject) => {
        const {
            code
        } = resp
        if (+code === C.CODE_STATUS_OK || resType === C.RESPONSE_TYPE_FILE) {
            resolve(resp.data ? resp.data : resp)
        } else if (code === C.CODE_SESSION_TIME_OUT) {
            cookies.delCookie('nng')
            reject(resp)
            Message.warning({
                message: '尚未登录或登录超时，请重新登录',
                showClose: true
            })
            utils.redirectToLoginPage()
        } else if (code === 1020) { // 退出登录成功
            resolve(resp)
            resp.msg && Message.success({
                message: resp.msg,
                showClose: true
            })
            // 1000用户名或密码错误， 1024验证码错误, 1015 oa验证用户名或密码错误，1005 用户名错误, 1007 session验证错误
        } else if (code === 1000 || code === 1204 || code === 1015 || code === 1005 || code === 1007) {
            reject(resp)
        } else if (code === 16112 || code === 16165) { // 导入文件错误
            reject(resp)
        } else if (code === 9902) { // 取消调拨错误9902
            reject(resp)
        } else {
            const messagesInstances = document.querySelectorAll('.el-message')
            resp.msg && messagesInstances && messagesInstances.length === 0 && Message.error({
                message: `(${resp.code})${resp.msg}`,
                showClose: true
            })
            reject(resp)
        }
    })
}, error => {
    let cookie = cookies.getCookie('nng')
    if (cookie) {
        let res = error.response
        if (res && res.data && res.data.code === 1008) {
            res.data.msg && Message.warning({
                message: res.data.msg,
                showClose: true
            })
        } else {
            Message.warning({
                message: '网络错误，请检测网络是否正常!',
                showClose: true
            })
        }
    } else {
        Message.warning({
            message: '尚未登录或登录已超时，请重新登录',
            showClose: true
        })
        // window.location.href = '#/login'
        utils.redirectToLoginPage()
    }
})

const request = (url, params = {}, headers = {}, method = METHODS.GET) => {
    let _dataType = params.dataType || ''
    if (_dataType) delete params.dataType
    let _token = params.token || ''
    if (_token) delete params.token
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'ltype': 'moaa',
            ...headers,
            'params': utils.md5(params)
        },
        method: method
    }
    if (_dataType) {
        options = Object.assign({}, options, {
            responseType: 'arraybuffer'
        })
    }
    if (_token) {
        options.headers = Object.assign({}, options.headers, {
            token: _token
        })
    }
    if (method === METHODS.POST || method === METHODS.PUT) {
        options.data = params
    } else if (method === METHODS.GET || method === METHODS.DELETE) {
        options.params = params
        // 如果想自定义content-type响应头， 需要设置options.data为非undefined值
        options.data = null
    }
    return Axios({
        url,
        ...options
    })
}

const post = (url, params, headers) => request(url, params, headers, METHODS.POST)

export const createAction = (type, payloadCreator, metaCreator) => {
    const identity = (...args) => args[0]
    const isFunc = (fn) => typeof (fn) === 'function'
    const isPromise = obj => typeof (obj) === 'object' && isFunc(obj.then)
    const finalPayloadCreator = isFunc(payloadCreator) ? payloadCreator : identity
    return ({
        commit,
        dispatch
    }, ...args) => {
        const payload = finalPayloadCreator(...args)
        const action = {
            type,
            payload
        }
        if (isFunc(metaCreator)) {
            action.meta = metaCreator(...args)
        }
        if (isPromise(payload)) {
            return payload.then(result => {
                commit(type, Object.assign(action, {
                    payload: result
                }))
                return result
            }).catch(error => {
                dispatch('hidePageLoading')
                console.error(`请求 ${type}异常，请求结果为: ${JSON.stringify(error)}`)
                return Promise.reject(error)
            })
        }

        return commit(type, Object.assign(action, {
            payload
        }))
    }
}

export default {
    // 登录
    loginin: params => post(C.USER_LOGIN, params),
    // 登出 (没用，没用后台接口，前台登出)
    logout: params => post(C.USER_LOGOUT, params), // 查询事件
    // 修改密码
    editUserPassword: params => post(C.EDIT_PASSWORD, params),
    // 获取业务实体列表
    getUserEntityList: params => post(C.GET_USER_ENTITY_LIST, params),
    // 获取验证码
    getLoginImage: params => request(C.GET_LOGIN_IMAGE, params, {
        'content-type': 'image/jpeg'
    }), // 查询事件
    // 切换业务实体
    switchGroup: params => post(C.SWITCH_GROUP, params),
    // 设置当前业务实体是否接收邮件
    sendEmailConfig: params => post(C.IS_SEND_EMAIL, params),
    // 查询用户邮件是否邮件审批
    queryIsSendEmail: params => post(C.QUERY_IS_SEND_EMAIL, params),
    // 邮件审批 token 换 session
    loginByToken: params => post(C.LOGIN_BY_TOKEN, params),

    /**    旧权限模块，有面包屑导航    */
    // 权限管理 - 查询角色列表
    queryRolesList: params => post(C.ROLES_LIST, params),
    // 权限管理 - 新增用户
    addUser: params => post(C.USER_ADDED, params),
    // 权限管理 - 删除用户
    userDel: params => post(C.USER_DEL, params),
    // 权限管理 - 修改用户
    userModify: params => post(C.USER_MODIFY, params),
    // 权限管理 - 重置密码
    userModifyPwd: params => post(C.USER_MODIFY_PWD, params),
    // 权限管理 - 修改状态
    updateUserStatus: params => post(C.USER_UPDATE_STATUS, params),
    // 权限管理 - 查询用户列表
    queryUserList: params => post(C.USER_LIST, params),
    // 权限管理 - 新增角色
    addRole: params => post(C.ROLES_ADDED, params),
    // 权限管理 - 修改角色
    editRole: params => post(C.ROLES_EDIT, params),
    // 权限管理 - 删除角色
    deleteRole: params => post(C.ROLES_DELETE, params),
    // 权限管理 - 指定用户
    QueryUserRoleList: params => post(C.ROLES_IDENTIFY, params),
    // 权限管理 - 设置权限
    setMenu: params => post(C.ROLES_GETMENULIST, params),
    // 权限管理 - 获取系统配置信息
    getSettingInfo: params => post(C.ROLES_SETTINGINFO, params),
    // 权限管理 - 添加用户
    addRolesUser: params => post(C.ROLES_ADDUSER, params),
    // 权限管理 - 获取用户列表
    queryNoUserList: params => post(C.ROLES_GETNOUSERLIST, params),
    // 权限管理 - 保存系统配置信息
    getSettingSave: params => post(C.SETTING_SAVE, params),
    // 权限管理 - 获取权限列表
    queryPrivilegeList: params => post(C.PRIVILEGE_LIST, params),
    // 权限管理 - 获取权限列表
    saveRivilege: params => post(C.PRIVILEGE_ADD, params),
    // 权限管理 - 为角色授权菜单权限
    grantRivilege: params => post(C.ROLES_GRANTMENU, params),
    // 权限管理 - 为角色授权菜单权限
    deletePrivilege: params => post(C.PRIVILEGE_DELETE, params),
    // 权限管理 - 角色的上下移
    movePrivilege: params => post(C.PRIVILEGE_MOVEUPDOWN, params),
    /**  旧实体商品，有面包屑导航  */
    // 实体商品配置 - 品牌管理
    goodsConfigBrand: params => post(C.GOODS_CONFIG_BRAND, params),
    // 实体商品配置 - 计量单位管理
    goodsConfigUnitQuery: params => post(C.GOODS_CONFIG_UNIT_QUERY, params),
    // 获取商品实例列表
    queryGoodsList: params => post(C.GOODS_LIST, params),
    // 获取商品实例列表
    queryGoodsListNew: params => post(C.GOODS_LIST_NEW, params),
    // 商品管理的导出
    GoodsManageExport: params => post(C.GOODS_MANAGE_EXPORT, params),

    /**   旧采购，有面包屑导航     */
    // 采购 - 模拟获取列表
    procurementsList: params => post(C.PROCUREMENTS_LIST, params),
    // 新增采购订单
    createProcureOrder: params => post(C.CREATE_PURCHASE_ORDER, params),

    /**   商品模块  */
    // [v1.1.0]根据条件查询虚拟商品列表
    virtualSkuList: params => post(C.VIRTUAL_SKU_LIST, params),
    // [v1.1.0]查询虚拟商品详细信息
    virtualSkuDetails: params => post(C.VIRTUAL_SKU_DETAILS, params),
    // [1.6.0]系统管理员商品审批列表
    productApproveQuery: params => post(C.PRODUCT_APPROVE_QUERY, params),

    // 查询全部sku列表
    querySkuList: params => post(C.SKU_LIST, params),
    // 根据skuId查询sku详情
    querySkuDetail: params => post(C.SKU_DETAIL, params),
    // 其它业务实体商品上架操作
    querySetGoodsShelves: params => post(C.SET_GOODS_SHELVES, params),
    // 根据商品Id查询sku列表
    queryGoodsListSku: params => post(C.GOODS_LIST_SKU, params),
    // 上架其它业务实体商品列表
    queryGoodsShelvesListSku: params => post(C.GOODS_SHELVES_LIST, params),
    // 根据条件查询商品列表
    querySkuListByConditionSearchProduct: params => post(C.QUERY_SKU_LIST_BY_CONDITION_PRODUCT, params),
    // 根据商品编码查询商品信息
    queryGoodsInfoModify: params => post(C.QUERY_GOODS_INFO_MODIFY, params),
    // 新建商品
    goodsCreate: params => post(C.GOODS_CREATE, params),
    // 新建商品审批
    goodsCreateApproval: params => post(C.GOODS_CREATE_APPROVAL, params),
    // 查询商品编辑信息
    queryGoodsEdit: params => post(C.QUERY_GOODS_EDIT, params),
    // 根据商品编码查询操作日志
    queryGoodsLog: params => post(C.QUERY_GOODS_LOG, params),
    // 查询商品修改详情日志
    queryGoodsEditDetailLog: params => post(C.QUERY_GOODS_EDIT_DETAILLOG, params),
    // 查询所有的品牌
    queryAllBrands: params => post(C.QUERY_ALL_BRANDS, params),
    // 新建品牌
    addBrands: params => post(C.ADD_BRANDS, params),
    // 查询类目
    queryCate: params => post(C.QUERY_CATE, params),
    // 查询全部类目
    queryCateAll: params => post(C.QUERY_CATE_ALL, params),
    // 查询计量单位
    queryGoodsUnit: params => post(C.QUERY_GOODS_UNIT, params),
    // 查询商品属性
    queryGoodsAttr: params => post(C.QUERY_GOODS_ATTR, params),
    /** 组合商品模块 */
    // 组合商品列表
    queryMergeList: params => post(C.QUERY_MERGE_LIST, params),
    // 新增组合商品
    createMerge: params => post(C.CREATE_MERGE, params),
    // 组合商品列表
    editMerge: params => post(C.EDIT_MERGE, params),
    // 组合商品列表
    deleteMerge: params => post(C.DELETE_MERGE, params),
    // 组合商品列表
    mergeDetail: params => post(C.MERGE_DETAIL, params),
    /**  出库管理接口 */
    // 获取出库单列表
    queryStockOutSheet: params => post(C.QUERY_STOCKOUTSHEET, params),
    // 查询出库单详情
    queryStockOutSheetDetail: params => post(C.QUERY_STOCKOUTSHEETDETAIL, params),
    // 删除出库单
    deleteStockOutSheet: params => post(C.STOCKOUTSHEET_DELETE, params),
    // 撤销出库单
    cancelStockOutSheet: params => post(C.STOCKOUTSHEET_CANCEL, params),
    // 取消出库单
    cancelOutApprove: params => post(C.CALCEL_STOCKOUT_APPROVE, params),
    // 创建出库单
    createStockOutSheet: params => post(C.STOCKOUTSHEET_CREATE, params),
    // 确认单次调拨出库
    allotOutCheck: params => post(C.ALLOT_CHECK, params),
    // 查询待出库商品列表
    queryWaitStockOutProduct: params => post(C.QUERY_WAITSTOCKOUT_PRODUCT, params),
    // 获取初始化待出库商品列表
    queryInnitProduct: params => post(C.QUERY_INNIT_PRODUCT, params),
    // 查询出库单商品的串码信息
    queryOutsnList: params => post(C.QUERY_OUTSN_LIST, params),
    // 重新入库【入库超时后调用】
    outboundRetry: params => post(C.STOCKOUT_RETRY, params),
    // 入库撤销
    revokeStockIn: params => post(C.REVOKE_STOCK_IN, params),
    // 出库导出
    exportOutbound: params => post(C.EXPORT_OUTBOUND, params),
    // 调拨出库根据关联单号跳转至销售
    diaoboRelationId: params => post(C.DIAOBO_RELATEDSHEETID, params),
    // 查询本地仓库出库的出库单快递单号和承运商
    queryLocalExpress: params => post(C.QUERY_LOCAL_EXPRESSINFO, params),
    // [v1.5.0]出库状态统计
    stockoutStatusList: params => post(C.STOCKOUT_STATUSLIST, params),
    // [v1.5.0]出库状态统计
    stockoutEditLog: params => post(C.STOCKOUT_EDIT_LOG, params),
    // 请求中移物流日志接口
    batchQueryItemStatus: params => post(C.STOCK_ITEM_STATUS, params),
    /** 设置 */
    /** 仓库设置 */
    // [v1.0.2]获取用户实体下的仓库列表       (左边导航部分，分成‘本地仓’、‘中移物流仓’，及‘普通仓’、‘不良品仓’,和待发仓)
    getStorehouseListQuery: params => post(C.QUERY_STOREHOUSE_LIST, params),
    // [v1.0.2.1]查询用户实体下的全部仓库列表 （主页列表部分，信息比较全）
    queryAllStorehouseList: params => post(C.QUERY_ALL_STOREHOUSE_LIST, params),
    // [v1.0.2.1]修改仓库状态
    changeStorehouseStatus: params => post(C.CHANGE_STOREHOUSE_STATUS, params),
    // [v1.0.2.1]根据仓库id获取仓库信息
    queryStorehouseById: params => post(C.QUERY_STOREHOUSE_BY_ID, params),
    // [v1.0.2.1]校验外部仓库信息           （校验中移物流仓的仓库编码和地址编码正确否）
    checkExtStorehouse: params => post(C.CHECK_EXT_STOREHOUSE, params),
    // [v1.0.2.1]修改仓库
    modifyStorehouse: params => post(C.MODIFY_STOREHOUSE, params),
    // [v1.0.2]查询用户实体下仓库列表        (下拉框部分，包含仓库id，仓库名，仓库类型)
    getStorehouseList: params => post(C.GET_STOREHOUSE_LIST, params),
    // 创建仓库
    createStorehouse: params => post(C.CREATE_STOREHOUSE, params),
    // 修改仓库联系人
    modifyStorehouseLink: params => post(C.MODIFY_STOREHOUSE_LINK, params),
    // 删除仓库联系人
    deleteStorehouseLink: params => post(C.DELETE_STOREHOUSE_LINK, params),
    // 新增仓库联系人
    addStorehouseLink: params => post(C.ADD_STOREHOUSE_LINK, params),
    // 根据仓库名称查询仓库（列表）
    queryStorehouseMenu: params => post(C.QUERY_STOREHOUSE_MENU, params),
    // 查询用户组下所有仓库列表包含代发仓
    queryStorehouseMenuList: params => post(C.QUERY_STOREHOUSE_MENU_LIST, params),

    /** 供应商 */
    // 获取所有供应商列表         （下拉列表部分，接口内容是供应商id和名称列表）
    queryAllSupplierList: params => post(C.QUERY_ALL_SUPPLIER_LIST, params),
    // 新增供货商
    addSupplier: params => post(C.ADD_SUPPLIER, params),
    // 查看供货商信息
    querySupplierDetail: params => post(C.QUERY_SUPPLIER_DETAIL, params),
    // 查看业务实体下供应商详情
    queryGroupSupplierDetail: params => post(C.QUERY_GROUP_SUPPLIER_DETAIL, params),
    // 修改业务实体的供应商地址
    modifySupplierAddress: params => post(C.MODIFY_SUPPLIER_ADDRESS, params),
    // 新增业务实体的供应商地址信息
    addSupplierAddress: params => post(C.ADD_SUPPLIER_ADDRESS, params),
    // [v1.0.2.1]修改业务实体的供应商信息
    modifySupplierInfo: params => post(C.MODIFY_SUPPLIER_INFO, params),
    // [v1.0.2.1]修改业务实体的供应商状态
    modifySupplierStatus: params => post(C.MODIFY_SUPPLIER_STATUS, params),
    // 查看供应商基础详情
    querySupplierBaseDetail: params => post(C.QUERY_SUPPLIER_BASE_DETAIL, params),

    /** 商品设置模块 */
    // 查询业务实体下的商品列表
    queryUserRelationProduct: params => post(C.QUERY_USER_RELATION_PRODUCT, params),
    // 修改业务实体关联商品状态
    changeDownUserRelationProduct: params => post(C.CHANGE_DOWM_USER_RELARION_PRODUCT, params),
    // 查询未添加到业务实体的商品
    queryUserUnRelationProduct: params => post(C.QUERY_USER_UNRELATION_PRODUCT, params),
    // 业务实体关联商品
    userRelationProduct: params => post(C.USER_RELATION_PRODUCT, params),
    // 同步信息
    updateRelationInfo: params => post(C.UPDATE_RELATION_INFO, params),
    // 商品设置导出
    exportUserGroupSku: params => post(C.EXPORT_USER_GROUP_SKU, params),

    /** 客户设置模块 */
    // 查询客户列表
    queryCustomerList: params => post(C.QUERY_CUSTOMER_LIST, params),
    // 查看客户详情
    queryCustomerDetail: params => post(C.QUERY_CUSTOMER_DETAIL, params),
    // 新增客户
    createCustomer: params => post(C.CREATE_CUSTOMER, params),
    // 更新客户
    updateCustomer: params => post(C.UPDATE_CUSTOMER, params),
    // 删除客户
    deleteCustomer: params => post(C.DELETE_CUSTOMER, params),
    // 设置默认地址
    setCustomerAddressDefault: params => post(C.SET_CUSTOMER_ADDRESS_DEFAULT, params),
    // 删除客户地址
    deleteCustomerAddress: params => post(C.DELETE_CUSTOMER_ADDRESS, params),
    // 新增客户地址
    addCustomerAddress: params => post(C.ADD_CUSTOMER_ADDRESS, params),
    // 更新客户地址
    updateCustomerAddress: params => post(C.UPDATE_CUSTOMER_ADDRESS, params),
    // 客户名称查重
    queryCustomerRepeat: params => post(C.QUERY_COUSTOMER_REPEAT, params),

    /** 审批设置   */
    // 查看审批设置[1.5.0]
    queryApproveConfig: params => post(C.QUERY_APPROVE_CONFIG, params),
    // 保存审批设置[1.5.0]
    saveApproveConfig: params => post(C.SAVE_APPROVE_CONFIG, params),
    // 审批详情[1.5.0]
    queryApproveDetail: params => post(C.QUERY_APPROVE_DETAIL, params),

    /** 库存调拨 */
    // 查看调拨仓库列表[1.4.0]
    getAllTransferList: params => post(C.GET_ALL_TRANSFER_LIST, params),
    // 调拨状态统计
    getStateStatistic: params => post(C.GET_STATE_STATISTIC, params),
    // 取消调拨
    quitAllotSheet: params => post(C.QUIT_ALLOT_SHEET, params),
    // 获取仓库调拨列表
    getTransferList: params => post(C.GET_TRANSFER_LIST, params),
    // 删除调拨记录
    deleteTransfer: params => post(C.DELETE_TRANSFER, params),
    // 查看调拨记录
    viewTransfer: params => post(C.VIEW_TRANSFER, params),
    // 新增调拨单
    createTransfer: params => post(C.CREATE_TRANSFER, params),
    // 调拨的操作日志
    transferLogQuery: params => post(C.TRANSFET_LOG_QUERY, params),
    // [v1.4.0]新增调拨申请单
    createTransferAll: params => post(C.CREATE_TRANSFER_ALL, params),

    /** 入库 */
    // 分页获取入库单列表
    queryStockInList: params => post(C.QUERY_STOCK_IN_LIST, params),
    // 创建入库单
    createStockIn: params => post(C.CREATE_STOCK_IN, params),
    // 查看入库单详情
    queryStockInDetail: params => post(C.QUERY_STOCK_IN_DETAIL, params),
    // 确认入库
    allotCheck: params => post(C.AllOTCHECK, params),
    // 查询入库商品列表
    queryWaitStockInProduct: params => post(C.QUERY_WAIT_STOCK_PRODUCT, params),
    // 编辑入库单（数据回显）
    stockinDetailForEdit: params => post(C.SHOW_STOCK_IN_DETAIL, params),
    // 查询待入库的关联单号列表
    queryRelatedSheetList: params => post(C.QUERY_RELATEDSHEET_LIST, params),
    // 查看采购订单信息
    queryPurchaseOrderDetail: params => post(C.QUERY_PURCHASE_ORDER_DETAIL, params),
    // 查询入库通知单基本信息
    queryStockInBasicDetail: params => post(C.QUERY_STOCK_IN_BASIC_DETAIL, params),
    // 查询入库通知单入库详情
    queryStockInListDetail: params => post(C.QUERY_STOCK_IN_LIST_DETAIL, params),
    // 查询入库单商品的串码信息
    querySnList: params => post(C.QUERY_SN_LIST, params),
    // 查询入库通知单商品列表
    queryStockInProductList: params => post(C.QUERT_STOCK_IN_PRODUCT_LIST, params),
    // 消单次入库单号
    cancelStockIn: params => post(C.CANCEL_STOCK_IN, params),
    // 重传入库单
    retryStockIn: params => post(C.RETRY_STOCK_IN, params),
    // 上传文件
    uploadStockFile: params => post(C.UPLOAD_FLIE, params),
    // 解析上传文件
    parseStockFileExcel: params => post(C.PARSE_BACK_STOCK_EXCEL, params),
    // 出入库单附件列表
    getAttachmentList: params => post(C.GET_ATTACHMENT_LIST, params),
    // 入库导出
    exportStockin: params => post(C.EXPORT_STOCKIN, params),
    // 取消单次入库
    cancelStockInApprove: params => post(C.CALCEL_STOCKIN_APPROVE, params),
    // [v1.5.0]入库状态统计
    stockinStatusList: params => post(C.STOCKIN_STATUS_LIST, params),
    // 下载
    downloadFile: params => post(C.DOWNLOAD_FILE, params),
    // 取消采购订单
    cancelPurchaseOrder: params => post(C.CANCEL_PURCHASEORDER, params),
    // 查询业务关联附件列表
    queryModuleAttrList: params => post(C.QUERY_MODULE_ATTRLIST, params),
    // 删除业务关联附件列表
    deleteModuleAttrList: params => post(C.DELETE_MODULE_ATTRLIST, params),
    // 采购订单批量入库
    PurchaseBatchStockIn: params => post(C.PURCHASE_BATCH_STOCK_IN, params),
    // 获取采购订单状态的数据条数
    QueryCountStatusNum: params => post(C.QUERY_COUNT_STATUS_NUM, params),
    // 查询业务关联附件列表
    PurchaseAttachList: params => post(C.PURCHASE_ATTACH_LIST, params),
    // [v1.5.0]查询入库操作日志编辑信息
    queryStockInOpLog: params => post(C.QUERY_STOCKIN_LOG, params),

    /** 库存管理改版 新 */
    // [v1.0.2，修改]分页查询商品维度查询商品库存情况
    queryProductInventoryLisy: params => post(C.QUERY_PRODUCT_INVENTORY_LIST, params),
    // [v1.0.2]查询商品库存分布
    queryProductDistribution: params => post(C.QUERY_PRODUCT_DISTRIBUTION, params),
    // [v1.0.2]分页查询代发仓库的商品列表
    queryDistributionProductList: params => post(C.QUERY_DISTRIBUTION_PRODUCT_LIST, params),
    // [v1.0.2.1]同步中移物流库存数据
    SynchroLogistics: params => post(C.SYNCHRO_LOGISTICS, params),
    // [v1.0.2.2]根据仓库id分页查询串码列表
    QueryStockSnList: params => post(C.QUERY_STOCK_SN_LIST, params),
    // [v1.0.2.2]搜索指定仓库的商品
    QueryProductSearch: params => post(C.QUERY_PRODUCT_SEARCH, params),
    // [v1.0.2.2]查询指定仓库中商品的可用库存
    QueryProductEffectiveStock: params => post(C.QUERY_PRODUCT_EFFECTIVESTOCK, params),
    // 库存管理的左边导航
    StockManageLeftNave: params => post(C.STOCK_MANAGE_LEFT_NAVE, params),
    /** 库存管理改版 新 */

    /** 库存管理 */
    // 以商品维度查询商品库存情况
    queryStockProductList: params => post(C.QUERY_STOCK_PRODUCT_LIST, params),
    // 以仓库维度分页查询商品库存
    queryStockIdList: params => post(C.QUERY_STOCKID_LIST, params),
    // 查看盘点记录列表
    queryPandianList: params => post(C.QUERY_PANDIAN_LIST, params),
    // 根据盘点Id查询盘点详情
    queryPandianIdDetailList: params => post(C.QUERY_PANDIANID_DETAIL_LIST, params),
    // 创建盘点
    creatPandian: params => post(C.CREAT_PANDIAN, params),
    // 更新盘点
    updataPandian: params => post(C.UPDATA_PANDIAN, params),
    // 结束盘点
    finshPandian: params => post(C.FINSH_PANDIAN, params),
    // 根据条件查询库存商品
    queryStockProductByCondition: params => post(C.QUERY_STOCK_PRODUCT_BY_CONDITION, params),
    // 获取未盘点的商品数量
    getUninventoryNum: params => post(C.GET_UNINVENTORY_NUM, params),
    // 库存导出
    stockInventoryExport: params => post(C.STOCK_INVENTORY_EXPORT, params),

    /** 采购模块 */
    // 分页获取采购订单列表
    queryPurchaseOrderList: params => post(C.QUERY_PURCHASE_ORDER_LIST, params),
    // 删除采购订单
    deletePurchaseOrder: params => post(C.DELETE_PURCHASE_ORDER, params),
    // 修改时间
    updatePurchaseOrderArrivedTime: params => post(C.UPDATE_MODIFYARRIVEDTIME, params),
    // 修改备注
    updatePurchaseOrderComment: params => post(C.UPDATE_MODIFYCOMMENT, params),
    /** 查看采购订单详情 **/
    // [v1.0.2.1]获取采购订单审批记录
    queryPurchaseApproveLog: params => post(C.QUERY_PURCHASE_APPROVE_LOG, params),
    // 查看采购订单详情
    queryPurchaseDetails: params => post(C.QUERY_PURCHASE_DETAILS, params),
    // 获取采购订单操作日志列表
    queryPurchaseLog: params => post(C.QUERY_PURCHASE_LOG, params),
    // 根据采购操作日志id获取修改
    queryPurchaseIdModify: params => post(C.QUERY_PURCHASE_ID_MODIFY, params),
    // 根据采购操作日志id获取修改2
    queryPurchaseIdModifyTwo: params => post(C.QUERY_PURCHASE_ID_MODIFY_TWO, params),
    // 根据采购操作日志id获取修改3
    queryPurchaseIdModifyThree: params => post(C.QUERY_PURCHASE_ID_MODIFY_THREE, params),
    // 根据关联单号查询单次入库列
    querySinglePutstorage: params => post(C.QUERY_SINGLE_PUTSTORAGE, params),
    // 新增或修改采购订单
    savePurchaseOrder: params => post(C.SAVE_PURCHASE_ORDERS, params),
    // 提交采购订单审批
    approvePurchaseOrder: params => post(C.APPROVE_PURCHASE_ORDER, params),
    // 修改采购订单
    editPurchaseOrder: params => post(C.SAVE_PURCHASE_ORDER, params),
    // 导出采购订单
    exportPurchaseOrder: params => post(C.EXPORT_PURCHASE_ORDER, params),

    /** 系统设置 */
    queryConfigGroup: params => post(C.QUERY_USER_GROUP, params),
    // 查询用户列表
    queryEntityUserList: params => post(C.QUERY_ENTITY_USER_LIST, params),
    // 查询所有用户列表
    queryAllEntityUserList: params => post(C.QUERY_ALL_ENTITY_USER_LIST, params),
    // 新增oa用户
    addCreateFromOaUser: params => post(C.ADD_CREATE_FORM_OA_USER, params),
    // 编辑用户
    editEntity: params => post(C.EDIT_ENTITY_USER, params),
    // 新增用户
    addEntity: params => post(C.ADD_ENTITY_USER, params),
    // 解绑用户
    removeEntity: params => post(C.REMOVE_ENTITY_USER, params),
    // 查询公司列表
    queryCompanyList: params => post(C.REQURY_COMPANY_LIST, params),
    // 创建业务实体
    createEntity: params => post(C.CREATE_ENTITY, params),
    // 关联用户
    associateUser: params => post(C.ASSOCIATE_USER, params),
    // 查询oa账号信息
    searchOaCount: params => post(C.SEARCH_OA_COUNT, params),
    // 查询业务实体下角色
    queryUserGroupRole: params => post(C.QUERY_USER_GROUP_ROLE, params),

    /** 合同管理 */
    // [v1.0.2]搜索业务实体的所有采购合同列表
    queryEntityContractList: params => post(C.QUERY_ENTITY_CONTRACT_LIST, params),
    // 查询采购合同列表
    queryContractList: params => post(C.QUERY_CONTRACT_LIST, params),
    // 启用合同
    EnableEffectiveContract: params => post(C.ENABLE_EFFECTIVE_CONTRACT, params),
    // 查询采购合同详情
    QueryPurchaseOrderDetailList: params => post(C.QUERY_PURCHASE_ORDER_DETAILS_LIST, params),
    // 保存采购合同
    SavePurchseContract: params => post(C.SAVE_PURCHASE_CONTRACT, params),
    // 搜索业务实体下的商品列表
    SearchGoodsList: params => post(C.SEARCH_GOODS_LIST, params),
    // 搜索采购合同
    SearchPurchaseContract: params => post(C.SEARCH_PURCHASE_CONTRACT, params),
    // 新增业务实体的采购合同
    AddPurchaseContract: params => post(C.ADD_PURCHASE_CONTRACT, params),
    // 获取业务实体的供应商列表
    QueryVendorList: params => post(C.QUERY_VENDOR_LIST, params),
    // 查询业务实体下供应商列表
    QueryEntityVendorList: params => post(C.QUERY_ENTITY_VENDOR_LIST, params),
    // 修改业务实体的采购合同
    ModifyPurchaseContract: params => post(C.MODIFY_PURCHASE_CONTRACT, params),
    // [v1.0.2]根据条件查询合同的商品列表
    QueryContractProductList: params => post(C.QUERY_CONTRACT_PRODUCT_LIST, params),
    // [v1.0.2]根据合同序号获取采购订单列表
    ContractSeqPurchaseList: params => post(C.CONTRACT_SEQ_PURCHASE_LIST, params),
    // 根据合同序号查询采购商品列表
    ContractPurchaseSkuList: params => post(C.CONTRACT_PURCHASE_SKU_LIST, params),
    // 解析采购合同导入商品文件
    ParseProductFile: params => post(C.PARSE_PRODUCT_FILE, params),

    /**  地区接口 */
    // 获取省列表
    queryProvinceList: params => post(C.QUERY_PROVINCE_LIST, params),
    // 获取市列表
    queryCityList: params => post(C.QUERY_CITY_LIST, params),
    // 获取地区列表
    queryAreaList: params => post(C.QUERY_AREA_LIST, params),

    /** -----------销售业务 分割线-----------------**/
    /*   销售模块   */
    // 查询菜单订单数量
    querySalesMenuOrderNum: params => post(C.QUERY_SALE_MENUORDERNUM, params),
    // 修改订单收货地址
    updateOrderAddress: params => post(C.UPDATE_ORDER_ADDRESS, params),
    // 下载导入数据解析结果
    resultDownload: params => post(C.GET_RESULT_DOWNLOAD, params),
    // 根据上级行政区获取下级行政区列表
    queryProvinceCityArea: params => post(C.QUERY_PROVINCECITYAREA, params),

    /* 销售订单 */
    // 分页获取销售订单列表
    querySalesOrderList: params => post(C.QUERY_SALES_ORDER_LIST, params),
    // 新增销售订单
    createOrderAdd: params => post(C.CREATE_SALES_ORDER_ORDERADD, params),
    // 编辑销售订单
    updataOrder: params => post(C.UPDATE_SALES_ORDER, params),
    // 销售订单根据订单ID获取订单信息
    queryOrderMsg: params => post(C.QUERY_SALES_ORDER, params),
    // 销售订单-根据订单ID编辑备注
    updateOrderMemark: params => post(C.UPDATE_SALES_ORDER_REMARK, params),
    // 销售订单-模糊查询商品列表
    querySalesGoodslist: params => post(C.QUERY_SALES_GOODSLIST, params),
    // 导出订单列表
    exportSalesOrder: params => post(C.EXPORT_SALES_ORDER, params),
    // 查看查看销售订单-商品清单
    querySalesOrder: params => post(C.QUERY_SALE_ORDER, params),
    // 导入订单
    importSalesOrders: params => post(C.IMPORT_SALES_ORDERS, params),
    // 导入取消接口
    doCancelImport: params => post(C.DO_CANCEL_IMPORT, params),
    // 刷新导入结果数据
    refreshImportData: params => post(C.DO_REFRESH_IMPORT_DATA, params),
    // 修改补全地址信息标识
    updateAddressSign: params => post(C.DO_UPDATE_ADDRESS_SIGN, params),
    // 查询补全/地址严重缺失地址信息订单
    queryErrorTypeInfo: params => post(C.QUERY_ERROR_TYPE_INFO, params),
    // 查询销售订单属性
    queryOrderAttr: params => post(C.QUERY_ORDER_ATTR, params),
    // 导入数据查询
    importOrdersDataQuery: params => post(C.IMPORT_ORDERS_DATA_QUERY, params),
    // 导入数据生成销售订单
    dataConfirmImport: params => post(C.GET_DATA_CONFIRM_IMPORT, params),
    // 批量编辑订单状态
    editBatchOrderStatus: params => post(C.EDIT_ORDER_BATCH_UPDATESTATUS, params),
    // 获取物流单记录
    getOutboundRouterList: params => post(C.QUERTY_OUTBOUND_ROUTER_LIST, params),
    // 只显示渠道设置中选择了导入模板的渠道
    channelQueryWithTemplate: params => post(C.QUERTY_CHANNEL_TEMPLATE, params),
    // 查询已使用的渠道模板
    queryOnLineChannelCount: params => post(C.QUERTY_ON_LINE_CHANNEL_COUNT, params),
    // 获取销售单的物流单记录
    getRouterList: params => post(C.QUERTY_ROUTER_LIST, params),
    //  异常订单已拒收确认拒收
    updataSalesErrorefuse: params => post(C.UPDATA_SALES_ERROEREFUSE, params),
    // 销售推送订单发货状况
    queryPushStatus: params => post(C.QUERY_PUSH_STATUS, params),
    // 推送订单
    getPushSaleOrder: params => post(C.PUSH_SALEORDER, params),
    // 地址解析
    getAddressResolveCode: params => post(C.ADDRESS_RESOLVE, params),
    // 获取二级渠道列表
    getSourceChannelList: params => post(C.QUERY_SOURCECHANNEL_LIST, params),

    /* 退货订单 */
    // 新增退货订单
    addNewRefuseOrder: params => post(C.POST_NEW_REFUSE_ORDER, params),
    // 退货列表
    returnList: params => post(C.RETURN_LIST, params),
    // 通过退货订单ID查询退货商品清
    queryRefundGoods: params => post(C.QUERY_FEFUND_GOODS, params),
    // 退货订单不同状态的数量
    queryReturnOrderCount: params => post(C.QUERY_RETURN_ORDER_COUNT, params),
    // 根据退货订单ID编辑备注信息
    editRefundRemark: params => post(C.EDIT_REFUND, params),
    // 根据退货订单ID编辑状态
    editRefundStatus: params => post(C.CHANGE_REFUND_STATUS, params),
    // 查询销售订单的退货列表
    getRefund: params => post(C.GET_ORDER_RETURN, params),
    // 编辑订单状态
    editOrderStatus: params => post(C.EDIT_ORDER_STATUS, params),
    // 根据主键ID查询退货单详细信息
    queryRefundInfo: params => post(C.QUERY_REFUND_DETAIL, params),
    // 编辑退货订单
    returnOrderUpdate: params => post(C.UPADTE_RETURN_ORDER, params),
    // 根据销售订单id获取退货商品
    queryReturnProListByOrderId: params => post(C.QUERY_RETURN_PROLIST_ORDER_ID, params),
    // 根据退货订单ID编辑状态
    returnStatusUpdate: params => post(C.POST_RETURN_STATUS_UPDATE, params),
    // 退货-订单扭转
    postReturnPush: params => post(C.POST_RETURN_PUSH, params),

    /* 换货订单 */
    // 换货各状态订单数量
    getChangeStatusCount: params => post(C.QUERY_CHANGE_ORDER_COUNT, params),
    // 分页获取换货订单列表
    queryChangeOrderList: params => post(C.QEURY_CHANGE_LIST, params),
    // 根据主键ID查询换货订单详情
    queryChangeInfo: params => post(C.QUERY_CHANGE_DETAIL, params),
    // 根据换货订单ID查询换货商品清单列表
    queryChangeList: params => post(C.QUERY_CHANGE_LIST, params),
    // 根据换货订单ID编辑状态
    editChangeStatus: params => post(C.EDIT_CHANGE_STATUS, params),
    // 根据销售订单id查询换货列表
    querySalesChangeList: params => post(C.QUERY_SALES_CHANGE_LIST, params),
    // 新增换货订单
    createChangeOrder: params => post(C.CREATE_CHANGE_ORDER, params),
    // 更改换货单
    editChangeOrder: params => post(C.EDIT_CHANGE_ORDER, params),
    // 更改收货地址
    editChangeAddress: params => post(C.EDIT_CHANGE_ADDRESS, params),
    // 入库单保存
    storeInSave: params => post(C.POST_STORE_IN_SAVE, params),
    // 换货出库
    outStoreChangeOrder: params => post(C.CHANGE_OUT_STORE, params),
    // 更改换货的备注信息
    updateChangeRemark: params => post(C.UPDATE_CHANGE_REMARK, params),
    // 获取销售订单，有可换货数量
    querySaleOrderWithCount: params => post(C.QUERY_SALE_ORDER_WITH_COUNT, params),
    // 获取换货订单详情，有可换货数量
    queryChangeOrderWithCount: params => post(C.QUERY_CHANGE_ORDER_WITH_COUNT, params),
    // 查询换货订单入库记录
    queryChangeOrderInStore: params => post(C.QUERY_CHANGE_ORDER_IN_STORE, params),
    // 据订单id模糊查询订单列表（dev）
    getSalesListBlurry: params => post(C.QUERY_ORDER_BLURRY, params),
    // 异常订单重新入库
    inStockAgain: params => post(C.IN_STOCK_AGAIN, params),
    // 异常订单重新出库
    outStockAgain: params => post(C.OUT_STOCK_AGAIN, params),
    // 流转换货订单
    pushChangeOrder: params => post(C.PUSH_CHANGE_ORDER, params),

    /* 出库 */
    // 出库保存
    saveSalesStoreout: params => post(C.SAVE_SALES_STOREOUT, params),
    // 查询仓库列表
    queryStoreList: params => post(C.QUERY_STORE_STORELIST, params),
    // 按条件查询渠道
    queryAddressByChannelId: params => post(C.QUERY_CHANNEL_ADDRESSBYID, params),
    // 批量出库保存
    saveSalesStoreOutBatch: params => post(C.SAVE_SALES_STOREOUTBATCH, params),
    // 根据销售订单商品生成出货单信息
    querySalesOutStoreList: params => post(C.QUERY_SALES_OUTSTORELIST, params),
    // 根据仓库id获取仓库信息详情
    queryStoreById: params => post(C.QUERY_STOREHOUSE_BY_ID, params),
    // 获取订单详情出库记录
    getOutStoreList: params => post(C.GET_OUT_STORE_RECORD, params),
    // 大代发出库单保存
    saveProxySaleStoreOut: params => post(C.SAVE_PROXYSALES_STOREOUT, params),

    /*  渠道  */
    // 查詢所有渠道
    queryChannelAll: params => post(C.QUERY_CHANNEL_ALLCHANNEL, params),
    // 根据搜索获取渠道
    queryChannelBySearch: params => post(C.QUERY_CHANNEL_BYSEARCH, params),
    // 根据channelId查询channel信息
    queryChannelById: params => post(C.QUERY_CHANNEL_BYID, params),
    // 获取分类渠道数据
    getstatusChannel: params => post(C.GETSTATUSCHANNEL, params),
    // 修改渠道的状态
    updataStatus: params => post(C.UPDATACHANNE_STATUS, params),
    // 查询用户未关联实体
    queryUsedRelatedGroup: params => post(C.QUERY_USED_RELATED_GROUP, params),

    /*  渠道地址  */
    // 新增渠道收貨地址
    createChannelAddress: params => post(C.CREATE_CHANNEL_ADDRESS, params),
    // 设置渠道默认地址
    updateChannelDefalutAddress: params => post(C.UPDATE_CHANNEL_DEFALUTADDRESS, params),
    // 编辑渠道地址
    updateChannelAddress: params => post(C.UPDATE_CHANNEL_ADDRESS, params),
    // 更改渠道收货地址状态
    updateChannelAddressStatus: params => post(C.UPDATE_CHANNEL_ADDRESSSTATUS, params),
    // 查询渠道收货地址
    queryReceivingAddress: params => post(C.QUERY_SALES_RECEIVING_ADDRESS, params),
    // 编辑渠道
    updateChannel: params => post(C.UPDATE_CHANNEL, params),
    // 新增渠道
    addStatus: params => post(C.ADDCHANNE, params),
    // 新增渠道
    downloadOrderTemplate: params => post(C.DOWNLOADORDERTEMPLATE, params),

    /* 渠道商品 */
    // 导入渠道商品
    postImportChannelGoods: params => post(C.POST_IMPORT_CHANNEL_GOODS, params),
    // 导入渠道商品-下载模板
    queryImportChannelGoodsTemplate: params => post(C.QUERY_IMPORT_CHANNEL_GOODS_TEMPLATE, params),
    // 导入数据生成渠道商品
    postDataConfirmImport: params => post(C.POST_DATA_CONFIRM_IMPORT, params),
    /** 根据id查询商品信息 **/
    querySalesOrderId: params => post(C.QUERY_SALE_ORDER_WITHID, params),
    // 通过渠道ID查商品
    searchmer: params => post(C.SEARCHMERCHANDISE, params),
    // 新增渠道商品
    createChannelGood: params => post(C.CREATE_CHANNEL_GOOD, params),
    // 编辑渠道商品
    updateChannelGood: params => post(C.UPDATE_CHANNEL_GOOD, params),
    // 新增渠道商品
    queryUserGroupAll: params => post(C.QUERY_USERGROUP_ALL, params),
    // 通过渠道商品ID查询商品信息
    queryGoodsByChannelSkuId: params => post(C.QUERY_GOODMSG_BYCHANNELSKUID, params),
    // 售卖/停售商品
    startOrStopChannelGoods: params => post(C.START_OR_STOP_CHANNEL_GOODS, params),
    // 查询所有发货方
    queryAllVendor: params => post(C.QUERY_SALE_ALLVENDOR, params),
    // 根据渠道id查询渠道下商品
    queryChannelGoodByChannelId: params => post(C.QUERY_CHANNELGOOD_BYCHANNELID, params),
    // 删除渠道商品
    deleteChannelGood: params => post(C.DELETE_CHANNELSKU, params),
    // 导出渠道商品
    exportChannelGood: params => post(C.EXPORT_CHANNELGOODS, params),

    /*  日志  */
    // 查询操作日志
    queryOrderLog: params => post(C.QUERY_ORDER_LOG, params),
    // 查看销售订单，日志详情
    queryOrderLogDetail: params => post(C.QUERY_ORDER_LOG_DETAIL, params),
    // 消息操作人
    queryOperators: params => post(C.QUERY_OPERATORS, params),
    // 异常订单
    queryOrderAndErrorCount: params => post(C.QUERY_ORDER_AND_ERROR_COUNT, params),

    /*  首页  */
    // 首页--统计滞留订单
    queryRetentionOrderCount: params => post(C.QUERY_RETENTIONORDERCOUNT, params),
    // 渠道订单量分布
    querySaleOrderEcharts: params => post(C.QUERY_SALES_ORDER_ECHARTS, params),

    /* 消息中心  */
    // 消息列表
    queryMessageList: params => post(C.QUERY_MESSAGE_LIST, params),
    // 获取消息操作类型
    queryMessageOperateType: params => post(C.QUERY_MESSAGE_OPERATE_TYPE, params),
    // 消息中心，获取未读数量
    queryMessageNotRead: params => post(C.QUERY_MESSAGE_NOT_READ, params),
    // 消息中心，设置已读
    setMessageReaded: params => post(C.SET_MESSAGE_READED, params),
    // 获取下载文件流
    getDownloadFile: params => post(C.GET_DOENLOAD_FILE, params),

    /* 文件服务器 */
    // 下载
    downloadFtpFiles: params => post(C.DOWNLOAD_FTPFILE, params),

    /* 待办事项  */
    // 待审批
    // 采购订单审批列表
    queryToDoPruchaseOrderList: params => post(C.QUERY_TODO_PURCHASE_ORDER_LIST, params),
    // 销售订单审批列表
    queryToDoSaleOrderList: params => post(C.QUERY_TODO_SALE_ORDER_LIST, params),
    // 商品审批列表
    queryToDoGoodsList: params => post(C.QUERY_TODO_GOODS_LIST, params),
    // 入库单审批列表
    queryToDoStockInOrderList: params => post(C.QUERY_TODO_STOCKIN_ORDER_LIST, params),
    // 出库单审批列表
    queryToDoStockOutOrderList: params => post(C.QUERY_TODO_STOCKOUT_ORDER_LIST, params),
    // 待审批数量统计接口
    queryToDoApproveCount: params => post(C.QUERY_TODO_APPROVE_COUNT, params),
    // 待入库
    // 待入库的订单数量接口
    queryToDoStockInCount: params => post(C.QUERY_TODO_STOCKIN_COUNT, params),
    // 待出库
    // 待出库的订单数量统计
    queryToDoStockOutCount: params => post(C.QUERY_TODO_STOCKOUT_COUNT, params),

    // 待办事项订单数量统计接口
    queryToDoCount: params => post(C.QUERY_TODO_COUNT, params),

    // 我已审批
    // 我已审批的采购订单列表
    queryApproveByMePurchaseOrder: params => post(C.QUERY_APPROVEBUME_PURCHASE_ORDER, params),
    // 我已审批的销售订单列表
    queryApproveByMeSaleOrder: params => post(C.QUERY_APPROVEBUME_SALE_ORDER, params),
    // 我已审批的入库单列表
    queryApproveByMeStockInOrder: params => post(C.QUERY_APPROVEBUME_STOCKIN_ORDER, params),
    // 我已审批的出库单列表
    queryApproveByMeStockOutOrder: params => post(C.QUERY_APPROVEBUME_STOCKOUT_ORDER, params),
    // 我已审批的各类单据数量统计接口
    queryApproveCount: params => post(C.QUERY_APPROVEBUME_COUNT, params),

    // 由我创建
    // 统一的由我创建列表数量统计接口
    queryCountCreatedByMe: params => post(C.QUERY_COUNT_CREATED_BY_ME, params),
    // 查询由我创建的采购订单
    queryPurchaseListByMe: params => post(C.QUERY_PURCHASE_LIST_BY_ME, params),
    // 查询由我创建的销售订单
    querySaleListByMe: params => post(C.QUERY_SALELIST_BY_ME, params),
    // 查询由我创建的换货
    queryExchangeListByMe: params => post(C.QUERY_EXCHANGE_LIST_BY_ME, params),
    // 查询由我创建的退货
    queryReturnListByMe: params => post(C.QUERY_RETURN_LIST_BY_ME, params),
    // 查询由我创建的入库
    queryInstoreListByMe: params => post(C.QUERY_INSTORE_LIST_BY_ME, params),
    // 查询由我创建的出库
    queryOutstoreListByMe: params => post(C.QUERY_OUTSTORE_LIST_BY_ME, params),

    // 查询上一个审批人接口
    queryLastApproveUser: params => post(C.QUERY_LAST_APPROVE_USER, params),

    // 查询某用户审批过的单据ID列表接口
    queryOrderListApproveByMe: params => post(C.QUERY_ORDER_LIST_APPROVEBYME, params),

    // 查询审批意见
    queryApproveComment: params => post(C.QUERY_APPROVE_COMMENT, params),
    // 领导审批工单
    processApprove: params => post(C.PROCESS_APPROVE, params),
    // [V1.5.0]取消审批工单
    cancelApprove: params => post(C.CANCEL_APPROVE, params),

    // [V1.6.0]实体下商品接口（商品+组合商品）
    queryUserGroupProduct: params => post(C.QUERY_USERGROUP_PRODUCT, params)

}
