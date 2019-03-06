<!--
/*
    下拉及搜索选择仓库组件，可以传入要选择的仓库类型（本地仓 '1' 或 物流仓 '2'），选择仓库后 返回选择仓库的id 和 仓库类型

    运用在：库存调拨模块 下拉选择仓库，出库管理 创建后台出库 下拉选择仓库

    传入参数：
                storehouseChildType: 下拉列表里显示的仓子类型，对象   非必填，'1'代表普通仓（含实体代发仓），'2'代码不良品仓，'3'代表代发仓(逻辑代发仓 或说 代发子仓)
                clearStoreHoseValue, 是否清除仓库值，非必填， true 清楚选中项，默认为false
                placeholder, placeholder信息
                isClear, 是否可清楚选中信息，默认为true，非必填
                excludeStockId, 排除的仓库id，非必填
                width, 选择框的宽度，非必填，默认 300px

    返回        emit('getSelectedStorehouse', storehouseId, storehouseType)
                        getSelectedStorehouse 是调用函数
                        storehouseId 是选中的仓库的id
                        storehouseType 是选中的仓库的类型
                        param 是选中的列表那一项的 value, 不是选中层级展示项 param = [value], 选中层级展示项 param = [value, children.value]
*/
-->
<template>
    <div class="select-storehouse">
        <el-cascader :value="value" :placeholder="placeholder" :options="options" :style="{width: width}" :before-filter="remoteSearch" :clearable="isClear" filterable separator="" size="small" @change="getValue" @focus="checkData"></el-cascader>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { STOCK_TYPE, STOCK_CHILD_TYPE } from '~/constants/storehouseConfigConst'
export default {
    name: 'SelectAllStorehouses',
    props: {
        storehouseChildType: {
            type: Array,
            default () {
                return [STOCK_CHILD_TYPE.NORMAL, STOCK_CHILD_TYPE.BAD, STOCK_CHILD_TYPE.PROXY]
            },
            required: false
        },
        placeholder: {
            type: String,
            default: '请选择仓库',
            required: false
        },
        clearStoreHoseValue: { // 清除仓库选中项
            type: Boolean,
            default: false,
            required: false
        },
        isClear: {
            type: Boolean,
            default: true,
            required: false
        },
        excludeStockId: {
            type: String,
            default: '',
            required: false
        },
        width: {
            type: String,
            default: '300px',
            required: false
        }
    },
    data () {
        return {
            options: [],
            searchContent: '',
            value: [],
            curValue: '',
            normal: false, // 显示 普通仓（含实体代发仓）
            bad: false, // 显示 不良品仓
            proxy: false // 显示 代发仓（只有 逻辑代发仓）
        }
    },
    computed: {
        stockChildType: function () {
            return this.storehouseChildType
        }
    },
    watch: {
        clearStoreHoseValue () {
            if (this.clearStoreHoseValue) {
                this.value = []
            }
        },
        excludeStockId (val) {
            this.getStorehouseList()
        }
    },
    activated () {
        this.searchContent = ''
        this.getStorehouseList()
    },
    mounted () {
        this.searchContent = ''
        this.getStorehouseList()
    },
    methods: {
        ...mapActions(['queryStorehouseMenuList']),
        // 获取仓库列表，包括有层级和没有层级两个逻辑
        getStorehouseList () {
            // 判断显示子仓库类型 true是显示， false 不显示
            this.stockChildType.forEach(val => {
                if (+val === +STOCK_CHILD_TYPE.NORMAL) {
                    this.normal = true
                } else if (+val === +STOCK_CHILD_TYPE.BAD) {
                    this.bad = true
                } else if (+val === +STOCK_CHILD_TYPE.PROXY) {
                    this.proxy = true
                }
            })
            this.queryStorehouseMenuList({ content: this.searchContent }).then(resp => {
                // 排除过滤的 仓库
                if (this.excludeStockId) {
                    resp = resp.filter(one => {
                        return one.storehouseId !== this.excludeStockId
                    })
                }

                // 转换数据结构
                // 物流普通仓、代发仓
                let logisticsNormal = []
                // 物流不良品仓
                let logisticsBad = []
                // 本地普通仓、代发仓
                let localNormal = []
                // 本地不良品仓
                let localBad = []
                // 本地代发子仓
                let localProxy = []
                // 物流代发子仓
                let logisticsProxy = []
                let dataOk = true
                resp.forEach(one => {
                    if (+one.storehouseType === +STOCK_TYPE.LOCAL) {
                        if (one.channelId) {
                            localProxy.push(one)
                        } else if (+one.storehouseChildType === +STOCK_CHILD_TYPE.NORMAL || +one.storehouseChildType === +STOCK_CHILD_TYPE.PROXY) {
                            localNormal.push(one)
                        } else if (+one.storehouseChildType === +STOCK_CHILD_TYPE.BAD) {
                            localBad.push(one)
                        } else {
                            dataOk = false
                        }
                    } else if (+one.storehouseType === +STOCK_TYPE.LOGISTICS) {
                        if (one.channelId) {
                            logisticsProxy.push(one)
                        } else if (+one.storehouseChildType === +STOCK_CHILD_TYPE.NORMAL || +one.storehouseChildType === +STOCK_CHILD_TYPE.PROXY) {
                            logisticsNormal.push(one)
                        } else if (+one.storehouseChildType === +STOCK_CHILD_TYPE.BAD) {
                            logisticsBad.push(one)
                        } else {
                            dataOk = false
                        }
                    } else {
                        dataOk = false
                    }
                })

                if (dataOk === false) {
                    return ''
                }
                let tmpLogisticsNormal = {}
                logisticsNormal.forEach(item => {
                    if (tmpLogisticsNormal[item.storehouseNum]) {
                        tmpLogisticsNormal[item.storehouseNum].push(item)
                    } else {
                        tmpLogisticsNormal[item.storehouseNum] = [item]
                    }
                })

                // 把数据结构按展现形式对应的调整
                let res = []
                // 如果有搜索内容，下拉列表只有一个层级
                if (this.searchContent) {
                    // 物流仓 普通仓、代发仓
                    logisticsNormal.forEach(one => {
                        let contratName = one.storehouseName + one.siteName
                        one.contratName = contratName
                        res.push({
                            label: contratName,
                            value: JSON.stringify(one)
                        })
                    })
                } else { // 如果没有搜索内容，下拉列表 中移物流普通仓有两个层级
                    // 物流仓 普通仓、代发仓
                    for (let item in tmpLogisticsNormal) {
                        let children = []
                        tmpLogisticsNormal[item].forEach(one => {
                            children.push({
                                label: one.siteName,
                                value: JSON.stringify(one)
                            })
                        })
                        res.push({
                            children: children,
                            label: tmpLogisticsNormal[item][0].storehouseName,
                            value: JSON.stringify(tmpLogisticsNormal[item][0])
                        })
                    }
                }

                // 物流仓 不良品仓
                this.bad && logisticsBad.forEach(one => {
                    let contratName = one.storehouseName + one.siteName
                    one.contratName = contratName
                    one.storehouseId && res.push({
                        label: contratName,
                        value: JSON.stringify(one)
                    })
                })

                // 本地仓 普通仓、代发仓
                this.normal && localNormal.forEach(one => {
                    one.contratName = one.storehouseName
                    one.storehouseId && res.push({
                        label: one.storehouseName,
                        value: JSON.stringify(one)
                    })
                })

                // 本地仓 不良品仓
                this.bad && localBad.forEach(one => {
                    one.contratName = one.storehouseName
                    one.storehouseId && res.push({
                        label: one.storehouseName,
                        value: JSON.stringify(one)
                    })
                })

                // 本地代发子仓
                this.proxy && localProxy.forEach(one => {
                    let contratName = one.channelName ? (one.storehouseName + '_' + one.channelName) : one.storehouseName
                    one.contratName = contratName
                    one.storehouseId && res.push({
                        label: contratName,
                        value: JSON.stringify(one)
                    })
                })

                // 物流代发子仓
                this.proxy && logisticsProxy.forEach(one => {
                    let contratName = one.channelName ? (one.storehouseName + one.siteName + '_' + one.channelName) : one.storehouseName + one.siteName
                    one.contratName = contratName
                    one.storehouseId && res.push({
                        label: contratName,
                        value: JSON.stringify(one)
                    })
                })
                this.options = res

                // 有搜索的返回
                if (this.searchContent) {
                    return true
                }
            })
        },

        // 输入搜索内容后，进行搜索
        remoteSearch (res) {
            this.searchContent = res
            this.options = [{ label: '搜索中...', value: '' }]
            this.getStorehouseList()
            return false
        },
        // 选中下拉列表里的仓库后 触发emit
        getValue (param) {
            this.curValue = param
            let storehouseId = ''
            let storehouseType = ''
            if (param && param.length === 1) {
                let tmp = JSON.parse(param[0])
                storehouseId = tmp.storehouseId
                storehouseType = tmp.storehouseType
            } else if (!param || param.length === 0) {

            } else {
                let tmp = JSON.parse(param[1])
                storehouseId = tmp.storehouseId
                storehouseType = tmp.storehouseType
            }
            this.$emit('getSelectedStorehouse', storehouseId, storehouseType, param)
        },

        // 失去焦点时触发，若有输入搜索但没选中，则清空下拉列表，重新搜索
        checkData () {
            if (this.searchContent && this.curValue.length < 1) {
                this.searchContent = ''
                this.options = []
                this.getStorehouseList()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.select-storehouse {
  display: inline-block;
  .el-cascader {
    width: 300px;

    .el-cascader-menu .el-cascader-menu__item {
      padding: 8px 30px 8px 20px;
    }
  }
}
</style>
