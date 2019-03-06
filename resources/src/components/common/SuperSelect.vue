<template>
    <div>
        <el-select v-model="value" :remote-method="filterGood" :loading="loading" :placeholder="placeholder" filterable="" remote="" default-first-option no-data-text="没有找到相关的商品" size="small" style="width: 96%;" @change="selectedSetGoods(one.skuId, index)" @focus="setGoodIndex(index, one)" @blur="selectVisible(one.skuId)">
            <el-option v-for="item in dataList" :key="item.skuId" :label="item.skuName" :value="item.skuId">{{ `${item.skuId} ${item.skuName && item.skuName.length > 40 ? item.skuName.substr(0,40) : item.skuName }` }}</el-option>
        </el-select>
        <!-- <el-select v-model="value" :placeholder="placeholder" :disabled="disabled">
            <el-option v-for="(i, k) in dataList" :key="k" :label="i[getValue.label]" :value="i[getValue.value]"></el-option>
        </el-select> -->
    </div>
</template>
<script>
export default {
    name: 'SuperSelect',
    props: {
        dataList: {
            type: Array,
            default () {
                return []
            }
        },
        getValue: {
            type: Object,
            default () {
                return {
                    value: 'value',
                    label: 'label'
                }
            }
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: null,
            required: true
        },
        filterFunction: {
            type: Function
        }
    },
    data () {
        return {
            loading: false
        }
    },
    computed: {
        selectValue: {
            get: function () {
                return this.value
            },
            set: function (nval) {
                if (!nval) {
                    this.$emit('SuperSelect')
                }
            }
        }
    },
    methods: {
        // 商品模糊查询
        filterGood (query) {
            if (query !== '') {
                this.loading = true
                if (this.dataList.length <= 200) {
                    this.dataList.filter(this.filterFunction)
                    this.$emit('')
                    this.loading = false
                } else {
                    setTimeout(() => {
                        this.queryUserGroupProductAction({ searchContent: String(query).replace(/\s+/g, ''), status: 1, cateType: 0 }).then((res) => {
                            this.loading = false
                            this.filterGoodsArr = res
                        }).catch(() => { })
                    }, 200)
                }
            } else {
                this.filterGoodsArr = JSON.parse(JSON.stringify(this.productList))
            }
        }
    }
}
</script>
