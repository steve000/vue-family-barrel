<!--/***供应商select选择器
**/-->
<template>
    <div class="supplier-select">
        <el-form-item label="供应商：">
            <el-select v-model="vendorSeqNo" :filter-method="supplierFilter" :popper-class="'max-length'" filterable clearable size="small" placeholder="供应商编号或者名称" @clear="dataClear()" @change="dataChange(vendorSeqNo)">
                <el-option v-for="item in supplierList" :key="item.vendorSeqNo" :label="item.vendorName" :value="item.vendorSeqNo">
                </el-option>
            </el-select>
        </el-form-item>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'supplier-select',
    props: {
        newVendorSeqNo: {
            type: Number,
            default: null,
            required: false
        }
    },
    data () {
        return {
            supplierList: [],
            supplierListTemp: [],
            vendorSeqNo: this.newVendorSeqNo
        }
    },
    watch: {
        newVendorSeqNo (val) {
            if (val) {
                this.vendorSeqNo = this.newVendorSeqNo
            }
        }
    },
    mounted () {
        this.getSupplierList()
    },
    methods: {
        ...mapActions(['QueryVendorList']),
        supplierFilter (string) {
            // 自定义搜索函数
            if (!string) {
                this.supplierList = this.supplierListTemp
                return this.supplierList
            }
            this.supplierList = this.supplierListTemp.filter((item) => {
                if ((item.vendorSeqNo && item.vendorSeqNo.toString().indexOf(string) >= 0) || (item.vendorName && item.vendorName.toString().indexOf(string) >= 0)) {
                    return item
                }
            })
            if (this.supplierList.length <= 0) {
                this.setSelectTipsDataNone()
            }
        },
        setSelectTipsDataNone () {
            setTimeout(() => {
                let aa = document.getElementsByClassName('el-select-dropdown__empty')[0]
                if (aa && aa.textContent) {
                    aa.textContent = '无数据'
                }
            }, 50)
        },
        getSupplierList () {
            this.QueryVendorList({
                searchContent: '',
                isPage: false,
                dataStatus: [2]
            }).then((resp) => {
                if (resp.vendorList && resp.vendorList.length > 0) {
                    this.supplierList = resp.vendorList
                    this.supplierListTemp = resp.vendorList
                }
            })
        },
        dataClear () {
            this.vendorSeqNo = null
        },
        dataChange () {
            this.$emit('SelectVavue', this.vendorSeqNo)
        }
    }
}
</script>

<style lang='scss'>
</style>
