<template>
    <div>
        <div class="uc-user-msg-wrap" v-if="userDataInit">
            <div class="uc-avatar avatar" :class="['avatar-' + userData.avatar]" @click="showPop"></div>
            <p class="name">{{userData.nickname}}</p>
            <p class="uid cm-text-dark">用户帐号：{{userData.uid}}</p>
            <div class="level">
                <p>级别</p>
                <p class="cm-text-dark">{{userData.level}}</p>
            </div>
        </div>

        <div class="uc-count-wrap" v-if="userWarehouseDataInit">
            <div class="item item-01">
                酵母（<span class="cm-text-red">{{userWarehouseData.rep_score}}</span>）
            </div>
            <div class="item item-02">
                蜂蜜（<span class="cm-text-red">{{userWarehouseData.honey}}</span>）
            </div>
            <div class="item item-03">
                红糖（<span class="cm-text-red">{{userWarehouseData.sugar}}</span>）
            </div>
        </div>

        <div class="cm-list-wrap main-menu-wrap">
            <ul class="list list-can-open menu-list">
                <li class="item menu-item" @click="goTo('/main/friends')">
                    好友玩家
                    <i class="icon iconfont icon-right"></i>
                </li>
                <li class="item menu-item" @click="goTo('/main/newPlayer')">
                    开发新玩家
                    <i class="icon iconfont icon-right"></i>
                </li>
                <li class="item menu-item" @click="goTo('/main/warehouse')">
                    仓库
                    <i class="icon iconfont icon-right"></i>
                </li>
                <li class="item menu-item" @click="goTo('/main/changePwd')">
                    修改密码
                    <i class="icon iconfont icon-right"></i>
                </li>
            </ul>
        </div>

        <div class="cm-list-wrap main-menu-wrap main-mt-2">
            <ul class="list list-can-open menu-list">
                <li class="item menu-item" @click="goTo('/main/sell')">
                    <i class="menu-icon menu-icon-01"></i>
                    转让
                    <i class="icon iconfont icon-right"></i>
                </li>
                <li class="item menu-item">
                    <i class="menu-icon menu-icon-02"></i>
                    基准发放率
                    <span class="inner-text">{{(userWarehouseData.base_distribute * 1).toFixed(2) + '%'}}</span>
                </li>
                <li class="item menu-item">
                    <i class="menu-icon menu-icon-03"></i>
                    衰减值
                    <span class="inner-text">{{(userWarehouseData.weak_rate * 1).toFixed(2) + '%'}}</span>
                </li>
                <li class="item menu-item">
                    <i class="menu-icon menu-icon-04"></i>
                    积分
                    <span class="inner-text">{{userWarehouseData.point}}</span>
                </li>
            </ul>
        </div>

        <button class="uc-btn" @click="logout">退出登录</button>

        <div v-show="isPopShow" class="uc-avatar-pop">
            <h3 class="title">修改用户头像</h3>
            <div class="cont">
                <ul class="avatar-list">
                    <li class="item" v-for="item in avatarList" :class="{active: curAvatar == item}" @click="setCurAvatar(item)">
                        <div class="inner uc-avatar" :class="['avatar-' + item]"></div>
                    </li>
                </ul>
                <div class="btn-wrap">
                    <button class="btn btn-yes" @click="updateAvatar">确定</button>
                    <button class="btn btn-no" @click="hidePop">取消</button>
                </div>
            </div>
        </div>
        <div v-show="isPopShow" class="enzyme-pop-mask" @click="hidePop"></div>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            var _this = this;
            window.vm = _this;

            _this.getUserInfo();
            _this.getUserWarehouse();

            _this.$store.dispatch('setTitle', '个人中心');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: true,
                hideRightBtn: true
            });
            _this.$store.dispatch('setTabActive', 1);
        },
        data: function () {
            return {
                userDataInit: false,
                userData: {
                    uid: '',
                    nickname: '',
                    sex: '',
                    level: '',
                    birthday: '',
                    qq: '',
                    score: '',
                    login: '',
                    reg_ip: '',
                    reg_time: '',
                    last_login_ip: '',
                    last_login_time: '',
                    status: '',
                    avatar: '1'
                },
                userWarehouseDataInit: false,
                userWarehouseData: {
                    uid: '',
                    rep_score: 0,
                    honey: 0,
                    sugar: 0,
                    point: 0,
                    sugar_rate: 0,
                    weak_rate: 0,
                    base_distribute: 0,
                    yield_rate: 0,
                    create_time: 0,
                    update_time: 0,
                    total_jar_score: 0
                },
                isPopShow: false,
                curAvatar: '1',
                avatarList: (function () {
                    var arr = [];
                    for (var i = 0; i < 16; i++) {
                        arr.push(i + 1);
                    }
                    return arr;
                })()
            }
        },
        methods: {
            getUserInfo: function () {
                var _this = this;

                _this.$http({
                    method: 'get',
                    url: '/user/info'
                }).then(function (res) {
                    _this.userDataInit = true;
                    _this.userData = res.body.data;
                });
            },

            getUserWarehouse: function () {
                var _this = this;

                _this.$http({
                    method: 'get',
                    url: '/user/warehouse'
                }).then(function (res) {
                    _this.userWarehouseDataInit = true;
                    _this.userWarehouseData = res.body.data;
                });
            },

            showPop: function () {
                var _this = this;
                _this.isPopShow = true;
                _this.curAvatar = _this.userData.avatar;
            },

            hidePop: function () {
                this.isPopShow = false;
            },

            setCurAvatar: function (avatar) {
                this.curAvatar = avatar;
            },

            updateAvatar: function () {
                var _this = this;

                _this.$http({
                    method:  'post',
                    url: '/user/updateUserInfo',
                    body: {
                        avatar: _this.curAvatar
                    }
                }).then(function (res) {
                    _this.userData.avatar = _this.curAvatar;
                    _this.hidePop();
                    _this.$store.dispatch('showTips', '修改用户头像成功');
                });
            },

            logout: function () {
                var _this = this;

                _this.$http({
                    method:'get',
                    url:'/auth/logout'
                }).then(function (res) {
                    _this.$store.dispatch('showTips', '成功退出登录');
                    localStorage.removeItem('hasLogin');
                    _this.$router.push({
                        path: '/login'
                    });
                });
            },

            goTo: function (path) {
                this.$router.push({
                    path: path
                });
            }
        }
    };
</script>
