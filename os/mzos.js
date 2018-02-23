window.mzos = {
	config:{}, //系统相关配置（桌面应用、菜单等）
	api:{}, //系统API
	version : '0.0.1', //版本号
	date:'2017-01-19',
	name:'MZUI桌面',
	author:{
		name: '木子的忧伤',
		email: '1099438829@qq.com',
		blog: 'http://blog.aoshiguchen.com',
		qq: '1099438829'
	}, //作者
	system : 'win10',//系统风格
	
	//获取系统资源文件的路径
	getSystemPath : function(){
		return '/os/' + this.system + '/';
	},
	//获取系统资源文件的绝对路径
	getAbsolutePathBySystemResource : function(path){
		return this.getSystemPath() + path;
	},
	apbsr : this.getAbsolutePathBySystemResource,
	
	//根据路径描述符,获取系统资源
	getPath : function(desc){
		if(!desc) return desc;

		if(desc.startsWith('System:')){
			return this.apbsr(desc.substr(7));
		}

		return desc;
	},
	
	//动态加载JS文件
	loadScript : function(url,callback){
		var el = document.createElement("script");
		el.type = "text/javascript";

		if(typeof(callback) != "undefined"){
			if (el.readyState) {
				el.onreadystatechange = function () {
					if (el.readyState == "loaded" || el.readyState == "complete") {
						el.onreadystatechange = null;
						callback();
					}
				};
			} else {
				el.onload = function () {
					callback();
				};
			}
		}

		el.src = url;
		document.head.appendChild(el);
	},
	
	//动态加载css样式
	loadStyle : function(url,callback){
		var el = document.createElement("link");
		el.rel = 'stylesheet';

		if(typeof(callback) != "undefined"){
			if (el.readyState) {
				script.onreadystatechange = function () {
					if (el.readyState == "loaded" || el.readyState == "complete") {
						el.onreadystatechange = null;
						callback();
					}
				};
			} else {
				el.onload = function () {
					callback();
				};
			}
		}

		el.href = url;
		document.head.appendChild(el);
	},

	setTile : function(title){
		var el = document.createElement("title");
		el.text = title;
		document.head.appendChild(el);
	},

	setIcon : function(icon){
		var el = document.createElement("link");
		el.rel = 'Shortcut Icon';
		el.type = 'image/con';
		el.href = icon;
		document.head.appendChild(el);
	},

	onReady : {
		win10 : function(){
			//设置壁纸
	        Win10.setBgUrl({
	            main:'os/win10/img/wallpapers/main.jpg',
	            mobile:'os/win10/img/wallpapers/mobile.jpg',
	        });

	        Win10.setAnimated([
	            'animated flip',
	            'animated bounceIn',
	        ], 0.01);

 			setTimeout(function () {
                Win10.newMsg('官方交流一群', '欢迎各位大侠加入讨论：<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=4Er0u8i">[点击加入]205546163</a>')
            }, 2500);

	        Win10._init();
		},	
		mac : function(){
			//设置壁纸
	        Win10.setBgUrl({
	            main:'os/mac/img/wallpapers/main.jpg',
	            mobile:'os/mac/img/wallpapers/mobile.jpg',
	        });

	        Win10.setAnimated([
	            'animated flip',
	            'animated bounceIn',
	        ], 0.01);

 			setTimeout(function () {
                Win10.newMsg('官方交流一群', '欢迎各位大侠加入讨论：<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=4Er0u8i">[点击加入]205546163</a>')
            }, 2500);

	        Win10._init();
		},	

	},


	//初始化
	init : function(){
		//设置标题
        this.setTile(this.name);
       
		if('win10' == this.system){
			this.loadStyle('os/win10/css/animate.css');
			this.loadStyle('lib/font-awesome-4.7.0/css/font-awesome.min.css');
			this.loadStyle('os/win10/css/default.css');
			 //设置图标
        	this.setIcon('os/win10/img/icon/favicon.ico');
        	//渲染图标渲染桌面
			this.loadScript('os/win10/js/desktop.js',function(){
				mzos.loadScript('os/win10/js/win10.js',function(){
					mzos.Win10 = Win10;  
					mzos.onReady.win10();
				});
			});
		}else if('mac' == this.system){
			this.loadStyle('os/mac/css/animate.css');
			this.loadStyle('lib/font-awesome-4.7.0/css/font-awesome.min.css');
			this.loadStyle('os/mac/css/default.css');
			 //设置图标
        	this.setIcon('os/mac/img/icon/favicon.ico');
        	//渲染图标渲染桌面
			this.loadScript('os/mac/js/desktop.js',function(){
				mzos.loadScript('os/mac/js/interface.js');
				mzos.loadScript('os/mac/js/mac.js',function(){
					mzos.Win10 = Win10;  
					mzos.onReady.mac();
				});
			});
		}
		
	},
};	

mzos.init();