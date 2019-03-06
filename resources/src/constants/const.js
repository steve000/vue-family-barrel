/**
 * Created by issuser on 2018/6/29.
 */

// 出库
export const OUT_STATUS_OBJ = {
    all: {
        label: '全部',
        value: null
    },
    approving: {
        label: '审批中',
        value: 6
    },
    pendingStore: {
        label: '待出库',
        value: 1
    },
    finishedStore: {
        label: '已出库',
        value: 2
    },
    done: {
        label: '已完成',
        value: 3
    },
    rejected: {
        label: '已驳回',
        value: 7
    },
    canceled: {
        label: '已取消',
        value: 8
    },
    withdraw: {
        label: '已撤销',
        value: 4
    },
    exception: {
        label: '出库异常',
        value: -1
    }
}
export const OUT_TYPE_LIST_VALUE = {
    saleOutbound: {
        label: '销售出库',
        value: 1
    },
    changeOutbound: {
        label: '换货出库',
        value: 4
    },
    backOutbound: {
        label: '后台出库',
        value: 3
    },
    transfersOutbound: {
        label: '调拨出库',
        value: 5
    }
}
export const OUT_TYPE_LIST = [
    {label: '全部类型', value: ''},
    {label: '销售出库', value: 1},
    {label: '销售换货', value: 4},
    {label: '后台出库', value: 3},
    {label: '调拨出库', value: 5}]
// 视图
export const ORDERBY_LIST = [
    {label: '全部订单', value: -1},
    {label: '待我审批', value: 2},
    {label: '由我创建', value: 1}]
export const OUT_SHEET_TYPE_TEXT = {
    1: '销售出库',
    4: '销售换货',
    3: '后台出库',
    5: '调拨出库'
}
export const OUT_STATUS_TEXT = {
    '-1': '出库异常',
    1: '待出库',
    2: '已出库',
    3: '已完成',
    4: '已撤销',
    5: '已撤销',
    6: '审批中',
    7: '已驳回',
    8: '已取消'
}
// 创建出库  出库原因
export const OUT_REASON_TYPE_TEXT = {
    1: '报损',
    2: '领用',
    3: '盘亏'
}
// 配送方式
export const OUT_DELIVERY_TYPE = {
    '20': '物流',
    '30': '自提'
}
// 加急
export const OUT_URGENT_SIGN = {
    ' ': '不加急',
    'X': '加急'
}
// 创建入库  入库原因
export const REASON_TYPE = [{type: '期初库存', reason: 2}, {type: '借用返还', reason: 3}, {type: '其他入库', reason: 1}]
// 入库列表 左边导航状态
export const IN_STATUS_OBJ = {
    all: {
        label: '全部',
        value: null
    },
    approving: {
        label: '审批中',
        value: 5
    },
    pendingStore: {
        label: '待入库',
        value: 1
    },
    finished: {
        label: '已完成',
        value: 3
    },
    rejected: {
        label: '已驳回',
        value: 6
    },
    canceled: {
        label: '已取消',
        value: 7
    },
    withdraw: {
        label: '已撤销',
        value: 4
    },
    exception: {
        label: '入库异常',
        value: -1
    }
}
export const STOCKIN_TYPE_LIST_VALUE = {
    produceStockIn: {
        label: '采购入库',
        value: 1
    },
    backStockIn: {
        label: '后台入库',
        value: 2
    },
    transfersStockIn: {
        label: '调拨入库',
        value: 3
    },
    returnStockIn: {
        label: '销售退货',
        value: 4
    },
    changeStockIn: {
        label: '销售换货',
        value: 6
    },
    rejectStockIn: {
        label: '拒收入库',
        value: 5
    }
}
export const REASON_TYPE_TEXT = {
    1: '其他入库',
    2: '期初库存',
    3: '借用返还'
}
export const SHEET_TYPE_TEXT = {
    1: '采购入库',
    2: '后台入库',
    3: '调拨入库',
    4: '销售退货',
    6: '销售换货',
    5: '拒收入库'
}
export const IN_STATUS_TEXT = {
    5: '审批中',
    1: '待入库',
    3: '已完成',
    6: '已驳回',
    7: '已取消',
    4: '已撤销',
    '-1': '入库异常'
}

export const IN_STATUS_LIST = [
    {label: '全部类型', value: ''},
    {label: '入库异常', value: '-1'},
    {label: '待入库', value: 1},
    {label: '已完成', value: 3},
    {label: '已取消', value: 4}]

export const IN_TYPE_LIST = [
    {label: '全部类型', value: ''},
    {label: '采购入库', value: 1},
    {label: '后台入库', value: 2},
    {label: '调拨入库', value: 3},
    {label: '销售退货', value: 4},
    {label: '销售换货', value: 6},
    {label: '拒收入库', value: 5}]

// 合法文件类型
export const VALID_FILE_TYPE = ['.doc', '.docx', '.xls', '.xlsx', '.csv', '.pdf', '.png', '.jpg']

// 商品设置
export const COMMODITY_TYPE_LIST = [{label: '全部类型', value: ''}, {label: '上架中', value: 1}, {label: '下架中', value: 2}]

export const COMMODITY_TYPE_TEXT = {
    1: '上架中',
    2: '下架中'
}
export const COMMODITY_LIST = [{label: '实体商品', value: 1}, {label: '虚拟商品', value: 2}]

// 解析文件格式
export const PARSE_FILE_TYPE = ['.xls', '.xlsx']

// 文件格式路径列表
export const IMG_SRC = {
    'doc': 'background_word',
    'docx': 'background_word',
    'xls': 'background_xls',
    'xlsx': 'background_xls',
    'csv': 'background_xls',
    'pdf': 'background_pdf',
    'png': 'background_image',
    'jpg': 'background_image'
}

// 错误码排除
// 1000用户名或密码错误， 1024验证码错误, 1015 oa验证用户名或密码错误
export const ERROR_CODE_LIST = [1000, 1204, 1015, 16112]

// 客户类型
export const CUSTOMER_TYPE = [{label: '内部客户', value: 1}, {label: '外部客户', value: 2}]

export const CUSTOMER_TYPE_TEXT = {
    1: '内部客户',
    2: '外部客户'
}
