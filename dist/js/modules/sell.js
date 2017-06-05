webpackJsonp([11],{52:function(a,b,c){var d,e;d=c(53);var f=c(54);e=d=d||{},("object"==typeof d.default||"function"==typeof d.default)&&(Object.keys(d).some(function(a){return"default"!==a&&"__esModule"!==a})&&console.error("named exports are not supported in *.vue files."),e=d=d.default),"function"==typeof e&&(e=e.options),e.__file="E:\\myProject\\jm_web\\src\\views\\main\\sell.vue",e.render=f.render,e.staticRenderFns=f.staticRenderFns,!1,e.functional&&console.error("[vue-loader] sell.vue: functional components are not supported and should be defined in plain js files using render functions."),a.exports=d},53:function(a){a.exports={created:function(){var a=this;window.vm=a,a.getUserWarehouse(),a.$store.dispatch("setTitle",a.sellName+a.curTypeName),a.$store.dispatch("setConfig",{hideLeftBtn:!1,hideRightBtn:!1}),a.$store.dispatch("setTabActive",3)},data:function(){var a=this.$router.currentRoute.query.type||"rep_score";return{curType:a,sellName:"point"==a?"\u8F6C\u8BA9":"\u51FA\u552E",curTypeName:{rep_score:"\u9175\u6BCD",honey:"\u8702\u871C",sugar:"\u7EA2\u7CD6",point:"\u79EF\u5206"}[a],yzmBtnStatus:1,yzmBtnTxt:"\u83B7\u53D6\u9A8C\u8BC1\u7801",curScore:0,score:"",buyer:"",code:""}},computed:{errorNum:function(){return isNaN(1*this.score)||0!=this.score%10}},methods:{getUserWarehouse:function(){var a=this;a.$http({method:"get",url:"/user/warehouse"}).then(function(b){a.userWarehouseDataInit=!0,a.curScore=b.body.data[a.curType]})},sendMsg:function(){var a=this;0==a.yzmBtnStatus||a.$http({method:"get",url:"/trade/sms_verify"}).then(function(){var b=60,c=null;a.yzmBtnStatus=0,a.yzmBtnTxt=b+"\u79D2\u540E\u53EF\u91CD\u53D1",c=setInterval(function(){b--,0<b?a.yzmBtnTxt=b+"\u79D2\u540E\u53EF\u91CD\u53D1":(a.yzmBtnStatus=1,a.yzmBtnTxt="\u83B7\u53D6\u9A8C\u8BC1\u7801",clearInterval(c))},1e3),a.$store.dispatch("showTips","\u6821\u9A8C\u77ED\u4FE1\u53D1\u9001\u6210\u529F\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536")})},submit:function(){var a=this;return a.score.match(/^[1-9]\d*$/)?0==a.score%10?1*a.score>a.curScore?void a.$store.dispatch("showTips","\u51FA\u552E\u6570\u91CF\u4E0D\u5F97\u5927\u4E8E\u53EF\u552E\u4E0A\u9650"):""==a.buyer?void a.$store.dispatch("showTips","\u76EE\u6807\u4F1A\u5458\u4E0D\u80FD\u4E3A\u7A7A"):""==a.code?void a.$store.dispatch("showTips","\u77ED\u4FE1\u9A8C\u8BC1\u7801\u4E0D\u80FD\u4E3A\u7A7A"):void a.$http({method:"post",url:"/trade/sell",body:{score:a.score,buyer:a.buyer,sale_type:a.curType,code:a.code}}).then(function(){a.$store.dispatch("showTips",a.curTypeName+"\u51FA\u552E\u6210\u529F"),a.$router.push({path:"/main/userCenter"})}):void a.$store.dispatch("showTips","\u51FA\u552E\u6570\u91CF\u5FC5\u987B\u662F10\u7684\u500D\u6570"):void a.$store.dispatch("showTips","\u51FA\u552E\u6570\u91CF\u5FC5\u987B\u662F\u6B63\u6574\u6570")}}}},54:function(a){a.exports={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{staticClass:"sell-wrap"},[c("p",{staticClass:"text-item"},[a._v("\u4ED3\u5E93"+a._s(a.curTypeName)+"\u6570\u91CF\uFF1A"),c("span",{staticClass:"cm-text-red"},[a._v(a._s(a.curScore))])]),a._v(" "),c("p",{staticClass:"text-item"},[a._v("\u53EF"+a._s(a.sellName)+"\u4E0A\u9650\uFF1A"),c("span",{staticClass:"cm-text-red"},[a._v(a._s(a.curScore))])]),a._v(" "),c("p",{staticClass:"text-item"},[a._v(a._s(a.sellName)+"\u6570\u91CF\uFF1A"),c("span",{directives:[{name:"show",rawName:"v-show",value:a.errorNum,expression:"errorNum"}],staticClass:"cm-text-red"},[a._v("("+a._s(a.sellName)+"\u6570\u91CF\u5FC5\u987B\u662F10\u7684\u500D\u6570)")])]),a._v(" "),c("input",{directives:[{name:"model",rawName:"v-model",value:a.score,expression:"score"}],staticClass:"input",attrs:{type:"text",placeholder:"10\u7684\u500D\u6570"},domProps:{value:a.score},on:{input:function(b){b.target.composing||(a.score=b.target.value)}}}),a._v(" "),c("p",{staticClass:"text-item"},[a._v("\u76EE\u6807\u4F1A\u5458\uFF1A")]),a._v(" "),c("input",{directives:[{name:"model",rawName:"v-model",value:a.buyer,expression:"buyer"}],staticClass:"input",attrs:{type:"text",placeholder:"\u76EE\u6807\u4F1A\u5458\u7684\u7528\u6237\u540D/ID/\u624B\u673A\u53F7"},domProps:{value:a.buyer},on:{input:function(b){b.target.composing||(a.buyer=b.target.value)}}}),a._v(" "),c("p",{staticClass:"text-item"},[a._v("\u77ED\u4FE1\u9A8C\u8BC1\u7801\uFF1A")]),a._v(" "),c("input",{directives:[{name:"model",rawName:"v-model",value:a.code,expression:"code"}],staticClass:"input input-yzm",attrs:{type:"text"},domProps:{value:a.code},on:{input:function(b){b.target.composing||(a.code=b.target.value)}}}),a._v(" "),c("button",{staticClass:"btn-yzm",class:{disabled:0==a.yzmBtnStatus},on:{click:a.sendMsg}},[a._v(a._s(a.yzmBtnTxt))]),a._v(" "),c("p",{staticClass:"text-item-desc"},[a._v("\u4EA4\u6613\u8BF4\u660E\uFF1A\u9175\u4E3B\u53EA\u80FD\u548C\u6CE8\u518C\u9175\u4E3B\u4E4B\u95F4\u4EA4\u6613\uFF0C\u9650\u5236\u5411\u4E0B\u7EA7\u4F1A\u5458\u51FA\u552E\u679C\u5B9E")]),a._v(" "),c("button",{staticClass:"btn-yes",on:{click:a.submit}},[a._v("\u786E\u8BA4")])])},staticRenderFns:[]},!1}});