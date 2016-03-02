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
    //
    //  Get offset distance before check
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
//  Toggle sticky element on resize.
window.onresize = function() {
    //
    //  Toggle nav links on resize.
    ToggleNavCollapse();
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
    var offset = header.offsetHeight;                     /* 1 */
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
    //  header.style.marginBottom = nav.offsetHeight + "px";   /* 1 */
    wrapper.style.marginTop = navHead.offsetHeight + "px";   /* 1 */
    nav.setAttribute("sticky-state", "true");            /* 2 */
    body.classList.add("sticky-is-enabled");
};
//
//  Disable sticky element
//  Removes margin bottom on previous element /* 1 */ and sets
//  sticky-state of sticky element to false /* 2 */. Essentially
//  undoing what EnableSticky() does.
//
function DisableSticky() {
    //  header.style.marginBottom = 0;                        /* 1 */
    wrapper.style.marginTop = 0;                        /* 1 */
    nav.setAttribute("sticky-state", "false");           /* 2 */
    //
    body.classList.remove('sticky-is-enabled');
};
//
//
//  TOGGLE STICKY ELEMENT   -   END
//
////////////////////////////////////////////

