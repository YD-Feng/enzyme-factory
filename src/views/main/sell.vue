<template>
    <div class="sell-wrap">
        <p class="text-item">仓库{{curTypeName}}数量：<span class="cm-text-red">{{curScore}}</span></p>
        <p class="text-item">可{{sellName}}上限：<span class="cm-text-red">{{curScore}}</span></p>
        <p class="text-item">{{sellName}}数量：<span class="cm-text-red" v-show="errorNum">({{sellName}}数量必须是10的倍数)</span></p>
        <input type="text" class="input" placeholder="10的倍数" v-model="score">
        <p class="text-item">目标会员：</p>
        <input type="text" class="input" placeholder="目标会员的用户名/ID/手机号" v-model="buyer">
        <p class="text-item">短信验证码：</p>
        <input type="text" class="input input-yzm" v-model="code">
        <button class="btn-yzm" :class="{disabled: yzmBtnStatus == 0}" @click="sendMsg">{{yzmBtnTxt}}</button>
        <p class="text-item-desc">交易说明：酵主只能和注册酵主之间交易，限制向下级会员出售果实</p>
        <button class="btn-yes" @click="submit">确认</button>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            var _this = this;
            window.vm = _this;

            _this.getUserWarehouse();

            _this.$store.dispatch('setTitle', _this.sellName + _this.curTypeName);
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: false,
                hideRightBtn: false
            });
            _this.$store.dispatch('setTabActive', 3);
        },
        data: function () {
            var type = this.$router.currentRoute.query.type || 'rep_score',
                typeNames = {
                    rep_score: '酵母',
                    honey: '蜂蜜',
                    sugar: '红糖',
                    point: '积分'
                };

            return {
                curType: type,
                sellName: type == 'point' ? '转让' : '出售',
                curTypeName: typeNames[type],
                yzmBtnStatus: 1,
                yzmBtnTxt: '获取验证码',
                curScore: 0,
                score: '',
                buyer: '',
                code: ''
            };
        },
        computed: {
            errorNum: function () {
                return isNaN(this.score * 1) || this.score % 10 != 0
            }
        },
        methods: {
            getUserWarehouse: function () {
                var _this = this;

                _this.$http({
                    method: 'get',
                    url: '/user/warehouse'
                }).then(function (res) {
                    _this.userWarehouseDataInit = true;

                    _this.curScore = res.body.data[_this.curType];
                });
            },

            sendMsg: function () {
                var _this = this;

                if (_this.yzmBtnStatus == 0) {
                    return;
                }

                _this.$http({
                    method:  'get',
                    url: '/trade/sms_verify'
                }).then(function (res) {
                    var sec = 60,
                        itv = null;

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

                if (!_this.score.match(/^[1-9]\d*$/)) {
                    _this.$store.dispatch('showTips', '出售数量必须是正整数');
                    return;
                } else if (_this.score % 10 != 0) {
                    _this.$store.dispatch('showTips', '出售数量必须是10的倍数');
                    return;
                } else if (_this.score * 1 > _this.curScore) {
                    _this.$store.dispatch('showTips', '出售数量不得大于可售上限');
                    return;
                } else if (_this.buyer == '') {
                    _this.$store.dispatch('showTips', '目标会员不能为空');
                    return;
                } else if (_this.code == '') {
                    _this.$store.dispatch('showTips', '短信验证码不能为空');
                    return;
                }

                _this.$http({
                    method:  'post',
                    url: '/trade/sell',
                    body: {
                        score: _this.score,
                        buyer: _this.buyer,
                        sale_type: _this.curType,
                        code: _this.code
                    }
                }).then(function (res) {
                    _this.$store.dispatch('showTips', _this.curTypeName + '出售成功');
                    _this.$router.push({
                        path: '/main/userCenter'
                    });
                });
            }
        }
    };
</script>
