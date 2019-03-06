<template>
    <div class="routers-tab">
        <el-tabs v-model="selectedTab" :closable="true" type="card" @tab-remove="removeTab" @tab-click="onTabSelect">
            <el-tab-pane
                v-for="(item, index) in tabs"
                :key="index + item.name"
                :label="item.label"
                :name="item.name"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import MessageMixins from '~/mixins/messages'
import PlatformMixins from '~/mixins/platform'
import * as C from '../constants/api'
import utils from '~/utils/misc'
import storageSession from '~/utils/storage'
export default {
    name: 'RouterTab',
    mixins: [MessageMixins, PlatformMixins],
    data() {
        return {
            selectedTab: '',
            time: 1
        }
    },

    computed: {
        tabs() {
            let times = this.time
            ++times
            this.addTimes(times)
            if (times <= 2) {
                // 刷新后恢复打开的标签列表
                let tabCachesReload = storageSession.getDefaultStorage().get('tabCachesReload')
                tabCachesReload = JSON.parse(tabCachesReload)
                if (tabCachesReload && tabCachesReload.length > 1) {
                    for (let i = 0; i < tabCachesReload.length; i++) {
                        let obj = tabCachesReload[i]
                        this.$store.dispatch('addTabCache', obj)
                    }
                }
            }
            const caches = this.$store.state.root.tabCaches
            return caches
        }
    },

    watch: {
        tabs(newVal) {
            if (newVal.length > 0) {
                const {name} = newVal[newVal.length - 1]
                let path = this.$route.path
                let findItem = newVal.find((n) => n.path === path)
                findItem = findItem ? findItem.name : name
                this.selectedTab = findItem
            }
        },

        '$route': function(route) {
            const {path, name} = route
            const result = this.tabs.filter(item => {
                return item.name === name
            })
            let tab = result.map(item => {
                item.path = path
                return item
            })[0]
            tab && (this.selectedTab = tab.name)
        }
    },
    mounted() {
        const width = document.documentElement.style.minWidth
        var dom = document.getElementsByClassName('routers-tab')[0]
        if (dom) {
            dom.style.width = width
        }
        window.addEventListener('resize', function () {
            const width = document.documentElement.style.minWidth
            var dom = document.getElementsByClassName('routers-tab')[0]
            if (dom) {
                dom.style.width = width
            }
        })
    },
    methods: {

        /**
         * 关闭标签页并选中前一个标签页
         * @canSelectPrevTab 关闭后是否选中前一个标签页
         */
        removeTab(key, canSelectPrevTab = true) {
            if (this.tabs.length === 1) {
                if (key === 'Home' || key === 'EntityConfig') {
                    this.showWarning('至少保留一个标签页')
                    return
                } else {
                    this.$router.push('/index/Home')
                    let THIS = this
                    setTimeout(() => {
                        THIS.removeTab(key, true)
                    }, 100)
                    return
                }
            }
            // 删除商品列表和详情总库存详情按钮跳转到库存管理界面的session存值
            if (key === 'InventoryManagement') {
                storageSession.getDefaultStorage().remove('goodsSkuId')
            }
            // 清空导入渠道商品列表
            if (key === 'ImportChannelGoods') {
                this.$store.commit(C.POST_IMPORT_CHANNEL_GOODS, '')
            }
            const tabs = this.tabs
            let index = -1
            let vm = null
            tabs.forEach((tab, tabIndex) => {
                if (tab.name === key) {
                    index = tabIndex
                    vm = tab.vm
                    return false
                }
            })
            if (vm && !(vm.isAllowClose())) {

            } else {
                this.$store.dispatch('removeTabCache', index)
                if (vm) {
                    vm.$destroy()
                };
                if (canSelectPrevTab) {
                    let toIndex = index - 1
                    toIndex < 0 && (toIndex = 1)
                    const toPath = tabs[toIndex].path
                    this.$nextTick(() => {
                        this.$router.push(toPath)
                    })
                }
            }
        },

        closeCurrentTab(canSelectPrevTab) {
            const key = this.$route.name
            this.removeTab(key, canSelectPrevTab)
        },

        closeTabByKey(key) {
            this.removeTab(key, false)
        },

        onTabSelect(vm) {
            const {index} = vm
            const {path} = this.tabs[index]
            this.$router.push(path)
        },

        selectTab(tab) {
            if (!tab) return
            const {path} = tab
            this.$router.push(path)
        },

        /**
         * 刷新tab标签页面
         * @tab 要刷新的标签页
         */
        refreshTab(tab, params = {}) {
            if (!tab) return
            if (!tab.vm) return
            tab.vm.onPageRefresh(params)
        },

        getTabByKey(name) {
            const tabs = this.tabs
            const index = utils.findIndex(tabs, tab => tab.name === name)
            if (index === -1) {
                return null
            }
            const tab = tabs[index]
            return tab
        },

        addTimes(times) {
            this.time = times
        }
    }
}
// 监听页面刷新
window.addEventListener('beforeunload', function(event) {
    let tabCachesSession = storageSession.getDefaultStorage().get('tabCaches')
    storageSession.getDefaultStorage().put('tabCachesReload', tabCachesSession)
    storageSession.getDefaultStorage().remove('goodsSkuId')// 从商品详情页面进入库存管理，刷新页面后需要清除从上个页面来的session,从而进行清除搜索条件
})
</script>

<style lang='scss'>
.routers-tab {
    background-color: #fbfbfb;
    box-shadow: 0 1px 0 0 #E5E5E5;
    height: 36px;
    padding-top: 8px;
    .el-tabs--card {
        > .el-tabs__header {
            margin:  0;
            .el-tabs__nav {
                border-top: none;
            }

            .el-tabs__item {
                height: 28px;
                line-height: 28px;
                color: #999;
                font-size: 12px;
                width: 158px;
                &.is-active {
                    color: #000;
                    background: #EFF0EF;
                    border: 1px solid #E5E5E5;
                    border-right: none;
                    border-bottom-color: transparent;
                }
                .el-icon-close{
                    float: right;
                    top: 7px;
                    right: -8px;
                }
            }
        }
    }
    .el-tabs--card>.el-tabs__header{
        border-bottom: none;
    }
    .el-tabs__nav-next, .el-tabs__nav-prev {
        line-height: 28px;
    }
    .el-tabs__item .el-icon-close:hover {
        background-color: #FF0102;
    }
}
</style>
