<!--
/*
    下拉及搜索选择全部仓库组件
    返回参数：   storehouseType, 下拉列表里显示的仓库类型，非必填， ‘1’ 代表本地仓   ‘2’ 代表中移物流仓，默认为‘’
                storehouseChildType: 下拉列表里显示的仓子类型，对象   非必填，‘1’代表普通仓（含实体代发仓），‘2’代表不良品仓，‘3’代表代发仓(逻辑代发仓)
                clearStoreHoseValue, 是否清除仓库值，非必填， true 清楚选中项，默认为false
                placeholder, placeholder信息
                isClear, 是否可清楚选中信息，默认为true，非必填
                excludeStockId, 排除的仓库id，非必填
    返回        emit('getSelectedStorehouse', storehouseId, storehouseType)
                        getSelectedStorehouse 是调用函数
                        storehouseId 是选中的仓库的id
                        storehouseType 是选中的仓库的类型
*/
-->

<template>
    <div class="select-storehouse">
        <el-cascader :placeholder="placeholder" v-model="defaultValue" :options="options" :before-filter="remoteSearch"
                     :clearable="isClear" filterable separator="" size="small" @change="getValue" @focus="checkData">
        </el-cascader>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    name: 'SelectAllStorehouse',
    props: {
        placeholder: {
            type: String,
            default: '请选择仓库',
            required: false
        },
        storehouseName: {
            type: String,
            default: '',
            required: false
        },
        isClear: {
            type: Boolean,
            default: true,
            required: false
        },
        clearStoreHoseValue: {
            // 清除仓库选中项
            type: Boolean,
            default: false,
            required: false
        },
        excludeStockId: {
            // 删除仓库的传过来的id
            type: String,
            default: '',
            required: false
        },
        channelId: {
            // 渠道id
            type: String,
            default: '',
            required: false
        },
        storehouseId: {
            // 仓库id
            type: String,
            default: '',
            required: false
        }
    },
    data() {
        return {
            defaultValue: [],
            options: [],
            searchContent: '',
            storehouseList: [],
            curValue: []
        }
    },
    watch: {
        storehouseId(newVal, oldVal) {
            if (newVal && !oldVal) {
                this.getStorehouseList(() => {
                    this.defaultValue = this.searchValues(this.options)
                })
            }
        },
        clearStoreHoseValue () {
            this.defaultValue = []
        }
        // excludeStockId(val) {
        //     if (val) {
        //         this.getStorehouseList()
        //     }
        // }
    },
    activated() {
        this.searchContent = ''
        this.getStorehouseList()
    },
    mounted () {
        this.getStorehouseList()
    },
    methods: {
        ...mapActions(['queryStorehouseMenuList']),
        // 仓库输入搜索内容后，进行搜索
        remoteSearch(res) {
            this.searchContent = res
            this.options = [{label: '搜索中...', value: ''}]
            this.getStorehouseList()
            return false
        },
        checkNull(str) {
            return str || ''
        },
        getStorehouseList(callback = () => {}) {
            // 获取仓库  storehouseChildType为1或者3都有可能是代发子仓
            let _this = this
            this.queryStorehouseMenuList({content: _this.searchContent}).then(
                resp => {
                    this.storehouseList = resp
                    this.storehouseListTemp = resp
                    let zhongyiNormal = [] // 中医物流普通仓,
                    let zhongyiProty = [] // 中医物流代发仓,
                    let zhongyiBad = [] // 中医物流不良品仓,
                    let localNormal = [] // 本地普通仓,
                    let localProty = [] // 本地代发仓,
                    let localBad = [] // 本地不良品仓,
                    let protyChildLocal = [] // 本地代发仓子仓,
                    let protyChildZhongyi = [] // 物流代发仓子仓,
                    let searchContentArr = [] // 输入框有内容时的样式
                    let arrayList
                    if (resp) {
                        arrayList = resp.filter(res => {
                            // 排除发货仓或者收货仓已经选过的id
                            return this.excludeStockId !== res.storehouseId
                        })
                    }
                    if (arrayList) {
                        arrayList.map(item => {
                            if (_this.searchContent) {
                                let label = `${item.storehouseName}${
                                    item.siteName}`
                                if (item.channelName) {
                                    label = `${label}_${item.channelName}`
                                }
                                searchContentArr.push({
                                    label: label,
                                    storehouseId: item.storehouseId,
                                    channelId: item.channelId,
                                    value: item.storehouseId +
                                    this.checkNull(item.channelId)
                                })
                            } else {
                                if (
                                    item.storehouseType === '2' &&
                                    (item.storehouseChildType === '1' ||
                                        item.storehouseChildType === '3' ||
                                        item.storehouseChildType === '2')
                                ) {
                                    if (item.channelId) {
                                        // 物流代发子仓
                                        protyChildZhongyi.push({
                                            label: `${item.storehouseName}${
                                                item.siteName}_${item.channelName}`,
                                            storehouseId: item.storehouseId,
                                            channelId: item.channelId,
                                            value:
                                            item.storehouseId + item.channelId
                                        })
                                    } else {
                                        // 中移物流普通仓、中移物流代发仓
                                        if (
                                            item.storehouseType === '2' &&
                                            (item.storehouseChildType === '1' ||
                                                item.storehouseChildType === '3')
                                        ) {
                                            let store = zhongyiNormal.find(s => {
                                                return (
                                                    s.label === item.storehouseName
                                                )
                                            })
                                            if (store) {
                                                store.children.push({
                                                    label: item.siteName,
                                                    storehouseId: item.storehouseId,
                                                    channelId: item.channelId,
                                                    value: item.storehouseId
                                                })
                                            } else {
                                                zhongyiNormal.push({
                                                    label: item.storehouseName,
                                                    value: item.storehouseId,
                                                    storehouseId: item.storehouseId,
                                                    channelId: item.channelId,
                                                    children: [
                                                        {
                                                            label: item.siteName,
                                                            storehouseId: item.storehouseId,
                                                            channelId: item.channelId,
                                                            value: item.storehouseId
                                                        }
                                                    ]
                                                })
                                            }
                                        } else if (
                                            item.storehouseType === '2' &&
                                            item.storehouseChildType === '2'
                                        ) {
                                            zhongyiBad.push({
                                                label: `${item.storehouseName}${
                                                    item.siteName}`,
                                                storehouseId: item.storehouseId,
                                                channelId: item.channelId,
                                                value: item.storehouseId
                                            })
                                        }
                                    }
                                } else if (
                                    item.storehouseType === '1' &&
                                    (item.storehouseChildType === '3' ||
                                        item.storehouseChildType === '1' ||
                                        item.storehouseChildType === '2')
                                ) {
                                    if (item.channelId) {
                                        // 本地代发仓子仓
                                        protyChildLocal.push({
                                            label: `${item.storehouseName}_${
                                                item.channelName}`,
                                            storehouseId: item.storehouseId,
                                            channelId: item.channelId,
                                            value:
                                            item.storehouseId + item.channelId
                                        })
                                    } else {
                                        // 本地普通仓、本地代发仓
                                        if (
                                            item.storehouseType === '1' &&
                                            (item.storehouseChildType === '3' ||
                                                item.storehouseChildType === '1')
                                        ) {
                                            localProty.push({
                                                label: item.storehouseName,
                                                storehouseId: item.storehouseId,
                                                channelId: item.channelId,
                                                value: item.storehouseId
                                            })
                                        } else if (
                                            item.storehouseType === '1' &&
                                            item.storehouseChildType === '2'
                                        ) {
                                            localBad.push({
                                                label: item.storehouseName,
                                                storehouseId: item.storehouseId,
                                                channelId: item.channelId,
                                                value: item.storehouseId
                                            })
                                        }
                                    }
                                }
                            }
                        })
                    }
                    this.options = [
                        ...zhongyiNormal,
                        ...zhongyiProty,
                        ...zhongyiBad,
                        ...localProty,
                        ...localBad,
                        ...localNormal,
                        ...searchContentArr,
                        ...protyChildLocal,
                        ...protyChildZhongyi
                    ]
                    callback()
                }
            )
        },
        // 编辑出库时的收货仓库的数据回显
        searchValues(options) {
            const channelId = this.channelId || ''
            const storehouseId = this.storehouseId || ''
            let isDone = false
            const result = []
            const doSearch = (arrays, firstLabel) => {
                for (let i = 0, l = arrays.length; i < l; i++) {
                    if (isDone) break
                    const option = arrays[i]
                    const value = option.value
                    let res1 = this.checkNull(option.channelId) === channelId
                    let res2 = this.checkNull(option.storehouseId) === storehouseId
                    if (option.children && option.children.length > 0) {
                        doSearch(option.children, value)
                    } else if (res1 && res2) {
                        result.unshift(value)
                        firstLabel && result.unshift(firstLabel)
                        isDone = true
                    }
                }
            }
            doSearch(options)
            return result
        },
        // 选中下拉列表里的仓库后 触发emit
        getValue(param) {
            this.curValue = param
            if (param.length === 0) {
                this.$emit('getSelectedStorehouse', '', '')
                return
            }
            let paramStr
            if (param.length > 1) {
                paramStr = param[1]
            }
            if (param.length === 1) {
                paramStr = param[0]
            }
            let choosenItem = this.storehouseList.find(item => {
                return (
                    `${item.storehouseId || ''}${item.channelId || ''}` ===
                    paramStr
                )
            })
            if (!choosenItem) return
            this.$emit('getSelectedStorehouse', choosenItem)
        },
        // 失去焦点时触发，若有输入搜索但没选中，则清空下拉列表，重新搜索
        checkData() {
            if (this.searchContent && this.curValue.length < 1) {
                this.searchContent = ''
                this.options = []
                this.getStorehouseList()
            }
        }
    }
}
</script>

<style scoped>
</style>
