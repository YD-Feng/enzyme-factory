<template>
    <div>
        <div class="cm-list-wrap main-menu-wrap main-mt-2">
            <ul class="list list-can-open menu-list">
                <li class="item menu-item" @click="goTo('/main/sell?type=rep_score')">
                    <i class="menu-icon menu-icon-07"></i>
                    出售酵母
                    <i class="icon iconfont icon-right"></i>
                </li>
                <li class="item menu-item" @click="goTo('/main/sell?type=point')">
                    <i class="menu-icon menu-icon-04"></i>
                    转让积分
                    <i class="icon iconfont icon-right"></i>
                </li>
                <li class="item menu-item" @click="goTo('/main/sellLogs')">
                    <i class="menu-icon menu-icon-05"></i>
                    出售记录
                    <i class="icon iconfont icon-right"></i>
                </li>
                <li class="item menu-item" @click="goTo('/main/buyLogs')">
                    <i class="menu-icon menu-icon-06"></i>
                    转入记录
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
            _this.$store.dispatch('setTitle', '交易');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: true,
                hideRightBtn: true
            });
            _this.$store.dispatch('setTabActive', 3);
        },
        data: function () {
            return {};
        },
        methods: {
            goTo: function (path) {
                this.$router.push({
                    path: path
                });
            }
        }
    };
</script>
