/**
 *  create by guozhen  2018/8/30
 */

// 调拨管理

// 调拨 状态值与描述对应关系
export const STATUS_VALUE_LABEL = {
    '-1': '调拨异常',
    '1': '待出库',
    '2': '已出库',
    '3': '出库已完成',
    '4': '请求中移超时',
    '5': '待入库',
    '6': '已入库',
    '7': '已完成',
    '8': '已取消'
}
// 调拨 状态描述与值对应关系
export const STATUS_LABEL_VALUE = {
    '调拨异常': '-1',
    '待出库': '1',
    '已出库': '2',
    '出库已完成': '3',
    '请求中移超时': '4',
    '待入库': '5',
    '已入库': '6',
    '已完成': '7',
    '已取消': '8'
}
