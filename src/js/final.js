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
//
////////////////////////////////////////////
////////////////////////////////////////////
//
//  CONFIG                  -   START
//
var body          = document.body;
var wrapper       = document.getElementById('content');
var header        = document.querySelector('header');
var nav           = document.querySelector('#nav');
var jsnav         = document.querySelector('#nav-sidebar');
var headerWrapper = document.querySelector('.headerWrapper');
var navHeader     = nav.querySelector('#navbar-header');
var collapseItems = jsnav.querySelectorAll('.dropdown-has-children');
var hoverItems    = jsnav.querySelectorAll('.dropdown');
var navToggle     = nav.querySelector('#open-right');
var sideBar       = jsnav.querySelector('#navbar-collapse');
var parentSelector   = ".qmparent";
var childrenSelector = ".dropdown-menu";
var threshold = 50,
    backdrop,
    startX,
    startY,
    distX,
    distY
//
//  CONFIG                  -   END
//
////////////////////////////////////////////
////////////////////////////////////////////
//
//  RUNTIME   -   START
//
//
//  Initialize sticky element on Load.
InitializeBackdrop();
InitializeSticky();
//
//  Toggle nav links on load.
if ( window.innerWidth <= 991 ) {
    EnableMobile();
} else {
    EnableDesktop();
}
//
//  Toggle sticky element based on scroll.
window.onscroll = function() {
    //
    //  Get offset distance before check
    var stickyThreshold = nav.getAttribute("sticky-offset");
    //
    if ( this.innerWidth <= 991 ) {
        if ( this.pageYOffset > stickyThreshold ) {
            EnableSticky();
        } else {
            DisableSticky();
        }
    }
};
//
//  Toggle sticky element on resize.
window.onresize = function() {
    //
    //  Update sticky-offset value on resize.
    InitializeSticky();
    //
    if ( this.innerWidth >= 992 ) {
        EnableDesktop();
        DisableSticky();
    } else {
        EnableMobile();
        EnableSticky();
    }
    if ( this.pageYOffset == 0 ) {
        DisableSticky();
    }
};

////////////////////////////////////////////
//
//  TOGGLE SIDEBAR          -   START
//
//
//  Create backdrop for sidebar and inserts
//  it into the content wrapper. Creates onclick for nav button
function InitializeBackdrop() {
    backdrop  = document.createElement("div");
    wrapper.insertBefore(backdrop, wrapper.childNodes[0]);
    backdrop.id = "navbar-backdrop";
    backdrop.className = "fade invisible";
    backdrop.setAttribute("onclick", "CloseSidebar()");
    sideBar.addEventListener('touchstart', function(e){ CaptureSwipe(e); });
    sideBar.addEventListener('touchmove', function(e){ EvluateSwipe(e); });
    backdrop.addEventListener('touchstart', function(e){ CaptureSwipe(e); });
    backdrop.addEventListener('touchmove', function(e){ EvluateSwipe(e); });
    navToggle.setAttribute("onclick", "OpenSidebar()");
};

////////////////////////////////////////////
//
//  SWIPE TO CLOSE      -   START
//
//
//  When the sidebar is open, a swipe gesture
//  to the right should close it, while up and
//  down still scrolls
//
//  Capture initial position
function CaptureSwipe(e){
    var touchobj = e.changedTouches[0]
    distX = 0;
    distY = 0;
    startX = touchobj.pageX
    startY = touchobj.pageY
}
//
//  Capture end position and evaluate
function EvluateSwipe(e){
    var touchobj = e.changedTouches[0]
    distX = touchobj.pageX - startX;
    distY = touchobj.pageY - startY;
    if(distX >= threshold && Math.abs(distY) < threshold){            
        CloseSidebar();
        e.preventDefault();
    }
}


//
//  Adds appropriate classes to body and
//  backdrop along with with transition classes.
function OpenSidebar() {
    AddClass(body,"sidebar-is-open");
    AddClass(backdrop,"in");
    RemoveClass(backdrop,"invisible");
};
//
//  Reverse of the Above
function CloseSidebar() {
    RemoveClass(body,"sidebar-is-open");
    RemoveClass(backdrop,"in");
    setTimeout( function(){
        AddClass(backdrop,"invisible");
    }, 250 );   // delay equivalent to "#navbar-backdrop-fade" transition in css.
};
//
//  TOGGLE SIDEBAR          -   END
//
////////////////////////////////////////////



function EnableMobile(){
    DisableHover();
    EnableCollapse();
}

function EnableDesktop(){
    DisableCollapse();
    EnableHover();
}


////////////////////////////////////////////
//
//  TOGGLE COLLAPSE         -   START
//
//  For each "li > a" convert from dropdown to collapse trigger.
//  For each "li > ul" convert to collapse element.
function EnableCollapse() {
    forEach(collapseItems, function (index, collapseItem) {
        var navLink = collapseItem.querySelector(parentSelector);
        var navMenu = collapseItem.querySelector(childrenSelector);
        //
        navLink.setAttribute("data-toggle", "collapse");
        navLink.setAttribute("onclick", "ToggleCollapse(this)");
        //
        navLink.setAttribute("href", "");
        //
        AddClass(navMenu,"collapse");
    });
};
//
//  Reverse of the above.
function DisableCollapse() {
    forEach(collapseItems, function (index, collapseItem) {
        var navLink = collapseItem.querySelector(parentSelector);
        var navMenu = collapseItem.querySelector(childrenSelector);
        var navLinkRef = navLink.getAttribute("data-href");
        //
        navLink.removeAttribute("data-toggle");
        navLink.removeAttribute("onclick");
        //
        navLink.setAttribute("href", navLinkRef );
        //
        RemoveClass(navMenu,"collapse");
        RemoveClass(navMenu,"in");
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
//
//  Prepare sticky element
//  Get the previous element's height /* 1 */ and stores it
//  in a new attribute on the sticky element. /* 2 */
function InitializeSticky() {    
    var offset = header.offsetHeight;                           /* 1 */
    nav.setAttribute("sticky-offset", offset);                  /* 2 */
};
//
//  Enable sticky element
//  Adds a margin top /* 1 */ to the wrapepr element equivalent
//  to the height of the sticky element, essentially creating a
//  "clone" of the sticky element to compensate for position:fixed
//  page jump. Position fixed enabled by new attribute body/* 2 */.
function EnableSticky() {
    headerWrapper.style.marginBottom = navHeader.offsetHeight + "px";    /* 1 */
    AddClass(body,"sticky-is-enabled");                    /* 2 */
};
//
//  Reverse of the above.
function DisableSticky() {
    headerWrapper.style.marginBottom = 0;                              /* 1 */
    RemoveClass(body,"sticky-is-enabled");                 /* 2 */
};




function EnableHover(){
    forEach(hoverItems, function (index, hoverItem) {
        var navLink = hoverItem.querySelector(parentSelector);
        var navMenu = hoverItem.querySelector(childrenSelector);
        navLink.addEventListener('mouseover', HoverOpen);
        navLink.addEventListener('mouseout', HoverClose);
        if(navMenu){
            navMenu.addEventListener('mouseover', HoverOpen);
            navMenu.addEventListener('mouseout', HoverClose);   
        }
    });
}

function DisableHover(){
    forEach(hoverItems, function (index, hoverItem) {
        var navLink = hoverItem.querySelector(parentSelector);
        var navMenu = hoverItem.querySelector(childrenSelector);
        navLink.removeEventListener('mouseover', HoverOpen);
        navLink.removeEventListener('mouseout', HoverClose);
        if(navMenu){
            navMenu.removeEventListener('mouseover', HoverOpen);
            navMenu.removeEventListener('mouseout', HoverClose);   
        }
        ClearOpen(hoverItem);
    });
}


function HoverOpen(e){
    AddClass(e.currentTarget.parentNode,"open");
}

function HoverClose(e){
    ClearOpen(e.currentTarget.parentNode);
}

function ClearOpen(obj){
    RemoveClass(obj,"open");
}


//
//
//  TOGGLE STICKY ELEMENT   -   END
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
//  These are only required because the element.classList.add / .remove functions 
//  are unavailable in IE9 or lower
//
function HasClass(e,c) {return e.className.match(new RegExp('(\\s|^)'+c+'(\\s|$)'));}
//
function AddClass(e,c) {if(!HasClass(e,c)){e.className += ' ' + c;}}
//
function RemoveClass(e,c) {if(HasClass(e,c)){e.className = e.className.replace( new RegExp('(?:^|\\s)'+c+'(?!\\S)') ,'');}}
//
//  UTILITIES               -   END
