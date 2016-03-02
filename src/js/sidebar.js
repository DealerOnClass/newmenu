////////////////////////////////////////////
//
//  NOTES                   -   START
//
//  Works on desktop, perfectly. Problem on mobile is:
//  Mobile scroll events don't work like desktop scroll events.
//  The desktop scroll fires, well every pixel essentially. Recently
//  modern browsers and devices have adopted the same, namely Android, Chrome, Firefox, Dolphin.
//  However, Blackberry, Opera, Symbian and iOS browsers have not. They do not
//  detect on scroll per pixel, they detect on scrollstart and scrollstop,
//  inbetween, nothing. Momentum scrolling does not detect scrolling.
//  Therefore another solution needs to be considered.
//  https://www.tjvantoll.com/2012/08/19/onscroll-event-issues-on-mobile-browsers/
//  http://andyshora.com/mobile-scroll-event-problems.html
//
//  NOTES                   -   END
//
////////////////////////////////////////////
////////////////////////////////////////////
//
//  UTILITIES               -   START
//
function forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
};
//
//  UTILITIES               -   END
//
////////////////////////////////////////////
////////////////////////////////////////////
//
//  TOGGLE SIDEBAR          -   START
//
var body     = document.querySelector('body');
var wrapper  = document.querySelector('#content');
var nav      = document.querySelector('.headerWrapper > nav');
var navHead  = document.querySelector('.headerWrapper > nav .navbar-header');
var navItems = document.querySelectorAll('.headerWrapper > nav .dropdown');
var header   = document.querySelector('.headerWrapper > header');
var navToggl = document.querySelector('#open-right');
InitializeBackdrop();
var backdrop = document.querySelector('#navbar-backdrop');
//
//  Create backdrop for sidebar and inserts
//  it into the content wrapper.
function InitializeBackdrop() {
    var newBackdrop  = document.createElement("div");
    wrapper.insertBefore(newBackdrop, wrapper.childNodes[0]);
    newBackdrop.id = "navbar-backdrop";
    newBackdrop.className = "fade invisible";
    newBackdrop.setAttribute("onclick", "CloseSidebar()");
    navToggl.setAttribute("onclick", "OpenSidebar()");
};
//
//  Adds appropriate classes to body and
//  backdrop along with with transition classes.
function OpenSidebar() {
    body.classList.add("sidebar-is-open");
    backdrop.classList.add("in");
    backdrop.classList.remove("invisible");
};
//
//  Reverse of the Above
function CloseSidebar() {
    body.classList.remove("sidebar-is-open");
    backdrop.classList.remove("in");
    setTimeout( function(){
        backdrop.classList.add("invisible");
    }, 250 );
};
//
//  TOGGLE SIDEBAR          -   END
//
////////////////////////////////////////////
////////////////////////////////////////////
//
//  TOGGLE COLLAPSE         -   START
//
//
//  Toggle nav links on load.
//  ** Used in window.onresize below.
ToggleNavCollapse();
//
//  Toggle convert nav links to collapse.
//
//  If screen is less than or equal to 991:
//      enable collapse nav items.
//  else
//      disable collapse nav items.
function ToggleNavCollapse() {
    if ( window.innerWidth <= 991 ) {
        EnableCollapse();
    } else {
        DisableCollapse();
    }
};
//
//  For each "li > a" convert from dropdown to collapse trigger.
//  For each "li > ul" convert to collapse element.
function EnableCollapse() {
    forEach(navItems, function (index, navItem) {
        //
        var navLink = navItem.firstElementChild;
        navLink.setAttribute("data-toggle", "collapse");
        navLink.setAttribute("onclick", "ToggleCollapse(this)");
        //
        var navLinkRef = navLink.getAttribute("href");
        navLink.setAttribute("data-href", navLinkRef );
        navLink.setAttribute("href", "");
        //
        navLink.removeAttribute("data-hover");
        //
        var navMenu = navItem.lastElementChild;
        navMenu.classList.add("collapse");
    });
};
//
//  Reverse of the above.
function DisableCollapse() {
    forEach(navItems, function (index, navItem) {
        //
        var navLink = navItem.firstElementChild;
        navLink.removeAttribute("data-toggle");
        navLink.removeAttribute("onclick");
        //
        var navLinkRef = navLink.getAttribute("data-href");
        navLink.setAttribute("href", navLinkRef );
        navLink.removeAttribute("data-href");
        //
        navLink.setAttribute("data-hover", "dropdown");
        //
        var navMenu = navItem.lastElementChild;
        navMenu.classList.remove("collapse");
        navMenu.removeAttribute("style");
    });
};
//
//  Toggle collapse state of next element, in
//  this case "li > a + ul".
function ToggleCollapse(el) {
    $(el).next().collapse('toggle');
}
//
//  TOGGLE COLLAPSE         -   END
//
////////////////////////////////////////////
