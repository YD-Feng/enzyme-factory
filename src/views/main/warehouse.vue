<template>
    <div>
        <div class="home-stuff-wrap">
            <h2 class="title">玩家每日获得材料数值</h2>
            <div class="statistics">
                <span class="fl">衰弱值：<em class="cm-text-red">{{(userWarehouseData.weak_rate * 1).toFixed(2) + '%'}}</em></span>
                <span class="fr">收益率：<em class="cm-text-red">{{(userWarehouseData.yield_rate * 1).toFixed(2) + '%'}}</em></span>
            </div>
            <ul class="tube-list" v-if="userWarehouseDataInit">
                <li class="item">
                    <div class="tube">
                        <div class="inner inner-blue"
                             :style="{height: (userWarehouseData.rep_score * 100 / userWarehouseData.total).toFixed(2) + '%'}"></div>
                    </div>
                    <p class="text">酵母&nbsp;/&nbsp;<em class="cm-text-red">{{userWarehouseData.rep_score}}</em></p>
                </li>
                <li class="item">
                    <div class="tube">
                        <div class="inner inner-yellow"
                             :style="{height: (userWarehouseData.honey * 100 / userWarehouseData.total).toFixed(2) + '%'}"></div>
                    </div>
                    <p class="text">蜂蜜&nbsp;/&nbsp;<em class="cm-text-red">{{userWarehouseData.honey}}</em></p>
                </li>
                <li class="item">
                    <div class="tube">
                        <div class="inner inner-red"
                             :style="{height: (userWarehouseData.sugar * 100 / userWarehouseData.total).toFixed(2) + '%'}"></div>
                    </div>
                    <p class="text">红糖&nbsp;/&nbsp;<em class="cm-text-red">{{userWarehouseData.sugar}}</em></p>
                </li>
            </ul>
        </div>

        <div class="warehouse-list-head">
            <span class="item warehouse-w-25per">材料</span>
            <span class="item warehouse-w-50per">总数量</span>
            <span class="item warehouse-w-25per">交易</span>
        </div>
        <ul class="warehouse-list">
            <li class="item">
                <span class="text warehouse-w-25per">酵母</span>
                <span class="text warehouse-w-50per">数量：{{userWarehouseData.rep_score}}</span>
                <span class="text warehouse-w-25per cm-text-red" @click="goTo('/main/sell', 'rep_score')">转让</span>
            </li>
            <li class="item">
                <span class="text warehouse-w-25per">蜂蜜</span>
                <span class="text warehouse-w-50per">数量：{{userWarehouseData.honey}}</span>
                <!--<span class="text warehouse-w-25per cm-text-red" @click="goTo('/main/sell', 'honey')">转让</span>-->
                <span class="text warehouse-w-25per">---</span>
            </li>
            <li class="item">
                <span class="text warehouse-w-25per">红糖</span>
                <span class="text warehouse-w-50per">数量：{{userWarehouseData.sugar}}</span>
                <!--<span class="text warehouse-w-25per cm-text-red" @click="goTo('/main/sell', 'sugar')">转让</span>-->
                <span class="text warehouse-w-25per">---</span>
            </li>
            <li class="item">
                <span class="text warehouse-w-25per">积分</span>
                <span class="text warehouse-w-50per">数量：{{userWarehouseData.point}}</span>
                <span class="text warehouse-w-25per cm-text-red" @click="goTo('/main/sell', 'point')">转让</span>
            </li>
        </ul>

        <br><br><br><br>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            var _this = this;
            window.vm = _this;

            _this.getUserWarehouse();

            _this.$store.dispatch('setTitle', '仓库');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: false,
                hideRightBtn: false
            });
            _this.$store.dispatch('setTabActive', 1);
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
                }
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

            goTo: function (path, type) {
                this.$router.push({
                    path: path,
                    query: {
                        type: type
                    }
                });
            }
        }
    };
</script>
