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

        <div class="cm-list-wrap home-news-wrap" v-if="announceInit">
            <h2 class="title">系统公告</h2>
            <ul class="list news-list">
                <li class="item" v-for="item in announceList">
                    <p class="news-title">{{item.sys_ann_title}}</p>
                    <p class="news-time cm-text-dark">{{item.create_time}}</p>
                </li>
                <li class="cm-no-data" v-if="announceList.length == 0">暂无任何公告</li>
            </ul>
        </div>

        <br><br><br><br>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            var _this = this;
            window.vm = _this;

            _this.getUserWarehouse();
            _this.getAnnounce();

            _this.$store.dispatch('setTitle', null);
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: true,
                hideRightBtn: true
            });
            _this.$store.dispatch('setTabActive', 0);
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
                announceInit: false,
                announceList: [/*{
                    id: "2",
                    uid: "0",
                    sys_ann_title: "测试系统公告123123132131312312313长一点的系统公告",
                    sys_ann_value: "",
                    create_time: "2017-05-01"
                }*/]
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

                    res.body.data.total = res.body.data.rep_score * 1 + res.body.data.honey * 1 + res.body.data.sugar * 1;
                    if (res.body.data.total == 0) {
                        res.body.data.total = 1;
                    }

                    _this.userWarehouseData = res.body.data;
                });
            },

            getAnnounce: function () {
                var _this = this;

                _this.$http({
                    method: 'get',
                    url: '/index/announce'
                }).then(function (res) {
                    _this.announceInit = true;
                    _this.announceList = res.body.data;
                });
            }
        }
    };
</script>
