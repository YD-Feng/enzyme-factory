webpackJsonp([3],[,,,,,,,,,,,,function(a,b,c){var d,e;d=c(13);var f=c(14);e=d=d||{},("object"==typeof d.default||"function"==typeof d.default)&&(Object.keys(d).some(function(a){return"default"!==a&&"__esModule"!==a})&&console.error("named exports are not supported in *.vue files."),e=d=d.default),"function"==typeof e&&(e=e.options),e.__file="E:\\myProject\\jm_web\\src\\components\\tips.vue",e.render=f.render,e.staticRenderFns=f.staticRenderFns,!1,e.functional&&console.error("[vue-loader] tips.vue: functional components are not supported and should be defined in plain js files using render functions."),a.exports=d},function(a){a.exports={replace:!0,computed:{msg:function(){return this.$store.state.tips.msg}}}},function(a){a.exports={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{staticClass:"cm-tips-box",class:{"cm-tips-box-show":""!=a.msg}},[a._v(a._s(a.msg))])},staticRenderFns:[]},!1},function(a,b,c){var d,e;d=c(16);var f=c(17);e=d=d||{},("object"==typeof d.default||"function"==typeof d.default)&&(Object.keys(d).some(function(a){return"default"!==a&&"__esModule"!==a})&&console.error("named exports are not supported in *.vue files."),e=d=d.default),"function"==typeof e&&(e=e.options),e.__file="E:\\myProject\\jm_web\\src\\components\\loading.vue",e.render=f.render,e.staticRenderFns=f.staticRenderFns,!1,e.functional&&console.error("[vue-loader] loading.vue: functional components are not supported and should be defined in plain js files using render functions."),a.exports=d},function(a){a.exports={replace:!0,computed:{isShow:function(){return this.$store.state.loading.isShow}}}},function(a){a.exports={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{directives:[{name:"show",rawName:"v-show",value:a.isShow,expression:"isShow"}],staticClass:"cm-loading"},[a._m(0)])},staticRenderFns:[function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{staticClass:"wrap"},[c("div",{staticClass:"inner"},[c("span"),a._v(" "),c("span"),a._v(" "),c("span"),a._v(" "),c("span"),a._v(" "),c("span"),a._v(" "),c("span"),a._v(" "),c("span"),a._v(" "),c("span")])])}]},!1},,,,function(a,b,c){var d,e;d=c(22);var f=c(23);e=d=d||{},("object"==typeof d.default||"function"==typeof d.default)&&(Object.keys(d).some(function(a){return"default"!==a&&"__esModule"!==a})&&console.error("named exports are not supported in *.vue files."),e=d=d.default),"function"==typeof e&&(e=e.options),e.__file="E:\\myProject\\jm_web\\src\\components\\header.vue",e.render=f.render,e.staticRenderFns=f.staticRenderFns,!1,e.functional&&console.error("[vue-loader] header.vue: functional components are not supported and should be defined in plain js files using render functions."),a.exports=d},function(a){a.exports={replace:!0,computed:{headerConfig:function(){return this.$store.state.header.headerConfig}},methods:{leftBtnCall:function(){var a=this.$parent.leftBtnCall;"undefined"==typeof a?this.$router.go(-1):a()},rightBtnCall:function(){var a=this.$parent.rightBtnCall;"undefined"==typeof a?this.$router.push({path:"/main"}):a()}}}},function(a){a.exports={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("header",{staticClass:"header"},[c("p",{staticClass:"title"},[a._v(a._s(a.headerConfig.title?a.headerConfig.title:"\u9175\u7D20\u5DE5\u5382"))]),a._v(" "),a.headerConfig.hideLeftBtn?a._e():c("button",{staticClass:"btn btn-l iconfont",class:a.headerConfig.leftBtnCls,on:{click:a.leftBtnCall}}),a._v(" "),a.headerConfig.hideRightBtn?a._e():c("button",{staticClass:"btn btn-r iconfont",class:a.headerConfig.rightBtnCls,on:{click:a.rightBtnCall}})])},staticRenderFns:[]},!1},,function(a,b,c){var d,e;d=c(26);var f=c(30);e=d=d||{},("object"==typeof d.default||"function"==typeof d.default)&&(Object.keys(d).some(function(a){return"default"!==a&&"__esModule"!==a})&&console.error("named exports are not supported in *.vue files."),e=d=d.default),"function"==typeof e&&(e=e.options),e.__file="E:\\myProject\\jm_web\\src\\views\\main.vue",e.render=f.render,e.staticRenderFns=f.staticRenderFns,!1,e.functional&&console.error("[vue-loader] main.vue: functional components are not supported and should be defined in plain js files using render functions."),a.exports=d},function(a,b,c){a.exports={created:function(){var a=this;window.vm=a,a.getNewPlayerTips()},components:{cmHeader:c(21),cmFooter:c(27),cmTips:c(12),cmLoading:c(15)},methods:{getNewPlayerTips:function(){var a=this;a.$http({method:"get",url:"/index/tips",params:{tip_type:"new_player"}}).then(function(b){a.$store.dispatch("setNewPlayerTips",b.body.data.tip_str),a.$store.dispatch("setCostScore",b.body.data.cost_score)})}}}},function(a,b,c){var d,e;d=c(28);var f=c(29);e=d=d||{},("object"==typeof d.default||"function"==typeof d.default)&&(Object.keys(d).some(function(a){return"default"!==a&&"__esModule"!==a})&&console.error("named exports are not supported in *.vue files."),e=d=d.default),"function"==typeof e&&(e=e.options),e.__file="E:\\myProject\\jm_web\\src\\components\\footer.vue",e.render=f.render,e.staticRenderFns=f.staticRenderFns,!1,e.functional&&console.error("[vue-loader] footer.vue: functional components are not supported and should be defined in plain js files using render functions."),a.exports=d},function(a){a.exports={replace:!0,computed:{activeTab:function(){return this.$store.state.footer.activeTab}}}},function(a){a.exports={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("nav",{staticClass:"footer"},[c("router-link",{staticClass:"item",class:{active:0==a.activeTab},attrs:{to:"/main/home"}},[c("i",{staticClass:"icon icon-bg-home"}),a._v(" "),c("p",{staticClass:"text"},[a._v("\u9996\u9875")])]),a._v(" "),c("router-link",{staticClass:"item",class:{active:1==a.activeTab},attrs:{to:"/main/userCenter"}},[c("i",{staticClass:"icon icon-bg-user"}),a._v(" "),c("p",{staticClass:"text"},[a._v("\u4E2A\u4EBA\u4E2D\u5FC3")])]),a._v(" "),c("router-link",{staticClass:"item",class:{active:2==a.activeTab},attrs:{to:"/enzymeVat"}},[c("i",{staticClass:"icon icon-bg-bottle"}),a._v(" "),c("p",{staticClass:"text"},[a._v("\u9175\u7F38")])]),a._v(" "),c("router-link",{staticClass:"item",class:{active:3==a.activeTab},attrs:{to:"/main/transaction"}},[c("i",{staticClass:"icon icon-bg-cart"}),a._v(" "),c("p",{staticClass:"text"},[a._v("\u4EA4\u6613")])])],1)},staticRenderFns:[]},!1},function(a){a.exports={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",[c("cmHeader"),a._v(" "),c("cmFooter"),a._v(" "),c("div",{staticClass:"wrap-page"},[c("router-view")],1),a._v(" "),c("cmTips"),a._v(" "),c("cmLoading")],1)},staticRenderFns:[]},!1}]);