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

    //for test, to see the page without content
    $('.article').hide();
});
