<!--
/*
    列表里的 更多操作 组件，显示为 ...
    传入参数： buttonList: [{type, text}]; type 自定义按钮类型（供返回识别），text 按钮名称
             row; 组件所在的列表行里的 数据(供返回用)
    操作触发返回： onClick(type,row)，点击按钮触发提交onClick事件，返回点击的按钮类型type和所在行数据row，
*/
-->

<template>
    <div class="operate-div" title="更多">
        <el-button v-if="buttonList.length" type="text" class="more-operating" @click.stop="getOperate">
            <i class="el-icon-more"></i>
        </el-button>
        <div v-if="isShow" :class="isEnd ? 'is-end-tr': 'not-is-end-tr'" class="button-list-container">
            <div v-for="(item, k) in buttonList" :key="k">
                <el-button v-if="item.type" type="text" class="operating-button" @click="clickFunction(item.type)">{{ item.text }}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MoreOperating',
    props: {
        buttonList: {
            type: Array,
            default: function () {
                return []
            }
        },
        row: {
            type: Object,
            default: function () {
                return {}
            }
        },
        isEnd: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            isHide: false,
            isShow: false
        }
    },
    methods: {
        clickFunction (type) {
            this.$emit('onClick', type, this.row)
        },
        getOperate () {
            this.isShow = !this.isShow
            if (!this.isShow) {
                this.$emit('hide')
            } else {
                this.$emit('show')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.operate-div {
  position: relative;
  height: auto;
  line-height: 1;
  .is-end-tr {
    top: -27px;
  }
  .not-is-end-tr {
    top: 40px;
  }
  .more-operating {
    padding: 12px 16px;
    display: none;
  }
  .button-list-container {
    float: right;
    position: absolute;
    right: -17px;
    z-index: 2000;
    min-width: 80px;
    height: auto;
    line-height: 28px;
    background-color: #ffffff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
  }
}
.operating-button {
  //   width: 80px;
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
</style>
