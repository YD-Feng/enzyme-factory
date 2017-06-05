<template>
    <div class="cm-loading" v-show="isShow">
        <div class="wrap">
            <div class="inner">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        replace: true,
        computed: {
            isShow: function () {
                return this.$store.state.loading.isShow;
            }
        }
    };
</script>
