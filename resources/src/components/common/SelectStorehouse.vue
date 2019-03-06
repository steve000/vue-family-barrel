<!--
/*
    下拉及搜索选择仓库组件，可以传入要选择的仓库类型（本地仓 1 或 物流仓 2），选择仓库后 返回选择仓库的id 和 仓库类型
    传入参数：    storehouseType, 下拉列表里显示的仓库类型，非必填， ‘1’ 代表本地仓   ‘2’ 代表中移物流仓，默认为‘’
                storehouseChildType: 下拉列表里显示的仓子类型，对象   非必填，‘1’代表普通仓（含实体代发仓），‘2’代表不良品仓，‘3’代表代发仓(逻辑代发仓)
                clearStoreHoseValue, 是否清除仓库值，非必填， true 清楚选中项，默认为false
                dedfaultStockId，默认选中的 仓库id，非必填，默认为null
                typeNumber, 调用组件的环境(与接口有关)，非必填,0 代表仓库，1代表销售，默认为1，需要注意
                params，调用接口传入参数，与typeNumber有关，非必填
                placeholder, placeholder信息
                isClear, 是否可清楚选中信息，默认为true，非必填
                excludeStockId, 排除的仓库id，非必填
                width, 选择框的宽度，非必填，默认 300px
    返回        emit('getSelectedStorehouse', storehouseId, storehouseType)
                        getSelectedStorehouse 是调用函数
                        storehouseId 是选中的仓库的id
                        storehouseType 是选中的仓库的类型

*/
-->
<template>
    <div class="select-storehouse">
        <el-cascader :value="value" :placeholder="placeholder" :options="options" :style="{width: width}" :before-filter="remoteSearch" :clearable="isClear" filterable separator="" size="small" @change="getValue" @focus="checkData"></el-cascader>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'SelectStorehouse',
    props: {
        storehouseType: {
            type: String,
            default: '',
            required: false
        },
        storehouseChildType: {
            type: Array,
            default () {
                return ['1', '2', '3']
            },
            required: false
        },
        // 类型，仓库0，销售1
        typeNumber: {
            type: Number,
            default: 1,
            required: false
        },
        placeholder: {
            type: String,
            default: '请选择仓库',
            required: false
        },
        params: {
            type: Object,
            default () {
                return {}
            }
        },
        clearStoreHoseValue: { // 清除仓库选中项
            type: Boolean,
            default: false,
            required: false
        },
        dedfaultStockId: { // 默认选中项的仓库Id
            type: String,
            default: null,
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
        },
        isBigProxy: Boolean
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
        storehouseType (val) {
            this.searchContent = ''
            if (val) {
                this.getStorehouseList()
            }
        },
        'params': {
            handler (val) {
                this.searchContent = ''
                this.getStorehouseList()
            },
            deep: true
        },
        clearStoreHoseValue: function (nval) {
            // if (nval) {
            this.value = []
            // this.searchContent = ''
            // this.getStorehouseList()
            // }
        },
        excludeStockId (val) {
            if (val) {
                this.getStorehouseList()
            }
        },
        dedfaultStockId (val) {
            if (val) {
                this.getStorehouseList()
            }
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
        ...mapActions(['queryStorehouseMenu', 'queryStoreList']),
        // 获取仓库列表，包括有层级和没有层级两个逻辑
        getStorehouseList () {
            // 判断显示子仓库类型 true是显示， false 不显示
            this.stockChildType.forEach(val => {
                if (val === '1') {
                    this.normal = true
                } else if (val === '2') {
                    this.bad = true
                } else if (val === '3') {
                    this.proxy = true
                }
            })
            const api = [this.queryStorehouseMenu, this.queryStoreList][this.typeNumber]
            const params = [
                { storehouseType: this.storehouseType, content: this.searchContent },
                Object.assign({}, {
                    searchContent: this.searchContent,
                    storehouseType: this.storehouseType
                }, this.params)
            ][this.typeNumber]
            api(params).then(resp => {
                let localMap = resp.localMap
                let logistics = resp.logistics
                let res = []
                // 如果有搜索内容，下拉列表只有一个层级
                if (this.searchContent) {
                    // 物流仓 普通仓
                    this.normal && logistics.normal && logistics.normal.forEach(one => {
                        one.siteList && one.siteList.forEach(item => {
                            item.storehouseId && res.push({
                                label: item.contratName,
                                value: item.storehouseId + '_' + item.storehouseType + '_' + item.contratName
                            })
                        })
                    })
                } else { // 如果没有搜索内容，下拉列表 中移物流普通仓有两个层级
                    // 物流仓 普通仓
                    this.normal && logistics.normal && logistics.normal.forEach(one => {
                        let children = []
                        one.siteList && one.siteList.forEach(item => {
                            item.storehouseId && children.push({
                                label: item.siteName,
                                value: item.storehouseId + '_' + item.storehouseType + '_' + item.siteName
                            })
                        })
                        one.storehouseNum && res.push({
                            label: one.storehouseName,
                            value: one.storehouseNum + '_' + one.storehouseType + '_' + one.storehouseName,
                            children: children
                        })
                    })
                }
                // 物流仓 不良品仓  *大代发不显示bad
                if (this.isBigProxy !== true) {
                    this.bad && logistics.bad && logistics.bad.forEach(one => {
                        one.siteList && one.siteList.forEach(item => {
                            item.storehouseId && res.push({
                                label: item.contratName,
                                value: item.storehouseId + '_' + item.storehouseType + '_' + item.contratName
                            })
                        })
                    })
                }
                // 本地仓 普通仓
                this.normal && localMap.normal && localMap.normal.forEach(one => {
                    one.storehouseId && res.push({
                        label: one.storehouseName,
                        value: one.storehouseId + '_' + one.storehouseType + '_' + one.storehouseName
                    })
                })
                // 本地仓 不良品仓   *大代发不显示bad
                if (this.isBigProxy !== true) {
                    this.bad && localMap.bad && localMap.bad.forEach(one => {
                        one.storehouseId && res.push({
                            label: one.storehouseName,
                            value: one.storehouseId + '_' + one.storehouseType + '_' + one.storehouseName
                        })
                    })
                }
                // 代发仓
                this.proxy && resp.proxy && resp.proxy.forEach(one => {
                    one.storehouseId && res.push({
                        label: one.storehouseName,
                        value: one.storehouseId + '_' + one.storehouseType + '_' + one.storehouseName
                    })
                })
                this.options = res

                //
                let houseId = this.dedfaultStockId
                houseId && this.hasDefaultValue(houseId)

                this.excludeStockId && this.filterStock()
                // 有搜索的返回
                if (this.searchContent) {
                    return true
                }
            })
        },
        // 获取仓库id为 stockId 时，仓库在 this.options 列表里的位置
        getStockIndex (stockId) {
            let res = []
            if (stockId && this.options.length > 0) {
                for (let i = 0; i < this.options.length; i++) {
                    // 退出循环控制
                    let isbreak = false
                    // 有children属性，在children列表里寻找 默认id 的记录，找到的话 返回
                    if (this.options[i].children && this.options[i].children.length > 0) {
                        let data = this.options[i].children
                        for (let j = 0; j < data.length; j++) {
                            if (data[j].value.split('_')[0] === stockId) {
                                res = [i, j]
                                isbreak = true
                                break
                            }
                        }
                    } else if (this.options[i].value.split('_')[0] === stockId) {
                        res = [i]
                        isbreak = true
                    }
                    if (isbreak) {
                        break
                    }
                }
                return res
            } else {
                return res
            }
        },

        // 排除this.options里的 排除仓库
        async filterStock () {
            let res = await this.getStockIndex(this.excludeStockId)
            if (res && res.length > 0) {
                if (res.length === 1) {
                    this.options.splice(0, 1)
                } else if (res.length === 2) {
                    // 如果展开层级只有一个，则删除层级
                    if (this.options[res[0]].children.length === 1) {
                        this.options.splice(0, 1)
                    } else {
                        this.options[res[0]].children.splice(1, 1)
                    }
                }
            }
        },
        // 输入搜索内容后，进行搜索
        async remoteSearch (res) {
            this.searchContent = res
            const tmp = await this.getStorehouseList()
            return tmp
        },
        // 选中下拉列表里的仓库后 触发emit
        getValue (param) {
            this.curValue = param
            let storehouseId = ''
            let storehouseType = ''
            if (param && param.length === 1) {
                [storehouseId, storehouseType] = param[0].split('_')
            } else if (!param || param.length === 0) {

            } else {
                [storehouseId, storehouseType] = param[1].split('_')
            }
            this.$emit('getSelectedStorehouse', storehouseId, storehouseType, param)
        },
        // 有默认显示值时
        hasDefaultValue (dedfaultStockId) {
            if (dedfaultStockId) {
                let defaultItem = null
                // 遍历仓库列表
                for (let i = 0; i < this.options.length; i++) {
                    // 退出循环控制
                    let isbreak = false
                    // 有children属性，在children列表里寻找 默认id 的记录，找到的话 取数据 返回
                    if (this.options[i].children && this.options[i].children.length > 0) {
                        defaultItem = this.options[i].children.find((val) => {
                            return val.value.split('_')[0] === dedfaultStockId
                        })
                        if (defaultItem) {
                            this.value = [this.options[i].value, defaultItem.value]
                            isbreak = true
                            this.$emit('getSelectedStorehouse', defaultItem.value.split('_')[0], defaultItem.value.split('_')[1], this.value)
                        }
                    } else if (this.options[i].value.split('_')[0] === dedfaultStockId) {
                        this.value[0] = this.options[i].value
                        isbreak = true
                        this.$emit('getSelectedStorehouse', this.value[0].split('_')[0], this.value[0].split('_')[1], this.value)
                    }
                    if (isbreak) {
                        break
                    }
                }
            }
        },
        // 失去焦点时触发，若有输入搜索但没选中，则清空下拉列表，重新搜索
        checkData () {
            setTimeout(() => {
                if (this.searchContent && this.curValue.length < 1) {
                    this.searchContent = ''
                    this.options = []
                    this.getStorehouseList()
                }
            }, 0)
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
