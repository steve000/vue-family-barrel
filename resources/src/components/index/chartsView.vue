<template>
    <div>
        <div class="title">
            <h3>渠道订单量分布</h3>
        </div>
        <div class="chartsView">
            <el-select v-model="channelId" placeholder="请选择" size="mini" style="height: 34px;" class="choiceChannel" popper-class="select-menu-specail" @change="channelChange">
                <el-option v-for="item in channelTypeOptions" :key="item.channelId" :label="item.channelName" :value="item.channelId">
                </el-option>
            </el-select>
            <div v-on-echart-resize id="myCharts" ref="myCharts"></div>
            <div class="chartsViewLatestTime">近一周</div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import echarts from 'echarts'

export default {
    name: 'chartsView',
    data() {
        return {
            echarts: '',
            textTime: '',
            chartOptions: {
                title: {
                    text: '',
                    textStyle: {
                        color: '#333',
                        fontSize: 14,
                        align: 'right',
                        fontWeight: 400
                    },
                    left: 21
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '3%',
                    top: '15%',
                    bottom: '30px',
                    containLabel: true
                },
                legend: {
                    data: [],
                    left: '338',
                    align: 'left',
                    padding: [0, 80, 0, 0],
                    type: 'scroll',
                    top: '5',
                    show: false
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        nameTextStyle: {
                            color: '#9c9c9c'
                        }
                    }
                ],
                yAxis: {
                    type: 'value',
                    nameTextStyle: {
                        color: '#9c9c9c'
                    }
                },
                series: []
            },
            channelTypeOptions: [], // 渠道列表
            channelId: ''
        }
    },
    watch: {
        chartOptions: {
            handler(newVal, oldVal) {
                if (this.echarts) {
                    if (newVal) {
                        this.echarts.setOption(newVal)
                    } else {
                        this.echarts.setOption(oldVal)
                    }
                }
            },
            deep: true
        }
    },
    created() {
        this.getChannelAll()
        this.querySaleOrderEchartsFunc()
    },
    mounted() {
        this.echarts = echarts.init(this.$refs.myCharts)
        this.echarts.setOption(this.chartOptions)
    },
    methods: {
        ...mapActions([
            'showPageLoading',
            'hidePageLoading',
            'querySaleOrderEchartsAction',
            'queryChannelBySearch'
        ]),
        /**
     * 查询所有渠道
     */
        getChannelAll () {
            this.queryChannelBySearch({ searchContent: '' }).then(res => {
                res.result.push({ channelName: '其他', channelId: '-1' })
                res.result.unshift({ channelName: '所有渠道', channelId: '' })
                this.channelTypeOptions = res.result
            }).catch(() => { })
        },
        /**
     * 筛选单条渠道折现图
     */
        channelChange(data) {
            this.querySaleOrderEchartsFunc(data)
        },
        // 渠道订单量分布
        async querySaleOrderEchartsFunc(channelId) {
            let THIS = this
            THIS.showPageLoading()
            let seriesTemp = {
                name: '',
                type: 'line',
                areaStyle: {
                    normal: {
                        type: 'default',
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(199, 37, 50,0.2)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(199, 37, 50,0.2)'
                            }
                        ],
                        false
                        )
                    }
                },
                smooth: true,
                itemStyle: {
                    normal: { areaStyle: { type: 'default' } }
                },
                data: []
            }
            let timeData = ''; let seriesTempArr = []; let legendArr = []
            await THIS.querySaleOrderEchartsAction(channelId ? {channelId: channelId} : {}).then(resp => {
                if (resp.series.length > 0 && resp.xAxis.categories.length > 0) {
                    timeData = resp.xAxis.categories
                    resp.series.forEach(element => {
                        seriesTempArr.push(Object.assign({}, seriesTemp, element))
                        legendArr.push(element.name)
                    })
                    THIS.$set(THIS.chartOptions, 'series', seriesTempArr)
                    THIS.$set(THIS.chartOptions.legend, 'data', legendArr)
                    THIS.$set(THIS.chartOptions.xAxis[0], 'data', timeData)
                    let _firstTime = timeData[0]
                    let _lastTime = timeData[timeData.length - 1]
                    let _firstStr = _firstTime.split('-')[1].replace(/[0]/ig, '').concat('月').concat(_firstTime.split('-')[2]).concat('日')
                    let _lastStr = _lastTime.split('-')[1].replace(/[0]/ig, '').concat('月').concat(_lastTime.split('-')[2]).concat('日')
                    THIS.textTime = _firstStr.concat('-').concat(_lastStr)
                    THIS.$set(THIS.chartOptions.title, 'text', THIS.textTime)
                    THIS.hidePageLoading()
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .chartsView {
      background-color: white;
      padding-top: 20px;
      height: 386px;
      width: 100%;
      position: relative;
      #myCharts {
        height: 100%;
        width: 100%;
      }
      .chartsViewLatestTime{
        font-size: 13px;
        position: absolute;
        top: 22px;
        right: 30px;
    }
    .choiceChannel{
        position: absolute;
        left: 205px;
        top: 20px;
        z-index: 999;
    .el-input input{
      border-color: #CECECE;
      height: 24px;
      line-height: 24px;
    }
    &:before{
      width: 2px;
      height: 14px;
      background-color:#CECECE;
      content: "";
      display: inline-block;
      position: absolute;
      top: 4.5px;
      left: -54px;
    }
    &:after{
      content: "渠道：";
      display: inline-block;
      position: absolute;
      left: -35px;
      top: 3px;
      color: #333;
      font-size: 12px;
    }
    }
    }
</style>
