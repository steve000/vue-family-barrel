/** 按时间搜索
* importParams:null
* exports:null
* 时间搜索组件，可选时间段，快捷选择方式：时间，今天，昨天，本周，向上返回一个对象，data: {startDate: '2018-09-12', endDate: '2018-08-12'};
**/
<template>
    <div class="search-date-wrapper">
        <div class="quick-choose">
            <span class="create-time">创建时间：</span>
            <div class="choose-btn-group">
                <label v-for="(item,index) in quickChoose" :class="{'choose-btn': true, 'active':index === curIndex, 'clear-border': curIndex === 1}" :key="index" @click="handleDate(index)">{{ item }}</label>
            </div>
        </div>
        <div>
            <el-date-picker v-model="curDate" :picker-options="pickerOptions" :clearable="clearable" type="daterange" align="right" unlink-panels range-separator="～" prefix-icon="false" size="small" format="yyyy-MM-dd" class="reset-dater-style" start-placeholder="开始日期" end-placeholder="结束日期" @blur="onBlurFirstChange" @focus="onFocusFirstChange" @change="dateChange">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
import utils from '~/utils/commonMethod'

export default {
    name: 'search-date',
    props: {
        clearable: {
            type: Boolean
        },
        isClearDate: {
            type: Boolean
        },
        defaultDate: {
            type: Array
        }
    },
    data () {
        return {
            quickChoose: ['今天', '昨天', '本周'],
            curDate: null,
            curIndex: -1, // 当前选择的事件
            pickerOptions: {
                // 限制只能选择当天以前的日期
                disabledDate (time) {
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            isFirstChange: false,
            defaultTime: ['00:00:00', '23:59:59'],
            timeLen: ''
        }
    },
    watch: {
        curDate: function (val, old) {
            if (!val) {
                this.dateChange()
            }
        },
        defaultDate (val) {
            if (val) {
                this.curDate = val
                const datas = {
                    startDate: utils.dateFormatMethod(val[0]),
                    endDate: utils.dateFormatMethod(val[1])
                }
                this.$emit('onHandleDate', datas)
            }
        },
        isClearDate: {
            handler (newVal, oldVal) {
                if (newVal) {
                    this.curIndex = -1
                    this.curDate = ''
                }
            }
        }
    },
    methods: {
        handleDate (i) {
            this.curIndex = i
            switch (i) {
            case 0:
                this.curDate = [this.getTime(), this.getTime()]
                break
            case 1:
                this.curDate = [this.getTime('pre'), this.getTime('pre')]

                break
            case 2:
                this.curDate = [this.getTime('week'), this.getTime()]
                break
            }
            const datas = {
                startDate: utils.dateFormatMethod(this.curDate[0]),
                endDate: utils.dateFormatMethod(this.curDate[1]),
                timeStr: this.quickChoose[this.curIndex]
            }
            this.$emit('onHandleDate', datas, i)
        },
        dateChange (val) {
            if (this.curDate) {
                if (!this.isFirstChange) {
                    return
                }
                const datas = {
                    startDate: utils.dateFormatMethod(this.curDate[0]),
                    endDate: utils.dateFormatMethod(this.curDate[1])
                }
                this.$emit('onHandleDate', datas)
            } else {
                const datas = {
                    startDate: null,
                    endDate: null
                }
                this.curIndex = null
                this.$emit('onHandleDate', datas)
            }
            this.curIndex = null
        },
        onBlurFirstChange () {
            if (this.curDate && !this.isFirstChange) {
                this.isFirstChange = true
            }
        },
        onFocusFirstChange () {
            if (!this.curDate) {
                this.isFirstChange = true
            }
        },
        // 获取本月，本周，昨天开始日期
        getTime (data) {
            return utils.getTime(data)
        }
    }
}
</script>

<style lang="scss">
.search-date-wrapper {
  .el-range-separator {
    width: 16px;
    display: inline-block;
    color: #999;
    padding: 0;
    line-height: 32px;
  }
  .el-range-input {
    height: auto;
    font-size: 12px !important;
  }
  .reset-dater-style {
    width: 200px;
    height: 34px;
    border-radius: 2px;
    border-color: #e0e0e0;
  }
  .el-range__icon {
    display: none;
  }
  .el-range-editor.el-input__inner {
    padding: 0;
  }
}
</style>
<style scoped lang="scss">
.search-date-wrapper {
  display: flex;
  .quick-choose {
    color: #333;
  }
  .choose-btn-group {
    display: inline-block;
    margin-right: 10px;
    border-radius: 2px;
    font-size: 0;
    label {
      width: 48px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background-color: #ffffff;
      font-size: 12px;
      color: #666666;
      border: 1px solid #e0e0e0;
      display: inline-block;
    }
    .choose-btn:nth-child(2) {
      border-left: none;
      border-right: none;
    }
    .choose-btn:nth-child(1) {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    .choose-btn:nth-child(3) {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    .choose-btn:nth-of-type(1).clear-border {
      border-right: 1px solid #bfd9fe;
    }
    .choose-btn:nth-of-type(3).clear-border {
      border-left: 1px solid #bfd9fe;
    }
    .choose-btn:hover {
      cursor: pointer;
    }
    .choose-btn.active {
      color: #ffffff;
      background-color: #3b8cff;
      border-color: #3b8cff;
    }
    .create-time {
      color: #333;
    }
  }
}
</style>
