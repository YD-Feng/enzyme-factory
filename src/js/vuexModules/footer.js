var timeoutObj = null;

module.exports = {
    state: {
        activeTab: 0
    },
    mutations: {
        SET_TAB_ACTIVE: function (state, tabIndex) {
            state.activeTab = tabIndex;
        }
    },
    actions: {
        setTabActive: function (store, tabIndex) {
            store.commit('SET_TAB_ACTIVE', tabIndex);
        }
    }
}
