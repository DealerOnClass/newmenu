////////////////////////////////////////////
//
//  TOGGLE SIDEBAR          -   START
//
InitializeBackdrop('#content');

var body     = document.querySelector('body');
var nav      = document.querySelector('#oncanvas-nav');
var prev     = document.querySelector('#oncanvas-header');
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
//  TOGGLE STICKY ELEMENT   -   START
//
//
//  Initialize sticky element on Load.
InitializeSticky();

//
//  Toggle sticky element based on scroll.
window.onscroll = function() {
    var threshold = nav.getAttribute("sticky-offset");
    //
    //  If screen is less than or equal to 991:
    //      If scroll past threshold:
    //          enable sticky.
    //      else
    //          disable sticky.
    //
    //      If not scrolled at all:
    //          disable sticky.
    if ( this.innerWidth <= 991 ) {
        if ( this.scrollY > threshold ) {
            EnableSticky();
        } else {
            DisableSticky();
        }
        if ( this.scrollY == 0 ) {
            DisableSticky();
        }
    }
};

//
//  Toggle sticky element based on resize.
window.onresize = function() {
        //
        //  Test
        //  console.log('resizing');
        //  var window  = this.innerHeight;
        //  var header  = document.querySelector('#headerWrapper').offsetHeight;
        //  var body    = document.querySelector('#content');
        //  body.style.height = window - header + "px";
    //
    //  Update sticky-offset value on resize.
    InitializeSticky();
    //
    //  If screen is greater than or equal to 992:
    //      disable sticky.
    //  else
    //      enable sticky.
    //
    //  If not scrolled at all:
    //      disable sticky.
    if ( this.innerWidth >= 992 ) {
        DisableSticky();
    } else {
        EnableSticky();
    }
    if ( this.scrollY == 0 ) {
        DisableSticky();
    }
};

//
//  Prepare sticky element
//  Get the previous element's height /* 1 */ and stores it
//  in a new attribute on the sticky element. /* 2 */
//
function InitializeSticky() {
    var offset = prev.offsetHeight;                     /* 1 */
    nav.setAttribute("sticky-offset", offset);          /* 2 */
};

//
//  Enable sticky element
//  Adds a margin bottom /* 1 */ to the previous element equivalent
//  to the height of the sticky element, essentially creating a
//  "clone" of the sticky element to compensate for position:fixed
//  page jump. Position fixed enabled by new attribute for sticky
//  element /* 2 */.
//
function EnableSticky() {
    prev.style.marginBottom = nav.offsetHeight + "px";   /* 1 */
    nav.setAttribute("sticky-state", "true");            /* 2 */
};

//
//  Disable sticky element
//  Removes margin bottom on previous element /* 1 */ and sets
//  sticky-state of sticky element to false /* 2 */. Essentially
//  undoing what EnableSticky() does.
//
function DisableSticky() {
    prev.style.marginBottom = 0;                        /* 1 */
    nav.setAttribute("sticky-state", "false");           /* 2 */
    //
    body.classList.remove('sticky-is-enabled');
};
//
//
//  TOGGLE STICKY ELEMENT   -   END
//
////////////////////////////////////////////
