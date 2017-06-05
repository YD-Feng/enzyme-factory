module.exports = [
    {
        path: '/',
        name: 'login',
        component: function (resolve) {
            require.ensure(['./../views/login.vue'], function (require) {
                resolve(require('./../views/login.vue'));
            }, 'login');
        }
    },
    {
        path: '/login',
        name: 'login',
        component: function (resolve) {
            require.ensure(['./../views/login.vue'], function (require) {
                resolve(require('./../views/login.vue'));
            }, 'login');
        }
    },
    {
        path: '/forgetPwd',
        name: 'forgetPwd',
        component: function (resolve) {
            require.ensure(['./../views/forgetPwd.vue'], function (require) {
                resolve(require('./../views/forgetPwd.vue'));
            }, 'forgetPwd');
        }
    },
    {
        path: '/main',
        name: 'main',
        component: function (resolve) {
            require.ensure(['./../views/main.vue'], function (require) {
                resolve(require('./../views/main.vue'));
            }, 'main');
        },
        children: [
            {
                path: '',
                redirect: 'home'
            },
            {
                path: 'home',
                name: 'home',
                component: function (resolve) {
                    require.ensure(['./../views/main/home.vue'], function (require) {
                        resolve(require('./../views/main/home.vue'));
                    }, 'home');
                }
            },
            {
                path: 'userCenter',
                name: 'userCenter',
                component: function (resolve) {
                    require.ensure(['./../views/main/userCenter.vue'], function (require) {
                        resolve(require('./../views/main/userCenter.vue'));
                    }, 'userCenter');
                }
            },
            {
                path: 'friends',
                name: 'friends',
                component: function (resolve) {
                    require.ensure(['./../views/main/friends.vue'], function (require) {
                        resolve(require('./../views/main/friends.vue'));
                    }, 'friends');
                }
            },
            {
                path: 'newPlayer',
                name: 'newPlayer',
                component: function (resolve) {
                    require.ensure(['./../views/main/newPlayer.vue'], function (require) {
                        resolve(require('./../views/main/newPlayer.vue'));
                    }, 'newPlayer');
                }
            },
            {
                path: 'warehouse',
                name: 'warehouse',
                component: function (resolve) {
                    require.ensure(['./../views/main/warehouse.vue'], function (require) {
                        resolve(require('./../views/main/warehouse.vue'));
                    }, 'warehouse');
                }
            },
            {
                path: 'changePwd',
                name: 'changePwd',
                component: function (resolve) {
                    require.ensure(['./../views/main/changePwd.vue'], function (require) {
                        resolve(require('./../views/main/changePwd.vue'));
                    }, 'changePwd');
                }
            },
            /*{
                path: 'enzymeVat',
                name: 'enzymeVat',
                component: function (resolve) {
                    require.ensure(['./../views/main/enzymeVat.vue'], function (require) {
                        resolve(require('./../views/main/enzymeVat.vue'));
                    }, 'enzymeVat');
                }
            },
            {
                path: 'enzymeVatDetail',
                name: 'enzymeVatDetail',
                component: function (resolve) {
                    require.ensure(['./../views/main/enzymeVatDetail.vue'], function (require) {
                        resolve(require('./../views/main/enzymeVatDetail.vue'));
                    }, 'enzymeVatDetail');
                }
            },*/
            {
                path: 'transaction',
                name: 'transaction',
                component: function (resolve) {
                    require.ensure(['./../views/main/transaction.vue'], function (require) {
                        resolve(require('./../views/main/transaction.vue'));
                    }, 'transaction');
                }
            },
            {
                path: 'sell',
                name: 'sell',
                component: function (resolve) {
                    require.ensure(['./../views/main/sell.vue'], function (require) {
                        resolve(require('./../views/main/sell.vue'));
                    }, 'sell');
                }
            },
            {
                path: 'sellLogs',
                name: 'sellLogs',
                component: function (resolve) {
                    require.ensure(['./../views/main/sellLogs.vue'], function (require) {
                        resolve(require('./../views/main/sellLogs.vue'));
                    }, 'sellLogs');
                }
            },
            {
                path: 'buyLogs',
                name: 'buyLogs',
                component: function (resolve) {
                    require.ensure(['./../views/main/buyLogs.vue'], function (require) {
                        resolve(require('./../views/main/buyLogs.vue'));
                    }, 'buyLogs');
                }
            }
        ]
    },
    {
        path: '/enzymeVat',
        name: 'enzymeVat',
        component: function (resolve) {
            require.ensure(['./../views/enzymeVat.vue'], function (require) {
                resolve(require('./../views/enzymeVat.vue'));
            }, 'enzymeVat');
        }
    }
];
