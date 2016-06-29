$(function(){
	
	
	/*找元素*/
	var con = $('#content');
	
	
	
	var head_wrap = $('.head_wrap');//获取到head_wrap
	var headH = $('#head').height();//获取到head的高度
	var head_wrapT = head_wrap.offset().top;//获取到head_wrap的top值
	
	var nav = head_wrap.find('.nav');//找到nav
	var loImg = head_wrap.find('.logo').find('img');//找到head_wrap下logo下的img
	var menu = head_wrap.find('.menu');//找到head_wrap下的menu
	var menuEm = menu.find('em');
	
	var con_two = $('.con_two');//找到第二页
	var con_wrap = con_two.find('.con_wrap');
	var l = $('.l');
	var r = $('.r');
	var lImg_box = $('lImg_box');
	var rside_1 = $('.rside_1');
	var rside_2 = $('.rside_2');
	
	////生成第三页数据
	var cases_banner_list = $('.cases_banner_list');	
	var casesHtml = '';
	$.each(cacssData,function(i,elem){
	casesHtml += '<li>'+
					'<a href="javascript:;"><div class="imgWrap">'+
						'<img src="'+elem.src+'" alt="" />'+
						'</div>'+
						'<p class="li_text" style="background:'+elem.textBg+';">'+
							'<span>'+elem.text+'</span>'+
						'</p>'+
						'<h4 class="lit">'+
							'<div>'+
								'<img src="'+elem.litSrc+'"/>'+
							'</div>'+
						'</h4>'+
					'</a>'+
				'</li>';
	});
	cases_banner_list.html(casesHtml);
	
	//生成第五页数据
	var silde= $('.silde');
	var sildeHtml = '';
	for( var attr in clientData ){
		var arr = clientData[attr]
		sildeHtml += '<ul class="'+attr+' pa">';
			$.each(arr,function(i,elem){
				sildeHtml += '<li class="artic'+(i+1)+'">'+
								'<em class="hs1" style="background:url('+elem.has1+') no-repeat center;"></em>'+
								'<em class="hs2" style="background:url('+elem.has2+') no-repeat center;"></em>'+
							'</li>';
			})
		
		sildeHtml += '</ul>';
		
	}
	silde.html(sildeHtml);

	
	
//	$(window).on('resize',size);
	
	/* 上下翻页 */
	size();
	function size(){
		
		//获取可视区的高度	
		var H = $(window).height();
		$('.height').css('height',H);//设置每一页的高度
		
		var num = 0;//控制翻页的变量
		var show = 0;//控制第一页幻灯片的变量
		var onoff = true;//控制整个屏幕切换的变量
		var headNum = false;	
		
		roll(document,function(down){
			if( down ){//向上
				if( onoff ){//判断一次只能滚一张
					num--;
					
					if( num<=0 ){
						num = 0;
					};
					
					onoff = false;
					
					topScroll();
					
				};
				
				
			}else{//向下
				if( onoff ){//判断一次只能滚一张
					num++;
					if( num>=$('.con').size()-1 ){
						num = $('.con').size()-1
					};
					if( num != 0 ){
						headNum = true;
					}
					onoff = false;
					btmScroll();
				};
				
			};
			
			
			
			
		});
		
		//封装滚轮触发的函数
		function btmScroll(){
			
			if( num ==1 ){
				setTimeout(function(){//让控制翻页的变量变为真
					onoff = true;
				},1500);
				
				setTimeout(twoShow,1300);
				
				HeadAnimate();
				tabNewTopL();
				fnLogo1();
				
				fnNewBomHide();
			};
			if( num == 2 ){
				twoHide();
				
				setTimeout(function(){
					tabNewTopR();
					fnLogo2();
				},500);
				fnNewBomShow();
				
				
			};
			if( num == 3 ){
				tabNewTopL();
				
				setTimeout(function(){
					fnNewBomHide();
					fourBannerShow();
				},1000);
				setTimeout(function(){
					casesImgR();
					fnLogo1();
				},500);
				
				
			};
			if( num == 4 ){
//						alert(4)
				setTimeout(function(){
					fourBannerHide();
					casesImgL();
					fnAbout();
				},1000);
				
			};
			if( num == 5 ){
				setTimeout(function(){
					fnAboutNone();
					fnFive();
					fnFiveBlock();
				},500);
				
			}
			
			if( num == 6 ){
				setTimeout(function(){
					fnFiveNone();
					fnFiveHide();
					fnLogo2();
				},500);
			}
			console.log(num)
			mTweenFn();
			fnBtnBg();
		};
		
		function topScroll(){
			
			if( num == 0 ){//第一页轮播图向上滚动切换
				
				fnServices();
				twoHide();
				if( headNum ){
					headNum = false;
					HeadAnimate();
				};
				
			};
			
			if( num == 1 ){
				setTimeout(function(){//让控制翻页的变量变为真
					onoff = true;
				},1500);
				
				setTimeout(fnLogo1,500);
				
				setTimeout(function(){
					twoShow();
				},1000);
				tabNewTopL();
				
				setTimeout(function(){
					fnNewBomHide();
				},1000);
			}
			if( num == 2 ){
				tabNewTopR();
				fnNewBomShow();
				setTimeout(function(){
					fourBannerHide();
					casesImgL();
					fnLogo2();
				},500);
			}
			if( num == 3 ){
				setTimeout(function(){
					fourBannerShow();
					fnAboutNone();
				},1000);
				
				
				setTimeout(function(){
					casesImgR();
				},500);
				
			}
			if( num == 4 ){
				setTimeout(function(){
					fnAbout();
					fnFiveNone();
					fnFiveHide();
				},500);
				
			}
			if( num == 5 ){
				setTimeout(function(){
					fnFive();
					fnFiveBlock();
					fnLogo1();
				},500);
			}
			
			console.log(num)
			mTweenFn();
			fnBtnBg();
		}
		
		
		
//		alert(con_two.offset().top)
		//head_wrap的动画
		var logoSpan = $('.logo').find('span');
		logoSpan.eq(1).css({
			'opacity':0,
			'zIndex':0
		});
		logoSpan.eq(0).css({
			'opacity':1,
			'zIndex':1
		});
		function HeadAnimate(){
			var timer = 0;
			head_wrap.animate({
				'top':-headH
			},200);
			
			timer = setInterval(function(){
//				console.log(con_two.offset().top,-headH)
				if( num == 1 ){
					if( con_two.offset().top == 0 ){
						
//						loImg.eq(0).addClass('hide').siblings().removeClass('hide');
						logoSpan.eq(0).css('opacity',0);
						logoSpan.eq(1).css('opacity',1);
						menu.removeClass('hide');
						menuEm.removeClass().addClass('black');
						nav.addClass('hide');
						
						clearInterval(timer);
						head_wrap.animate({
							'top':0
						},200);
						
					};
				};
				if( num == 0 ){
					if( con.offset().top == 0){
						
						logoSpan.eq(0).css('opacity',1);
						logoSpan.eq(1).css('opacity',0);
						menu.addClass('hide');
						nav.removeClass('hide');
							
						clearInterval(timer);
						head_wrap.animate({
							'top':0
						},200);
					}
					
				}
			},30);
		};
		//logo切换图片
		function fnLogo1(){//logo黑色显示
			
			logoSpan.eq(0).animate({
				'opacity':0,
				'zIndex':0
			});
			logoSpan.eq(1).animate({
				'opacity':1,
				'zIndex':1
			});
			
			menuEm.removeClass('white').addClass('black');
		}
		function fnLogo2(){//logo白色显示
			logoSpan.eq(1).animate({
				'opacity':0,
				'zIndex':0
			});
			logoSpan.eq(0).animate({
				'opacity':1,
				'zIndex':1
			});
			menuEm.removeClass('black').addClass('white');
		}
		
		
		
		
		
		//第一页的幻灯片
		//初始化
		var imgLi = $('.img').find('li');
		
		//第一页幻灯片动画
		imgLi.eq(show).css("zIndex",1);
		imgLi.eq(show).css("opacity",1);
		imgLi.eq(show).siblings('li').css("zIndex",0);
		imgLi.eq(show).siblings('li').css("opacity",0);
		function fnServices(){
			show++;
			show%=imgLi.size();
			var imgLiChildren = imgLi[show].children;
			imgLi.eq(show).css("zIndex",1);
			imgLi.eq(show).siblings('li').css("zIndex",0);
			
			imgLi.each(function(i,elem){
				$(elem).stop().animate({
					'opacity':0.4
				},{
					'duration':700,
					'easing':'linear',
					'complete':function(){
						imgLi.eq(show).siblings().css('opacity',0)
						imgLi.eq(show).stop().animate({
							'opacity':1
						});
					}
				});
			
				$(elem).find('.img1').stop().animate({
					'top':60,
					'opacity':0
				},{
					'duration':700,
					'easing':'linear',
					'complete':function(){
						imgLi.eq(show).find('.img1').stop().animate({
							'top':0,
							'opacity':1
						});
					}
				});
				$(elem).find('.text').stop().animate({
					'top':-60,
					'opacity':0
				},{
					'duration':700,
					'easing':'linear',
					'complete':function(){
						imgLi.eq(show).find('.text').stop().animate({
							'top':0,
							'opacity':1
						});
					}
				});
				
			});
		}
		
		
		//显示和隐藏第二张图
		function twoShow(){
			con_wrap.css('transform','scale(1)');
			con_wrap.css('opacity','1');
		};
		//显示和隐藏第二张图
		function twoHide(){
			con_wrap.css('transform','scale(1.3)');
			con_wrap.css('opacity','0');
		};
		
		
		
		
		//上下翻页的函数
		function mTweenFn(){
			mTween({
				"element":con[0],
				"type":"easeBothStrong",
				"time":1000,
				"target":{
					"top":num*-H
				},
				"callBack":function(){
					if( num == 1 ){
						onoff = false;	
					}else{
						onoff = true;	
					};
					
				}
			});
			
		};
		
		//第三页开始
		$('.new_top').css('position','relative');
		$('.new_top').css('left',-100);
		$('.new_top').css('opacity',.3);
		tabNewTopL();
		//文字向左移动
		function tabNewTopL(){
			$('.new_top').stop().animate({
				'left':-100,
				'opacity':.3
			},1000);
		}
		//文字向右移动
		function tabNewTopR(){
			$('.new_top').stop().animate({
				'left':0,
				'opacity':1
			},1000);
		}
		
		
		fnNewBomHide();
		function fnNewBomHide(){
			$('.new_bom').find('li').css('position','relative');
			$('.new_bom').find('li').css('top',200);
			$('.new_bom').find('li').css('left',200);
			$('.new_bom').find('li').css('opacity',0);
		};
		function fnNewBomShow(){
			var timer = 0;
			var now = 0;
			timer = setInterval(function(){
				$('.new_bom').find('li').eq(now).animate({
					'left':0,
					'top':0,
					'opacity':1
				});
				now++;
				if( now == $('.new_bom').find('li').size() ){
					clearInterval(timer);
				}
			},200);
			
		};
		
		
		//第四页开始
		fourBannerHide();
		function fourBannerHide(){
			$('.cases_banner_list').find('li').css('transform','rotateY(90deg)');
		}
		function fourBannerShow(){
			var deg = 90;
			var timer = 0;
			timer = setInterval(function(){
				deg-=5;
				$('.cases_banner_list').find('li').css('transform','rotateY('+deg+'deg)');
				if( deg == 0 ){
					clearInterval(timer);
				}
			},30);
			
		};
		
		//case移动
		$('.cases_img1').css('position','relative');
		
		casesImgL();
		function casesImgL(){
			$('.cases_img1').css('left',-100);
		};
		function casesImgR(){
			$('.cases_img1').animate({
				'left':0
			},700);
		};
		//第三页无缝切换
		fourBanner();
		function fourBanner(){
			var cases_b = $('.cases_banner_list');
			cases_b.css('position','relative');
			cases_b.html(cases_b.html()+cases_b.html());
			cases_b.css('width',cases_b.find('li').size()*100+'%');
			var casesW = cases_b.width();
			
			var lisW = cases_b.find('li').eq(0).width()+cases_b.find('li').eq(0).css('marginLeft').split('px')[0]*2;
			var next = 0;
			
			
			$('.banner_btn_r').on('click',function(){
				if( next>=cases_b.find('li').size()/2 ){
					next = 0;
					cases_b.css('left',0);
				};
				next++;
				tabBanner();
			});
			$('.banner_btn_l').on('click',function(){
				if( next<=0 ){
					next = cases_b.find('li').size()/2;
					cases_b.css('left',-lisW*next);
				};
				next--;
				tabBanner();
			});
				
			function tabBanner(){
				cases_b.stop().animate({
					'left':-lisW*next
				});
				
			}
			
		};
		
		
		//第四页
		var about_img1 = $('.about_img1');
		
		var about_img2 = $('.about_img2');
		
		var about_img3 = $('.about_img3');
		
		var about_textLis = $('.about_text').find('li');
		
		//初始化
		var timer = 0;
		fnAboutNone();
		function fnAboutNone(){
			clearInterval(timer);
			about_textLis.stop().animate();
			
			about_img1.css('position','relative');
			about_img1.css('left',-100);
			about_img1.css('opacity',0);
			
			
			about_img2.css('transform','scale(0)');
			about_img2.css('opacity',0);
			
			
			about_img3.css('position','relative');
			about_img3.css('left',100);
			about_img3.css('opacity',0);
			
			
			about_textLis.css('position','relative');
			about_textLis.css('opacity',0);
			about_textLis.css('top',100);
		};
		
		//显示动画的函数
		function fnAbout(){
			
			var now = 0;
			about_img1.animate({
				'left':0,
				'opacity':1
			});
			about_img3.animate({
				'left':0,
				'opacity':1
			});
			about_img2.css('transform','scale(1)').css('opacity',1);
			
			timer = setInterval(function(){
				about_textLis.eq(now).animate({
					'opacity':1,
					'top':0
				});
				now++;
				if( now == about_textLis.size() ){
					clearInterval(timer);
				}
				
			},200);
			
		};
		
		
		//第五页
		var client_num = $('.client_num');
		client_num.find('em').css('position','relative');
		fnFiveNone();
		function fnFiveNone(){
			client_num.find('.num3').stop().animate();
			client_num.find('.num2').stop().animate();
			client_num.find('.num1').stop().animate();
			$('.client_wen').css('transform','scale(0)');
			$('.client_most').css('transform','scale(0)');
			$('.client_num').find('em').css('top',0);
		};
		function fnFive(){
			$('.client_wen').css('transform','scale(1)');
			$('.client_most').css('transform','scale(1)');
			client_num.find('.num3').animate({
				'top': -2166
			},1500);
			client_num.find('.num2').animate({
				'top': -2166
			},2000);
			client_num.find('.num1').animate({
				'top': -1445
			},3000);
			
		};
		
		
		
		//第五页轮播图
		var silde = $('.silde');
		$('.silde1').css('zIndex',1);
		$('.silde2').css('opacity',0);
		
		fnFiveHide();
		function fnFiveHide(){
			$('.client_bom').css({
				'position':'relative',
				'top':150,
				'opacity':0
			});
		}
		
		function fnFiveBlock(){
			$('.client_bom').animate({
				'top':0,
				'opacity':1
			},800);
		}
		
		var silde_btn = $('.silde_btn');
		silde_btn.find('a').eq(0).on('click',function(){
			fnFiveBanner(this);
		});
		silde_btn.find('a').eq(1).on('click',function(){
			fnFiveBanner(this);
		});
		
		function fnFiveBanner(_this){
			silde.find('ul').eq($(_this).index()).animate({
				"opacity":1,
				"zIndex":1
			});
			silde.find('ul').eq($(_this).index()).siblings('ul').animate({
				"opacity":0,
				"zIndex":0
			});
			console.log(_this)
			$(_this).addClass('active').siblings().removeClass('active');
		};
		
		//第七页效果
		function fnSeven(){
			
		}
		
		//第二页切换效果
		twoBanner();
		function twoBanner(){
			var rside_1 = $('.rside_1');
			var rside_2 = $('.rside_2');
			var zIndex = 2;
			var next = 0;
			
			rside_1.find('dl').eq(next).siblings().find('h2').css('left',100);
			rside_1.find('dl').eq(next).siblings().find('p').css('left',-100);
			rside_2.find('li').eq(next).siblings().find('p').css('transform','scale(1.3)');
			rside_2.find('li').eq(next).siblings().css('opacity',0);
			
			$('.r').on('click',function(){
				next++;
				next%=rside_1.children().size();
				bannerTab();
			});
			$('.l').on('click',function(){
				next--;
				if( next<0 ){
					next=rside_1.children().size()-1;
				};
				bannerTab();
			});
			
			function bannerTab(){
				rside_1.find('dl').eq(next).css('zIndex',zIndex++);
				rside_2.find('ul').find('li').eq(next).css('zIndex',zIndex++);
				//第二页左边透明度切换 
				rside_1.find('dl').eq(next).stop().animate({
					'opacity':1
				},1000);
				rside_1.find('dl').eq(next).siblings().stop().animate({
					'opacity':0
				},1000,function(){
					rside_1.find('dl').eq(next).siblings().find('h2').css('left',100);
					rside_1.find('dl').eq(next).siblings().find('p').css('left',-100);
				});
				
				//第二页左边上面的图标上下移动
				rside_1.find('dt').eq(next).stop().animate({
					'top':0
				},1000);
				rside_1.find('dl').eq(next).siblings().find('dt').stop().animate({
					'top':-50
				},1000);
				
				//第二页中间文字移动
				rside_1.find('dl').eq(next).find('h2').stop().animate({
					'left':0
				},1000);
				
				//第二页下面文字移动
				rside_1.find('dl').eq(next).find('p').stop().animate({
					'left':0
				},1000);
				
				//第二页右边透明度切换
				rside_2.find('ul').find('li').eq(next).stop().animate({
					'opacity':1
				},1000);
				rside_2.find('ul').find('li').eq(next).siblings().stop().animate({
					'opacity':0
				},1000,function(){
					
				});
				
				//第二页右边文字的动画
				rside_2.find('li').eq(next).siblings().find('p').css('transform','scale(1.3)');
				rside_2.find('li').eq(next).find('p').css('transform','scale(1)');
				
				//左边数字的动画
				var lsideH = $('.lside ').height();
				var lImg_box = $('.lImg_box');
				lImg_box.stop().animate({
					'top':-lsideH*next
				},1000);
			};
			
		};		
	
		
		//左侧按钮
		var sidebar_l = $('.sidebar_l');
		sidebar_l.find('li').eq(0).css({
			'background':'#fa9',
			'transform':'scale(1.5)'
		});
		function fnBtnBg(){
			if( num == 0 || num == 2 || num == 6 ){
				sidebar_l.find('li').css('background','#fff');
			}else{
				sidebar_l.find('li').css('background','#999');
			};
			sidebar_l.find('li').eq(num).css({
				'background':'#fa9',
				'transform':'scale(1.5)'
			});
			sidebar_l.find('li').eq(num).siblings().css({
				'transform':'scale(1)'
			});
			
		}
		sidebar_l.find('li').on('click',function(){
			num = $(this).index();
			headNum = true;
			
			topScroll();
			btmScroll();
			
			
			
				
			
		});
		
	
	};
	
});
//上下滚轮滚动函数
function roll(obj,fn){
	if( window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1 ){
		obj.addEventListener('DOMMouseScroll',tb,false);
	}else{
		obj.addEventListener('mousewheel',tb,false);
	};
	
	function tb(ev){
		var down = true;
		if( ev.wheelDelta ){
			down = ev.wheelDelta>0?true:false;
		}else if( ev.detail ){
			down = ev.detail<0?true:false;
		};
		
		typeof fn == 'function' && fn(down);
		ev.preventDefault();
	};
};


