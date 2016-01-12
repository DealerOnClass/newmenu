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
    var navWidth         = windowWidth * .75;

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

    $('[offcanvas-width]').css("width", navWidth);
};

function UpdateCollapse() {
    $('#offcanvas-collapse .dropdown > a').each(function(i) {
        $(this).attr("data-toggle", "collapse");
        $(this).addClass("collapse");

        $(this).attr("onclick", "toggleCollapse(this)");
        $(this).attr("href","");
    });
};

function RevertCollapse() {
    $('#offcanvas-collapse .dropdown > a').each(function(i) {
        $(this).removeAttr("data-toggle");
        $(this).removeClass("collapse");

        var Href = $(this).attr("data-url");

        $(this).removeAttr("onclick");
        $(this).attr("href", Href);

        $(this).next().removeClass("in");
    });
};

function toggleCollapse(el) {
    $(el).next().collapse('toggle');
}

////////////////////////////////////////
//
//  Offcanvas-Backdrop
//
$('#offcanvas-collapse').on('show.bs.collapse', function(e) {
    if (e.target == this) {
        $('.offcanvas-backdrop').addClass('active');
        $('.offcanvas-backdrop').toggleClass('invisible');
        $('#menu-icon').removeClass('fa-bars').addClass('fa-remove');
    }
});

$('#offcanvas-collapse').on('hide.bs.collapse', function(e) {
    if (e.target == this) {
        $('.offcanvas-backdrop').removeClass('active');
        $('#menu-icon').removeClass('fa-remove').addClass('fa-bars');
    }
});

$('#offcanvas-collapse').on('hidden.bs.collapse', function(e) {
    if (e.target == this) {
        $('.offcanvas-backdrop').toggleClass('invisible');
    }
});

$('.offcanvas-backdrop').on('click', function() {
    $('#offcanvas-collapse').collapse('hide');
});
