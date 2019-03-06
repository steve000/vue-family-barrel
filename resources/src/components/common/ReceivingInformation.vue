/**
* 收货信息
* disabled：true or false，是否禁止选择
* labelWidth： label的宽度
* buttonName： 保存按钮的名称
**/
<template>
    <div class="receivingInformation">
        <el-form ref="ReceivingInformationParams" :model="ReceivingInformationParams" :rules="ReceivingInformationRules" :label-width="labelWidth" label-position="left">
            <div>
                <div class="displayStyle">
                    <el-form-item label="联系人：" prop="linkMan">
                        <el-input v-model.trim="ReceivingInformationParams.linkMan" :disabled="disabled" placeholder="请输入联系人" class="col_width linkMan" size="small">
                        </el-input>
                    </el-form-item>
                </div>
                <span class="mark ml20">请输入10个字符以内的联系人</span>
            </div>
            <div>
                <div class="displayStyle displayStyle1">
                    <el-form-item label="联系电话：" prop="phone">
                        <el-input v-model="ReceivingInformationParams.phone" :maxlength="16" :disabled="disabled" placeholder="请输入联系电话" class="col_width phone" size="small">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div>
                <div class="displayStyle">
                    <el-form-item label="所在地区：" prop="region">
                        <el-cascader :options="datas" :change-on-select="true" v-model="ReceivingInformationParams.region" :props="{value: 'code', label: 'name', children: 'children'}" :before-filter="changeRegion" :clearable="false" :disabled="disabled" size="small" placeholder="请选择区域" class="col_width region">
                        </el-cascader>
                    </el-form-item>
                </div>
            </div>
            <div>
                <div class="displayStyle">
                    <el-form-item label="详细地址：" prop="address">
                        <el-input v-model.trim="ReceivingInformationParams.address" :disabled="disabled" maxlength="254" placeholder="请输入详细地址" class="col_width2 address" size="small" @blur="addressResolve">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="clearfix">
                <el-button class="saveAdd" size="small" @click="submitReceiving">{{ buttonName }}</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import api from '~/utils/api.js'
import { mapActions } from 'vuex'
import messages from '~/mixins/messages.js'

export default {
    name: 'receivingInformation',
    mixins: [messages],
    props: {
        disabled: {
            type: Boolean,
            default () {
                return false
            }
        },
        labelWidth: {
            type: String,
            default () {
                return '110px'
            }
        },
        buttonName: {
            type: String,
            default () {
                return '保存地址'
            }
        },
        ifParsing: {
            type: Boolean,
            default: false
        }
    },
    data () {
        const validatorLinkTel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('输入联系电话'))
            } else if (/^\d*$/.test(value) && value[0] === '1') {
                if (!/^1\d{10}$/.test(value)) {
                    return callback(new Error('请正确输入联系电话'))
                } else {
                    return callback()
                }
            } else {
                return callback()
            }
        }
        return {
            // 新增收货地址参数
            ReceivingInformationParams: {
                linkMan: '',
                phone: '',
                region: [],
                regionName: [],
                address: '',
                isDefault: '0'
            },
            // 新增收货地址校验
            ReceivingInformationRules: {
                linkMan: [
                    { required: true, message: '请输入10个字符以内的联系人!', trigger: 'blur' },
                    { max: 10, message: '请输入10个字符以内的联系人!', trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator: validatorLinkTel, trigger: 'blur' }
                ],
                region: [
                    {
                        required: true,
                        message: '请选择收货地址',
                        trigger: 'change',
                        type: 'array'
                    }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { max: 255, message: '长度不超过255个字符', trigger: 'blur' }
                ]
            },
            // 省市区数据
            datas: [],
            // 最大几级
            maxLevel: 3,
            // 省市区暂存对比
            checkedItemsFull: [null, null, null],
            regionDisabled: false
        }
    },
    watch: {
        'ReceivingInformationParams.region': {
            handler: function (val) {
                this.changeRegion(val)
            },
            deep: true
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        ...mapActions(['queryProvinceCityArea', 'getAddressResolveCode']),
        // 提交收貨地址
        submitReceiving () {
            this.$refs['ReceivingInformationParams'].validate(valid => {
                if (valid) {
                    if (this.checkedItemsFull.includes(null)) {
                        this.showWarning(`请选择完整所在地区`)
                    } else {
                        this.$emit('submit', this.ReceivingInformationParams)
                    }
                } else {
                    return false
                }
            })
        },
        // 重置校验表单
        clearForm (name = 'ReceivingInformationParams') {
            this.$refs[name].clearValidate()
        },
        // 重置表单
        resetForm (name = 'ReceivingInformationParams') {
            this.$refs[name].resetFields()
        },
        // 省市区
        // 保存省市区数据
        saveData (result, datas) {
            if (result) {
                let _data = result || null
                if (_data === null || !_data.length) {
                    _data = result
                    this.ReceivingInformationParams.region = [_data.code]
                    this.checkedItemsFull = [null, null, _data.code]
                    _data = [Object.assign({ level: this.maxLevel }, _data)]
                }
                if (_data !== null || _data.length) {
                    if (_data[0].level < this.maxLevel) {
                        _data.forEach(x => {
                            if (x.children === undefined) {
                                x.children = []
                            }
                        })
                    }
                    if (this.ReceivingInformationParams.region.length && datas) {
                        datas.children = _data
                    } else {
                        this.datas = _data
                    }
                }
                this.$emit(
                    'region',
                    this.checkedItemsFull,
                    this.ReceivingInformationParams.regionName
                )
            }
        },
        // 请求省市区数据
        async getData ({ params = { code: '', level: 1 }, datas } = {}) {
            return api.queryProvinceCityArea(params).then(response => {
                if (response) {
                    this.saveData(response, datas)
                    return response
                }
            })
        },
        // 省市区选中后
        async changeRegion (val) {
            let datas = this.datas
            this.checkedItemsFull = [null, null, null]
            for (let i = 0; i < val.length; i++) {
                if (val[i] == null || val[i] === '') {
                    continue
                }
                const itemIndex = datas.findIndex(data => {
                    return Number(data.code) === Number(val[i])
                })
                const pos = datas[itemIndex].level + 2 - this.maxLevel
                this.$set(this.checkedItemsFull, pos, val[i])
                this.$set(
                    this.ReceivingInformationParams.regionName,
                    pos,
                    datas[itemIndex].name
                )
                if (
                    datas[itemIndex].level < this.maxLevel &&
                    (datas[itemIndex].children === undefined ||
                        (datas[itemIndex].children && !datas[itemIndex].children.length))
                ) {
                    const result = await this.getData({
                        params: { code: val[i], level: pos + 2 },
                        datas: datas[itemIndex]
                    })
                    datas = result
                } else {
                    datas = datas[itemIndex].children
                }
            }
        },
        addressResolve () {
            if (this.ReceivingInformationParams.address && this.ifParsing) {
                this.getAddressResolveCode({ address: this.ReceivingInformationParams.address }).then(res => {
                    if (res && res.provinceCode && res.cityCode && res.areaCode) {
                        this.ReceivingInformationParams.region = [res.provinceCode, res.cityCode, res.areaCode]
                    } else {
                        this.ReceivingInformationParams.region = []
                        this.showWarning(`未识别到所在地区`)
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.receivingInformation {
  width: 100%;
  height: 100%;
  .el-form-item__content {
    height: 32px;
  }
  .displayStyle {
    display: inline-block;
    padding-left: 25px;
    // margin-bottom: 9px;
    .col_width {
      width: 300px;
      height: 32px;
      line-height: 32px;
    }
    .col_width2 {
      width: 740px;
      height: 32px;
      line-height: 32px;
    }
  }
  .saveAdd.el-button {
    border: 1px solid #d4e6ff;
    color: #3b8cff;
    margin-left: 135px;
    &:focus,
    &:hover {
      background-color: transparent;
    }
  }
  .mark {
    color: #3b8cff;
  }
}
</style>
