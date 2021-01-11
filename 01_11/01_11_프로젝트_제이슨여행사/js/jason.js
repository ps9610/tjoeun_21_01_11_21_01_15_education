;(function($,window,document,undefined){
    var jason = {
        init : function(){
            var that = this;
                that.headerFn();
                that.section1Fn();
                that.section2Fn();
                that.section3Fn();
                that.section4Fn();
                that.section5Fn();
                that.footerFn();
        },
        headerFn   : function(){
            var $this = null;
            var $header = $("#header");
            var $headerH = $header.innerHeight();
            var $window = $(window);
            var $scroll = false; //스크롤 여부를 알려주는 변수
            var $htmlBody = $("html, body");
            var $section2 = $("#section2");
            var t = false;

            //마우스 오버시 헤더스타일 바뀌기
            $header.on({
                mouseenter : function(){
                    $this = $(this);
                    $this.addClass("addHeader");
                },
                mouseleave : function(){
                    $this = $(this);
                    if( $scroll === false ){ //스크롤 논리값이 false일때만 removeClass하고 아니라면 마우스리브를 해도 절대 removeClass하지 말아라
                        $this.removeClass("addHeader");
                    }
                }
            });

            //휠마우스이벤트
            $window.scroll(function(){
                $this = $(this);
                if( $this.scrollTop() >= 30 ){
                    $scroll = true; //스크롤 30px 이상인 경우 true로 변경하라
                    $header.addClass("addHeader");
                    if( t === false ){
                        t = true;
                        $htmlBody.stop().animate({ scrollTop : $section2.offset().top-$headerH },600,"easeInOutExpo"); // 토글변수를 쓰지 않으면 계속 섹션2에 머물러야함
                    }
                }
                else{
                    t = false;
                    $scroll = false; //스크롤 30px 이하인 경우 true로 변경하라
                    $header.removeClass("addHeader"); 
                }
            });

        },
        section1Fn : function(){
            var cnt = 0;
            var cnt2 = 0;
            var setId = 0;
            var setId2 = 0;
            var n = $("#section1 .slide").length-2;
            var $nextBtn = $("#section1 .next-btn");
            var $prevBtn = $("#section1 .prev-btn");
            var $slideWrap = $("#section1 .slide-wrap");
            var $pageBtn = $("#section1 .page-btn");
            var $s = 4;
            var $slideContainer = $("#section1 .slide-container");
            var $smoothBtn = $(".smooth-btn");
            var $htmlBody = $("html, body");
            var $headerH = $("#header").innerHeight();
            var $window = $(window);
            var $winW = $window.innerWidth();
            var $winH = $window.innerHeight();
            var $section1 = $("#section1");
            var $section2 = $("#section2");
            var $slide = $("#section1 .slide");

            /////////////////////////슬라이드/////////////////////////

            // 메인슬라이드 자동화
            setTimeout(autoTimerFn, 100);

            function autoTimerFn(){
                setId = setInterval(nextCountFn,1000*$s);
            };

            //메인슬라이드
            function mainSlideFn(){
                $slideWrap.stop().animate({ left: -(100*cnt) +"%" },600,function(){
                    if(cnt>n-1)cnt=0;
                    if(cnt<0)cnt=n-1;
                    $slideWrap.stop().animate({ left: -(100*cnt) +"%" },0)
                });
                //페이지버튼 함수
                pageBtnFn(cnt);
            };

            //다음슬라이드
            function nextCountFn(){
                cnt++;
                mainSlideFn();
            };

            //이전슬라이드
            function prevCountFn(){
                cnt--;
                mainSlideFn();
            };

            //페이지버튼 색채우기
            function pageBtnFn(z){ //삼항연산자는 항상 위쪽에 써야 적용됨!
                z==n? z=0 : z; //슬라이드 갯수랑 z랑 같음
                z==-1? z=n-1 : z;
                //console.log(z);
                $pageBtn.removeClass("addCurrent");
                $pageBtn.eq(z).addClass("addCurrent");
            };

            //claerInterval 후 다시 재생함수
            function timerFn(){
                cnt2 = 0; //얘가 cnt랑 같이 증가하고 있는 상태이기 때문에 반드시 초기화를 시켜주어야 함@@@@@@@ 
                clearInterval(setId2);//얘도 초기화시켜준것

                setId2 = setInterval(function(){
                    cnt2++;
                    console.log(cnt2);
                    if(cnt2>$s){
                        clearInterval(setId2);
                        nextCountFn();
                        autoTimerFn();
                    }
                },1000);
                }

            //페이지버튼 클릭이벤트
            $pageBtn.each(function(index){
                var $this = $(this);
                $this.on({
                    click : function(e){
                        e.preventDefault();
                        clearInterval(setId);//타이머를 멈추려면 clearInterval 후 timer함수 불러옴
                        timerFn();
                        cnt = index; // 메인함수의 cnt를 호출하는데 cnt 값을 index가 받는다.
                        mainSlideFn();
                    }
                })
            })

            //next button 클릭 이벤트
            $nextBtn.on({
               click : function(e){
                   e.preventDefault();
                   clearInterval(setId);
                   timerFn();
                   if( !$slideWrap.is(":animated") ){
                       nextCountFn();
                   }
               } 
            });

            //prevent button 클릭 이벤트
            $prevBtn.on({
                click : function(e){
                    e.preventDefault();
                    timerFn()
                    clearInterval(setId);
                    if( !$slideWrap.is(":animated") ){
                        prevCountFn();
                    }
                } 
             });

             //터치 스와이프
             $slideContainer.swipe({
                swipeLeft : function(e){
                    e.preventDefault();
                   clearInterval(setId);
                   timerFn();
                   if( !$slideWrap.is(":animated") ){
                       nextCountFn();
                   }
                },
                 swipeRight : function(e){
                    e.preventDefault();
                    timerFn()
                    clearInterval(setId);
                    if( !$slideWrap.is(":animated") ){
                        prevCountFn();
                    }
                 }
             })
            /////////////////////////슬라이드/////////////////////////

            /////////////////////////스무스버튼/////////////////////////
            $smoothBtn.on({
                click : function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var url = $this.attr("href"); //이 버튼의 href 속성을 가져와라
                    $htmlBody.stop().animate({ scrollTop : $(url).offset().top-$headerH },600) //124 = header innerheight;
                    //이 버튼의 href 속성의 탑 값을 스크롤탑값으로 받아라
                    //그리고 url(이 버튼의 href 속성)을 매개변수로 제이쿼리를 실행시켜 움직여라.
                    //console.log($htmlBody.scrollTop());
                }
            })
            /////////////////////////스무스버튼/////////////////////////

            /////////////////////////resize/////////////////////////
            $winW = $(window).innerWidth();
            $winH = $(window).innerHeight();

            setTimeout(resizeFn,10);
            function resizeFn(){
                $section1.css({ height:$winH });
                $section2.css({ marginTop:$winH });
                $slide.css({ width:$winW });
                mainSlideFn();
            };

            $window.resize(function(){
                resizeFn();
            })
            /////////////////////////resize/////////////////////////

        },
        section2Fn : function(){
            var $win = $(window);
            var $gal = $("#section2 .gallery li");
            var $galW = $gal.innerWidth();
            var $galH = $galW * $imageR;
            var $imageR = 0.83243503;
            //창너비 변화에 따른 갤러리 높이 비율
            setTimeout(resizeFn,10);
            function resizeFn(){
                $galW = $gal.innerWidth();
                $galH = $galW * $imageR;
                $gal.css({ height : $galH });
            }

            $win.resize(function(){
                resizeFn();
            })

        },
        section3Fn : function(){
            //slide-view 너비 1360이하 = 박스 높이 자동 설정
            var $window = $(window);
            var $winW = $(window).innerWidth();
            var $slideView = $("#section3 .slide-view");
            var $slideViewR = 0.419117647;
            var $pageBtnW = $("#section3 .pageBtn").innerWidth();
            var $pageWrap = $("#section3 .page-wrap");
            var $slideBg  = $("#section3 .slide-bg-image");
            var $slideBgW = $("#section3 .slide-bg-image").innerWidth();

            setTimeout(resizeFn,10);

            function resizeFn(){
                $winw = $(window).innerWidth();

                if( $winW <= 1360 ){
                    $slideView.css({ height : $slideViewR*$winw }); //winW:1360 slide View Width : 570, height:419가 나와야함
                    $pageWrap.css({ height : $pageBtnW });
                    $slideBg.css({ height : $slideBgW });
                }            
                else{
                    $slideView.css({ height : 570 }) // 1360초과면 고정값 570
                }
            }

            $window.resize(function(){
                resizeFn();
            })

            //페이드 인 아웃 반응형 슬라이드 웹개발
            var cnt = 0;
            var setId = null;
            var $slide = $("#section3 .slide");
            var $nextBtn = $("#section3 .nextBtn");
            var $prevBtn = $("#section3 .prevBtn");
            var n = $slide.length-1; // 0 1 2 슬라이드 3개 index에서 1 빼주기
            var $pageBtn = $("#section3 .pageBtn")

            //1번. 페이드 인 아웃 메인함수 만들기 
            //1.1 메인 다음 슬라이드 함수
            function mainNextSlideFn(){// animate({opacity:0},0).animate({opacity:1},1000)
                                       // 안 보이다가  1초 안에 보여라
                $slide.css({ zIndex : 1 }); //초기화 작업 | 모든 슬라이드는 zIndex 1로 설정
                $slide.eq(cnt==0? n:cnt-1).css({ zIndex : 2 }); //현재 슬라이드의 이전 슬라이드
                $slide.eq(cnt).stop().animate({opacity:0},0).animate({opacity:1},1000).css({ zIndex : 3 }); //현재 슬라이드
            }
            //1.2 메인 이전 슬라이드 함수
            function mainPrevSlideFn(){ // animate({opacity:1},0).animate({opacity:0},1000)
                                        // 선명하게 보였다가 1초 안에 없어져버려라
               $slide.css({ zIndex : 1 }).stop().animate({opacity:1},0); //초기화 | 모든 슬라이드는 opacity 1로 초기화됨
               $slide.eq(cnt).css({ zIndex : 2 });
               $slide.eq(cnt==n?0:cnt+1).stop()/* .animate({opacity:1},0) */.animate({opacity:0},1000).css({ zIndex : 3 });
            }

            //2번. 카운트 이벤트
            //2.1 다음 카운트 슬라이드 함수
            function nextCountFn(){
                cnt++;
                if(cnt>n)cnt=0;
                mainNextSlideFn();
                console.log(cnt);
            }

            //2.2 이전 카운트 슬라이드 함수
            function prevCountFn(){
                cnt--;
                if(cnt<0)cnt=n;
                mainPrevSlideFn();
                console.log(cnt);
            }
            //3번. 버튼클릭이벤트
            //3.1 다음 클릭 이벤트
            $nextBtn.on("click",function(e){
                e.preventDefault();
                if( !$slide.is(":animated") ){
                    nextCountFn();}
            })
            //3.2 이전 클릭 이벤트
            $prevBtn.on("click",function(e){
                e.preventDefault();
                if( !$slide.is(":animated") ){
                    prevCountFn();
                }
            })

            //4. 페이지(인디게이터) 버튼 이벤트 구현
            //4.1 함수 생성

            function pageBtnFn(){

            }

            //5.페이지 버튼 클릭 이벤트
            $pageBtn.each(function(){
                var $this = $(this);
                    $this.on("click", function(e){
                    e.preventDefault();
                })
            })




        },
        section4Fn : function(){
            
        },
        section5Fn : function(){
            
        },
        footerFn : function(){
                
        }
    }

    jason.init();
})(jQuery,window,document,);