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
InitializeBackdrop('#content');

var body     = document.querySelector('body');
var wrapper  = document.querySelector('#content');
var nav      = document.querySelector('#oncanvas-nav');
var navItems = document.querySelectorAll('#oncanvas-nav .dropdown');
var header   = document.querySelector('#oncanvas-header');
var navToggl = document.querySelector('#open-right');
var backdrop = document.querySelector('#navbar-backdrop');

navToggl.onclick = function() {
    OpenSidebar('.navbar-collapse');
};

backdrop.onclick = function() {
    CloseSidebar('.navbar-collapse');
};

function InitializeBackdrop(el) {
    var container = document.querySelector(el);
    var backdrop  = document.createElement("div");
    container.insertBefore(backdrop, container.childNodes[0]);
    backdrop.id = "navbar-backdrop";
    backdrop.className = "fade invisible";
};

function OpenSidebar(el) {
    var backdrop = document.querySelector("#navbar-backdrop");
    body.classList.add("sidebar-is-open");
    nav.classList.add("in");
    backdrop.classList.add("in");
    backdrop.classList.remove("invisible");
};

function CloseSidebar(el) {
    var backdrop = document.querySelector("#navbar-backdrop");
    body.classList.remove("sidebar-is-open");
    nav.classList.remove("in");
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
ToggleNavCollapse();

function ToggleNavCollapse() {
    if ( window.innerWidth >= 992 ) {
        RevertCollapse();
    } else {
        UpdateCollapse();
    }
};

function RevertCollapse() {
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

function UpdateCollapse() {
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

function ToggleCollapse(el) {
    $(el).next().collapse('toggle');
}
//
//  TOGGLE COLLAPSE         -   END
//
////////////////////////////////////////////
