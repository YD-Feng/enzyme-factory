<template>
    <div v-if="jarInit">
        <div class="enzyme-detail-top">
            <span class="fl cm-text-dark">基值：{{limit/10}}&nbsp;&nbsp;|&nbsp;&nbsp;满值：{{limit}}</span>
            <span class="fr cm-text-dark">当前缸数：{{jarList.length}}口</span>
        </div>

        <div class="enzyme-detail-list-head">
            <span class="txt-a">酵缸/材料</span>
            <span class="txt-b">操作</span>
        </div>

        <ul class="enzyme-detail-list">
            <li class="item" v-for="(item, index) in jarList">
                <p class="name">{{item.jar_name}}/{{item.jar_score}}</p>
                <p class="desc">收益：（红糖：<span class="cm-text-red">{{item.sugar}}</span>）</p>
                <div class="schedule">
                    <div class="inner" :style="{width: (item.jar_score * 100 / limit).toFixed(2) + '%'}"></div>
                    <span class="text">{{(item.jar_score * 100 / limit).toFixed(2) + '%'}}</span>
                </div>
                <div class="ctrl-wrap">
                    <a class="btn" v-show="item.jar_status == 1" @click="showPop(index, 'in')">放入</a>
                    <a class="btn" v-show="item.jar_status == 1" @click="showPop(index, 'out')">取出</a>
                    <a class="btn" v-show="item.jar_status == 1" @click="showPop(index, 'gain')">收获</a>
                    <a class="btn" v-show="item.jar_status == 0" :class="{'disabled': !item.is_activate}" @click="activateJar(index)">点击激活</a>
                </div>
            </li>
        </ul>

        <br><br><br><br>

        <div v-show="isPopShow" class="enzyme-pop" :class="{'enzyme-pop-no-top': curActiveType == 'success'}">
            <div class="top"></div>

            <!--放入-->
            <div class="bottom" :class="{hide: curActiveType != 'in'}">
                <div class="ctrl-group text-center">
                    当前酵缸容量：<span class="cm-text-red">{{curJarScore}}</span> / {{limit}}
                </div>
                <div class="ctrl-group">
                    <span class="col-txt">红糖</span>
                    <div class="num-ctrl">
                        <button type="button" class="btn-ctrl" @click="min('putInSugar')">min</button>
                        <button type="button" class="btn-ctrl" @click="del('putInSugar')">-</button>
                        <input type="number" class="input-ctrl" v-model="putInSugar">
                        <button type="button" class="btn-ctrl" @click="add('putInSugar')">+</button>
                        <button type="button" class="btn-ctrl" @click="max('putInSugar')">max</button>
                    </div>
                </div>
                <div class="ctrl-group">
                    <span class="col-txt">酵母</span>
                    <div class="num-ctrl">
                        <button type="button" class="btn-ctrl" @click="min('putInScore')">min</button>
                        <button type="button" class="btn-ctrl" @click="del('putInScore')">-</button>
                        <input type="number" class="input-ctrl" v-model="putInScore">
                        <button type="button" class="btn-ctrl" @click="add('putInScore')">+</button>
                        <button type="button" class="btn-ctrl" @click="max('putInScore')">max</button>
                    </div>
                </div>
                <div class="ctrl-group">
                    <span class="col-txt">蜂蜜</span>
                    <div class="num-ctrl">
                        <button type="button" class="btn-ctrl" @click="min('putInHoney')">min</button>
                        <button type="button" class="btn-ctrl" @click="del('putInHoney')">-</button>
                        <input type="number" class="input-ctrl" v-model="putInHoney">
                        <button type="button" class="btn-ctrl" @click="add('putInHoney')">+</button>
                        <button type="button" class="btn-ctrl" @click="max('putInHoney')">max</button>
                    </div>
                </div>

                <div class="btn-wrap">
                    <button class="btn btn-yes" @click="addScore">放入</button>
                    <button class="btn btn-no" @click="hidePop">取消</button>
                </div>
            </div>

            <!--取出-->
            <div class="bottom" :class="{hide: curActiveType != 'out'}">
                <div class="ctrl-group text-center">
                    当前酵缸容量：<span class="cm-text-red">{{curJarScore}}</span> / {{limit}}
                </div>
                <div class="ctrl-group">
                    <span class="col-txt">酵母</span>
                    <div class="num-ctrl">
                        <button type="button" class="btn-ctrl" @click="min('putOutScore')">min</button>
                        <button type="button" class="btn-ctrl" @click="del('putOutScore')">-</button>
                        <input type="number" class="input-ctrl" v-model="putOutScore">
                        <button type="button" class="btn-ctrl" @click="add('putOutScore')">+</button>
                        <button type="button" class="btn-ctrl" @click="max('putOutScore')">max</button>
                    </div>
                </div>
                <div class="ctrl-group text-center">
                    只能取出酵母，且当前值不得低于基值
                </div>
                <div class="btn-wrap">
                    <button class="btn btn-yes" @click="getScore">取出</button>
                    <button class="btn btn-no" @click="hidePop">取消</button>
                </div>
            </div>

            <!--收获-->
            <div class="bottom" :class="{hide: curActiveType != 'gain'}">
                <div class="ctrl-group text-center">
                    温馨提示
                </div>
                <div class="text-box">
                    当前产出红糖数为：<span class="cm-text-red">{{gainSugarCout}}</span>
                </div>
                <div class="btn-wrap">
                    <button class="btn btn-yes" @click="gainSugar">收获</button>
                    <button class="btn btn-no" @click="hidePop">取消</button>
                </div>
            </div>

            <!--成功提示-->
            <div class="bottom" :class="{hide: curActiveType != 'success'}"  @click="hidePop">
                <div class="success-box">
                    {{successMsg}}
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

            _this.getUserWarehouse();
            _this.getJarList();

            _this.$store.dispatch('setTitle', _this.curType == 'big' ? '大酵缸' : '小酵缸');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: false,
                hideRightBtn: false
            });
            _this.$store.dispatch('setTabActive', 2);
        },
        data: function () {
            return {
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
                curType: this.$router.currentRoute.query.type,
                jarInit: false,
                limit: this.$router.currentRoute.query.type == 'small' ? 3000 : 30000,
                jarList: [/*{
                    jar_type: "small",
                    jar_name: "A酵缸",
                    is_activate: true,
                    jar_design_id: "1",
                    jar_id: 0,
                    jar_score: 0,
                    jar_status: 0,
                    sugar: 0,
                    point: 0
                }*/],
                isPopShow: false,
                curActiveType: 'in',
                curIndex: 0,
                curJarScore: '0',
                putInScore: '0',
                putInHoney: '0',
                putInSugar: '0',
                putOutScore: '0',
                gainSugarCout: '0',
                successMsg: ''
            };
        },
        methods: {
            getUserWarehouse: function () {
                var _this = this;

                _this.$http({
                    method: 'get',
                    url: '/user/warehouse'
                }).then(function (res) {
                    _this.userWarehouseDataInit = true;

                    res.body.data.total = res.body.data.rep_score * 1 + res.body.data.honey * 1 + res.body.data.sugar * 1;
                    if (res.body.data.total == 0) {
                        res.body.data.total = 1;
                    }

                    _this.userWarehouseData = res.body.data;
                });
            },

            getJarList: function (type) {
                var _this = this;

                _this.$http({
                    method:'get',
                    url:'/jar/jarList',
                    params: {
                        jar_type: _this.curType
                    }
                }).then(function (res) {

                    _this.jarInit = true;
                    _this.jarList = res.body.data;

                });
            },

            activateJar: function (index) {
                var _this = this,
                    curJar = _this.jarList[index];

                if (!curJar.is_activate) {
                    _this.$store.dispatch('showTips', '无法激活新酵缸，请确保已激活的酵缸都已放入不少于基值的材料');
                    return;
                }

                _this.$http({
                    method: 'post',
                    url: '/jar/activate',
                    body: {
                        jar_design_id: curJar.jar_design_id
                    }
                }).then(function (res) {
                    _this.$store.dispatch('showTips', '激活酵缸成功');
                    _this.getJarList();
                });
            },

            min: function (attrName) {
                this[attrName] = 0;
            },

            max: function (attrName) {
                var _this = this;
                _this[attrName] = _this.countMax(attrName);
            },

            del: function (attrName) {
                var _this = this;
                _this[attrName] = _this[attrName] == 0 ? 0 : _this[attrName] * 1 - 1;
            },

            add: function (attrName) {
                var _this = this,
                    max = _this.countMax(attrName);

                _this[attrName] = _this[attrName] == max ? max : _this[attrName] * 1 + 1;
            },

            countMax: function (attrName) {
                var _this = this,
                    max;

                if (attrName.indexOf('putIn') != -1) {
                    var obj = {
                            putInScore: 'rep_score',
                            putInHoney: 'honey',
                            putInSugar: 'sugar'
                        },
                        putInScore = _this.putInScore * 1,
                        putInHoney = _this.putInHoney * 1,
                        putInSugar = _this.putInSugar * 1,
                        last = _this.limit - (_this.curJarScore * 1) - ((putInScore + putInHoney + putInSugar) - (_this[attrName] * 1));

                    max = Math.min(last, _this.userWarehouseData[obj[attrName]] * 1);
                } else {
                    max = _this.curJarScore - (_this.limit / 10);
                }

                return max;
            },

            addScore: function () {
                var _this = this,
                    curJar = _this.jarList[_this.curIndex];

                if (!_this.putInScore.toString().match(/^[1-9]\d*|0$/)) {
                    _this.$store.dispatch('showTips', '只能输入非负数');
                    return;
                }
                if (!_this.putInSugar.toString().match(/^[1-9]\d*|0$/)) {
                    _this.$store.dispatch('showTips', '只能输入非负数');
                    return;
                }
                if (!_this.putInHoney.toString().match(/^[1-9]\d*|0$/)) {
                    _this.$store.dispatch('showTips', '只能输入非负数');
                    return;
                }
                if (_this.putInScore * 1 + _this.putInSugar * 1 + _this.putInHoney * 1 == 0) {
                    _this.$store.dispatch('showTips', '请添加要放入的材料');
                    return;
                }

                _this.$http({
                    method:  'post',
                    url: '/jar/addScore',
                    body: {
                        jar_id: curJar.jar_id,
                        jar_score: _this.putInScore,
                        sugar: _this.putInSugar,
                        honey: _this.putInHoney
                    }
                }).then(function (res) {

                    res.body.data.total = res.body.data.rep_score * 1 + res.body.data.honey * 1 + res.body.data.sugar * 1;
                    if (res.body.data.total == 0) {
                        res.body.data.total = 1;
                    }
                    _this.userWarehouseData = res.body.data;
                    _this.getJarList();

                    _this.showSuccess('申请放入成功');

                });
            },

            getScore: function () {
                var _this = this,
                    curJar = _this.jarList[_this.curIndex];

                if (!_this.putOutScore.toString().match(/^[1-9]\d*$/)) {
                    _this.$store.dispatch('showTips', '只能输入正整数');
                    return;
                } else if (_this.putOutScore > _this.curJarScore - (_this.limit / 10)) {
                    _this.$store.dispatch('showTips', '酵缸中剩余酵母不得低于基础值');
                    return;
                }

                _this.$http({
                    method:  'post',
                    url: '/jar/getScore',
                    body: {
                        jar_id: curJar.jar_id,
                        jar_score: _this.putOutScore
                    }
                }).then(function (res) {

                    res.body.data.total = res.body.data.rep_score * 1 + res.body.data.honey * 1 + res.body.data.sugar * 1;
                    if (res.body.data.total == 0) {
                        res.body.data.total = 1;
                    }
                    _this.userWarehouseData = res.body.data;
                    _this.getJarList();

                    _this.showSuccess('申请取出成功');

                });
            },

            gainSugar: function () {
                var _this = this,
                    curJar = _this.jarList[_this.curIndex];

                _this.$http({
                    method:  'post',
                    url: '/jar/gainSugar',
                    body: {
                        jar_id: curJar.jar_id
                    }
                }).then(function (res) {

                    res.body.data.total = res.body.data.rep_score * 1 + res.body.data.honey * 1 + res.body.data.sugar * 1;
                    if (res.body.data.total == 0) {
                        res.body.data.total = 1;
                    }
                    _this.userWarehouseData = res.body.data;
                    _this.getJarList();

                    _this.showSuccess('收获成功，红糖已放入仓库');

                });
            },

            showPop: function (index, type) {
                var _this = this;
                _this.curActiveType = type;
                _this.curIndex = index;
                _this.curJarScore = _this.jarList[index].jar_score;
                _this.putInScore = '0';
                _this.putInHoney = '0';
                _this.putInSugar = '0';
                _this.putOutScore = '0';
                _this.gainSugarCout = type == 'gain' ? _this.jarList[index].sugar : '0';

                if (_this.curActiveType == 'in' && _this.curJarScore == _this.limit) {
                    _this.$store.dispatch('showTips', '该酵缸已满，无法再放入');
                    return;
                }
                if (_this.curActiveType == 'out' && _this.curJarScore == 0) {
                    _this.$store.dispatch('showTips', '该酵缸没放入任何材料，无法取出酵母');
                    return;
                }
                if (_this.curActiveType == 'gain' && _this.gainSugarCout == 0) {
                    _this.$store.dispatch('showTips', '没有红糖可供收获');
                    return;
                }

                _this.isPopShow = true;
            },

            hidePop: function () {
                this.isPopShow = false;
            },

            showSuccess: function (msg) {
                var _this = this;
                _this.isPopShow = true;
                _this.curActiveType = 'success';
                _this.successMsg = msg;
            }
        }
    };
</script>
