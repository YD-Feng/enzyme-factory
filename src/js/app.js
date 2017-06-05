'use strict';

//加载初始化样式
require('./../less/common.less');

var Vue = require('vue'),
    VueRouter = require('vue-router'),
    Vuex = require('vuex'),
    VuexLogger = require('vuex-logger'),
    VuexResource = require('vue-resource'),
    xhrPool = {
        count: 0
    };

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VuexResource);

Vue.http.options.emulateJSON = true;

//实例化 vue-router
window.router = new VueRouter({
    saveScrollPosition: true,
    transitionOnLoad: true,
    routes: require('./routes')
});

router.beforeEach(function (to, from, next) {
    if (to.name != 'login' && to.name != 'forgetPwd' && !localStorage.getItem('hasLogin')) {
        router.push({
            path: '/login'
        });
    } else {
        next();
    }
});

window.store = new Vuex.Store({
    modules: {
        tips: require('./vuexModules/tips'),
        loading: require('./vuexModules/loading'),
        header: require('./vuexModules/header'),
        footer: require('./vuexModules/footer')
    },
    strict: false,
    middlewares: [VuexLogger()]
});

Vue.http.interceptors.push(function (request, next) {
    if (typeof xhrPool[request.url] == 'undefined') {
        xhrPool[request.url] = request;
        xhrPool['count'] = xhrPool['count'] + 1;
    } else {
        xhrPool[request.url] = request;
    }

    if (xhrPool['count'] > 0) {
        window.store.dispatch('showLoading');
    }

    next(function (response) {
        delete xhrPool[request.url];
        xhrPool['count'] = xhrPool['count'] - 1;

        if (xhrPool['count'] == 0) {
            window.store.dispatch('hideLoading');
        }

        if (response.body.code != 200) {
            window.store.dispatch('showTips', response.body.msg);
        }
    });
});

Vue.directive('selectorChange', {
    bind: function (el) {
        el.onchange = function () {
            this.previousElementSibling.innerHTML = this.selectedOptions[0].innerHTML;
        }
    }
});

window.app = new Vue({
    router: router,
    store: store
}).$mount('#app');
