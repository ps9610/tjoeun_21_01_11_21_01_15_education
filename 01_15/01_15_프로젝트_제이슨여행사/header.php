<!DOCTYPE html>
<html lang="ko">
<head>
    <title>Jason Travel Service</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=Emulate10"> -->
    <meta name="Viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0. maximum-scale=1.6, user-scalable=no">
    <meta name="Title" content="Jason Travel Service">
    <meta name="Publisher" content="프론트엔드 박소혜">
    <meta name="Author-date" content="2021-01-15"> 
    <meta name="Author" content="Jason Travel Service">
    <meta name="Copyright" content="Jason Travel Service">
    <meta name="Keywords" content="Jason Travel Service, 여행, 관광">
    <meta name="description" content="Jason Travel Service 전문 여행사입니다."> 
    <meta name="Robots" content="index, follow">

    <!-- 파비콘 -->
    <link rel="shortcut icon" href="./img/jts_logo_pavicon.jpg">
    <link rel="apple-touch-icon" href=".img/jts_logo_pavicon.jpg">

    <link rel="stylesheet" href="./css/common.css">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/fonts.css">
    <link rel="stylesheet" href="./css/responsive.css">

    <!-- 오픈 아이콘 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <!-- font-awesome 4.0 -->
    <script src='https://kit.fontawesome.com/a076d05399.js'></script> <!-- font-awesome 5.0 -->

    <!-- 오픈소스 -->
    <script src="./js/lib/jquery-1.12.4.min.js"></script>
    <script src="./js/lib/prefixfree.min.js"></script>
    <script src="./js/lib/jquery.touchSwipe.js"></script>
    <script src="./js/lib/jquery.easing.1.3.js"></script>

    <!-- 조건 주석문 익스프롤러 하위 IE9 IE8 IE7 폴리필 -->
    <!-- 스크립트 스타일 -->

    <!--[if lte IE 9]>
        <script src="./js/lib/IE9.js"></script>
    <![endif]-->

    <!--[if lte IE 8]>
        <script src="./js/lib/html5shiv.min.js"></script>
        <script src="./js/lib/jqPIE.js"></script>
        <script src="./js/lib/PIE.js"></script>
        <link rel="stylesheet" type="text/css" href="./css/ie8.css">
    <![endif]-->

    <!--[if lte IE 7]>
        <link rel="stylesheet" type="text/css" href="./css/ie7.css">
    <![endif]-->
 
</head>
<ul id="skip">
    <li><a href="#header" title="메뉴바로가기">메뉴바로가기</a></li>
    <li><a href="#main" title="본문바로가기">본문바로가기</a></li>
    <li><a href="#footer" title="하단바로가기">하단바로가기</a></li>
</ul>
<body class="intro">
    <div id="wrap">
        <header id="header"> <!-- height:124px position:fixed bgfff/transparent-->
            <div class="wrap"> <!-- width :1570 -->
                <div class="header-gap"> <!-- margin: 0 20px -->
                    <div class="container">
                        <ul class="clearfix">
                            <li> <!-- 로고 / 로고가 가운데에 있지만 탭 키로 접근할 때 가장 먼저 접근하도록 하기 위해서 = 접근성땜에 -->
                                
                                <a href="./index.php" class="logo-btn">
                                    <img src="./img/logo_white.png" alt="logo_white" class="white">
                                    <img src="./img/logo_color.png" alt="logo_color" class="color">
                                </a>
                            </li>
                            <li> <!-- 왼쪽메뉴 -->
                                <a href="javascript:" class="menu-bar">
                                    <span class="line-box">
                                        <i class="line line1"></i>
                                        <i class="line line2"></i>
                                        <i class="line line3"></i>
                                    </span>
                                    <span class="text">Menu</span>
                                </a>
                            </li>
                            <li> <!-- 오른쪽메뉴 -->
                                <ul>
                                    <li><span><a href="./login.php" title="login" class="login-btn">LOGIN</a></span></li>
                                    <li><span><i></i></span></li>
                                    <li><span><a href="./join.php" title="join" class="join-btn">JOIN</a></span></li>
                                    <li>
                                        <span>
                                            <a href="./confirm.php" title="quote Contact" class="confirm-btn">
                                                <span>견적<br>문의</span><!-- 높이50 넓이110 -->
                                            </a>
                                        </span>
                                    </li>
                                    <li><span><a href="javascript:" title="search" class="search-btn">
                                        <img src="./img/search_i_01.png" alt="search icon" class="m-white">
                                        <img src="./img/search_i.png" alt="search icon" class="m-black">
                                    </a></span></li>
                                </ul>
                            </li> 
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <nav id="nav">
            <div class="wrap">
                <div class="gap">
                    <div class="container">
                        <ul>
                            <li><a href="./main1-1.php" class="main-btn">여행테마</a>
                                <div class="sub sub1">
                                    <div class="sub-wrap">
                                        <div class="sub-gap">
                                            <ul>
                                                <li><a href="./main1-1.php" class="sub-btn">베트남 / 발리 / 태국</a></li>
                                                <li><a href="./main1-2.php" class="sub-btn">몰디브 및 특수지역</a></li>
                                                <li><a href="./main1-3.php" class="sub-btn">유럽</a></li>
                                                <li><a href="./main1-4.php" class="sub-btn">그 외 지역</a></li>
                                                <li><a href="./main1-5.php" class="sub-btn">아만 리조트</a></li>
                                                <li><a href="./main1-6.php" class="sub-btn">럭셔리</a></li>
                                                <li><a href="./main1-7.php" class="sub-btn">가족</a></li>
                                                <li><a href="./main1-8.php" class="sub-btn">허니문</a></li>
                                                <li><a href="./main1-9.php" class="sub-btn">태교여행</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><a href="./main2.php" class="main-btn">프로모션</a></li>
                            <li><a href="./main3.php" class="main-btn">JTS 소식</a></li>
                            <li><a href="./main4.php" class="main-btn">여행후기</a></li>
                            <li><a href="./main5-1.php" class="main-btn">여행문의</a>
                                <div class="sub sub2">
                                    <div class="sub-wrap">
                                        <div class="sub-gap">
                                            <ul>  
                                                <li><a href="./main5-1.php" class="sub-btn">일반여행문의</a></li>
                                                <li><a href="./main5-2.php" class="sub-btn">단체여행문의</a></li>
                                                <li><a href="./main5-3.php" class="sub-btn">리조트견적요청</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><a href="./main6-1.php" class="main-btn">회사소개</a>
                                <div class="sub sub6">
                                    <div class="sub-wrap">
                                        <div class="sub-gap">
                                            <ul>   
                                                <li><a href="./main6-1.php" class="sub-btn">About Us </a></li>
                                                <li><a href="./main6-2.php" class="sub-btn">회사연혁</a></li>
                                                <li><a href="./main6-3.php" class="sub-btn">오시는길</a></li>
                                                <li><a href="./main6-4.php" class="sub-btn">공지사항</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>


