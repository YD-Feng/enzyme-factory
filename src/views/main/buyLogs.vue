<template>
    <div v-if="initFlag">
        <div class="logs-top">
            <span class="fl fBold">转入记录</span>
            <span class="fr cm-text-blue" @click="clearLogs()">清除记录</span>
        </div>

        <ul class="logs-list">
            <li class="item" v-for="item in logList">
                <table width="100%">
                    <tr>
                        <td class="col-time">
                            {{item.create_time.split(' ')[0]}}<br>
                            <span class="cm-text-dark">{{item.create_time.split(' ')[1] == 'AM' ? '上午' : '下午'}}{{item.create_time.split(' ')[2]}}</span>
                        </td>
                        <td class="col-desc">
                            出售&nbsp;<span class="cm-text-red">{{item.trade_score}}</span>&nbsp;{{typeNames[item.sale_type]}}&nbsp;给&nbsp;<span class="cm-text-red">{{item.trade_score}}</span>
                            <p class="text-wrap">{{item.trade_status_text}}</p>
                        </td>
                    </tr>
                </table>
            </li>
            <li class="cm-no-data" v-if="logList.length == 0">暂无任何记录</li>
        </ul>

        <div class="logs-load-more cm-text-blue" v-show="curPage < totalPage" @click="loadMore">点击查看更多</div>

        <br><br><br><br>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            var _this = this;
            window.vm = _this;

            _this.getLogs();

            _this.$store.dispatch('setTitle', '转入记录');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: false,
                hideRightBtn: false
            });
            _this.$store.dispatch('setTabActive', 3);
        },
        data: function () {
            return {
                curPage: 1,
                totalPage: 1,
                logList: [/*{
                    id: "7",
                    uid: "1",
                    r_uid: "2",
                    trade_score: "1",
                    trade_type: "sell",
                    status: "1",
                    create_time: "2017-05-01 PM 15:22",
                    update_time: "1493623342",
                    avatar: "0",
                    nickname: "test",
                    trade_status: "100",
                    trade_status_text: "待确认",
                }*/], //(trade_status —— 100 ：待确认，200 ：已完成，300 ：已取消)
                initFlag: false,
                typeNames: {
                    rep_score: '酵母',
                    honey: '蜂蜜',
                    sugar: '红糖',
                    point: '积分'
                }
            };
        },
        methods: {
            getLogs: function () {
                var _this = this;

                _this.$http({
                    method: 'get',
                    url: '/trade/tradeRecords',
                    params: {
                        p: _this.curPage,
                        p_size: 10,
                        trade_type: 'buy'
                    }
                }).then(function (res) {
                    _this.initFlag = true;
                    _this.totalPage = res.body.data.total_page * 1;
                    _this.logList = _this.logList.concat(res.body.data.records_list);
                });
            },

            loadMore: function () {
                var _this = this;
                _this.curPage++;
                _this.getLogs();
            },

            clearLogs: function () {
                var _this = this,
                    ids = [];

                _this.logList.forEach(function (item, i) {
                    ids.push(item.id);
                });

                if (ids.length == 0) {
                    _this.$store.dispatch('showTips', '没有需要清除的记录');
                    return;
                }

                _this.$http({
                    method: 'post',
                    url: '/trade/clearRecords',
                    body: {
                        ids: ids
                    }
                }).then(function (res) {
                    _this.logList = [];
                    _this.curPage = 1;
                    _this.getLogs();
                });
            }
        }
    };
</script>
