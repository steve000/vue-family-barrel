/**
 * Created by issuser on 2018/6/29.
 */

// 采购
export const PUR_APPROVE_STATUS = {
    approving: {
        label: '审批中',
        value: 2
    },
    draft: {
        label: '草稿',
        value: 1
    },
    rejected: {
        label: '已驳回',
        value: 3
    },
    cancelled: {
        label: '已取消',
        value: 4
    },
    approved: {
        label: '审批通过',
        value: 5
    }
}
// 0未处理,1同意,2驳回,3转交,-1取消,
export const PUR_NGOC_APPROVE_STATUS = {
    '-1': '--',
    0: '待审核',
    1: '同意',
    2: '驳回',
    3: '转交'
}
export const PUR_STATUS_TEXT = {
    0: '入库异常',
    '-1': '初始化',
    1: '待收货',
    2: '部分收货',
    3: '已收货'
}
export const PUR_APPROVESTATUS_TEXT = {
    0: '入库异常',
    1: '草稿',
    2: '审批中',
    3: '已驳回',
    4: '已取消',
    5: '审批通过'
}
// export const PUR_PRICE_TYPE = {
//     0: '',
//     1: '同意'
// }
export const ORDERBY_LIST = [
    {
        viewName: '全部订单',
        view: -1
    },
    {
        viewName: '由我创建',
        view: 1
    },
    {
        viewName: '待我审批',
        view: 2
    }
]
export const PUR_STATUS = {
    inSTockAbnormal: {
        label: '入库异常',
        status: 0
    },
    waitGood: {
        label: '待收货',
        status: 1
    },
    partGood: {
        label: '部分收货',
        status: 2
    },
    finshGood: {
        label: '已收货',
        status: 3
    }
}

// export const OUT_TYPE_LIST_VALUE = {
//     saleOutbound: {
//         label: '销售出库',
//         value: 1
//     },
//     changeOutbound: {
//         label: '换货出库',
//         value: 2
//     },
//     backOutbound: {
//         label: '后台出库',
//         value: 3
//     },
//     transfersOutbound: {
//         label: '调拨出库',
//         value: 5
//     }
// }
// export const OUT_TYPE_LIST = [
//     {label: '销售出库', value: 1},
//     {label: '换货出库', value: 2},
//     {label: '后台出库', value: 3},
//     {label: '调拨出库', value: 5}]
// // 视图

// export const OUT_SHEET_TYPE_TEXT = {
//     1: '销售出库',
//     2: '换货出库',
//     3: '后台出库',
//     5: '调拨出库'
// }
// export const OUT_STATUS_TEXT = {
//     '-1': '出库异常',
//     1: '待出库',
//     2: '已出库',
//     3: '已完成',
//     4: '已撤销',
//     6: '审批中',
//     7: '已驳回'
// }
// // 创建入库  入库原因
// export const REASON_TYPE = [{type: '期初库存', reason: 2}, {type: '借用返还', reason: 3}, {type: '其他入库', reason: 1}]
// // 入库列表 左边导航状态
// export const IN_STATUS_OBJ = {
//     approving: {
//         label: '审批中',
//         value: 5
//     },
//     pendingStore: {
//         label: '待入库',
//         value: 1
//     },
//     finished: {
//         label: '已完成',
//         value: 3
//     },
//     rejected: {
//         label: '已驳回',
//         value: 6
//     },
//     canceled: {
//         label: '已取消',
//         value: 7
//     },
//     withdraw: {
//         label: '已撤销',
//         value: 4
//     },
//     exception: {
//         label: '入库异常',
//         value: -1
//     }
// }
// export const REASON_TYPE_TEXT = {
//     1: '其他入库',
//     2: '期初库存',
//     3: '借用返还'
// }
// export const SHEET_TYPE_TEXT = {
//     1: '采购入库',
//     2: '后台入库',
//     3: '调拨入库',
//     4: '销售退货',
//     5: '销售换货',
//     6: '拒收入库'
// }
// export const IN_STATUS_TEXT = {
//     5: '审批中',
//     1: '待入库',
//     3: '已完成',
//     6: '已驳回',
//     7: '已取消',
//     4: '已撤销',
//     '-1': '出库异常'
// }

// export const IN_STATUS_LIST = [
//     {label: '全部类型', value: ''},
//     {label: '入库异常', value: '-1'},
//     {label: '待入库', value: 1},
//     {label: '已完成', value: 3},
//     {label: '已取消', value: 4}]

// export const IN_TYPE_LIST = [
//     {label: '全部类型', value: ''},
//     {label: '采购入库', value: 1},
//     {label: '后台入库', value: 2},
//     {label: '调拨入库', value: 3},
//     {label: '销售退货', value: 4},
//     {label: '销售换货', value: 5},
//     {label: '拒收入库', value: 6}]

// // 合法文件类型
// export const VALID_FILE_TYPE = ['.doc', '.docx', '.xls', '.xlsx', '.csv', '.pdf', '.png', '.jpg']

// // 商品设置
// export const COMMODITY_TYPE_LIST = [{label: '全部类型', value: ''}, {label: '上架中', value: 1}, {label: '下架中', value: 2}]

// export const COMMODITY_TYPE_TEXT = {
//     1: '上架中',
//     2: '下架中'
// }
// export const COMMODITY_LIST = [{label: '实体商品', value: 1}, {label: '虚拟商品', value: 2}]

// // 解析文件格式
// export const PARSE_FILE_TYPE = ['.xls', '.xlsx']

// // 文件格式路径列表
// export const IMG_SRC = {
//     'doc': 'background_word',
//     'docx': 'background_word',
//     'xls': 'background_xls',
//     'xlsx': 'background_xls',
//     'csv': 'background_xls',
//     'pdf': 'background_pdf',
//     'png': 'background_image',
//     'jpg': 'background_image'
// }

// // 错误码排除
// // 1000用户名或密码错误， 1024验证码错误, 1015 oa验证用户名或密码错误
// export const ERROR_CODE_LIST = [1000, 1204, 1015, 16112]

// // 客户类型
// export const CUSTOMER_TYPE = [{label: '内部客户', value: 1}, {label: '外部客户', value: 2}]

// export const CUSTOMER_TYPE_TEXT = {
//     1: '内部客户',
//     2: '外部客户'
// }
