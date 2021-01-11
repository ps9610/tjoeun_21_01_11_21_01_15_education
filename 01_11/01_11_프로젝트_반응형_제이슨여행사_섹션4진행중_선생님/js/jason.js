;(function($,window,document,undefined){


    var jason = {
        init:   function(){
            var that = this;

            that.heaerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.section4Fn();
            that.section5Fn();

        },
        heaerFn:function(){
            var that = null;
            var $window = $(window);            
            var $heaer = $('#header');
            var $scroll = false;
            var t = false;

                $heaer.on({                    
                    mouseenter:function(){
                        that = $(this);
                        that.addClass('addHeader'); 
                    },
                    mouseleave:function(){
                        that = $(this);
                        if( $scroll === false ){
                            that.removeClass('addHeader'); 
                        }
                    }
                });


                $window.scroll(function(){
                    that = $(this);
                    if( that.scrollTop() >= 30 ){
                        $scroll = true;  //스크롤 10px 이상인경우 true 변경
                        $heaer.addClass('addHeader');
                        if( t===false ){
                            t=true;
                            var headerH = $('#header').height();
                            $('html,body').stop().animate({scrollTop:$('#section2').offset().top-headerH},600,'easeInOutExpo');
                        }
                        
                    }
                    else{
                        t=false;
                        $scroll = false;  //스크롤 10px 이하인경우 false 변경
                        $heaer.removeClass('addHeader');
                    }
                });

        },
        section1Fn:function(){
            var cnt = 0;
            var n = $('#section1 .slide').length-2; //4
            var $slide = $('#section1 .slide');
            var $nextBtn = $('#section1 .next-btn');
            var $prevBtn = $('#section1 .prev-btn');
            var $slideWrap = $('#section1 .slide-wrap');
            var $pageBtn = $('#section1 .page-btn');
            var $smoothBtn = $('#section1 .smooth-btn');
            var setId = null;
            var setId2 = null;
            var $second = 5; //4초 간격
            var tCnt = 0; 

            
            
            /////////// slide ////////////////////////////////////////////////////////

            //메인 슬라이드 함수
            function mainSlideFn(){               
                $slideWrap.stop().animate({left:-(100*cnt)+'%'},600, function(){
                    if(cnt>n-1){cnt=0;} //n개인경우 = n-1
                    if(cnt<0){cnt=n-1;} 
                    $slideWrap.stop().animate({left:-(100*cnt)+'%'},0);
                });
                //페이지버튼 함수 호출(매개변수)
                pageBtnFn(cnt);
            }

            //페이지 버튼(인디세이터 버튼) 이벤트 함수
            function pageBtnFn(z){
                z==n?z=0:z;     //n(4)
                z==-1?z=n-1:z;  //3=n(4)-1
                $pageBtn.removeClass('addCurrent');
                $pageBtn.eq(z).addClass('addCurrent');
            }

            //다음 슬라이드 카운트 함수
            function nextCountFn(){
                cnt++;
                mainSlideFn();
            }

            //이전 슬라이드 카운트 함수
            function prevCountFn(){
                cnt--;
                mainSlideFn();
            }

            //자동 플레이
            function autoTimerFn(){
                setId = setInterval(nextCountFn,1000*$second);
            }

            //버튼 이벤트 발생시 타이머 콘트롤 함수
            function timerFn(){
                tCnt=0;
                clearInterval(setId2);
                setId2 = setInterval(function(){
                    tCnt++; //1초에 1씩증가 1 2 3 4 5
                    if(tCnt>$second){ //4초 후에
                        clearInterval(setId2);
                        nextCountFn();
                        autoTimerFn();
                    }
                },1000);
            }

            //페이지 버튼 이벤트
            $pageBtn.each(function(index){
                $(this).on({
                    click:function(event){
                        event.preventDefault();
                        clearInterval(setId);
                        timerFn();
                        cnt = index;
                        mainSlideFn();
                    }
                });
            });
                
            //다음 슬라이드 버튼 클릭 이벤트
            $nextBtn.on({
                click:  function(event){
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                   if(!$slideWrap.is(':animated')){
                        nextCountFn();
                   } 
                }
            });

            //이전 슬라이드 버튼 클릭 이벤트
            $prevBtn.on({
                click:  function(event){
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!$slideWrap.is(':animated')){                    
                        prevCountFn();
                    }
                }
            });

            //터치 스와이프 이벤트
            $('#section1').swipe({
                swipeLeft:  function(event){ //다음 슬라이드
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                   if(!$slideWrap.is(':animated')){
                        nextCountFn();
                   } 
                },
                swipeRight:  function(event){ //이전 슬라이드
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!$slideWrap.is(':animated')){                    
                        prevCountFn();
                    }
                }
            });



            setTimeout(autoTimerFn,10);


            /////////// smooth button ////////////////////////////////////////////////
            $smoothBtn.on({
                click:  function(e){
                    e.preventDefault();
                    var headerH = $('#header').height();
                    var url = $(this).attr('href');
                        $('html,body').stop().animate({ scrollTop:$( url ).offset().top-headerH },600,'easeInOutExpo');
                }
            });
                       

            /////////// resize ////////////////////////////////////////////////
            var winW = $(window).width();
            var winH = $(window).height();
                
                //여기서부터 식사하고 진행...
                function resizeFn(){
                    winW = $(window).width(); //리얼하게 너비
                    winH = $(window).height();//리얼하게 높이                    
                    $('#section1').css({ height:winH }); //리얼하게 적용
                    $('#section2').css({ marginTop:winH }); //리얼하게 적용
                    $slide.css({ width:winW });  //리얼하게 적요
                }
                setTimeout(resizeFn,10);

                $(window).resize(function(){
                    resizeFn();
                });




        },
        section2Fn:function(){

            var $win = $(window);
            var $gal = $('.gallery li');
            var $galW = $('.gallery li').width();
            var $galH =  $galW * 0.832468967;

                function resizeFn(){
                    $galW = $('.gallery li').width(); //칸 너비
                    $galH =  $galW * 0.832468967; //칸 높이 비율계산                  
                    $gal.css({height:$galH});
                }

                setTimeout(resizeFn,10);

                $win.resize(function(){
                    resizeFn();
                });


        },
        section3Fn:function(){

            //박스높이 slide View Box 너비가 1360이하이면 높이 자동 설정 높이 설정  
            var $window    = $(window);
            var $winW      = $(window).innerWidth();
            var $slideView = $('#section3 .slide-view');
            var $pageBtnW  = $('#section3 .pageBtn').innerWidth();
            var $pageWrap  = $('#section3 .page-wrap');
            var $slideBg   = $('#section3 .slide-bg-image');
            var $slideBgW  = $('#section3 .slide-bg-image').innerWidth();
               

                function resizeFn(){
                    $winW = $(window).innerWidth();
                    $pageBtnW  = $('#section3 .pageBtn').innerWidth();
                    $slideBgW  = $('#section3 .slide-bg-image').innerWidth();

                    if($winW<=1360){
                        $slideView.css({height:$winW*0.419117647}); //570 = 1360 * 0.419117647
                        $pageWrap.css({height:$pageBtnW});
                        $slideBg.css({height:$slideBgW });
                    }
                    else{
                        $slideView.css({height:570}); //570 = 1360 * 0.419117647
                    }                
                }   
                
                setTimeout(resizeFn,10);

                $window.resize(function(){
                    resizeFn();
                });



                //페이드 인아웃 반응형 슬라이드 웹개발
                var cnt      = 0;
                var setId    = null;
                var n        = $('#section3 .slide').length-1; //2 = 3-1 = index number(0 1 2)
                var $nextBtn = $('#section3 .nextBtn');
                var $prevBtn = $('#section3 .prevBtn');
                var $slide   = $('#section3 .slide');
                var $pageBtn = $('#section3 .pageBtn');
                var a = [1,2]; 


                //1.메인 슬라이드 페이드인아웃 함수 //////////
                //1-1메인 다음 슬라이드 함수
                function mainNextSlideFn(){
                    $slide.css({zIndex:1}); //초기화 모든 슬라이드 zIndex:1
                    $slide.eq(cnt==0?n:cnt-1).css({zIndex:2}); //현재 이전 슬라이드
                    $slide.eq(cnt).css({zIndex:3}).animate({opacity:0},0).animate({opacity:1},1000); //현재 슬라이드
                    pageBtnFn();                    
                }
                //1-2메인 이전 슬라이드 함수
                function mainPrevSlideFn(){
                    $slide.css({zIndex:1,opacity:1}); //초기화 모든 슬라이드 zIndex:1 opacity:1
                    $slide.eq(cnt).css({zIndex:2}); //현재 이전 슬라이드
                    $slide.eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:1},0).animate({opacity:0},1000); //현재 슬라이드                    
                    pageBtnFn();                    
                }


                //2. 카운트 함수 이벤트 //////////
                //2-1메인 다음 카운트 슬라이드 함수
                function nextCountFn(){
                    cnt++;
                    if(cnt>n){cnt=0}
                    mainNextSlideFn();
                }
                //2-2메인 이전 카운트 슬라이드 함수
                function prevCountFn(){
                    cnt--;
                    if(cnt<0){cnt=n}
                    mainPrevSlideFn();
                }
                



                //3. 버튼 클릭 이벤트 //////////
                //3-1 다음 화살 버튼 클릭 이벤트
                $nextBtn.on({
                    click:  function(e){
                        e.preventDefault();
                        nextCountFn();
                    }
                });                
                //3-2 이전 화살 버튼 클릭 이벤트
                $prevBtn.on({
                    click:  function(e){
                        e.preventDefault();
                        prevCountFn();
                    }
                });





                //4. 페이지 버튼(인디게이터 버튼) 이벤트 함수 //////////
                //스토리 보드 : 현재 슬라이드가
                //첫번째 슬라이드 이면 페이지 버튼 1 : [1] 두번째 슬라이드 이미지 s3Slide1.jpg
                //첫번째 슬라이드 이면 페이지 버튼 2 : [2] 세번째 슬라이드 이미지 s3Slide2.jpg

                //두번째 슬라이드 이면 페이지 버튼 1 : [0] 첫번째 슬라이드 이미지 s3Slide0.jpg 
                //두번째 슬라이드 이면 페이지 버튼 2 : [2] 세번째 슬라이드 이미지 s3Slide2.jpg

                //세번째 슬라이드 이면 페이지 버튼 1 : [0] 첫번째 슬라이드 이미지 s3Slide0.jpg 
                //세번째 슬라이드 이면 페이지 버튼 2 : [1] 두번째 슬라이드 이미지 s3Slide1.jpg
                function pageBtnFn(){

                    switch(cnt){
                        case 0:
                            //a[1,2]; //파일 번호 값 설정 설명하고, 배열값 넣지 않아서 실행 안됨.
                            a = [1,2]; //배열 값 설정 해 주세요
                            break;
                        case 1:
                            //a[0,2]; //파일 번호
                            a = [0,2]; //배열 값 설정 해 주세요
                            break;
                        case 2:
                            // a[0,1]; //파일 번호
                            a = [0,1]; //배열 값 설정 해 주세요
                    }  

                    // console.log(cnt);
                    // console.log(a);
                    // $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide'+ a[0] +'.jpg)'});
                    // $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide'+ a[1] +'.jpg)'});

                    for(var i=0;i<a.length;i++){
                        $pageBtn.eq(i).css({backgroundImage:'url(./img/s3Slide'+ a[i] +'.jpg)'});
                    }

                }
                /*
                function pageBtnFn(){

                    switch(cnt){
                        case 0:
                            //case 0 첫번째 슬라이드인 경우
                            //Array arr a
                            $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide1.jpg)'});  
                            $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide2.jpg)'});
                            break;
                        case 1:
                            //case 1 두번째 슬라이드인 경우
                            $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide0.jpg)'});  
                            $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide2.jpg)'});
                            break;
                        case 2:
                            //case 3 세번째 슬라이드인 경우
                            $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide0.jpg)'});  
                            $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide1.jpg)'});                         
                    }    

                }
                */
                //5. 페이지 버튼(인디게이터 버튼) 클릭 이벤트 //////////
                $pageBtn.each(function(idx){
                    $(this).on({
                        click:  function(e){
                            e.preventDefault();
                            //바뀌기 이전 상태
                            //console.log('현재 슬라이드 번호',cnt); //현재 실행중인 슬라이드 번호
                            //console.log('클릭한 슬라이드 번호',a[idx]); //클릭한 슬라이드 번호

                            var imsi = cnt;  //현재 실행 중인 번호를 임시에 보관 그리고
                                cnt  = a[idx]; //a[1,2]배열 값(인수) 클릭한 인수에 해당된 배열값 a[1]=2

                                if(imsi < a[idx]){ //클릭한 번호가 더 크면 다음 슬라이드
                                    mainNextSlideFn(); //함수 실행 범위(스코프 scope)에 변수 cnt 가 할당
                                } 
                                else if(imsi > a[idx]){ //클릭한 번호가 더 작으면 이전 슬라이드
                                    mainPrevSlideFn();
                                }   
  
                                //결과 후 변수 값들                                    
                                //console.log('현재 슬라이드 번호',cnt); //현재 실행중인 슬라이드 번호
                                //console.log('클릭한 슬라이드 번호',a); //슬라이드 페이지 버튼의 배열 모두 출력

                        }
                    });    
                });
        },
        section4Fn:function(){

        },
        section5Fn:function(){

        }
    };

    jason.init();


})(jQuery,window,document);