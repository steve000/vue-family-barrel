<template>
    <div id="table-wrapper" class="table-wrapper">
        <el-table ref="table" :data="data" style="width:100%;"
                  @selection-change="onSelectionChange">
            <slot></slot>
        </el-table>
        <el-row class="pagination-section">
            <el-pagination
                v-if="total > pageSize"
                ref="pagination"
                :current-page="pageNo"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                :total="total"
                layout=" sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="onPagination">
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'DynamicTable',
    props: {
        data: {
            required: true,
            type: Array
        },

        pageNo: {
            type: Number,
            default: 1
        },

        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 0
        }
    },

    computed: {
        tableHeight() {
            return document.documentElement.clientHeight - this.tableTop
        }
    },

    methods: {
        onPagination(pageNo) {
            this.$emit('pagination', pageNo)
        },
        onSelectionChange(val) {
            this.$emit('selection', val)
        },
        handleSizeChange(size) {
            	this.$emit('SizeChange', size)
        }
    }
}

</script>

<style lang='scss' scoped>
.pagination-section{
     text-align: right;
     right: 200px;
     .el-pagination {
     width:100%;
     .el-pager li.active{
     	background-color:#409EFF;
     	color:white;
     }
	.btn-prev, .btn-next{
		i{
			visibility:hidden
		}
	}
	.btn-prev{
		&:before{
			content:"上一页"
		}
	}
	.btn-next{
		&:before{
			content:"下一页"
		}
	}
}
}

 .el-table th{
        background-color:#F2F8FF;
    }

 .el-table--border{
    border:none;
}
</style>
