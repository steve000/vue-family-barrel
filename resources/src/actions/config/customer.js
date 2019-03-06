/**
 * Created by issuser on 2018/8/1.
 */
import * as C from '../../constants/api'
import Api, {
    createAction
} from '../../utils/api'
export default {
    // 查询客户列表
    queryCustomerList: createAction(C.QUERY_CUSTOMER_LIST, Api.queryCustomerList),
    // 查看客户详情
    queryCustomerDetail: createAction(C.QUERY_CUSTOMER_DETAIL, Api.queryCustomerDetail),
    // 新增客户
    createCustomer: createAction(C.CREATE_CUSTOMER, Api.createCustomer),
    // 更新客户
    updateCustomer: createAction(C.UPDATE_CUSTOMER, Api.updateCustomer),
    // 删除客户
    deleteCustomer: createAction(C.DELETE_CUSTOMER, Api.deleteCustomer),
    // 设置默认地址
    setCustomerAddressDefault: createAction(C.SET_CUSTOMER_ADDRESS_DEFAULT, Api.setCustomerAddressDefault),
    // 删除客户地址
    deleteCustomerAddress: createAction(C.DELETE_CUSTOMER_ADDRESS, Api.deleteCustomerAddress),
    // 新增客户地址
    addCustomerAddress: createAction(C.ADD_CUSTOMER_ADDRESS, Api.addCustomerAddress),
    // 更新客户地址
    updateCustomerAddress: createAction(C.UPDATE_CUSTOMER_ADDRESS, Api.updateCustomerAddress),
    // 客户名称查重
    queryCustomerRepeat: createAction(C.QUERY_COUSTOMER_REPEAT, Api.queryCustomerRepeat)
}
