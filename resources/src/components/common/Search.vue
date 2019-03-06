<!--
    搜索框组件
    传入参数：1.propsSearchValue：传入input搜索的value
              2.isClear：是否清空input组件的value
              3.propsSearchValueChange：监听传入input搜索的value是否改变
              4.showPlaceholder：input的showPlaceholder
     emit:1.searchValue：点击搜索时执行，返回searchValue
          2.reset：点击重置时执行
          3.clearSearch: 点击清空输入框的时候执行，清空输入框
-->

<template>
    <div class="search-component">
        <el-form ref="searchForm" :inline="true" :model="searchForm" :rules="rules" @submit.native.prevent="">
            <el-form-item prop="searchValue">
                <div class="search-box">
                    <el-input :placeholder="showPlaceholder" v-model.trim="searchForm.searchValue" :clearable="clearable" prefix-icon="iconfont1 icon-sousuo" size="small" @keyup.enter.native="submitSearch('searchForm')" @keyup.native="checkSearchValueLength" @focus="isFocus=true" @blur="isFocus=false" @clear="clearSearch">
                    </el-input>
                    <el-button :class="{'isFocus':isFocus}" type="primary" size="small" class="border-left-none" @click="submitSearch('searchForm')">搜索
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'search',
    props: {
        showPlaceholder: {
            type: String,
            default: '请输入内容'
        },
        isClear: {
            type: Boolean,
            default: false
        },
        propsSearchValue: {
            type: String,
            default: ''
        },
        propsSearchValueChange: {
            type: String,
            default: ''
        },
        clearable: {
            type: Boolean,
            default: true
        }
    },
    data () {
        let validatorSearchValue = (rule, value, callback) => {
            let searchValue = this.searchForm.searchValue.trim()
            if (searchValue.length < 1) {
                callback(new Error('请输入搜索内容'))
                return
            }
            callback()
        }
        return {
            searchForm: {
                searchValue: ''
            },
            isFocus: false,
            rules: {
                searchValue: { required: true, trigger: 'input', validator: validatorSearchValue }
            }
        }
    },
    computed: {
        dataChange: function () {
            return this.searchForm.searchValue
        }
    },
    watch: {
        isClear (nval) {
            if (nval) {
                this.searchForm.searchValue = ''
            }
        },
        // 库存板块搜索组价传入值时，赋值到input组件
        propsSearchValueChange (nval) {
            if (nval !== null) {
                this.searchForm.searchValue = this.propsSearchValue
            }
        }
    },
    mounted () {
        // 库存板块搜索组价传入值时，赋值到input组件
        this.searchForm.searchValue = this.propsSearchValue ? this.propsSearchValue : ''
    },
    methods: {
        submitSearch (formName) {
            this.checkForm(formName)
        },
        checkForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let searchValue = this.searchForm.searchValue.trim()
                    this.$emit('searchValue', searchValue)
                } else {
                    return false
                }
            })
        },
        checkSearchValueLength () {
            if (this.searchForm.searchValue.length > 20) {
                this.searchForm.searchValue = this.searchForm.searchValue.substr(0, 20)
            }
        },
        clearSearch() {
            this.$emit('clearSearch')
        }
    }
}
</script>

<style lang='scss'>
.search-component {
  position: relative;
  top: -4px;
  right: -13px;
  .search-box {
    width: auto;
    position: relative;
    text-align: right;
    .el-input {
      width: auto;
    }
    .el-input--small {
      display: inline-block;
      input {
        color: #333333;
        &:focus {
          border-color: #3b8cff;
        }
      }
    }
    .el-button {
      position: relative;
      left: -4px;
      top: 1px;
      width: 60px;
      background: #f7f7f7;
      border: 1px solid #e0e0e0;
      padding: 0px;
      text-align: center;
      line-height: 32px;
      border-radius: 2px;
      color: #333333;
      height: 32px;
    }
    .isFocus {
      background-color: #3b8cff;
      color: #ffffff;
      border-color: #3b8cff;
    }
    .border-left-none {
      border-left: none;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
    .el-input__inner {
      font-size: 12px;
      width: 296px;
      border: 1px solid #e0e0e0;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .el-input__prefix {
      left: 10px;
    }
    .iconfont1 {
      font-size: 14px;
    }
    .el-input.el-input--small.el-input--prefix {
      height: 34px;
      line-height: 34px;
    }
  }
  .el-form-item__error {
    padding: 0px;
  }
}
</style>
