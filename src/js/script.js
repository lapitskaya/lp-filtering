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
            //clearModalItem(btnCounter);
            if (btnCounter == 0) {
                $('.header__request-btn-num').html('');
            }
            $(this).toggleClass('article__request-btn--active');
        } else if (btnCounter < 3) {
            $(this).html('✔ Lisätty listalle');
            btnCounter += 1;
            //addModalItem(btnCounter, this);
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

    //popup activation
    $('.js-popup-open').on('click', function() {
        if ($(this).hasClass('header__request-btn--active')) {
            $('.modal').addClass('modal--recover');
            preventContScroll();
        }
    });

    //check popup btn status
    $('.js-modal-item').on('click', function() {
        if ($('.js-modal-item').is(':visible')) {
            $('.modal__submit-btn').prop( 'disabled', false );
        } else {
            $('.modal__submit-btn').prop( 'disabled', true );
        }
    });

    //prevent content scrolling when modal opened
    function preventContScroll() {
        $('.js-content-no-scroll').addClass('no-scroll');
        $('html').addClass('html-non-scroll');
        $('body').addClass('html-non-scroll');
        $('html').bind('scroll', (function (event) {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            $('html').css('top', scrolled + 'px');
        }));
    }
    function possibleScroll() {
        $('.js-content-no-scroll').removeClass('no-scroll');
        $('html').removeClass('html-non-scroll');
        $('body').removeClass('html-non-scroll');
    }
    function ifShouldScroll() {
        if ($('.js-content-no-scroll').hasClass('no-scroll')) {
            preventContScroll();
        } else {
            possibleScroll();
        }
    }

    ifShouldScroll();

    $('.modal__x').on('click', function () {
        $('.js-content-no-scroll').removeClass('no-scroll');
        possibleScroll();
    });

    //searching field
    $('#searchSubmit').click(function () {
        var qValue = $.trim($('#searchField').val());
        $('[data-f-tag]').removeClass('.js-f-tag-active');
        $('.output__no-result').hide();
        $('.article').show();
        if (qValue != "") {
            $('.article').each(function () {
                var tagElAttr = $(this).find('.article__description').html();
                var n = tagElAttr.search(qValue);
                if (n == -1) {
                    $(this).closest('.article').hide();
                }
            });
        }
        else {
            $('.article').show();
            $('.output__no-result').hide();
        }
        return false;
    });

    $('#searchField').keypress(function (e) {
        if (e.which == 13) {//Enter key pressed
            $('#searchSubmit').click();
            return false;
        }
    });


    //remove content of unchecked article from popup
    //function clearModalItem(num) {
    //    $('.js-modal-item').each(function () {
    //        var item = $(this);
    //        var itemVal = $(item).attr('data-popup-placeholder');
    //
    //        if (itemVal == num) {
    //            $(this).search('[data-popup]').html('');
    //        }
    //    });
    //}

    //add content of checked article to popup
    //function addModalItem(num, btnChecked) {
    //    var placeholder;
    //    switch (num) {
    //        case '1':
    //            placeholder = $('div [data-popup-placeholder="1"]');
    //            break;
    //        case '2':
    //            placeholder = $('div [data-popup-placeholder="2"]');
    //            break;
    //        case '3':
    //            placeholder = $('div [data-popup-placeholder="3"]');
    //            break;
    //        default:
    //            break;
    //    }
    //
    //    var pImg = placeholder.search('[data-popup="img"]');
    //    var pHeading = placeholder.search('[data-popup="heading"]');
    //    var pLocation = placeholder.search('[data-popup="location"]');
    //    var pTags = placeholder.search('[data-popup="tags"]');
    //
    //    var article = $(btnChecked).closest('.article');
    //
    //    $(article).search('[data-el]').each(function () {
    //        var dataEl = $(this);
    //
    //        switch (dataEl.attr('data-el')) {
    //            case 'img':
    //                $(this).clone().appendTo(pImg);
    //                break;
    //            case 'heading':
    //                $(this).clone().appendTo(pHeading);
    //                break;
    //            case 'location':
    //                $(this).clone().appendTo(pLocation);
    //                break;
    //            case 'tags':
    //                $(this).clone().appendTo(pTags);
    //                break;
    //            default:
    //                break;
    //        }
    //    });
    //}

});
