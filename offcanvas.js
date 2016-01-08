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
        RevertCollapse();
    } else {
        var headerHeight = headerHeight;
        var offsetHeight = windowHeight - headerHeight;
        var offsetTop    = headerHeight;
        var offsetNav    = 0;
        UpdateCollapse();
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
        $(this).addClass("collapse");

        var nextID = $(this).attr("href");

        $(this).attr("onclick", "toggleCollapse(this)");
        $(this).attr("data-keep", nextID);
        $(this).attr("href","");
    });
};

function RevertCollapse() {
    $('#offcanvas-collapse .dropdown > a').each(function(i) {
        $(this).removeAttr("data-toggle");
        $(this).removeClass("collapse");

        var oldHref = $(this).attr("data-keep");

        $(this).removeAttr("onclick");
        $(this).removeAttr("data-keep");
        $(this).attr("href", oldHref);

        $(this).next().removeClass("in");
    });
};

function toggleCollapse(el) {
    $(el).next().collapse('toggle');
}
