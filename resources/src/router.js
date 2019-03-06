import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './containers/index'
import {
    ROLE_CONST_VALUE
} from './constants/systemRoleConst'
// import 'babel-polyfill'
import Cookies from './utils/cookies'
import VueAnalytics from 'vue-analytics'
Vue.use(VueRouter)

const routes = [

    /**   首页图表  */
    {
        // 首页图表
        path: '/index/Home',
        component: () => import('./containers/index/home'),
        name: 'Home',
        meta: {
            label: '统计'
        }
    },
    {
        path: '/tmp',
        component: () => import('./containers/tmpShow'),
        name: 'TmpShowPage',
        meta: {
            label: ''
        }
    }
]

export const routesMapping = {}

routes.forEach(router => {
    routesMapping[router.name] = router.name
})

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import('./containers/login-1810')
            // component: () => import('./containers/login-start')
        },
        {
            path: '',
            component: Index,
            // redirect: '/index/Home',
            children: routes
        }
    ]
})

Vue.use(VueAnalytics, {
    id: 'UA-121890591-1', // 从配置中读取id
    checkDuplicatedScript: true, // 必须在html中完成初始化，这里显式禁止去下载ga脚本
    router,
    autoTracking: {
        pageviewTemplate (route) {
            return {
                path: route.path,
                page: route.meta.label,
                fullPath: route.fullPath,
                location: window.location.href
            }
        },
        pageviewOnLoad: false // 当通过网址进来时已经GA在初始化时就发起一次pageview的统计，这里不要重复统计
    }
    // debug: {
    //     enabled: true,
    //     sendHitTask: process.env.NODE_ENV === 'production'
    // }
})

router.beforeEach((to, from, next) => {
    // _t_是自己在路由上添加的参数，用来判断合法的登录页面相关跳转
    // 如果是从登录页面跳转，链接里包含_t_参数才允许跳转，否则跳回原页面
    if (to.path === from.path) {
        next()
    } else if (from.path === '/login' && to.path !== '/login') {
        if (to.query['_t_']) {
            next()
        } else {
            next(false)
        }
        // 跳转到登录页面，链接里有_t_参数才允许跳转，否则跳回原页面
    } else if (to.path === '/login' && from.path !== '/login') {
        if (from.path === '/') {
            // 从'/'路由跳转到'/login'
            next()
        } else if (to.query['_t_']) {
            next()
        } else {
            next(false)
        }
        // 其他正常跳转逻辑，如果没有配置到，则不跳转
    } else if (to.matched.length === 0) {
        next(false)
    } else {
        // 有cookie继续，没有cookie调到登录页
        const cookie = Cookies.getCookie('nng')
        if (cookie || to.query.token) {
            // 匹配到，如果是超级管理员，只允许path路径是以/system开头的路径进行跳转，其他不跳
            const roleType =
                window.localStorage.getItem('roleType') ||
                window.sessionStorage.getItem('roleType')
            if (ROLE_CONST_VALUE.SUPER_ADMIN === +roleType) {
                if (to.matched.some(record => record.meta.requiresAuth)) {
                    next()
                } else {
                    next(false)
                }
                // 非超级管理员，不允许跳到path以/system开头的路径
            } else {
                if (to.matched.some(record => record.meta.requiresAuth)) {
                    next(false)
                } else {
                    next()
                }
            }
        } else {
            next('/login')
        }
    }
})

router.afterEach(function (to) {
    const reg = /_t_=/
    if (reg.test(to.fullPath)) {
        // 去掉地址栏链接里的_t_
        const res = to.fullPath.replace(/(\?|&)?_t_=.*$/, '')
        window.location.href = location.origin + '/#' + res
    }
    // if (window.ga) {
    //     window.ga('set', 'page', to.fullPath)
    //     window.ga('send', 'pageview')
    // }
})

export default router
