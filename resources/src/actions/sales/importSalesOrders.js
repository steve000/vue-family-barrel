import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 导入销售订单
    importSalesOrders: createAction(C.IMPORT_SALES_ORDERS, Api.importSalesOrders),
    importOrdersDataQuery: createAction(C.IMPORT_ORDERS_DATA_QUERY, Api.importOrdersDataQuery),
    dataConfirmImport: createAction(C.GET_DATA_CONFIRM_IMPORT, Api.dataConfirmImport),
    resultDownload: createAction(C.GET_RESULT_DOWNLOAD, Api.resultDownload),
    // 取消导入订单
    doCancelImportAction: createAction(C.DO_CANCEL_IMPORT, Api.doCancelImport),
    // 刷新导入结果数据
    refreshImportDataAction: createAction(C.DO_REFRESH_IMPORT_DATA, Api.refreshImportData),
    // 查询补全/地址严重缺失地址信息订单
    queryErrorTypeInfoAction: createAction(C.QUERY_ERROR_TYPE_INFO, Api.queryErrorTypeInfo),
    // 修改补全地址信息标识
    updateAddressSignAction: createAction(C.DO_UPDATE_ADDRESS_SIGN, Api.updateAddressSign)
}
