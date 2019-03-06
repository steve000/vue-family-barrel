import {
    mapActions
} from 'vuex'
import storageSession from '~/utils/storage'

export default {
    data() {
        return {
            // 是否开启审批
            isShowApprove: true,
            ngocApproveArr: [], // ngoc审批详情
            approveStatusIndex: '', // ngoc未处理的第一条下标
            approveMoney: null,
            approveUserList: [],
            isShowLeaderApprove: true
        }
    },
    methods: {
        ...mapActions(['queryApproveConfig', 'queryApproveDetail']),
        // 判断有没有开启审批功能
        checkApproveStatus(serviceType, cb) {
            // serviceType : 1采购，2销售，3出库，4入库
            const userGroupId = storageSession
                .getDefaultStorage()
                .get('entityId')
            if (!userGroupId) {
                return void setTimeout(this.checkApproveStatus(serviceType, cb), 1000)
            }
            this.queryApproveConfig({
                userGroupId: userGroupId,
                serviceType
            }).then(res => {
                // 是否领导审批：0需要，1不需要
                // Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组。
                this.isShowApprove = Object.keys(res).length > 0 && (!res.approveLeader || (res.approveUserList && !!res.approveUserList.length))
                this.isShowLeaderApprove = Object.keys(res).length > 0 && !res.approveLeader
                this.approveMoney = res.approveMoney / 100
                this.approveUserList = res.approveUserList
                if (cb && typeof cb === 'function') cb(res)
            })
        },
        // 获取NGOC的审批详情 (出入库在用)
        getCurrentApproveDetail(serviceType, relationSheetId) {
        // 服务类型，1采购,2销售,3出库,4入库
            this.queryApproveDetail({
                serviceType,
                relationSheetId
            }).then(resp => {
                this.ngocApproveArr = resp.approveDetails
                let approveStatus = []
                this.ngocApproveArr.forEach(item => {
                    approveStatus.push(item.approveStatus)
                })
                this.approveStatusIndex = approveStatus.indexOf(0)
            })
        },
        reviveNgocApproStyle (approveStatus) {
            if (approveStatus === 1 || approveStatus === 3) { // 通过转交
                return 'ngocRrocess'
            } else if (approveStatus === 2) { // 驳回
                return 'ngocReject'
            }
        },
        IndexCss (item, index) {
            let a = this.approveStatusIndex - 1
            let b = this.approveStatusIndex + 1
            if (item.approveStatus !== 0 && item.approveStatus !== -1) {
                if (index + 1 <= this.ngocApproveArr.length - 1) {
                    return 'ngocLightBlue'
                }
            }
            if ((item.approveStatus === 1 || item.approveStatus === 2 || item.approveStatus === 3) && item.approveStatus !== -1) {
                return 'ngocBlue'
            }
            if (this.approveStatusIndex === index) { // 第一次出现未处理(即将要处理 的那条)
                return 'ngocBlack'
            }
            if (a === index && item.approveStatus !== -1) {
                return 'ngocBlue'
            }
            if (index < a && item.approveStatus !== -1) {
                return 'ngocLightBlue'
            }
            if (index >= b) {
                return 'gray'
            }
        },
        checkApproveStatusPur(serviceType, cb) {
            // serviceType : 1采购，2销售，3出库，4入库
            const userGroupId = storageSession
                .getDefaultStorage()
                .get('groupId')
            if (!userGroupId) {
                return void setTimeout(this.checkApproveStatusPur(serviceType, cb), 1000)
            }
            this.queryApproveConfig({
                userGroupId: userGroupId,
                serviceType
            }).then(res => {
                // 是否领导审批：0需要，1不需要
                // Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组。
                this.isShowApprove =
                    Object.keys(res).length > 0 &&
                    (+res.approveLeader !== 1 || +res.approveBusiness !== 1)
                this.approveMoney = res.approveMoney
                if (cb && typeof cb === 'function') cb(res)
            })
        }
    },
    computed: {
        ifApprovePurchase() {
            let disable = false
            if (this.checkProductList.some(i => i.discard === true)) {
                disable = true
            }
            return disable
        }
    }
}
