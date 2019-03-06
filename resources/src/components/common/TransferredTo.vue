/**
 * @file 转交给XX组件
 * 列举场景：
 *  代办事项-采购审批-审批-转交-转交给XX
 * 传入参数：
 *  isClearValue:false,选中后是否清楚选择框
 *  leaderId: {fullName：XX,uid:XX},根据leaderId回显相关数据
 * 返回：
*   emit('transferEntity', data)
*   data(Object):{"uid":'',"fullName":"","mold":'',"phone":'',"email":"","userName":"","":"","userGroupId":'',"departmentName":""}(示例)(当前选中数据对象，需要什么数据自己取就好了)
 */
<template>
    <div class="transfer-wrap">
        <el-select v-model="userEntity" :remote-method="remoteMethod" :size="$attrs.size" :loading="loading" filterable="" remote="" default-first-option placeholder="请输入OA账户或姓名搜索" @change="select">
            <el-popover v-for="(item, index) in userEntityOptions" :key="index" popper-class="entitySpe" placement="right-start" width="30%" trigger="hover">
                <div class="showEntityDetail">
                    <p class="el-icon-mobile-phone">{{ item.companyName }}</p>
                    <div class="list">
                        <ul>
                            <li>
                                <label>用户名：</label>
                                <span>{{ item.userName }}</span>
                            </li>
                            <li>
                                <label>姓名：</label>
                                <span>{{ item.fullName }}</span>
                            </li>
                            <li>
                                <label>部门：</label>
                                <span>{{ item.departmentName }}</span>
                            </li>
                            <li>
                                <label>电话：</label>
                                <span>{{ item.phone }}</span>
                            </li>
                            <li>
                                <label>邮箱：</label>
                                <span>{{ item.email }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <el-option slot="reference" :key="item.uid || item.oaUid" :label="item.fullName" :value="item.uid || item.oaUid">{{ item.fullName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+item.email+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' }}{{ item.mold === 0 ? '外协' : item.departmentName }}</el-option>
            </el-popover>
        </el-select>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'TransferredTo',
    props: {
        isClearValue: {
            type: Boolean,
            default: false
        },
        leaderId: {
            type: Object,
            default: () => {
                return {
                    fullName: null,
                    uid: null
                }
            }
        }
    },
    data () {
        return {
            userParams: {
                pageNo: 1,
                searchContent: '',
                pageSize: 999
            },
            userEntity: null,
            userEntityOptions: [],
            loading: false,
            loadingtext: 'loading'
        }
    },
    watch: {
        leaderId: {
            handler (nval, oval) {
                if (nval && nval !== oval) {
                    this.funReviewEntity()
                }
            },
            deep: true
        }
    },
    created () {
        if (this.leaderId.uid && this.leaderId.fullName) this.funReviewEntity()
    },
    methods: {
        ...mapActions(['queryAllEntityUserList', 'addCreateFromOaUser', 'showPageLoading', 'hidePageLoading']),
        async getUserList (data) {
            if (data.searchContent) {
                this.userEntityOptions = []
                await this.queryAllEntityUserList(Object.assign(this.userParams, this.userParams, ...arguments)).then(res => {
                    this.userEntityOptions = res.result
                })
                return Promise.resolve(this.userEntityOptions.length || 0)
            } else {
                this.userEntityOptions = []
                return false
            }
        },
        remoteMethod (query) {
            if (query !== '') {
                this.loading = true
                setTimeout(() => {
                    this.getUserList({ searchContent: String(query).replace(/\s+/g, '') }).then(() => {
                        this.loading = false
                    }).catch(() => { })
                }, 200)
            } else {
                this.userEntityOptions = []
            }
        },
        async select (data) {
            let _user = this.userEntityOptions.filter(val => { if ((val.uid || val.oaUid) === parseInt(data)) { return val } })[0]
            if (_user.mold === 1 && !_user.uid && _user.oaUid) {
                this.showPageLoading()
                await this.addCreateFromOaUser({ oaUid: _user.oaUid }).then(res => {
                    if (res) {
                        _user.uid = res.uid
                        this.$emit('transferEntity', _user)
                    } else {
                        this.userEntity = null
                    }
                }).finally(() => {
                    this.hidePageLoading()
                }).catch(() => {
                    this.userEntity = null
                })
            } else {
                this.$emit('transferEntity', _user)
            }
            this.userEntityOptions = []
            if (this.isClearValue) this.userEntity = null
        },
        funReviewEntity () {
            this.userEntityOptions.push(this.leaderId)
            this.userEntity = this.leaderId.uid
            this.remoteMethod(this.leaderId.fullName)
        }
    }
}
</script>

<style lang="scss" scoped>
.showEntityDetail {
  & > p {
    background-color: #f6f7fb;
    display: block;
    line-height: 34px;
    padding-left: 15px;
  }
  .list {
    ul {
      padding: 0 15px 15px;
      li {
        line-height: 30px;
        display: flex;
        label {
          color: #9c9c9c;
          font-size: 12px;
          min-width: 52px;
          display: inline-block;
        }
        span {
          color: #666666;
          font-size: 13px;
          flex: 1;
          word-break: break-all;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.entitySpe {
  padding: 0;
}
.transfer-wrap {
  width: 100%;
  .el-select {
    width: 100%;
    .el-input__inner:focus {
      border-color: #e0e0e0;
    }
  }
}
</style>
