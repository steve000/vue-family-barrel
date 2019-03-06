/**
* 退货单更多操作
* invType 发货方式(0-供应商,代发等；1-自身)
* importParams:{status:退货单状态}
*                status: {
*                    0: '已取消',
*                    1: '未入库',
*                   2: '待入库',
*                    3: '已入库',
*                    4: '待出库',
*                    5: '已出库',
*                    6: '已完成',
*                    7: '转退货',
*                }
* exports:null
**/
<template>
    <div class="operate-div" title="更多">
        <el-popover :visible-arrow="false" :popper-class="paddingClass" class="popover222" placement="bottom">
            <div v-if="invType === 1">
                <template v-if="status === 1">
                    <div>
                        <el-button type="text" class="operating-button change-order-operating-button" @click="editFunction">编辑</el-button>
                    </div>
                </template>
                <template v-if="status === 3 && dataSource!=3">
                    <div>
                        <el-button type="text" class="operating-button change-order-operating-button" @click="toReturnFunction">转退货</el-button>
                    </div>
                </template>
                <div>
                    <el-button type="text" class="operating-button change-order-operating-button" @click="changeFunction">更改收货信息</el-button>
                </div>
            </div>
            <div v-else>
                <div v-if="status === 1 && changeType > 31 && changeType < 34 && errorType === 0">
                    <!-- <div>
                        <el-button type="text" class="operating-button change-order-operating-button" @click="pushFunction">推送订单</el-button>
                    </div> -->
                    <div>
                        <el-button type="text" class="operating-button change-order-operating-button" @click="changeFunction">更改收货信息</el-button>
                    </div>
                    <div>
                        <el-button type="text" class="operating-button" @click="editFunction">编辑</el-button>
                    </div>
                </div>
                <!-- <div v-if="status==1 && dataSource!=''">
                    <el-button type="text" class="operating-button" @click="editFunction">编辑</el-button>
                </div> -->
                <div v-if="status==1">
                    <el-button type="text" class="operating-button change-order-operating-button" @click="finishFunction">完成订单</el-button>
                </div>
            </div>
            <div v-if="[1,8].indexOf(parseInt(status))!=-1 && dataSource!=3">
                <el-button type="text" class="operating-button change-order-operating-button" @click="cancelFunction">取消订单</el-button>
            </div>
            <el-button slot="reference" type="text" class="more-operating">
                <i class="el-icon-more"></i>
            </el-button>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        status: {
            type: Number
        },
        invType: {
            type: Number
        },
        changeType: {
            type: Number
        },
        errorType: {
            type: Number
        },
        dataSource: {
            type: String
        }
    },
    data () {
        return {
            paddingClass: 'padding-0'
        }
    },
    methods: {
        editFunction () {
            // 编辑
            this.$emit('onEdit')
        },
        cancelFunction () {
            // 取消订单
            this.$emit('onCancel')
        },
        changeFunction () {
            // 更改收货地址
            this.$emit('onChange')
        },
        toReturnFunction () {
            // 转退货
            this.$emit('onToReturn')
        },
        // 完成订单
        finishFunction () {
            this.$emit('onComplete')
        },
        // 推送订单
        pushFunction () {
            this.$emit('onPushOrder')
        }
    }
}
</script>

<style lang="scss" >
.padding-0 {
  padding: 0;
}
.el-tooltip__popper.is-light {
  border: none;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
}
.operating-button {
  width: 100px;
  height: 28px;
  color: #666666;
  font-size: 12px;
  padding: 0px;
  line-height: 28px;
  &:hover {
    color: #333333;
    background-color: #f6fafe;
  }
}
// .change-order-operating-button {
//   width: 100px;
// }
</style>
