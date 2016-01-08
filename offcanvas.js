////////////////////////////////////////
//
//  Offcanvas Magic
//
$(document).ready( function() {
    UpdateDimensions();
});

$(window).resize( function() {
    UpdateDimensions();
});

function UpdateDimensions() {

    var headerHeight     = $('[oncanvas-header]').height();
    var navHeight        = $('[offcanvas-nav]').height();
    var windowHeight     = $(window).height();
    var windowWidth      = $(window).width();

    if ( windowWidth > 767 ) {
        var headerHeight = headerHeight - navHeight;
        var offsetHeight = windowHeight - ( headerHeight + navHeight );
        var offsetTop    = headerHeight + navHeight;
        var offsetNav    = navHeight;
    } else {
        var headerHeight = headerHeight;
        var offsetHeight = windowHeight - headerHeight;
        var offsetTop    = headerHeight;
        var offsetNav    = 0;
    };

    $('[offcanvas-set-height="window"]').css("height", windowHeight);
    $('[offcanvas-set-width="window"]').css("width", windowWidth);

    $('[offcanvas-set-height="oncanvas-header"]').css("height", offsetHeight);
    $('[offcanvas-set-top="oncanvas-header"]').css("top", offsetTop);
    $('[offcanvas-set-top="offcanvas-nav"]').css("top", offsetNav);

};
