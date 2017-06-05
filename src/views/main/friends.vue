<template>
    <div>
        <ul class="friends-list" v-if="friendsInit">
            <li class="item" v-for="item in friends">
                <div class="uc-user-msg-wrap">
                    <div class="uc-avatar avatar" :class="['avatar-' + item.avatar]" @click="showPop"></div>
                    <p class="name">{{item.username}}</p>
                    <p class="uid cm-text-dark">用户帐号：{{item.uid}}</p>
                    <div class="level">
                        <p>级别</p>
                        <p class="cm-text-dark">{{item.level}}</p>
                    </div>
                </div>
            </li>
            <li class="cm-no-data" v-if="friends.length == 0">
                暂无好友玩家，赶快去开发新玩家吧。
            </li>
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

            _this.getFriends();

            _this.$store.dispatch('setTitle', '好友玩家');
            _this.$store.dispatch('setConfig', {
                hideLeftBtn: false,
                hideRightBtn: false
            });
            _this.$store.dispatch('setTabActive', 1);
        },
        data: function () {
            return {
                friendsInit: false,
                curPage: 1,
                totalPage: 1,
                friends: [/*{
                    uid: "2",
                    nickname: "test",
                    sex: "0",
                    level: "1",
                    birthday: "0000-00-00",
                    qq: "",
                    score: "0",
                    login: "1",
                    reg_ip: "0",
                    reg_time: "0",
                    last_login_ip: "2130706433",
                    last_login_time: "1493049133",
                    status: "1"
                }*/]
            };
        },
        methods: {
            getFriends: function () {
                var _this = this;

                _this.$http({
                    method: 'get',
                    url: '/user/friends'
                }).then(function (res) {
                    _this.friendsInit = true;
                    _this.totalPage = res.body.data.total_page * 1;
                    _this.friends = _this.friends.concat(res.body.data.friends_list);
                });
            },

            loadMore: function () {
                var _this = this;
                _this.curPage++;
                _this.getFriends();
            },

            goTo: function (path) {
                this.$router.push({
                    path: path
                });
            }
        }
    };
</script>
