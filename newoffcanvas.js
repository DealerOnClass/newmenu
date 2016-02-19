////////////////////////////////////////////
//
//  PREPARE CANVAS          -   START
//
//  window.onresize = function() {
//      console.log('resizing');
//      //  var body    = document.querySelector('#content');
//      //  var nav     = document.querySelector('#offcanvas-nav').offsetHeight;
//      //  var header  = document.querySelector('#headerWrapper').offsetHeight;
//      //  body.style.height = nav + header + "px";
//  };
//
//  PREPARE CANVAS          -   END
//
////////////////////////////////////////////
////////////////////////////////////////////
//
//  TOGGLE SIDEBAR          -   START
//
InitializeBackdrop('#content');

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
    var nav      = document.querySelector(el);
    var backdrop = document.querySelector("#navbar-backdrop");
    var body     = document.querySelector('body');
    body.classList.add("sidebar-is-open");
    nav.classList.add("in");
    backdrop.classList.add("in");
    backdrop.classList.remove("invisible");
};

function CloseSidebar(el) {
    var nav      = document.querySelector(el);
    var backdrop = document.querySelector("#navbar-backdrop");
    var body     = document.querySelector('body');
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
InitializeSticky("#offcanvas-nav");

//
//  Toggle sticky element based on scroll.
window.onscroll = function() {
    var nav       = document.querySelector("#offcanvas-nav");
    var threshold = nav.getAttribute("sticky-offset");
    //
    //  If screen is less than or equal to 991:
    //      If scroll past threshold:
    //          enable sticky.
    //      else
    //          disable sticky.
    //
    //  Additionally, disable sticky if not scrolled at all.
    if ( this.innerWidth <= 991 ) {
        if ( this.scrollY > threshold ) {
            EnableSticky("#offcanvas-nav");
        } else {
            DisableSticky("#offcanvas-nav");
        }
        if ( this.scrollY == 0 ) {
            DisableSticky("#offcanvas-nav");
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
    InitializeSticky("#offcanvas-nav");
    //
    //  If screen is greater than or equal to 992:
    //      disable sticky.
    //  else
    //      enable sticky.
    //
    //  Additionally, disable sticky if not scrolled at all.
    if ( this.innerWidth >= 992 ) {
        DisableSticky("#offcanvas-nav");
    } else {
        EnableSticky("#offcanvas-nav");
    }
    if ( this.scrollY == 0 ) {
        DisableSticky("#offcanvas-nav");
    }
};

//
//  Prepare sticky element
//  Get the previous element's height /* 1 */ and stores it
//  in a new attribute on the sticky element. /* 2 */
//
function InitializeSticky(el) {
    var el   = document.querySelector(el);
    var prev = el.previousElementSibling.offsetHeight;    /* 1 */
    el.setAttribute("sticky-offset", prev);               /* 2 */
};

//
//  Enable sticky element
//  Adds a margin bottom /* 1 */ to the previous element equivalent
//  to the height of the sticky element, essentially creating a
//  "clone" of the sticky element to compensate for position:fixed
//  page jump. Position fixed enabled by new attribute for sticky
//  element /* 2 */.
//
function EnableSticky(el) {
    var el                  = document.querySelector(el);
    var prev                = el.previousElementSibling;
    prev.style.marginBottom = el.offsetHeight + "px";   /* 1 */
    el.setAttribute("sticky-state", "true");            /* 2 */
};

//
//  Disable sticky element
//  Removes margin bottom on previous element /* 1 */ and sets
//  sticky-state of sticky element to false /* 2 */. Essentially
//  undoing what EnableSticky() does.
//
function DisableSticky(el) {
    var el                  = document.querySelector(el);
    var prev                = el.previousElementSibling;
    prev.style.marginBottom = 0;                        /* 1 */
    el.setAttribute("sticky-state", "false");           /* 2 */
    //
    var body                = document.querySelector('body');
    body.classList.remove('sticky-is-enabled');
};
//
//
//  TOGGLE STICKY ELEMENT   -   END
//
////////////////////////////////////////////
