<template>
    <nav class="footer">
        <router-link class="item" :class="{active: activeTab == 0}" to="/main/home">
            <i class="icon icon-bg-home"></i>
            <p class="text">首页</p>
        </router-link>
        <router-link class="item" :class="{active: activeTab == 1}" to="/main/userCenter">
            <i class="icon icon-bg-user"></i>
            <p class="text">个人中心</p>
        </router-link>
        <router-link class="item" :class="{active: activeTab == 2}" to="/enzymeVat">
            <i class="icon icon-bg-bottle"></i>
            <p class="text">酵缸</p>
        </router-link>
        <router-link class="item" :class="{active: activeTab == 3}" to="/main/transaction">
            <i class="icon icon-bg-cart"></i>
            <p class="text">交易</p>
        </router-link>
    </nav>
</template>

<script>
    module.exports = {
        replace: true,
        computed: {
            activeTab: function () {
                return this.$store.state.footer.activeTab;
            }
        }
    };
</script>
