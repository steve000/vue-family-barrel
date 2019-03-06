<template>
    <div class="page-wrapper">
        <loading-indicator :showing="pageLoading" :text="pageLoadingText"></loading-indicator>
        <router-view></router-view>
    </div>
</template>
<script>

import Vue from 'vue'
import {mapState} from 'vuex'
import LoadingIndicator from './components/LoadingIndicator'
import Element from 'element-ui'

Vue.use(Element)

export default {
    name: 'App',
    components: {LoadingIndicator},
    computed: mapState({
        pageLoading: ({root}) => root.pageLoading,
        pageLoadingText: ({root}) => root.pageLoadingText
    })
}
</script>
<style lang="scss">
    @import "./layouts/css/index.scss";
    @import "../node_modules/element-ui/lib/theme-chalk/index.css";

    .page-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
</style>
