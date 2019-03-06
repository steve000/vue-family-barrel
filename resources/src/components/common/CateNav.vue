<template>
    <div>
        <div @click="getCateType(1)">
            <li class="all">
                <div :class="{'isactive': click == '1'}" class="set-border" @click="showGoods(''); click = '1'">
                    <i class="iconfont1 icon-shiti"></i>
                    <span>实体商品</span>
                </div>
            </li>
            <menu-item v-for="(model,index) in entityCate" :model="model" :click="click" :key="index" @cateId="getCateId"></menu-item>
        </div>
        <div @click="getCateType(2)">
            <li v-if="isShowVirtual()" class="all">
                <div :class="{'isactive': click == '2'}" class="set-border" @click="showGoods(''); click = '2'">
                    <i class="iconfont1 icon-xuni"></i>
                    <span>虚拟商品</span>
                </div>
            </li>
            <menu-item v-for="model in virtualCate" :model="model" :click="click" :key="model.cateId" @cateId="getCateId"></menu-item>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MenuItem from '~/components/common/MenuItem'
import Bus from '~/utils/bus'

export default {
    name: 'CateNav',
    components: { MenuItem },
    props: { router: Number },
    data () {
        return {
            click: '1',
            cate: {
                cateType: 1,
                level: '',
                cateId: ''
            }
        }
    },
    computed: {
        ...mapState({
            entityCate: ({ cate }) => {
                return cate.entityCate
            },
            virtualCate: ({ cate }) => {
                return cate.virtualCate
            }
        })
    },
    created () {
        Bus.$on('cateId', cateId => {
            this.click = String(cateId.cateId)
            this.cate.level = String(cateId.level)
            this.cate.cateId = String(cateId.cateId)
        })
    },
    activated () {
        this.queryCateAll().then((resp) => {
            this.refreshCate()
        })
    },
    mounted () {
        this.queryCateAll().then((resp) => {
        })
    },
    methods: {
        ...mapActions(['queryCateAll']),
        showGoods (cateId, cateName) {
            this.cate.cateId = cateId
            this.cate.level = ''
        },
        getCateId () {
        },
        getCateType (cateType) {
            this.cate.cateType = cateType
            this.$emit('getCate', this.cate)
        },
        refreshCate () {
            this.$emit('getCate', this.cate)
        },
        isShowVirtual () {
            if (this.router === 1) { // 从商品管理过去
                return this.virtualCate.length > 0
            } else if (this.router === 2) { // 从 商品设置过去
                return true
            }
        }
    }
}
</script>

<style>
</style>
