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

    //filtering by tag names
    function filterByTags(a) {
        var clickedTag = $(a).attr('data-f-tag');
        var articleTag = $('[data-tag]');

        $(articleTag).each(function () {
            var articleTagVal = $(this).attr('data-tag');
            var n = articleTagVal.search(clickedTag);

            if (n == -1) {
                $(this).closest('.article').hide();
            }
        });

        if ($('.article').is(':visible')) {
            $('.output__no-result').hide();
        } else {
            $('.output__no-result').show();
        }
    }

    $('[data-f-tag]').on('click', function () {
        $(this).toggleClass('js-f-tag-active');

        if ($(this).hasClass('js-f-tag-active')) {
            filterByTags(this);
        } else {
            $('.article').show();
            $('.output__no-result').hide();
            $('.js-f-tag-active').each(function () {
                filterByTags(this);
            });
        }
    });

    //article selection by request-btn press
    var btnCounter = 0;
    $('.article__request-btn').on('click', function () {
        if ($(this).hasClass('article__request-btn--active')) {
            $(this).html('Pyydä tarjous!');
            btnCounter -= 1;
            if (btnCounter == 0) {
                $('.header__request-btn-num').html('');
            }
            $(this).toggleClass('article__request-btn--active');
        } else if (btnCounter < 3) {
            $(this).html('✔ Lisätty listalle');
            btnCounter += 1;
            $(this).toggleClass('article__request-btn--active');
        }
        if ($('.article__request-btn').is('.article__request-btn--active')) {
            $('.header__request-btn').addClass('header__request-btn--active');
            var btnAddNum = ' (' + btnCounter + ')';
            if(window.matchMedia('(min-width: 700px)').matches) {
                btnAddNum = btnCounter;
            }
            $('.header__request-btn-num').html('').append(btnAddNum);
        } else {
            $('.header__request-btn').removeClass('header__request-btn--active');
        }
        return false;
    });

});
