<template>
    <div>
        <div class="wrap-page">
            <div class="page page-login">
                <h1 class="title">酵素工厂</h1>
                <div class="form-wrap">
                    <div class="input-wrap">
                        <i class="icon icon-user-name"></i>
                        <input type="text" class="input" placeholder="帐号" v-model="userName" />
                    </div>
                    <div class="input-wrap">
                        <i class="icon icon-password"></i>
                        <input type="password" class="input" placeholder="密码" v-model="password" />
                    </div>
                    <div class="input-wrap">
                        <div class="fl">
                            <label class="cm-switch">
                                <input type="checkbox" v-model="rememberPwd">
                                <span class="switch-btn"></span>
                            </label>
                            &nbsp;&nbsp;记住密码
                        </div>
                        <div class="fr" @click="goTo('/forgetPwd')">忘记密码</div>
                    </div>
                    <button type="button" class="btn" @click="login">登录</button>
                </div>
            </div>
        </div>

        <cmTips></cmTips>
        <cmLoading></cmLoading>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            window.vm = this;
        },
        data: function () {
            var rememberPwd = !!localStorage.getItem('rememberPwd');
            return {
                userName: rememberPwd ? localStorage.getItem('userName') : '',
                password: rememberPwd ? localStorage.getItem('password') : '',
                rememberPwd: rememberPwd
            }
        },
        methods: {
            login: function () {
                var _this = this;

                _this.$http({
                    method: 'post',
                    url: '/auth/login',
                    body: {
                        username: _this.userName,
                        password: _this.password
                    }
                }).then(function (res) {
                    localStorage.setItem('hasLogin', 1);

                    if (_this.rememberPwd) {
                        localStorage.setItem('rememberPwd', 1);
                        localStorage.setItem('userName', _this.userName);
                        localStorage.setItem('password', _this.password);
                    } else {
                        localStorage.removeItem('rememberPwd');
                        localStorage.removeItem('password');
                    }

                    _this.$router.push({
                        path: '/main'
                    });
                });
            },

            goTo: function (path) {
                this.$router.push({
                    path: path
                });
            }
        },
        components: {
            cmTips: require('../components/tips.vue'),
            cmLoading: require('../components/loading.vue')
        }
    };
</script>
