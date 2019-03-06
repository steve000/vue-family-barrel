<template>
    <div class="search-result-specail">
        <div>
            <i class="iconfont1 icon-shaixuanxiang "></i>共{{ count }}条结果，搜索项：
            <span v-for="(item,index) in searchItemValueArray" :key="index" class="item-content">
                <span>{{ item }}</span>
                <i class="iconfont1 icon-qingchu" @click="deleteItem(index)"></i>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchResult',
    props: {
        count: {
            type: Number
        },
        searchItemValueArray: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {}
    },
    methods: {
        deleteItem (index) {
            this.$emit('deleteItem', index)
        }
    }
}
</script>

<style lang="scss">
.search-result-specail {
  text-align: left;
  font-size: 12px;
  color: #999999;
  line-height: 22px;
  margin-bottom: 16px;
  .icon-shaixuanxiang {
    color: #999999;
    font-size: 10px;
    margin-right: 8px;
    display: inline-block;
    transform: scale(0.8);
  }
  .item-content {
    display: inline-block;
    border: 1px solid #e5e5e5;
    background: #eff0ef;
    border-radius: 2px;
    width: auto;
    height: 22px;
    padding: 0px 6.4px 0px 8px;
    font-size: 12px;
    color: #666666;
    line-height: 1;
    margin-right: 8px;
    vertical-align: middle;
    span {
      position: relative;
      top: -0.5px;
    }
    i {
      transform: scale(0.8);
      color: #666666;
      font-size: 11px;
      margin: 5px 0px 6.2px 19.3px;
      display: inline-block;
    }
  }
}
</style>
