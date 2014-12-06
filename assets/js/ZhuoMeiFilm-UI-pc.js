/*
ZhuoMeiFilm-UI-pc QQ:2394179198 V20141012
*/
function addFav(){   // 加入收藏夹 
if (document.all) {
   window.external.addFavorite(window.location.href, document.title);
} else if (window.sidebar) {
   window.sidebar.addPanel(document.title, window.location.href, "");
}
}
function setHomepage(){   // 设置首页 
if (document.all) {
   document.body.style.behavior = 'url(#default#homepage)';
   document.body.setHomePage(window.location.href);
} else if (window.sidebar) {
   if (window.netscape) {
    try {
     netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    } catch(e) {
     alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
    }
   }
var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
   prefs.setCharPref('browser.startup.homepage', window.location.href);
}
}

/////////////////////////////////////////////////////////////////////////////////////////
/* s 图片预加载+自动等比例缩放 
参数设置： 
scaling 是否等比例自动缩放 
width 图片最大高 
height 图片最大宽 
loadpic 加载中的图片路径 

使用：
$("div img").LoadImage(true,600,600);
或者
<script type="text/javascript">
$(function(){
	$("#content img").LoadImage(true,800,600,"../loading.gif");
});
</script>

*/ 
jQuery.fn.LoadImage=function(scaling,width,height,loadpic){
    if(loadpic==null)loadpic="load3.gif";
	return this.each(function(){
		var t=$(this);
		var src=$(this).attr("src")
		var img=new Image();
		//alert("Loading...")
		img.src=src;
		//自动缩放图片
		var autoScaling=function(){
			if(scaling){
			
				if(img.width>0 && img.height>0){ 
			        if(img.width/img.height>=width/height){ 
			            if(img.width>width){ 
			                t.width(width); 
			                t.height((img.height*width)/img.width); 
			            }else{ 
			                t.width(img.width); 
			                t.height(img.height); 
			            } 
			        } 
			        else{ 
			            if(img.height>height){ 
			                t.height(height); 
			                t.width((img.width*height)/img.height); 
			            }else{ 
			                t.width(img.width); 
			                t.height(img.height); 
			            } 
			        } 
			    } 
			}	
		}
		//处理ff下会自动读取缓存图片
		if(img.complete){
		    //alert("getToCache!");
			autoScaling();
		    return;
		}
		$(this).attr("src","");
		var loading=$("<img alt=\"加载中...\" title=\"图片加载中...\" src=\""+loadpic+"\" />");
		
		t.hide();
		t.after(loading);
		$(img).load(function(){
			autoScaling();
			loading.remove();
			t.attr("src",this.src);
			t.show();
			//alert("finally!")
		});
		
	});
}
/* e 图片预加载+自动等比例缩放 */
/////////////////////////////////////////////////////////////////////////////////////////
