/**
 * Created by issuser on 2018/3/19.
 */
import {
    routesMapping
} from '~/router'
export default {
    data: function () {
        return {
            routesMapping: routesMapping
        }
    },
    methods: {
        // 如果存在要打开的页面，则关闭当前页面、刷新那个页面（通过key），否则关闭当前页面
        quit(routerName, isRefrensh = true, params = {}) {
            const tab = this.getTabByKey(routerName)
            if (tab) {
                this.closeCurrentTab(false)
                this.selectTab(tab)
                if (isRefrensh) {
                    this.refreshTab(tab, params)
                }
            } else {
                this.closeCurrentTab()
            }
        },
        // 关闭当前页面，刷新指定页面，指定页面存在则刷新，指定页面不存在则打开
        shiftPage(param, path = '') {
            const tab = this.getTabByKey(param)
            this.closeCurrentTab(false)
            if (tab) {
                this.selectTab(tab)
                this.refreshTab(tab)
            } else {
                this.$router.push(path)
            }
        }
    }
}
