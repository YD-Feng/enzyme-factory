<template>
    <div v-if="userDataInit">
        <div class="sell-wrap">
            <p class="text-item">推荐人手机：（酵主级别可变更推荐人）</p>
            <input type="text" class="input" v-model="referrer" :disabled="userData.level != '酵主'">
            <p class="text-item">新用户名：</p>
            <input type="text" class="input" v-model="username">
            <p class="text-item">姓名：</p>
            <input type="text" class="input" v-model="nickname">
            <p class="text-item">性别：</p>
            <label class="cm-selector">
                <p class="text">男</p>
                <select class="select" v-model="sex" v-selector-change>
                    <option value="1">男</option>
                    <option value="2">女</option>
                </select>
            </label>
            <p class="text-item">手机号码：</p>
            <input type="text" class="input" v-model="mobile">
            <p class="text-item">需要酵母数量：{{costScore}}</p>
            <p class="text-item-desc">温馨提示：{{newPlayerTips}}</p>
            <button class="btn-yes" @click="submit">确认</button>
        </div>

        <br><br><br><br>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            var _this = this;
            window.vm = _this;

            _this.getUserInfo();

            _this.$store.dispatch('setTitle', '开发新玩家');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: false,
                hideRightBtn: false
            });
            _this.$store.dispatch('setTabActive', 1);
        },
        data: function () {
            return {
                referrer: '',
                username: '',
                nickname: '',
                sex: 1,
                mobile: '',
                userDataInit: false,
                userData: null/*{
                    avatar: "1",
                    identity: "1",
                    level: "酵主",
                    nickname: "甩锅帅哥",
                    sex: "2",
                    uid: "1",
                    username: "fancy"
                }*/
            };
        },
        computed: {
            newPlayerTips: function () {
                return this.$store.state.tips.newPlayerTips;
            },
            costScore: function () {
                return this.$store.state.tips.costScore;
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
                    _this.referrer = _this.userData.mobile;
                });
            },

            submit: function () {
                var _this = this;

                if (_this.username == '') {
                    _this.$store.dispatch('showTips', '用户名不能为空');
                    return;
                } else if (_this.nickname == '') {
                    _this.$store.dispatch('showTips', '姓名不能为空');
                    return;
                } else if (_this.mobile == '') {
                    _this.$store.dispatch('showTips', '手机号码不能为空');
                    return;
                }

                _this.$http({
                    method: 'post',
                    url: '/user/register',
                    body: {
                        referrer: _this.referrer,
                        username: _this.username,
                        nickname: _this.nickname,
                        sex: _this.sex,
                        mobile: _this.mobile
                    }
                }).then(function (res) {
                    _this.$store.dispatch('showTips', '开发新玩家成功');
                    _this.$router.push({
                        path: '/main/userCenter'
                    });
                });
            }
        }
    };
</script>
