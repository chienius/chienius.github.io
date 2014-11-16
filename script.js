
$(document).ready(function(){
	item_counter = 0;
	$('div#works .item').each(function(){
		item_counter++
	});
	$('div#works .item_container').css('width', 300*item_counter);


	//ScrollSpy
	//Spy 1 - Contact Area
	var spy1 = 0;
	//Spy2 - AB_Bar Area
	var spy2 = 0;
	//Spy3 - About Area
	var spy3 = 0;
	//Spy4 - Works Area
	var spy4 = 0;
	//Spy5 - Top Area
	var spy5 = 0; 
	$(window).scroll(function(){
		o = $(this).scrollTop()+$(this).height(); //Current position
		ot = $(this).scrollTop(); //Current position - TOP
		//Spy1
		offset1 = $("#contact").offset().top + 150;
		if(o>=offset1 && !spy1){
			spy1 = 1
			//Change Nav style
			$('nav').animate({width: 0}, 500, function(){
				$('nav').addClass('bottom').animate({width: '100%'}, 500);
				$('#works').addClass('reverse');
				$('nav li:eq(2) a').addClass('active');
			});
		}else if(o<offset1 && spy1){
			spy1 = 0
			$('nav').animate({width: 0}, 500, function(){
				$('#works').removeClass('reverse');
				$('nav').removeClass('bottom').animate({width: '100%'}, 500);
				$('nav li:eq(2) a').removeClass('active');
			});
		}

		//Spy2
		offset2 = $("div.ability").offset().top + 200;
		if(o>=offset2 && !spy2){
			spy2=1;
			//Start Animation
			$('.ab_box').each(function(){
				percentage=$(this).find('span').text();
				percentage=parseInt(percentage, 10);
				h=$(this).find('.ab_bar_ctn').height()*percentage/100;
				$(this).find('.ab_bar').stop().animate({height: h}, 1000);
			})
		}else if(o<offset2 && spy2){
			spy2 = 0
			$('.ab_box').each(function(){
				$(this).find('.ab_bar').stop().animate({height: 0}, 1000);
			})
		}

		//Spy3
		offset3 = $("#about").offset().top - 200;
		offset3Max = offset3 + $("#about").height();
		if(ot>=offset3 && ot<=offset3Max && !spy3){
			spy3 = 1;
			$('nav li:eq(0) a').addClass("active");
		}else if(( ot < offset3 || ot > offset3Max )&& spy3){
			spy3 = 0;
			$('nav li:eq(0) a').removeClass("active");
		}
		
		//Spy4
		offset4 = $("#works").offset().top - 200;
		offset4Max = $("#contact").offset().top + 150;
		if( (ot>=offset4 && o<=offset4Max) && !spy4){
			spy4 = 1;
			$('nav li:eq(1) a').addClass("active");
			$('#works .item_container').stop().animate({marginTop: 0}, 1000);
		}else if( (ot < offset4 || o > offset4Max) && spy4){
			spy4 = 0;
			$('nav li:eq(1) a').removeClass("active");
			$('#works .item_container').stop().animate({marginTop: "100%"}, 1000);
		}

		//Spy5
		offset5 = 0;
		offset5Max = $("#top").height() - 200;
		if( ot>=offset5 && ot <=offset5Max && !spy5 ){
			spy5 = 1;
			$('nav').addClass('top');
		}else if(ot > offset5Max && spy5){
			spy5 = 0;
			$('nav').removeClass('top');
		}
	})
	$('html').trigger('scroll');

	//Navbar Link
	$('nav a').click(function(){
		page = $(this).text();
		console.log( page + " clicked");
		switch(page){
			case "关于":
				$('html, body').animate({scrollTop: $("#about").offset().top}, 500);
				break;
			case "作品":
				$('html, body').animate({scrollTop: $("#works").offset().top}, 500);
				break;
			case "联系":
				$('html, body').animate({scrollTop: $("#contact").offset().top}, 500);
				break;
		}
		$("html").trigger("focus");
		return false;
	})

	//Work page switcher
	$('div#works .item').click(function(){
		var wid = $(this).attr('data-workid');
		$('div#works .page[data-workid=' + wid + ']').fadeIn().find("h1, h3, dd").animate({right: "50"});
		$('div#works .page[data-workid=' + wid + ']').find("img").animate({left: "10%"}, 1000);
	})

	function bgWaveScroll() {
		$('div.bgoverlay_ctn').animate({scrollLeft: "+=500px"}, 3000, "linear", function(){
			bgWaveScroll();
		});
	}
	bgWaveScroll();
})

