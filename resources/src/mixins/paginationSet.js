export default {
    data() {
        return {
            pageSizesList: [20, 50, 100, 200],
            pageSize: 100,
            pageNo: 1
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val
            this.refreshPage(this.param)
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.refreshPage(this.param)
        }
    }
}
