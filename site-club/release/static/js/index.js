layui.define(["layer","laytpl","form","upload","util"],function(e){var t=layui.jquery,i=layui.layer,a=(layui.laytpl,layui.form()),n=layui.util,l=layui.device();l.ie&&l.ie<8&&i.alert("如果您非得使用ie浏览Fly社区，那么请使用ie8+"),layui.focusInsert=function(e,t){var i,a=e.value;e.focus(),document.selection?(i=document.selection.createRange(),document.selection.empty(),i.text=t):(i=[a.substring(0,e.selectionStart),t,a.substr(e.selectionEnd)],e.focus(),e.value=i.join(""))};var o={json:function(e,a,n,l){return l=l||{},a=a||{},t.ajax({type:l.type||"post",dataType:l.dataType||"json",data:a,url:e,success:function(e){0===e.status?n&&n(e):i.msg(e.msg||e.code,{shift:6})},error:function(){l.error||i.msg("请求异常，请重试",{shift:6})}})},sort:function(e,t,i){var a=JSON.parse(JSON.stringify(e)),n=function(e,i){var a=e[t],n=i[t];return a>n?-1:n>a?1:0};return a.sort(n),i&&a.reverse(),a},charLen:function(e){for(var t=e.split(""),i=0,a=0;a<e.length;a++)t[a].charCodeAt(0)<299?i++:i+=2;return i},form:{},layEditor:function(e){var n='<div class="fly-edit"><span type="face" title="插入表情"><i class="iconfont icon-biaoqing"></i>表情</span><span type="picture" title="插入图片：img[src]"><i class="iconfont icon-tupian"></i>图片</span><span type="href" title="超链接格式：a(href)[text]"><i class="iconfont icon-lianjie"></i>链接</span><span type="code" title="插入代码"><i class="iconfont icon-daima"></i>代码</span><span type="yulan" title="预览"><i class="iconfont icon-yulan"></i>预览</span></div>',l={picture:function(e){i.open({type:1,id:"fly-jie-upload",title:"插入图片",area:"auto",shade:!1,area:"465px",skin:"layui-layer-border",content:['<ul class="layui-form layui-form-pane" style="margin: 20px;">','<li class="layui-form-item">','<label class="layui-form-label">URL</label>','<div class="layui-input-inline">','<input required name="image" placeholder="支持直接粘贴远程图片地址" value="" class="layui-input">',"</div>",'<input required type="file" name="file" class="layui-upload-file" value="">',"</li>",'<li class="layui-form-item" style="text-align: center;">','<button type="button" lay-submit lay-filter="uploadImages" class="layui-btn">确认</button>',"</li>","</ul>"].join(""),success:function(t,n){var l=t.find('input[name="image"]');layui.upload({url:"/api/upload/",elem:"#fly-jie-upload .layui-upload-file",success:function(e){0==e.status?l.val(e.url):i.msg(e.msg,{icon:5})}}),a.on("submit(uploadImages)",function(t){var a=t.field;return a.image?(layui.focusInsert(e[0],"img["+a.image+"] "),void i.close(n)):l.focus()})}})},face:function(e,a){var n="",l=o.faces;for(var c in l)n+='<li title="'+c+'"><img src="'+l[c]+'"></li>';n='<ul id="LAY-editface" class="layui-clear">'+n+"</ul>",i.tips(n,a,{tips:3,time:0,skin:"layui-edit-face"}),t(document).on("click",function(){i.closeAll("tips")}),t("#LAY-editface li").on("click",function(){var i=t(this).attr("title")+" ";layui.focusInsert(e[0],"face"+i)})},href:function(e){i.prompt({title:"请输入合法链接",shade:!1},function(t,a,n){return/^http(s*):\/\/[\S]/.test(t)?(layui.focusInsert(e[0]," a("+t+")["+t+"] "),void i.close(a)):void i.tips("这根本不是个链接，不要骗我。",n,{tips:1})})},code:function(e){i.prompt({title:"请贴入代码",formType:2,maxlength:1e4,shade:!1,area:["830px","390px"]},function(t,a){layui.focusInsert(e[0],"[pre]\n"+t+"\n[/pre]"),i.close(a)})},yulan:function(e){var t=e.val();t=/^\{html\}/.test(t)?t.replace(/^\{html\}/,""):o.content(t),i.open({type:1,title:"预览",area:["100%","100%"],scrollbar:!1,content:'<div class="detail-body" style="margin:20px;">'+t+"</div>"})}};layui.use("face",function(i){e=e||{},o.faces=i,t(e.elem).each(function(){var e=this,i=t(e),a=i.parent();a.prepend(n),a.find(".fly-edit span").on("click",function(a){var n=t(this).attr("type");l[n].call(e,i,this),"face"===n&&a.stopPropagation()})})})},escape:function(e){return String(e||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},content:function(e){var t=function(e){return new RegExp("\\["+(e||"")+"(pre|div|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)\\]\\n*","g")};return e=o.escape(e||"").replace(/img\[([^\s]+?)\]/g,function(e){return'<img src="'+e.replace(/(^img\[)|(\]$)/g,"")+'">'}).replace(/@(\S+)(\s+?|$)/g,'@<a href="javascript:;" class="fly-aite">$1</a>$2').replace(/face\[([^\s\[\]]+?)\]/g,function(e){var t=e.replace(/^face/g,"");return'<img alt="'+t+'" title="'+t+'" src="'+o.faces[t]+'">'}).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g,function(e){var t=(e.match(/a\(([\s\S]+?)\)\[/)||[])[1],i=(e.match(/\)\[([\s\S]*?)\]/)||[])[1];if(!t)return e;var a=/^(http(s)*:\/\/)\b(?!(\w+\.)*(sentsin.com|layui.com))\b/.test(t.replace(/\s/g,""));return'<a href="'+t+'" target="_blank"'+(a?' rel="nofollow"':"")+">"+(i||t)+"</a>"}).replace(t(),"<$1>").replace(t("/"),"</$1>").replace(/\n/g,"<br>")},newmsg:function(){return-1!==layui.cache.user.uid&&o.json("/message/nums/",{_:(new Date).getTime()},function(e){if(0===e.status&&e.count>0){var i=t('<a class="nav-message" href="javascript:;" title="您有'+e.count+'条未阅读的消息">'+e.count+"</a>");t(".nav-user").append(i),i.on("click",function(){o.json("/message/read",{},function(e){0===e.status&&(location.href="/user/message/")})})}}),arguments.callee},cookie:function(e,i,a){e=e||"";var n,l,o,c,s,r,u,f,p;if("undefined"==typeof i){if(r=null,document.cookie&&""!=document.cookie)for(u=document.cookie.split(";"),f=0;f<u.length;f++)if(p=t.trim(u[f]),p.substring(0,e.length+1)==e+"="){r=decodeURIComponent(p.substring(e.length+1));break}return r}a=a||{},null===i&&(i="",a.expires=-1),n="",a.expires&&("number"==typeof a.expires||a.expires.toUTCString)&&("number"==typeof a.expires?(l=new Date,l.setTime(l.getTime()+864e5*a.expires)):l=a.expires,n="; expires="+l.toUTCString()),o=a.path?"; path="+a.path:"",c=a.domain?"; domain="+a.domain:"",s=a.secure?"; secure":"",document.cookie=[e,"=",encodeURIComponent(i),n,o,c,s].join("")}};if(i.photos({photos:".photos",zIndex:9999999999,anim:-1}),t(".fly-search").submit(function(){var e=t(this).find("input"),i=e.val();return""===i.replace(/\s/g,"")?!1:void e.val("site:layui.com "+e.val())}),t(".icon-sousuo").on("click",function(){t(".fly-search").submit()}),o.newmsg(),o.activate=function(){o.json("/api/activate/",{},function(e){0===e.status&&i.alert("已成功将激活链接发送到了您的邮箱，接受可能会稍有延迟，请注意查收。",{icon:1})})},t("#LAY-activate").on("click",function(){o.activate(t(this).attr("email"))}),t("body").on("click",".fly-aite",function(){var e=t(this),i=e.text();"javascript:;"===e.attr("href")&&(i=i.replace(/^@|（[\s\S]+?）/g,""),e.attr({href:"/jump?username="+i,target:"_blank"}))}),a.on("submit(*)",function(e){var a=t(e.form).attr("action"),n=t(e.elem);return o.json(a,e.field,function(t){var l=function(){t.action?location.href=t.action:o.form[a||n.attr("key")](e.field,e.form)};0==t.status&&(n.attr("alert")?i.alert(t.msg,{icon:1,time:1e4,end:l}):l())}),!1}),layui.cache.page&&"index"!==layui.cache.page){var c={};c[layui.cache.page]=layui.cache.page,layui.extend(c),layui.use(layui.cache.page)}!l.android&&!l.ios,o.layEditor({elem:".fly-editor"}),n.fixbar({bar1:!0,click:function(e){"bar1"===e&&i.msg("bar1")}});var s=t(".site-tree-mobile"),r=t(".site-mobile-shade");s.on("click",function(){t("body").addClass("site-mobile")}),r.on("click",function(){t("body").removeClass("site-mobile")}),e("fly",o)});