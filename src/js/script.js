'use strict';

$(document).ready(function () {
    calcBodyPaddingBottom();

    $(window).resize(function () {
        calcBodyPaddingBottom();
    });


    //set 'padding-bottom' for body, so absolute positioned footer doesn't cover page content
    var footerHeight, bodyPaddingBottom;

    function calcBodyPaddingBottom() {
        footerHeight = $('.footer').outerHeight();
        bodyPaddingBottom = footerHeight + 20;
        $('body').css('padding-bottom', bodyPaddingBottom + 'px');
    }

    //temporary hide the message
    $('.output__no-result').hide();

    //burger menu
    $('.js-header-menu__burger').on('click', function () {
        $(this).toggleClass('header-menu__burger--x');
        if ($('.header-menu__menu').hasClass('header-menu__menu--hide')) {
            $('.header-menu__menu').slideDown();
        } else {
            $('.header-menu__menu').slideUp();
        }
        $('.header-menu__menu').toggleClass('header-menu__menu--hide');
    });

});
