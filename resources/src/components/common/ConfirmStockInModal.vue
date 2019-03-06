<!---
    入库操作组件
    传入参数：1.row：选中行的数据，必传purchaseI和vendorNumber字段
    emit：1.save:入库成功
-->
<template>
    <div class="confirm-stock-in-modal">
        <modal v-model="isStockInDialogVisibleModal" :show-cancel-button="false" :ok-text="'确认入库'" title="入库操作" width="60%" @close="clearStorehouse">
            <div class="select-storehouse-container">
                <el-form ref="createStockIn" :inline="true" :model="createStockIn" :rules="storehouseRules" class="demo-form-inline">
                    <div style="display: block;float: left;padding-bottom: 10px;">
                        <el-form-item prop="storehouseId">
                            <!--
                            <el-select v-model="createStockIn.storehouseId"
                                       placeholder="请选择仓库名称"
                                       :filter-method="storehouseFilter"
                                       filterable
                                       clearable
                                       @change="storehoseChoosed(createStockIn.storehouseId)"
                                       :popper-class="'prop_select_width_178'"
                                       @visible-change="validatorStorehouseType">
                                <el-option v-for="item in storehouseList"
                                           :key="item.storehouseId"
                                           :label="item.storehouseName"
                                           :value="item.storehouseId">
                                </el-option>
                            </el-select>
                            -->
                            <select-storehouse :type-number="0" placeholder="请选择仓库名称" @getSelectedStorehouse="getSelectedStorehouse"></select-storehouse>
                        </el-form-item>
                    </div>
                    <div v-if="tipsMsg" class="tipsMsg">
                        <i class="icon-tishi"></i>
                        <span>您当前选择的是本地仓库，本地仓出入库单创建成功，将随即冲减库存。</span>
                    </div>
                </el-form>
            </div>
            <el-table :data="queryWaitStockInProductData">
                <el-table-column label="商品名称" prop="skuName" min-width="110">
                    <template slot-scope="scope">
                        <div :title="scope.row.skuName" class="row-show">{{ scope.row.skuName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="商品编码" prop="skuId" min-width="110">
                    <template slot-scope="scope">
                        <div :title="scope.row.skuId" class="row-show">{{ scope.row.skuId }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="单位" prop="unitName" min-width="80">
                    <template slot-scope="scope">
                        <div :title="scope.row.unitName" class="row-show">{{ scope.row.unitName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="采购数量" prop="totalCount" min-width="110">
                    <template slot-scope="scope">
                        <div :title="scope.row.totalCount" class="row-show">{{ scope.row.totalCount }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="已入库数量" prop="actualInTotalCount" min-width="110">
                    <template slot-scope="scope">
                        <div :title="scope.row.actualInTotalCount" class="row-show">
                            {{ scope.row.actualInTotalCount !== null ? scope.row.actualInTotalCount : 0 }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="入库中数量" prop="inCount" min-width="110">
                    <template slot-scope="scope">
                        <div :title="scope.row.inCount" class="row-show">
                            {{ scope.row.inCount !== null ? scope.row.inCount : 0 }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="本次入库" prop="inCountInput" min-width="110">
                    <template slot-scope="scope">
                        <div class="incont-input">
                            <el-input v-model="scope.row.inCountInput" type="number" @keyup.native="validateInCount(scope.row)"></el-input>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button :disabled="isDisabled" type="primary" @click="createStockInOrder('createStockIn')">确认入库</el-button>
            </span>
        </modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from '~/components/common/Modal.vue'
import SelectStorehouse from '~/components/common/SelectStorehouse'
import MessageMixins from '~/mixins/messages'
import AsyncMessageTipsMixins from '~/mixins/asyncMessageTips'
import { STOCK_TYPE } from '~/constants/storehouseConfigConst'
import Bus from '~/utils/bus'
export default {
    name: 'ConfirmStockInModal',
    components: {
        Modal, SelectStorehouse
    },
    mixins: [MessageMixins, AsyncMessageTipsMixins],
    props: {
        row: {
            type: Object,
            default: function () {
                return {
                    purchaseI: '',
                    vendorNumber: ''
                }
            }
        }
    },
    data () {
        return {
            tipsMsg: false,
            createStockIn: {
                type: '1',
                relatedSheetId: '',
                storehouseType: '',
                storehouseId: '',
                vendorSeqNo: '',
                skuList: []
            },
            // storehouseList: [],
            isDisabled: false,
            queryWaitStockInProductData: [],
            isStockInDialogVisibleModal: true,
            storehouseRules: {
                storehouseType: { required: true, message: '请选择仓库类型', trigger: 'change' },
                storehouseId: { required: true, message: '请选择仓库名称', trigger: 'change' }
            },
            storeHouseType: STOCK_TYPE // 仓库类型
        }
    },
    mounted () {
        // this.getStorehouseType();
        this.createStockIn.relatedSheetId = this.row.purchaseId
        this.createStockIn.vendorSeqNo = this.row.vendorSeqNo
        this.queryWaitStockInProductAction({ type: '1', relatedSheetId: this.row.purchaseId }).then((resp) => {
            resp.forEach(item => {
                item.inCount = Number(item.inCount) - Number(item.actualInTotalCount)
            })
            this.queryWaitStockInProductData = resp
        })
    },
    methods: {
        ...mapActions(['createStockInAction', 'getStorehouseList', 'queryWaitStockInProductAction']),
        getSelectedStorehouse (storehouseId, storehouseType) {
            this.createStockIn.storehouseId = storehouseId
            if (storehouseId) {
                this.createStockIn.storehouseType = storehouseType
                if (this.createStockIn.storehouseType === this.storeHouseType.LOCAL) { // 本地仓
                    this.tipsMsg = true
                } else {
                    this.tipsMsg = false
                }
            } else {
                this.tipsMsg = false
            }
        },
        clearStorehouse () {
            this.createStockIn.storehouseId = ''
            this.$emit('close')
        },
        // storehouseFilter (string) {
        //     if (!string) {
        //         this.storehouseList = this.storehouseListTemp
        //         return this.storehouseList
        //     }
        //     this.storehouseList = this.storehouseListTemp.filter((item) => {
        //         if ((item.storehouseId && item.storehouseId.toString().indexOf(string) >= 0) || (item.storehouseName && item.storehouseName.toString().indexOf(string)) >= 0) {
        //             return item
        //         }
        //     })
        // },
        // storehoseChoosed(storehouseId) {
        //     if (storehouseId) {
        //         let choosenItem = this.storehouseList.filter(item => item.storehouseId === storehouseId)[0]
        //         this.createStockIn.storehouseType = choosenItem.storehouseType
        //         if (this.createStockIn.storehouseType === this.storeHouseType.LOCAL) {
        //             this.tipsMsg = true
        //         } else {
        //             this.tipsMsg = false
        //         }
        //     } else {
        //         this.tipsMsg = false
        //     }
        // },
        // validatorStorehouseType (type) {
        //     let findItem = this.storehouseList.find((item) => {
        //         return this.createStockIn.storehouseId === item.storehouseId
        //     })
        //     if (findItem) {
        //         this.createStockIn.storehouseType = findItem.storehouseType
        //     }
        // },
        // getStorehouseType () {
        //     this.getStorehouseList({'storehouseType': this.createStockIn.storehouseType}).then((resp) => {
        //         this.storehouseList = resp
        //         this.storehouseListTemp = resp
        //     })
        //     this.createStockIn.storehouseId = ''
        // },
        createStockInOrder (formName) {
            if (this.createStockIn.storehouseType === this.storeHouseType.LOCAL) {
                this.$confirm('本地仓入库单创建后立即生效，是否确认入库?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                }).then(() => {
                    this.submitStockIn(formName, 1)
                })
            } else {
                this.submitStockIn(formName, 2)
            }
        },
        submitStockIn (formName, storeType) {
            this.createStockIn.skuList = []
            let skuList = this.queryWaitStockInProductData
            for (let i = 0; i < skuList.length; i++) {
                if (skuList[i].inCountInput) {
                    let skuListItem = {
                        productId: skuList[i].productId,
                        skuId: skuList[i].skuId,
                        inCount: skuList[i].inCountInput,
                        comments: skuList[i].comments,
                        originProductSerialNo: skuList[i].originProductSerialNo
                    }
                    this.createStockIn.skuList.push(skuListItem)
                }
            }
            if (this.createStockIn.skuList.length <= 0) {
                this.$message({
                    message: '请填写入库数量',
                    type: 'error'
                })
                return
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isDisabled = true
                    this.createStockInAction(this.createStockIn).then((resp) => {
                        this.isStockInDialogVisibleModal = false
                        if (storeType === 1) {
                            this.$message({
                                message: '入库成功',
                                type: 'success'
                            })
                            this.isDisabled = false
                            this.$emit('save')
                            Bus.$emit('updateData', {isUpdate: true})
                        } else {
                            if (resp) {
                                const sheetIds = []
                                sheetIds.push(resp.stockPerInId)
                                this.queryItemStatus({sheetIds}).then(res => {
                                    this.$message({
                                        message: '入库通知提交成功',
                                        type: 'success'
                                    })
                                    this.hidePageLoading()
                                    this.isDisabled = false
                                    this.$emit('save')
                                    Bus.$emit('updateData', {isUpdate: true})
                                }).catch(e => {
                                    this.$message({
                                        message: `请求中移服务异常，入库异常`
                                    })
                                    this.hidePageLoading()
                                    this.isDisabled = false
                                    this.$emit('save')
                                    Bus.$emit('updateData', {isUpdate: true})
                                })
                                //     .then(resolve => {
                                //     this.$message({
                                //         message: '入库通知提交成功',
                                //         type: 'success'
                                //     })
                                // }, reject => {
                                //     this.$message({
                                //         message: '请求中移服务异常，入库异常',
                                //         type: 'warning'
                                //     })
                                // }).finally(() => {
                                //     this.hidePageLoading()
                                //     this.isDisabled = false
                                //     this.$emit('save')
                                // })
                            }
                        }
                    }).catch(() => {
                        this.isDisabled = false
                    })
                } else {
                    this.isDisabled = false
                }
            })
        },
        // 输入校验与控制
        validateInCount (row) {
            let { totalCount, actualInTotalCount, inCount, inCountInput } = row
            let MaxCount = Number(totalCount) - Number(inCount) - Number(actualInTotalCount)
            let reg = /^[1-9]\d*$/
            if (inCountInput && inCountInput.length > 0 && !reg.test(inCountInput)) {
                this.$message({
                    type: 'error',
                    message: `请输入正确的入库数量`
                })
                row.inCountInput = ''
                return
            }
            if (MaxCount < Number(inCountInput)) {
                this.$message({
                    type: 'error',
                    message: `本次入库最多只能入库${MaxCount}`
                })
                row.inCountInput = ''
            }
        }
    }
}
</script>

<style lang='scss'>
.confirm-stock-in-modal {
  .tipsMsg {
    font-size: 12px;
    color: #e6a23c;
    padding-top: 10px;
    float: left;
  }
  .select-storehouse-container {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
  .el-table__empty-block {
    border-bottom: 1px solid #eceef5;
  }
  .el-dialog__body {
    padding: 0px 30px 0px 30px;
    .el-table thead tr th:nth-child(1) {
      border-left: none;
    }
  }
  .incont-input {
    .el-input {
      width: 76px;
      .el-input__inner {
        border: 1px solid #dbdfe6;
        border-radius: 0px;
        color: #666666;
        height: 26px;
        font-size: 12px;
        &:focus {
          border: 1px solid #3b8cff;
        }
      }
    }
  }
  .el-table {
    font-size: 12px;
    color: #888;
    border: 1px solid #eceef5;
    border-bottom: none;
  }
  .el-dialog__header {
    padding: 20px 23.7px 20px 30px;
    .el-dialog__title {
      font-size: 16px;
      color: #333333;
    }
    .el-dialog__headerbtn {
      right: 30px;
      font-size: 23px;
    }
  }
  .el-dialog__footer {
    padding: 20px 30px 30px;
  }
}
</style>
