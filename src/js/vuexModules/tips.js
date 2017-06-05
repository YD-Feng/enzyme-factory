var timeoutObj = null;

module.exports = {
    state: {
        msg: '',
        newPlayerTips: '',
        costScore: ''
    },
    mutations: {
        SET_TIPS_MSG: function (state, msg) {
            state.msg = msg;

            clearTimeout(timeoutObj);
            timeoutObj = setTimeout(function () {
                state.msg = '';
            }, 3000);
        },

        SET_NEW_PLAYER_TIPS: function (state, tips) {
            state.newPlayerTips = tips;
        },

        SET_COST_SCORE: function (state, score) {
            state.costScore = score;
        }
    },
    actions: {
        showTips: function (store, msg) {
            store.commit('SET_TIPS_MSG', msg);
        },

        setNewPlayerTips: function (store, tips) {
            store.commit('SET_NEW_PLAYER_TIPS', tips);
        },

        setCostScore: function (store, score) {
            store.commit('SET_COST_SCORE', score);
        }
    }
}
