<template>
    <div>
        <div class="game-page" @click="toggle($event)">
            <button class="btn-back" @click="back">后退</button>

            <img class="un-show-img" src="../img/vat-detail/small_yeast_h.png">
            <img class="un-show-img" src="../img/vat-detail/big_yeast_h.png">

            <div class="msg-wrap msg-wrap-01" v-if="userDataInit && userWarehouseDataInit">
                <i class="icon icon-01"></i>
                <p class="text">
                    级别：{{userData.level}}
                    <i class="end"></i>
                </p>
            </div>

            <div class="msg-wrap msg-wrap-02" v-if="userDataInit && userWarehouseDataInit">
                <i class="icon icon-02"></i>
                <p class="text">
                    酵缸酵母：{{userWarehouseData.total_jar_score}}
                    <i class="end"></i>
                </p>
            </div>

            <div class="msg-wrap msg-wrap-03" v-if="userDataInit && userWarehouseDataInit">
                <i class="icon icon-03"></i>
                <p class="text">
                    仓库：<span class="text-blue">酵母</span>&nbsp;|&nbsp;<span class="text-blue">红糖</span>&nbsp;|&nbsp;<span class="text-blue">蜂蜜</span>
                    <i class="end"></i>
                </p>
            </div>

            <div class="warehouse-msg-wrap" v-if="userDataInit && userWarehouseDataInit">
                <span class="text-blue">{{userWarehouseData.rep_score}}</span>
                &nbsp;|&nbsp;
                <span class="text-blue">{{userWarehouseData.sugar}}</span>
                &nbsp;|&nbsp;
                <span class="text-blue">{{userWarehouseData.honey}}</span>
            </div>

            <div class="sys-msg-wrap sys-msg-wrap-01" v-if="userDataInit && userWarehouseDataInit">
                基准发放率：<span class="text-orange">{{(userWarehouseData.base_distribute * 1).toFixed(2) + '%'}}</span>
                <i class="begin"></i>
            </div>

            <div class="sys-msg-wrap sys-msg-wrap-02" v-if="userDataInit && userWarehouseDataInit">
                红糖发放率：<span class="text-orange">{{userWarehouseData.sugar_rate + '%'}}</span>
                <i class="begin"></i>
            </div>

            <div class="sys-msg-wrap sys-msg-wrap-03" v-if="userDataInit && userWarehouseDataInit">
                衰减值：<span class="text-orange">{{(userWarehouseData.weak_rate * 1).toFixed(2) + '%'}}</span>
                <i class="begin"></i>
            </div>

            <div class="platform">
                <ul class="val-list val-list-small">
                    <li class="item J-item"
                        v-for="(item, index) in smallJarList"
                        :class="{'active': (curActiveType == '' && curJarType == 'small' && curIndex == index && item.jar_status == 1), 'disabled': item.jar_status == 0}"
                        @click="setActiveJar('small', index)">
                        <i class="icon-get J-item" v-show="item.sugar != 0"></i>
                        <div class="tips">
                            <p class="text">
                                酵母：{{item.jar_score}}
                            </p>
                            <i class="triangle"></i>
                        </div>
                    </li>
                </ul>

                <ul class="val-list val-list-big">
                    <li class="item J-item"
                        v-for="(item, index) in bigJarList"
                        :class="{'active':(curActiveType == '' && curJarType == 'big' && curIndex == index && item.jar_status == 1), 'disabled': item.jar_status == 0}"
                        @click="setActiveJar('big', index)">
                        <i class="icon-get J-item" v-show="item.sugar != 0"></i>
                        <div class="tips">
                            <p class="text">
                                酵母：{{item.jar_score}}
                            </p>
                            <i class="triangle"></i>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="game-footer">
                <button class="btn btn-open" @click="openJar()">开缸</button>
                <button class="btn btn-get" :class="{active: curActiveType == 'gain'}" @click="setActiveType('gain')">收获</button>
                <button class="btn btn-put" :class="{active: curActiveType == 'in'}" @click="setActiveType('in')">放入</button>
                <button class="btn btn-take" :class="{active: curActiveType == 'out'}" @click="setActiveType('out')">取出</button>
                <button class="btn btn-refresh" @click="refresh()">刷新</button>
            </div>
        </div>

        <!--放入-->
        <div class="game-pop" v-show="isPopShow && curActiveType == 'in'">
            <div class="top"></div>
            <div class="cont">
                <div class="inner">
                    <p class="mb-30">当前酵缸容量：<span class="text-white">{{curJarScore}}</span>&nbsp;/&nbsp;{{curJarType == 'small' ? 3000 : 30000}}</p>

                    <p class="mb-30 f-36 text-red">红糖</p>
                    <div class="num-ctrl mb-30">
                        <button type="button" class="btn-ctrl btn-ctrl-min" @click="min('putInSugar')">min</button>
                        <button type="button" class="btn-ctrl btn-ctrl-del" @click="del('putInSugar')">-</button>
                        <input type="number" class="input-ctrl" v-model="putInSugar">
                        <button type="button" class="btn-ctrl btn-ctrl-add" @click="add('putInSugar')">+</button>
                        <button type="button" class="btn-ctrl btn-ctrl-max" @click="max('putInSugar')">max</button>
                    </div>

                    <p class="mb-30 f-36">酵母</p>
                    <div class="num-ctrl mb-30">
                        <button type="button" class="btn-ctrl btn-ctrl-min" @click="min('putInScore')">min</button>
                        <button type="button" class="btn-ctrl btn-ctrl-del" @click="del('putInScore')">-</button>
                        <input type="number" class="input-ctrl" v-model="putInScore">
                        <button type="button" class="btn-ctrl btn-ctrl-add" @click="add('putInScore')">+</button>
                        <button type="button" class="btn-ctrl btn-ctrl-max" @click="max('putInScore')">max</button>
                    </div>

                    <p class="mb-30 f-36 text-yellow">蜂蜜</p>
                    <div class="num-ctrl mb-40">
                        <button type="button" class="btn-ctrl btn-ctrl-min" @click="min('putInHoney')">min</button>
                        <button type="button" class="btn-ctrl btn-ctrl-del" @click="del('putInHoney')">-</button>
                        <input type="number" class="input-ctrl" v-model="putInHoney">
                        <button type="button" class="btn-ctrl btn-ctrl-add" @click="add('putInHoney')">+</button>
                        <button type="button" class="btn-ctrl btn-ctrl-max" @click="max('putInHoney')">max</button>
                    </div>

                    <button class="btn" @click="addScore">放入</button>

                </div>
                <button class="btn-close" @click="hidePop"></button>
            </div>
        </div>

        <!--取出-->
        <div class="game-pop" v-show="isPopShow && curActiveType == 'out'">
            <div class="top"></div>
            <div class="cont">
                <div class="inner">
                    <p class="mb-10">当前酵缸容量：<span class="text-white">{{curJarScore}}</span>&nbsp;/&nbsp;{{curJarType == 'small' ? 3000 : 30000}}</p>

                    <p class="mb-30 f-36">请输入取出酵母数</p>
                    <div class="num-ctrl mb-30">
                        <button type="button" class="btn-ctrl btn-ctrl-min" @click="min('putOutScore')">min</button>
                        <button type="button" class="btn-ctrl btn-ctrl-del" @click="del('putOutScore')">-</button>
                        <input type="number" class="input-ctrl" v-model="putOutScore">
                        <button type="button" class="btn-ctrl btn-ctrl-add" @click="add('putOutScore')">+</button>
                        <button type="button" class="btn-ctrl btn-ctrl-max" @click="max('putOutScore')">max</button>
                    </div>

                    <button class="btn" @click="getScore">取出</button>

                    <p class="tips">温馨提示：只能取出酵母，且当前值不得低于基值</p>
                </div>
                <button class="btn-close" @click="hidePop"></button>
            </div>
        </div>

        <!--收获-->
        <div class="game-pop" v-show="isPopShow && curActiveType == 'gain'">
            <div class="top"></div>
            <div class="cont">
                <div class="inner">
                    <p class="mb-10 f-36">温馨提示</p>
                    <p class="mb-30 f-36">此酵缸当前出产的红糖数为</p>
                    <p class="mb-30 f-36 text-red">{{gainSugarCount}}</p>
                    <button class="btn" @click="gainSugar">收获</button>
                </div>
                <button class="btn-close" @click="hidePop"></button>
            </div>
        </div>

        <div class="game-pop-mask" v-show="isPopShow" @click="hidePop"></div>

        <cmTips></cmTips>
        <cmLoading></cmLoading>
    </div>
</template>

<script>
    var q = require('q');

    module.exports = {
        created: function () {
            var _this = this;

            window.vm = _this;

            _this.getUserInfo();
            _this.getUserWarehouse();
            _this.getJarList();
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
                    total: 0, //total 是一个自拓展属性，它的值是 rep_score，honey，sugar 之和
                    point: 0,
                    sugar_rate: 0,
                    weak_rate: 0,
                    base_distribute: 0,
                    yield_rate: 0,
                    create_time: 0,
                    update_time: 0,
                    total_jar_score: 0,
                },
                jarInit: false,
                bigJarList: [/*{
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
                smallJarList: [/*{
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
                curActiveType: '', //当前操作类型（in：放入，gain：收获，out：取出）
                curJarType: '',
                curIndex: 0,
                curJarScore: '0',
                putInScore: '0',
                putInHoney: '0',
                putInSugar: '0',
                putOutScore: '0',
                gainSugarCount: '0',
                successMsg: ''
            };
        },
        components: {
            cmTips: require('../components/tips.vue'),
            cmLoading: require('../components/loading.vue')
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

                    res.body.data.total = res.body.data.rep_score * 1 + res.body.data.honey * 1 + res.body.data.sugar * 1;
                    if (res.body.data.total == 0) {
                        res.body.data.total = 1;
                    }

                    _this.userWarehouseData = res.body.data;
                });
            },

            getJarList: function () {
                var _this = this,
                    defA = q.defer(),
                    defB = q.defer();

                _this.$http({
                    method:'get',
                    url:'/jar/jarList',
                    params: {
                        jar_type: 'small'
                    }
                }).then(function (res) {

                    _this.smallJarList = res.body.data;
                    defA.resolve();

                });

                _this.$http({
                    method:'get',
                    url:'/jar/jarList',
                    params: {
                        jar_type: 'big'
                    }
                }).then(function (res) {

                    _this.bigJarList = res.body.data;
                    defB.resolve();

                });

                q.all([defA.promise, defB.promise]).then(function () {
                    _this.jarInit = true;
                });
            },

            refresh: function () {
                var _this = this;
                _this.curActiveType = '';
                _this.curJarType = '';
                _this.curIndex = 0;

                _this.getUserWarehouse();
                _this.getJarList();
            },

            setActiveType: function (type) {
                var _this = this;
                if (_this.curActiveType != type) {
                    _this.curActiveType = type;
                } else {
                    _this.curActiveType = '';
                }
            },

            setActiveJar: function (type, index) {
                var _this = this,
                    curJar = null;
                _this.curJarType = type;
                _this.curIndex = index;

                curJar = _this[_this.curJarType + 'JarList'][_this.curIndex];

                if (curJar.jar_status != 1) {
                    _this.$store.dispatch('showTips', '酵缸还未激活');
                    return;
                }

                if (_this.curActiveType != '') {
                    _this.showPop();
                }
            },

            toggle: function (e) {
                if (e.target.className.indexOf('J-item') == -1) {
                    var _this = this;
                    _this.curJarType = '';
                    _this.curIndex = '';
                }
            },

            openJar: function (index) {
                var _this = this,
                    id = (function () {
                        //先遍历小酵缸，寻找有无可以激活的酵缸
                        for (var i = 0, len = _this.smallJarList.length; i < len; i++) {
                            var curJar = _this.smallJarList[i];
                            if (curJar.is_activate) {
                                return curJar.jar_design_id;
                            }
                        }

                        //再遍历大酵缸，寻找有无可以激活的酵缸
                        for (var i = 0, len = _this.bigJarList.length; i < len; i++) {
                            var curJar = _this.bigJarList[i];
                            if (curJar.is_activate) {
                                return curJar.jar_design_id;
                            }
                        }

                        return '';
                    })();



                if (id == '') {
                    _this.$store.dispatch('showTips', '没有可激活的酵缸，请确保已激活的酵缸都已放入不少于基值的材料');
                    return;
                }

                _this.$http({
                    method: 'post',
                    url: '/jar/activate',
                    body: {
                        jar_design_id: id
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
                    limit = _this.curJarType == 'small' ? 3000 : 30000,
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
                        last = limit - (_this.curJarScore * 1) - ((putInScore + putInHoney + putInSugar) - (_this[attrName] * 1));

                    max = Math.min(last, _this.userWarehouseData[obj[attrName]] * 1);
                } else {
                    max = _this.curJarScore - (limit / 10);
                }

                return max;
            },

            addScore: function () {
                var _this = this,
                    curJar = _this[_this.curJarType + 'JarList'][_this.curIndex];

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

                    _this.$store.dispatch('showTips', '申请放入成功');

                });
            },

            getScore: function () {
                var _this = this,
                    limit = _this.curJarType == 'small' ? 3000 : 30000,
                    curJar = _this[_this.curJarType + 'JarList'][_this.curIndex];

                if (!_this.putOutScore.toString().match(/^[1-9]\d*$/)) {
                    _this.$store.dispatch('showTips', '只能输入正整数');
                    return;
                } else if (_this.putOutScore > _this.curJarScore - (limit / 10)) {
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

                    _this.$store.dispatch('showTips', '申请取出成功');

                });
            },

            gainSugar: function () {
                var _this = this,
                    curJar = _this[_this.curJarType + 'JarList'][_this.curIndex];

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

                    _this.$store.dispatch('showTips', '收获成功，红糖已放入仓库');

                });
            },

            showPop: function () {
                var _this = this,
                    curList = _this[_this.curJarType + 'JarList'];

                _this.curJarScore = curList[_this.curIndex].jar_score;
                _this.putInScore = '0';
                _this.putInHoney = '0';
                _this.putInSugar = '0';
                _this.putOutScore = '0';
                _this.gainSugarCount = _this.curActiveType == 'gain' ? curList[_this.curIndex].sugar : '0';

                if (_this.curActiveType == 'in' && _this.curJarScore == (_this.curJarType == 'big' ? 300000 : 3000)) {
                    _this.$store.dispatch('showTips', '该酵缸已满，无法再放入');
                    return;
                }
                if (_this.curActiveType == 'out' && _this.curJarScore <= (_this.curJarType == 'big' ? 30000 : 300)) {
                    _this.$store.dispatch('showTips', '该酵缸无法取出酵母，酵缸内材料不得低于基值');
                    return;
                }
                if (_this.curActiveType == 'gain' && _this.gainSugarCount == 0) {
                    _this.$store.dispatch('showTips', '没有红糖可供收获');
                    return;
                }

                _this.isPopShow = true;
            },

            hidePop: function () {
                this.isPopShow = false;
            },

            back: function () {
                this.$router.push({
                    path: '/main'
                });
            }
        }
    };
</script>
