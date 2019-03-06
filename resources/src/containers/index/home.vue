<template>
    <div class="ngoc-home">
        <div class="content-box">
            <!-- <div class="title">
        <h3>待办事项</h3>
      </div>
      <ul class="sale-order-tab">
          <li v-for="(item,index) in saleOrderTab" :key="index" :class="{'active':item.title === currentTitle}" @click="changeTab(item.title)">{{item.title}}</li>
      </ul> -->
            <!-- <div class="order-list product-list-table-common"> -->
            <!-- <template v-if="currentTitle==='采购单'">
            <GoodsListTable :saleList="saleList"></GoodsListTable>
        </template>
        <template v-else-if="currentTitle==='销售单'">
            <ReturnsTable :tableData="tableData"></ReturnsTable>
        </template>
        <template v-else-if="currentTitle==='出库单'">
            <ChangeRecordTable :changeList="changeList"></ChangeRecordTable>
        </template>
        <template v-else-if="currentTitle==='入库单'">
            <OperationLogTable :logList="logList"></OperationLogTable>
        </template>
        <template v-else-if="currentTitle==='退货单'">
            <LogisticsInfo :logisticsRecords='logisticsRecords'></LogisticsInfo>
        </template>
        <template v-else-if="currentTitle==='换货单'">
            <LogisticsInfo :logisticsRecords='logisticsRecords'></LogisticsInfo>
        </template> -->
            <!-- </div> -->
            <div class="title">
                <h3>预警信息</h3>
            </div>
            <div class="warningInfo">
                <div class="retentionOrder">
                    <div class="sunTitle">滞留订单</div>
                    <div class="retentionContent">
                        <ul>
                            <li v-for="(item,index) in retentionOrder" :key="index">
                                <div class="inner" @click="item.count?homeToStatus(item.timeLen, index):''">
                                    <span>{{ item.count }}</span>
                                    <span>{{ item.text }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="abnormalOrder abnormalOrderSpec">
                    <div class="sunTitle">异常订单</div>
                    <div class="abnormalContent">
                        <ul>
                            <li v-for="(item,index) in abnormalContent" :key="index" @click="item.count!=0 && parseInt(item.errorType)!=99?homeToErrorStatus(item.errorType2):''">
                                <div class="inner">
                                    <span v-if="!item.count">0</span>
                                    <span v-else>{{ item.count }}</span>
                                    <span>{{ item.text }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <template>
                <keep-alive>
                    <chartsView class="ngoc-home"></chartsView>
                </keep-alive>
            </template>
            <div class="title">
                <h3>链路各环节订单分布</h3>
            </div>
            <div class="linkSpreadOrder">
                <ul>
                    <li v-for="(item,index) in linkSpreadOrder" :key="index" @click="item.count?homeToStatus(item.orderStatus):''">
                        <span :class="item.sclass"></span>
                        <span>{{ item.count }}</span>
                        <span>{{ item.textStatus }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import '~/utils/echartResizeHelper'
// import commonMethod from '~/utils/commonMethod'
import QuitMixins from '~/mixins/quit'
import { mapActions } from 'vuex'
import platform from '~/mixins/platform'
import chartsView from '~/components/index/chartsView'
// import { isArray } from 'util'
export default {
    name: 'Home',
    components: { chartsView },
    mixins: [platform, QuitMixins],
    data () {
        return {
            retentionNum: [0, 0, 0],
            errorTypeCount: '',
            errorParams: [
                {
                    errorType: 0
                },
                {
                    errorType: 1,
                    orderType: '11,12,13'
                }
            ],
            orderStatus: [1, 2, 3, 4, 5],
            linkSpreadOrder: [
                {
                    count: 0,
                    textStatus: '未出库',
                    orderStatus: 1,
                    sclass: 'iconfont1 icon-weifahuo color1'
                },
                {
                    count: 0,
                    textStatus: '部分出库',
                    orderStatus: 3,
                    sclass: 'iconfont1 icon-bufenfahuo color2'
                },
                {
                    count: 0,
                    textStatus: '待出库',
                    orderStatus: 2,
                    sclass: 'iconfont1 icon-daichuku color3'
                },
                {
                    count: 0,
                    textStatus: '已出库',
                    orderStatus: 4,
                    sclass: 'iconfont1 icon-yifahuo color4'
                },
                {
                    count: 0,
                    textStatus: '已完成',
                    orderStatus: 5,
                    sclass: 'iconfont1 icon-yiwancheng color5'
                }
            ],
            abnormalContent: [
                {
                    text: '库存不足',
                    errorType: 7,
                    count: 0,
                    errorType2: 7
                },
                {
                    text: '超时未送达',
                    errorType: 3,
                    count: 0,
                    errorType2: 3
                },
                {
                    text: '地址信息不全',
                    errorType: 6,
                    count: 0,
                    errorType2: 5
                },
                {
                    text: '已拒收',
                    errorType: 1,
                    count: 0,
                    errorType2: 1
                },
                {
                    text: '超时未出库',
                    errorType: 2,
                    count: 0,
                    errorType2: 2
                },
                {
                    text: '其它异常',
                    errorType: 99,
                    count: 0
                }
            ],
            retentionOrder: [
                {
                    timeLen: 24,
                    type: 11,
                    count: 0,
                    text: '24小时未出库'
                },
                {
                    timeLen: 48,
                    type: 11,
                    count: 0,
                    text: '48小时未出库'
                },
                {
                    timeLen: 72,
                    type: 11,
                    count: 0,
                    text: '72小时未出库'
                }
            ],
            activeName: 'first',
            // 待办事项tab
            saleOrderTab: [{ title: '采购单' }],
            currentTitle: '采购单', // 当前订单类别
            orderAttrbute: {}
        }
    },
    watch: {
        $route (to, from) {
            if (to.name === 'Home') {
                this.currentTitle = '采购单'
                // this.getOrderAttr();
            }
        }
    },
    created () {
        this.getData()
    },
    mounted () {
        // this.getOrderAttr();
    },
    methods: {
        ...mapActions([
            'showPageLoading',
            'hidePageLoading',
            'querySalesOrderList',
            'queryRetentionOrderCountAction',
            'statisticsOrderNumAction',
            'querySaleOrderEchartsAction',
            'queryOrderAndErrorCountAction',
            'queryOrderAttr'
        ]),
        // 获取订单属性
        getOrderAttr () {
            this.queryOrderAttr({ orderId: 'XS201807300016098' })
                .then(res => {
                    this.hidePageLoading()
                    this.saleOrderTab = [{ title: '采购单' }]
                    if (Number(res.logisticsFlag)) {
                        this.saleOrderTab.push({ title: '销售单' })
                    }
                    if (Number(res.outStoreFlag)) {
                        this.saleOrderTab.push({ title: '出库单' })
                    }
                    if (Number(res.returnFlag)) {
                        this.saleOrderTab.push({ title: '入库单' })
                    }
                    if (Number(res.changeFlag)) {
                        this.saleOrderTab.push({ title: '退货单' })
                    }
                    if (Number(res.outStoreErrorFlag)) {
                        this.saleOrderTab.push({ title: '换货单' })
                    }
                    if (Number(res.operLogFlag)) {
                        this.saleOrderTab.push({ title: '操作日志' })
                    }
                    this.orderAttrbute = res
                })
                .catch(() => {
                    this.hidePageLoading()
                })
        },
        // tab切换
        changeTab (title) {
            this.currentTitle = title
            switch (title) {
            case '采购单':
                this.getOutStore()
                break
            case '销售单':
                this.getOrderRefund()
                break
            case '出库单':
                this.getOrderLog()
                break
            case '入库单':
                this.getSalesChangeList()
                break
            case '退货单':
                this.getRouter()
                break
            case '换货单':
                this.queryRejectRecord()
                break
            }
        },
        homeToStatus (data, index) {
            this.$router.push({ name: 'SalesOrder' })
            this.$store.commit('HOME_TO_ORDERSALES_STATUS', data)
        },
        homeToErrorStatus (data) {
            this.$router.push({ name: 'SalesOrder' })
            let _error = { isErrorType: true, errorType: data }
            this.$store.commit('HOME_TO_ORDERSALES_ERRORSTATUS', { _error })
        },
        getData () {
            this.querySalesOrderListFunc()
            // this.getStatisticsOrder();
            this.queryRetentionOrderCount()
        },

        // 异常订单
        querySalesOrderListFunc () {
            let _errorParams = this.errorParams
            // let _linkSpreadOrder = this.linkSpreadOrder
            let THIS = this
            THIS.showPageLoading()
            for (let i = 0; i < _errorParams.length; i++) {
                try {
                    THIS.queryOrderAndErrorCountAction(_errorParams[i]).then(resp => {
                        if (_errorParams[i].errorType === 1) {
                            resp.forEach((element, index) => {
                                THIS.$set(THIS.abnormalContent[index], 'count', element['count'])
                            })
                        } else {
                            resp.forEach((element, index) => {
                                THIS.$set(THIS.linkSpreadOrder[index], 'count', element['count'])
                            })
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            THIS.hidePageLoading()
        },
        async queryRetentionOrderCount () {
            let THIS = this
            THIS.showPageLoading()
            let _retentionOrder = JSON.parse(JSON.stringify(THIS.retentionOrder))
            for (let i in _retentionOrder) {
                delete _retentionOrder[i].text
                delete _retentionOrder[i].count
                try {
                    await THIS.queryRetentionOrderCountAction(_retentionOrder[i]).then(
                        resp => {
                            THIS.$set(THIS.retentionOrder[i], 'count', resp.count)
                        }
                    )
                } catch (error) {
                    console.log(error)
                }
            }
            this.hidePageLoading()
        }
    }
}
</script>

<style lang="scss" scoped>
.sale-order-tab li {
  display: inline-block;
  width: 86px;
  height: 36px;
  background: #e7e8ed;
  margin-right: 6px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  color: #666;
}
.sale-order-tab li.active {
  background: #fff;
  color: #333;
}
.order-list {
  box-sizing: border-box;
  padding: 21px;
  background: #fff;
}
</style>
