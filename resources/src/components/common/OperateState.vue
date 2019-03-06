<!--
    行内操作
    传入参数：
            1.row:点击的当前行
            2.operations：操作按钮数组，label,value的形式
            3.handleState:点击时触发的方法，参数为点击的按钮对象情况+table当前行信息
 -->
<template>
    <div v-if="operations.length>0" class="operate-state" >
        <span v-for="(item,i) in operations"
              :key="i" class="operate" @click="handleState(item.label,row)">
            {{ item.label }}
        </span>
    </div>
</template>
<script>
export default {
    name: 'OperateState',
    props: {
        row: Object,
        operations: {
            type: Array,
            default: () => []
        },
        handleState: {
            type: Function
        }
    },
    data() {
        return {}
    },
    methods: {}
}
</script>
