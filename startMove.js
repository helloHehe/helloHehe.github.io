// JavaScript Document
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
//callBack 回调函数，动画结束之后，执行的函数
/*
	init:{
		element: 要运动的元素,
		time: 动画持续时间,
		target: {"styleName": 目标点[,"styleName2": 目标点 ]...}, 
		type: 运动形式
		[,callBack:回调函数]
	}
	
	
	mTween(init);
*/
function mTween(init)
{
	var obj = init["element"] ;
	var type = init["type"] ;
	var time = init["time"] ;
	var target = init["target"] ;
	var callBack = init["callBack"] ;
	var t = 0;
	var b = {};
	var c = {};
	var d = time / 20;
	for(var s in target){
		b[s] = css(obj,s);
		c[s] = target[s] - b[s];
	}
	 clearInterval(obj.timer);
	 obj.timer = setInterval(
	 	function (){
			t++;
			for(var s in b){
				var nub = Tween[type](t,b[s],c[s],d);
				if(s == "opacity"){
					obj.style[s] = nub/100;
					obj.style.filter ="alpha(opacity="+ nub +")";
				} else {
					obj.style[s] = nub + "px";
				}
			}
			if(t >= d){
				clearInterval(obj.timer);
				callBack&&callBack();
			}
		},
		20
	 );
}
function css(obj,attr){
	var nub = 0;
	if(obj.currentStyle){
		nub = parseFloat(obj.currentStyle[attr]);
	} else { 
		nub = parseFloat(getComputedStyle(obj)[attr]);
	}
	if(attr == "opacity"){
		return Math.round(nub*100);
	}
	return nub;
}

/*
	$(name,parent)
	用法：例如$('.div',$(#list));
*/
/*function $(Name,parent){//第一个参数为要传入的class名称，[第二个参数为父级]
	parent = parent || document;//判断第二个参数手存在，若存在就在同过参数来找，若不存在就通过document来找
	var aName = Name.charAt(0);//找到传进来的class的第0 位
	var isName = Name.substring(1);//将传进来的class第一位截取掉
	var aEle = parent.getElementsByTagName('*');
	var arr = [];
	//console.log(aEle.TagName)
	if( aName === '#' ){//判断截取出来的第一位是不是#    
		return document.getElementById(isName);//返回id的方法	
	}
	if( aName === '.' ){//判断截取出来的第一位的是不是'.'
		if( parent.getElementsByClassName ){//判断IE第版本认不认识这个方法，低版本不认识返回的是undefiend
			return parent.getElementsByClassName(isName);//返回标准浏览器下的找class方法
		}else{
			for( var i=0;i<aEle.length;i++ ){//循环所有class
				var aClass = aEle[i].className.split(' ');//将元素的class用  空格 分隔符分隔开
				for( var j=0;j<aClass.length;j++ ){//循环分隔开的class的数组
					if( aClass[j] == isName ){//判断数组的每一项如果和传入的class相等，那么就将该class所在的元素放入数组内
						arr.push(aEle[i]);
					}
				}
			}
			return arr;
		}
	}
	return parent.getElementsByTagName(Name);//若上面的都没有就返回寻找标签的方法
}*/
/*
	判断鼠标滚轮滚动方向，向上为true向下为false
	
	addWheel(document,function(down){//第二个参数必须为函数
		down的值为true或者false
	});
	
*/
/*function addWheel(obj,fn){
	if( window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1 ){//判断浏览器版本是不是火狐
		obj.addEventListener('DOMMouseScroll',fnEv);//火狐
	}else{
		obj.addEventListener('mousewheel',fnEv);//不是火狐
	}
	function fnEv(ev){
		var down = true;
		if( ev.wheelDelta ){//判断有没有wheelDelta方法
			down = ev.wheelDelta>0?true:false;//谷歌下有这个方法，要是正数，说明向上滚动，返回true
		}else{
			down = ev.detail<0?true:false;//火狐有这个方法如果向下滚动，那么值就为负数，返回的是true
		}
		typeof fn == 'function' && fn(down);//查看传入参数的类型是不是个函数，并且调用函数将down的值传入  down的值可能是true可能是false
		ev.preventDefault();
	}
}
*/
