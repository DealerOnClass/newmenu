////////////////////////////////////////
//
//  Offcanvas Magic
//
$(document).ready( function() {
    UpdateDimensions();
    UpdateCollapse();
});

$(window).resize( function() {
    UpdateDimensions();
    UpdateCollapse();
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

function UpdateCollapse() {
    $('#offcanvas-collapse .dropdown > a').each(function(i) {
        $(this).attr("data-toggle", "collapse");
        console.log($(this).attr("data-toggle"));   // debug

        $(this).addClass("collapse");
        console.log($(this).attr("class"));         // debug

        var nextID = $(this).attr("href");
        var keepID = nextID;
        var nextID = nextID.split('.')[0];          // remove url
        var nextID = nextID.split('/')[0];          // remove slash
        console.log(nextID);                        // debug

        $(this).attr("data-keep", keepID);
        $(this).attr("href", "#" + nextID);
        $(this).next().attr("id", nextID);
    });
};
