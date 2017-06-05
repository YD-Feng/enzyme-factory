<template>
    <div>
        <cmHeader></cmHeader>
        <cmFooter></cmFooter>

        <div class="wrap-page">
            <router-view></router-view>
        </div>

        <cmTips></cmTips>
        <cmLoading></cmLoading>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            var _this = this;
            window.vm = _this;

            _this.getNewPlayerTips();
        },
        components: {
            cmHeader: require('../components/header.vue'),
            cmFooter: require('../components/footer.vue'),
            cmTips: require('../components/tips.vue'),
            cmLoading: require('../components/loading.vue')
        },
        methods: {
            getNewPlayerTips: function () {
                var _this = this;

                _this.$http({
                    method: 'get',
                    url: '/index/tips',
                    params: {
                        tip_type: 'new_player'
                    }
                }).then(function (res) {
                    _this.$store.dispatch('setNewPlayerTips', res.body.data.tip_str);
                    _this.$store.dispatch('setCostScore', res.body.data.cost_score);
                });
            }
        }
    };
</script>
