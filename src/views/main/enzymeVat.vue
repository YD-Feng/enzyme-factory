<template>
    <div>
        <div class="enzyme-top-txt" v-if="userWarehouseDataInit">
            当前红糖发放率为{{userWarehouseData.sugar_rate + '%'}}
        </div>

        <div class="cm-list-wrap main-menu-wrap">
            <ul class="list list-can-open menu-list">
                <li class="item menu-item" @click="goTo('/main/enzymeVatDetail', 'small')">
                    <i class="menu-icon menu-icon-04"></i>
                    小酵缸<span class="desc cm-text-dark">3000升/缸</span>
                    <i class="icon iconfont icon-right"></i>
                </li>
                <li class="item menu-item" @click="goTo('/main/enzymeVatDetail', 'big')">
                    <i class="menu-icon menu-icon-07"></i>
                    大酵缸<span class="desc cm-text-dark">30000升/缸</span>
                    <i class="icon iconfont icon-right"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            var _this = this;
            window.vm = _this;

            _this.getUserWarehouse();

            _this.$store.dispatch('setTitle', '酵缸');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: true,
                hideRightBtn: true
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
                }
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
