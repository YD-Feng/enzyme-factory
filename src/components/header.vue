<template>
    <header class="header">
        <p class="title">{{headerConfig.title ? headerConfig.title : '酵素工厂'}}</p>
        <button class="btn btn-l iconfont" v-if="!headerConfig.hideLeftBtn" :class="headerConfig.leftBtnCls" @click="leftBtnCall"></button>
        <button class="btn btn-r iconfont" v-if="!headerConfig.hideRightBtn" :class="headerConfig.rightBtnCls" @click="rightBtnCall"></button>
    </header>
</template>

<script>
    module.exports = {
        replace: true,
        computed: {
            headerConfig: function () {
                return this.$store.state.header.headerConfig;
            }
        },
        methods: {
            leftBtnCall: function () {
                var parentCall = this.$parent.leftBtnCall;

                if (typeof parentCall == 'undefined') {
                    this.$router.go(-1);
                } else {
                    parentCall();
                }
            },

            rightBtnCall: function () {
                var parentCall = this.$parent.rightBtnCall;

                if (typeof parentCall == 'undefined') {
                    this.$router.push({
                        path: '/main'
                    });
                } else {
                    parentCall();
                }
            }
        }
    };
</script>
