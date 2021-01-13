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
            var $pageBtn = $("#section3 .pageBtn");
            var a = [1,2]; //초기값 | 페이지2번 3번 

            //1번. 페이드 인 아웃 메인함수 만들기 
            //1.1 메인 다음 슬라이드 함수
            function mainNextSlideFn(){// animate({opacity:0},0).animate({opacity:1},1000)
                                       // 안 보이다가  1초 안에 보여라
                $slide.css({ zIndex : 1 }); //초기화 작업 | 모든 슬라이드는 zIndex 1로 설정
                $slide.eq(cnt==0? n:cnt-1).css({ zIndex : 2 }); //현재 슬라이드의 이전 슬라이드
                $slide.eq(cnt).stop().animate({opacity:0},0).animate({opacity:1},1000).css({ zIndex : 3 }); //현재 슬라이드
                pageBtnFn();
            }
            //1.2 메인 이전 슬라이드 함수
            function mainPrevSlideFn(){ // animate({opacity:1},0).animate({opacity:0},1000)
                                        // 선명하게 보였다가 1초 안에 없어져버려라
               $slide.css({ zIndex : 1 }).stop().animate({opacity:1},0); //초기화 | 모든 슬라이드는 opacity 1로 초기화됨
               $slide.eq(cnt).css({ zIndex : 2 });
               $slide.eq(cnt==n?0:cnt+1).stop()/* .animate({opacity:1},0) */.animate({opacity:0},1000).css({ zIndex : 3 });
               pageBtnFn();
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

            //배열을 사용하지 않은 상태
            /* function pageBtnFn(){ //background는 속성 바꿀때 꼭 어떤 속성을 바꾸는지 상세하게 기입하기

                switch (cnt){ //cnt를 매개변수로 받아서 메인함수와 연결해주기
                    case 0 :  //첫번째 슬라이드인 경우
                    $pageBtn.eq(0).css({ backgroundImage : "url(./img/main-slide1.jpg)" })
                    $pageBtn.eq(1).css({ backgroundImage : "url(./img/main-slide2.jpg)" })
                    break;

                    case 1: //두번째 슬라이드인 경우
                        $pageBtn.eq(0).css({ backgroundImage : "url(./img/main-slide0.jpg)" })
                        $pageBtn.eq(1).css({ backgroundImage : "url(./img/main-slide2.jpg)" })
                    break;

                    case 2:  //마지막 슬라이드인 경우
                        $pageBtn.eq(0).css({ backgroundImage : "url(./img/main-slide0.jpg)" })
                        $pageBtn.eq(1).css({ backgroundImage : "url(./img/main-slide1.jpg)" }) 
                }
            } */

            
            function pageBtnFn(){ //background는 속성 바꿀때 꼭 어떤 속성을 바꾸는지 상세하게 기입하기

                switch (cnt){ //cnt를 매개변수로 받아서 메인함수와 연결해주기
                    case 0 : //첫번째 슬라이드인 경우
                    a=[1,2]; //파일 인덱스번호
                    break;

                    case 1: //두번째 슬라이드인 경우
                    a=[0,2]; //파일 인덱스번호
                    break;

                    case 2:  //마지막 슬라이드인 경우
                    a=[0,1]; //파일 인덱스번호
                }
                
                //console.log(a);
                //console.log(cnt);
                //for문으로 바꿔줄것
                //$pageBtn.eq(0).css({ backgroundImage : "url(./img/main-slide" + a[0]/* 0 2 1 1 : 규칙적 X */ + ".jpg)" })
                //$pageBtn.eq(1).css({ backgroundImage : "url(./img/main-slide" + a[1]/* 1 3 3 2 : 규칙적 X */ + ".jpg)" })

                for( i=0;i<a.length;i++ ){ // a는 0,1
                    $pageBtn.eq(i).css({ backgroundImage : "url(./img/main-slide" + a[i] + ".jpg)" })
                }
            }

            //5.페이지 버튼 클릭 이벤트
            $pageBtn.each(function(idx){
                var $this = $(this);
                    $this.on("click", function(e){
                    e.preventDefault();
                    //바뀌기 전
                        //console.log("(전)현재 진행중인 슬라이드",cnt); // 현재 진행중인 슬라이드
                        //console.log("(전)우리가 클릭한 슬라이드",a); // 우리가 클릭한 슬라이드

                    // cnt가 idx를 비교해야 하기 때문에 imsi에 넣어서 비교한 후 다시 cnt에 넣어줌
                    var imsi = cnt; //현재 실행중이 슬라이드 번호를 임시에 넣어 보관 | 임시랑 내가 클릭한거랑 비교할거임
                        // cnt = idx; // 현재 슬라이드 번호가 idx 번호로 바뀌게끔, 
                        cnt = a[idx]; // 근데 바뀌여야 하는 번호가 그냥 idx가 아니고 a의 배열값대로 바뀌여야 함 | a[1,2] | 배열값(인수), 클릭한 인수에 해당된 배열 값 a[1]=2
                                        //나머지 idx도 다 배열로
                        if( imsi < a[idx] /* imsi : 현재 슬라이드, 클릭한거 : idx, 클릭한 번호(idx)가 더 클때 */ ){
                            mainNextSlideFn(); // 함수 실행 범위( scope )에 변수 cnt가 할당
                        }
                        else if( imsi > a[idx] ){/* 클릭한 번호(idx)가 더 작을 때 */
                            mainPrevSlideFn();
                        }
                    
                    //바뀐 후    
                        //console.log("(후)현재 진행중인 슬라이드",cnt); // 현재 진행중인 슬라이드
                        //console.log("(후)우리가 클릭한 슬라이드 배열",a); // 우리가 클릭한 슬라이드 페이지 버튼 배열
                        //console.log("(후)우리가 클릭한 슬라이드",a[idx]); // 우리가 클릭한 슬라이드 페이지

                })
            })

            //슬라이드와 페이지번호 변화관계 | 122 213 312 122 213 312...
                //메인0 페이지[1] 페이지[2]
                //메인1 페이지[0] 페이지[2]
                //메인2 페이지[0] 페이지[1]
        },
        section4Fn : function(){
            // 슬라이드 컨테이너 박스 너비에 따른 슬라이드 3개의 너비 구하기
            // 1570 - (margin 20 * 2) 40 = 1530
            // 슬라이드 너비는 1570/3
            // 반응형으로 슬라이드 컨테이너(".slide-container") 박스 너비 변화에 따른 슬라이드 너비 계산 자동으로 되게 하기

            var $slideN = 3; // 슬라이드가 보여지는 갯수 : 980 초과(pc) 3, 980이하(tablet) 2, 600이하(mobile)
            var $slideCon = $("#section4 .slide-container");
            var $slideConW = $slideCon.innerWidth()
            var $slideWrap = $("#section4 .slide-wrap")  
            var $slide = $("#section4 .slide");
            var $totN = $slide.length;//슬라이드의 총 갯수 10개
            var $slideW = $slideConW / $slideN;
            var $window = $(window);
            var cnt = 0;
            var setId = null;
            var $pageBtn = $("#section4 .pageBtn");
            var cnt2 = 0;
            var setId2 = null;
            
            setTimeout(resizeFn,10);//처음 로딩시 1번만 (또는 새로고침 때)
            function resizeFn(){
                if( $slideConW>1024 ){ //1025까지는 3개
                    $slideN = 3;
                }
                else if( $slideConW>680 ){ //1024~761까지는 2개
                    $slideN = 2;
                }
                else { //760~는 1개
                    $slideN = 1; 
                }

                $slideW = $slideCon.innerWidth() / $slideN; // 1570/3 | 슬라이드 1개의 너비
                $slideWrap.css({ width : ($slideW*$totN), marginLeft : -($slideW*3) });// 가상슬라이드 3 진짜 4 가상 3
                $slide.css({ width : $slideW, height : $slideW-40 });
                $slideWrap.stop().animate({ left:-($slideW*cnt) },0); //미리 가운데로 조정되고 따로 애니메이션은 없음
                // mainSlideFn(); //움직이면서 화면 가운데로 맞춰지는 반응형
            }
            
                //1.메인 슬라이드 함수
                function mainSlideFn(){
                    $slideWrap.stop().animate({ left:-($slideW*cnt) },600,"easeInQuad",function(){
                        if( cnt > 3 ){ cnt = 0 };
                        if( cnt < 0 ){ cnt = 3 };
                        $slideWrap.stop().animate({ left:-($slideW*cnt) },0);
                    });
                    pageBtnEventFn();
                }
                //2.1 nextCount 슬라이드 함수
                function nextCountSlideFn(){
                    cnt++;
                    mainSlideFn();
                }
                //2.2 이전 슬라이드
                function prevCountSlideFn(){
                    cnt--;
                    mainSlideFn();
                }

                //3. 스와이프 다음/이전 터치 이벤트
                $slideCon.swipe({
                    swipeLeft : function(e){
                        e.preventDefault();
                        timerFn();
                        if( !$slideWrap.is(":animated") ){
                            nextCountSlideFn();
                            //console.log("다음슬라이드 터치 이벤트")
                        }
                    },
                    swipeRight : function(e){
                        e.preventDefault();
                        timerFn();
                        if( !$slideWrap.is(":animated") ){
                            prevCountSlideFn();
                            //console.log("이전슬라이드 터치 이벤트")
                        }
                    }
                })

                    //4. 페이지버튼 이벤트 함수
                    function pageBtnEventFn(){
                        var z = cnt;
                        if(z>3){z=0};
                        if(z<0){z=3};
                        $pageBtn.removeClass("addPage");
                        $pageBtn.eq(z).addClass("addPage");
                    }

                    //5. 페이지버튼 클릭 이벤트 함수
                        //직접 메인 함수연동 // 내가 클릭한 번호가 바로 메인함수로 연결되어야함
                    $pageBtn.each(function(idx){
                        var $this = $(this);
                        $this
                        .on("click", function(e){
                            e.preventDefault();
                            timerFn();
                            cnt=idx; // 직접 선택한 슬라이드 번호를 이용, 메인 슬라이드 함수 호출
                            mainSlideFn();
                        });
                    })

                    //6. 자동 실행 타이머 6초 간격 함수
                    setTimeout(autoPlayFn,10);
                    function autoPlayFn(){
                        setId = setInterval(nextCountSlideFn,6000)
                    }

                    //7. 타이머 실행
                    function timerFn(){
                        cnt2 = 0; //cnt2도 증가하고 있었기 때문에 초기화 시켜주어야함
                        clearInterval(setId); //전체 타이머 중지
                        clearInterval(setId2); //이전에 실행되고 있었던 타이머 중지
                        setId2 = setInterval(function(){
                            cnt2++;
                            console.log(cnt2);
                            if(cnt2>5){
                                clearInterval(setId2);
                                autoPlayFn();
                                nextCountSlideFn(); // 이거 없으면 autoPlayFn()에 걸려있는 6초도 또 기다려야 하기 때문에 즉각실행되도록 이거 써줌
                            }
                        },1000) //1초에 한 번씩 콜백함수를 무한히 실행하라.
                    }

            $window.resize(function(){//크기가 변경될때만 반응
                resizeFn();
            })

        },
        section5Fn : function(){
            
        },
        footerFn : function(){
                
        }
    }

    jason.init();
})(jQuery,window,document);