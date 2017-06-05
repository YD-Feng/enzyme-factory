<template>
    <div>
        <cmHeader></cmHeader>

        <div class="wrap-page">
            <div class="sell-wrap">
                <p class="text-item">目标会员：</p>
                <input type="text" class="input" placeholder="目标会员的手机号" v-model="mobile">
                <p class="text-item">短信验证码：</p>
                <input type="text" class="input input-yzm" v-model="code">
                <button class="btn-yzm" :class="{disabled: yzmBtnStatus == 0}" @click="sendMsg">{{yzmBtnTxt}}</button>
                <p class="text-item">输入新密码：</p>
                <input type="password" class="input" v-model="password" placeholder="输入新密码">
                <br><br>
                <button class="btn-yes" @click="submit">确认</button>
            </div>
        </div>

        <cmTips></cmTips>
        <cmLoading></cmLoading>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            var _this = this;
            window.vm = _this;

            _this.$store.dispatch('setTitle', '忘记密码');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: false,
                hideRightBtn: true
            });
        },
        data: function () {
            return {
                yzmBtnStatus: 1,
                yzmBtnTxt: '获取验证码',
                mobile: '',
                code: '',
                password: ''
            };
        },
        components: {
            cmHeader: require('../components/header.vue'),
            cmTips: require('../components/tips.vue'),
            cmLoading: require('../components/loading.vue')
        },
        methods: {
            sendMsg: function () {
                var _this = this;

                if (_this.mobile == '') {
                    _this.$store.dispatch('showTips', '请输入目标会员的手机号');
                    return;
                } else if (!_this.mobile.toString().match(/^1(3|4|5|7|8)\d{9}$/)) {
                    _this.$store.dispatch('showTips', '请输入正确的手机号码');
                    return;
                }

                _this.$http({
                    method:  'post',
                    url: '/auth/forget_sms_verify',
                    body: {
                        mobile: _this.mobile
                    }
                }).then(function (res) {
                    var sec = 60,
                        itv = null;

                    if (_this.yzmBtnStatus == 0) {
                        return;
                    }

                    _this.yzmBtnStatus = 0;
                    _this.yzmBtnTxt = sec + '秒后可重发';

                    itv = setInterval(function () {
                        sec--;
                        if (sec > 0) {
                            _this.yzmBtnTxt = sec + '秒后可重发';
                        } else {
                            _this.yzmBtnStatus = 1;
                            _this.yzmBtnTxt = '获取验证码';
                            clearInterval(itv);
                        }
                    }, 1000);

                    _this.$store.dispatch('showTips', '校验短信发送成功，请注意查收');
                });
            },

            submit: function () {
                var _this = this;

                if (_this.mobile == '') {
                    _this.$store.dispatch('showTips', '目标会员不能为空');
                    return;
                } else if (_this.code == '') {
                    _this.$store.dispatch('showTips', '短信验证码不能为空');
                    return;
                } else if (_this.password == '') {
                    _this.$store.dispatch('showTips', '密码不能为空');
                    return;
                }

                _this.$http({
                    method:  'post',
                    url: '/auth/forget',
                    body: {
                        mobile: _this.mobile,
                        code: _this.code,
                        password_new: _this.password
                    }
                }).then(function (res) {
                    _this.$store.dispatch('showTips', '密码修改成功');

                    localStorage.removeItem('rememberPwd');
                    localStorage.removeItem('password');

                    _this.$router.push({
                        path: '/login'
                    });
                });
            }
        }
    };
</script>