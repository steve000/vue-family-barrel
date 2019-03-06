
// 系统设置模块 角色下拉选择 等用到的角色键值关系

export const ROLE_LABEL_VALUE = {
    3001: '管理员',
    3002: '仓库管理员',
    3003: '一般用户'
}

export const ROLE_VALUE_LABEL = {
    '管理员': 3001,
    '仓库管理员': 3002,
    '一般用户': 3003
}

// 商品审批常量
export const GOODS_APPROVE_STATUS = [{
    label: '全部', value: 99
}, {
    label: '待审批', value: 0
}, {
    label: '已通过', value: 1
}, {
    label: '已驳回', value: 2
}]

export const GOODS_APPROVE_VALUE_LABEL = {
    0: '待审批',
    1: '已通过',
    2: '已驳回',
    3: '已转交',
    4: '已取消'
}
