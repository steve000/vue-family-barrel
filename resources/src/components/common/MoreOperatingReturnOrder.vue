* 退货订单更多操作
* importParams:null
* exports:null
**/
<template>
    <div class="operate-div" title="更多">
        <el-popover :visible-arrow="false" :popper-class="paddingClass" class="popover222" placement="bottom">
            <div>
                <div v-if="invType==0">
                    <template v-if="[22,23].indexOf(parseInt(returnType))!=-1 && parseInt(returnStatus)==1">
                        <!-- <div v-if="isPush">
                            <el-button type="text" class="operating-button" @click="sendFunction">推送订单</el-button>
                        </div> -->
                        <div>
                            <el-button type="text" class="operating-button" @click="editFunction">编辑</el-button>
                        </div>
                    </template>
                    <div v-if="parseInt(returnStatus)==1 && !isPush">
                        <el-button type="text" class="operating-button" @click="finishFunction">完成订单</el-button>
                    </div>
                </div>
                <div v-else>
                    <div>
                        <el-button type="text" class="operating-button" @click="editFunction">编辑</el-button>
                    </div>
                </div>
                <div v-if="[1,7,4].indexOf(parseInt(returnStatus))!=-1 && dataSource!=3">
                    <el-button type="text" class="operating-button" @click="cancelFunction">取消订单</el-button>
                </div>
            </div>
            <el-button slot="reference" type="text" class="more-operating">
                <i class="el-icon-more"></i>
            </el-button>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: 'MoreOperatingReturnOrder',
    props: {
        returnType: {
            type: String
        },
        returnStatus: {
            type: Number
        },
        isPush: {
            type: Number
        },
        errorType: {
            type: Number
        },
        invType: {
            type: Number
        },
        dataSource: {
            type: String
        }
    },
    data() {
        return {
            paddingClass: 'padding-0'
        }
    },
    methods: {
        editFunction() {
            this.$emit('onEdit')
        },
        cancelFunction() {
            this.$emit('onCancel')
        },
        finishFunction() {
            this.$emit('onFinish')
        },
        sendFunction() {
            this.$emit('onSend')
        }
    }
}
</script>

<style lang="scss" >
.padding-0 {
  padding: 0px;
}
.el-tooltip__popper.is-light {
  border: none;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
}
</style>
