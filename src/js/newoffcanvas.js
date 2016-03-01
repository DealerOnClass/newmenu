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
//  TOGGLE STICKY ELEMENT   -   START
//
//
//  Initialize sticky element on Load.
InitializeSticky();
//  var navClone = document.querySelector('#oncanvas-nav-clone');
var nav = document.querySelector('#oncanvas-nav');

//
//  Toggle sticky element based on scroll.

//  window.addEventListener( "touchmove", function() {
window.onscroll = function() {
    //  var threshold = navClone.getAttribute("sticky-offset");
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
//  }, false);

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
function OldInitializeSticky() {
    var offset = prev.offsetHeight;                     /* 1 */
    nav.setAttribute("sticky-offset", offset);          /* 2 */
    //
    //  Clone nav element /* 1 */ and prepend
    //  to body /* 2 */
    var newNav = nav.cloneNode(true);                   /* 3 */
    newNav.id = "oncanvas-nav-clone";
    newNav.setAttribute("sticky-state", "false");       /* 4 */
    body.insertBefore(newNav, body.childNodes[0]);      /* 5 */
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
function OldEnableSticky() {
    //  prev.style.marginBottom = nav.offsetHeight + "px";   /* 1 */
    navClone.setAttribute("sticky-state", "true");            /* 2 */
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
function OldDisableSticky() {
    //  prev.style.marginBottom = 0;                        /* 1 */
    navClone.setAttribute("sticky-state", "false");           /* 2 */
    //
    body.classList.remove('sticky-is-enabled');
};
//
//
//  TOGGLE STICKY ELEMENT   -   END
//
////////////////////////////////////////////
