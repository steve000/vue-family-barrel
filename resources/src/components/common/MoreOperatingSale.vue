* 销售订单更多操作
* importParams:null
* exports:null
**/
<template>
    <div class="operate-div" title="更多">
        <el-tooltip :visible-arrow="false" :popper-class="paddingClass" placement="bottom" effect="light">
            <div slot="content">
                <div>
                    <el-button type="text" class="operating-button" @click="editFunction">编辑</el-button>
                </div>
                <div>
                    <el-button type="text" class="operating-button" @click="cancelFunction">取消订单</el-button>
                </div>
                <div>
                    <el-button type="text" class="operating-button" @click="completeFunction">完成订单</el-button>
                </div>
            </div>
            <el-button type="text" class="more-operating">
                <i class="el-icon-more"></i>
            </el-button>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: '',
    data () {
        return {
            paddingClass: 'padding-0'
        }
    },
    methods: {
        editFunction () {
            this.$emit('onEdit')
        },
        cancelFunction () {
            this.$emit('onCancel')
        },
        completeFunction () {
            this.$emit('onComplete')
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
