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
            $('.js-f-tag-active').each(function () {
                filterByTags(this);
            });
        }
    });

});
