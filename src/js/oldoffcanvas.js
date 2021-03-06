////////////////////////////////////////
//
//  Offcanvas Magic
//
//  $(document).ready( function() {
//      UpdateDimensions();
//  });

setTimeout( function() {
    UpdateDimensions();
}, 100);

setTimeout( function() {
    $(window).trigger('resize');
}, 400);

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

        $(this).attr("onclick", "toggleCollapse(this)");
        $(this).attr("href","");

        $(this).next().addClass("collapse");
    });
};

function RevertCollapse() {
    $('#offcanvas-collapse .dropdown > a').each(function(i) {
        $(this).removeAttr("data-toggle");

        var Href = $(this).attr("data-url");

        $(this).removeAttr("onclick");
        $(this).attr("href", Href);

        $(this).next().removeClass("collapse");
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

////////////////////////////////////////
//
//  Modal Fix
//
//  $('[data-toggle="modal"]').on('click', function() {
//      //  Get modal
//      var thisModal = $(this).attr("data-target");
//      //  Create restore point
//      $(thisModal).after("<div data-restore='" + thisModal + "'></div>");
//      //  Move modal
//      $("body").append($(thisModal));
//  });

$('.modal').on('show.bs.modal', function() {
    //  Get modal
    var thisModal = $(this).attr("id");
    var thisModal = "#" + thisModal;
    //  Create restore point
    $(thisModal).after("<div data-restore='" + thisModal + "'></div>");
    //  Move modal
    $("body").append($(thisModal));
});

$('.modal').on('hide.bs.modal', function() {
    //  Get modal
    var thisModal = $(this).attr("id");
    //  Move modal to restore point
    $('[data-restore="#' + thisModal + '"]').replaceWith($(this));
});
