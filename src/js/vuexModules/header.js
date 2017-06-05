module.exports = {
    state: {
        headerConfig: {
            title: null,
            leftBtnCls: 'icon-back',
            hideLeftBtn: false,
            rightBtnCls: 'icon-home',
            hideRightBtn: false
        }
    },
    mutations: {
        SET_TITLE: function (state, title) {
            state.headerConfig.title = title;
        },
        SET_CONFIG: function (state, config) {
            for (var name in config) {
                if (typeof state.headerConfig[name] != 'undefined') {
                    state.headerConfig[name] = config[name];
                }
            }
        }
    },
    actions: {
        setTitle: function (store, title) {
            store.commit('SET_TITLE', title);
        },

        setConfig: function (store, config) {
            store.commit('SET_CONFIG', config);
        }
    }
}
