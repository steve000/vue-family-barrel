<!--
/*
    仓库模块联系人交互部分封装的组件,点击 添加 按钮，添加到列表里同时触发emit事件
    传入参数： relationList，参数格式为：[{name: '', phone: '', address: '', area: ''}...], 非必填
             isEditStorehouse, 是否是编辑操作，编辑和新增页面共用该交互组件，但新增时联系人对联系人的操作都是前台操作，
                编辑时编辑联系人操作是与后台交互, 默认false
    返回：    emit('getLianXiRenInfo', relationList)，relationList是列表里的联系人数据
*/
-->

<template>
    <div class="lianxiren">
        <div class="content">
            <div class="title">
                <div style="display: inline-block">联系人信息</div>
            </div>

            <div class="content-wrapper">
                <div class="add-wrapper">
                    <el-button size="mini" icon="iconfont1 icontianjia icon-tianjia" @click="openAddEdit">新增联系人</el-button>
                </div>
                <el-table :data="newData" style="width: 100%">
                    <el-table-column prop="linkman" label="联系人"></el-table-column>
                    <el-table-column prop="phone" label="联系电话"></el-table-column>
                    <el-table-column label="联系人地址" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ Array.isArray(scope.row.selectArea) ? scope.row.selectArea.join('-') : scope.row.selectArea }} {{ scope.row.storehouseAddress }}
                            <!-- {{ Array.isArray(scope.row.province) ? scope.row.city.join('-') : scope.row.area }} {{ scope.row.storehouseAddress }} -->
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.$index)">编辑</el-button>
                            <el-button type="text" @click="deleteRelation(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog v-if="addContractDialogVisible" :title="title" :visible.sync="addContractDialogVisible" width="626px" @close="closeDialog">
            <el-form ref="addContract" :model="info" :rules="addContract" label-width="90px" label-position="left">
                <div>
                    <div style="display: inline-block;">
                        <el-form-item label="联系人 : " prop="linkman">
                            <el-input v-model.trim="info.linkman" size="small" placeholder="请输入联系人" style="width: 190px"></el-input>
                        </el-form-item>
                    </div>
                    <div style="display: inline-block;margin-left: 15px;">
                        <el-form-item label="联系电话 : " prop="phone">
                            <el-input v-model.trim="info.phone" :maxlength="phoneLength" size="small" placeholder="请输入联系电话" style="width: 190px" on-keypress="return (/[0-9]/.test(String.fromCharCode(event.keyCode)))" @keyup.native="onkeyup"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div style="display: inline-block;">
                        <el-form-item label="所在地区 :" prop="area">
                            <region-select ref="regionParams" :address-data="defaultAddress" :clearable="true" style="width: 190px" @region="regionChange"></region-select>
                        </el-form-item>
                    </div>
                    <div style="display: inline-block;margin-left: 15px;">
                        <el-form-item label="详细地址 :" prop="storehouseAddress">
                            <el-input v-model.trim="info.storehouseAddress" maxlength="254" size="small" placeholder="请输入详细地址" style="width: 190px"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item>
                    <el-button type="primary" size="small" style="float:right; margin:7px 5px -14px 0; width: 100px" @click="add">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
import utils from '~/utils/misc'
import Modal from '~/components/common/Modal'
import RegionSelect from '~/components/common/RegionSelect'
import MessageMixins from '~/mixins/messages'
export default {
    name: 'LianXiRenInfo',
    components: { Modal, RegionSelect },
    mixins: [MessageMixins],
    props: {
        relationList: {
            type: Array,
            required: false
        },
        isEditStorehouse: {
            type: Boolean,
            default: false
        }
    },
    data () {
        let validateLinkman = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入10个字符以内的联系人'))
            } else {
                if (value.length > 10) {
                    callback(new Error('请输入10个字符以内的联系人'))
                } else {
                    return callback()
                }
            }
        }
        let validatorAddress = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入详细地址'))
            } else {
                return callback()
            }
        }
        let validatorArea = (rule, value, callback) => {
            let _valid = this.$refs['regionParams'].checkedItems.some(item => {
                return item == null
            })
            if (this.$refs['regionParams'].checkedItems.length < 3 || _valid) {
                return callback(new Error('请完整选择所在地区'))
            } else {
                return callback()
            }
        }
        var validatePhone = (rule, value, callback) => {
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
            currentIndex: '',
            phoneLength: 16,
            newData: [],
            defaultAddress: [], // 编辑一条联系人地址时，默认回显的仓库地址
            info: {
                selectArea: [],
                selectAreaCode: [],
                linkman: '',
                phone: '',
                storehouseAddress: '',
                isEdit: false
            },
            addContract: {
                linkman: [{ required: true, validator: validateLinkman, trigger: 'change' }],
                phone: [{ required: true, validator: validatePhone, trigger: 'change' }],
                storehouseAddress: [{ required: true, validator: validatorAddress, trigger: 'change' }],
                area: [{ required: true, validator: validatorArea, trigger: 'change' }]
            },
            addContractDialogVisible: false,
            title: '新增联系人'
        }
    },
    watch: {
        relationList: function (nval, oval) {
            if (nval.length > 0 && nval[0].linkman) {
                this.newData = nval
            } else {
                this.newData = []
            }
        }
    },
    methods: {
        openAddEdit () {
            this.addContractDialogVisible = true
            this.clearVarify()
            this.clearInfo()
            this.title = '新增联系人'
            this.defaultAddress = []
        },
        add () {
            this.$refs['addContract'].validate(res => {
                if (!res) {
                    return false
                } else {
                    this.info.provinceCode = this.info.selectAreaCode[0]
                    this.info.cityCode = this.info.selectAreaCode[1]
                    this.info.areaCode = this.info.selectAreaCode[2]
                    this.info.province = this.info.selectArea[0]
                    this.info.city = this.info.selectArea[1]
                    this.info.area = this.info.selectArea[2]
                    if (this.info.isEdit) { // 编辑
                        if (!this.isEditStorehouse) { // 编辑页面的操作
                            let index = utils.findIndex(this.newData, function(one) { return one.isEdit })
                            this.info.isEdit = false
                            this.newData.splice(index, 1, utils.cloneDeep(this.info))
                            this.clearInfo()
                            this.addContractDialogVisible = false
                        } else { // 添加页面的操作
                            let index = utils.findIndex(this.newData, function(one) { return one.isEdit })
                            this.info.isEdit = false
                            this.$emit('modifyStorehouseLink', { ...this.info }, this.newData, index)
                            this.clearInfo()
                            this.addContractDialogVisible = false
                        }
                    } else { // 添加
                        if (!this.isEditStorehouse) { // 编辑页面的操作
                            let res = utils.cloneDeep(this.info)
                            this.newData.unshift(res)
                            this.$emit('getLianXiRenInfo', this.newData)
                            this.clearInfo()
                            this.addContractDialogVisible = false
                        } else { // 编辑仓库时候的添加联系人操作
                            this.info.linkAddress = this.info.storehouseAddress
                            this.$emit('addStorehouseLink', { ...this.info }, this.newData)
                            this.clearInfo()
                            this.addContractDialogVisible = false
                        }
                    }
                }
            })
        },
        clearInfo () {
            this.info.linkman = ''
            this.info.phone = ''
            this.info.adress = ''
            this.info.selectArea = []
            this.info.isEdit = false
            this.info.storehouseAddress = ''
        },
        closeDialog () {
            this.clearInfo()
        },
        clearDataList () {
            this.newData = []
        },
        clearVarify () {
            setTimeout(() => {
                this.$refs['addContract'].resetFields()
            }, 80)
        },
        async edit (index) {
            this.title = '编辑联系人'
            this.currentIndex = index
            this.addContractDialogVisible = true
            this.newData.forEach((one, i) => {
                one.isEdit = Boolean(i === index)
            })
            this.info = Object.assign({}, this.newData[index])
            this.defaultAddress = this.info.selectAreaCode
        },
        deleteRelation (index) {
            this.$confirm('确认删除该联系人?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.doDelete(index)
            }).catch(() => {
                this.showQuit()
            })
        },
        doDelete (index) {
            if (!this.isEditStorehouse) {
                if (this.newData[index].isEdit) {
                    this.clearInfo()
                }
                this.newData.splice(index, 1)
                this.showSuccess()
            } else {
                this.$emit('deleteStorehouseLink', this.newData[index], this.newData, index)
            }
        },
        regionChange (region, regionName) {
            let _valid = region.every(item => {
                return item == null
            })
            this.info.selectArea = _valid ? [null, null, null] : regionName
            this.info.selectAreaCode = region
        },
        isPhoneNumCorrect (phoneNum) {
            let data = phoneNum + ''
            const myreg = /^[1][3,4,7,8][0-9]{9}$/
            if (!myreg.test(data)) {
                return false
            } else {
                return true
            }
        },
        onkeyup () {
            this.info.phone = this.info.phone.replace(/[^\d]/g, '')
            let _phone = this.info.phone
            if (/^[^1]/g.test(_phone)) {
                this.phoneLength = 16
            } else {
                this.phoneLength = 11
            }
        }
    }
}
</script>

<style lang="scss">
.lianxiren {
  .content-wrapper {
    .add-wrapper {
      margin-bottom: 20px;
      .icontianjia {
        margin-right: 5px;
        margin-left: -6px;
        margin-top: 1px;
        font-size: 10px;
        width: 10px;
        height: 10px;
      }
    }
    .el-table .el-table__body-wrapper.is-scrolling-none {
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;

      .el-table__empty-text {
        font-size: 12px;
      }
    }
    .el-table__empty-block {
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
