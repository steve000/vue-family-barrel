<!--
    菜单子项组件
    传入参数：1.model：菜单子项数组
              2.click：判断是否点击的当前项
     emit:1.cateId:点击菜单子项，返回cateId和cateName
 -->
<template>
    <li class="menu-item-li">
        <div :class="{'isactive':click==model.cateId}" :title="model.cateName" class="set-border" @click="showGoods(model.cateId)">
            <div v-if="isFolder" :class="{ 'isOpenPositionIcon': !isopen}" class="positionIcon"></div>
            <span>{{ model.cateName }}</span>
        </div>
        <ul v-if="isFolder" :class="{ 'isopen': isopen}" class="submenu">
            <menu-item v-for="item in model.childs" :key="item.cateId" :model="item" :click="click"></menu-item>
        </ul>
    </li>
</template>

<script>
import Bus from '~/utils/bus'
export default {
    name: 'menuItem',
    props: {
        model: Object,
        click: String
    },
    data () {
        return {
            open: false,
            cateId: '',
            isopen: false,
            isactive: false
        }
    },
    computed: {
        isFolder: function () {
            return this.model.childs &&
                this.model.childs.length
        }
    },
    methods: {
        showGoods (cateId) {
            this.cateId = cateId
            let level = 1
            this.model.level ? level = this.model.level : level = this.model.cateLevel
            let Object = { cateId: cateId, cateName: this.model.cateName, level: level }
            Bus.$emit('cateId', Object)
            if (this.isFolder) {
                this.isopen = !this.isopen
            }
        }
    }
}
</script>

<style>
.isOpenPositionIcon {
  transform: rotate(-45deg);
  -ms-transform: rotate(-45deg); /* IE 9 */
  -moz-transform: rotate(-45deg); /* Firefox */
  -webkit-transform: rotate(-45deg); /* Safari 和 Chrome */
  -o-transform: rotate(-45deg); /* Opera */
}
</style>
