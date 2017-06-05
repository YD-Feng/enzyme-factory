<template>
    <div>
        <div class="sell-wrap">
            <p class="text-item">原始密码：</p>
            <input type="password" class="input" v-model="oldPwd">
            <p class="text-item">新密码：</p>
            <input type="password" class="input" v-model="newPwdA">
            <p class="text-item">重复新密码：</p>
            <input type="password" class="input" v-model="newPwdB">
            <br><br>
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

            _this.$store.dispatch('setTitle', '修改密码');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: false,
                hideRightBtn: false
            });
            _this.$store.dispatch('setTabActive', 1);
        },
        data: function () {
            return {
                oldPwd: '',
                newPwdA: '',
                newPwdB: ''
            };
        },
        methods: {
            submit: function () {
                var _this = this;

                if (_this.oldPwd == '') {
                    _this.$store.dispatch('showTips', '请输入原始密码');
                    return;
                } else if (_this.newPwdA == '') {
                    _this.$store.dispatch('showTips', '请输入新密码');
                    return;
                } else if (_this.newPwdA != _this.newPwdB) {
                    _this.$store.dispatch('showTips', '重复新密码与新密码不一致，请重新输入');
                    return;
                }

                _this.$http({
                    method: 'post',
                    url: '/user/modifyPsd',
                    body: {
                        password: _this.oldPwd,
                        password_new: _this.newPwdA
                    }
                }).then(function (res) {
                    _this.$store.dispatch('showTips', '密码修改成功，2秒后将返回登录界面');

                    localStorage.removeItem('rememberPwd');
                    localStorage.removeItem('password');

                    setTimeout(function () {
                        _this.logout();
                    }, 2000);
                });
            },

            logout: function () {
                var _this = this;

                _this.$http({
                    method:'get',
                    url:'/auth/logout'
                }).then(function (res) {
                    localStorage.removeItem('hasLogin');
                    _this.$router.push({
                        path: '/login'
                    });
                });
            },
        }
    };
</script>
