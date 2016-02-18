//
//  Prepare Sticky Element
PrepareSticky("#offcanvas-nav");

//
//  Stick element based on distance from top.
window.onscroll = function() {
    var nav = document.querySelector("#offcanvas-nav");
    var navOffset = nav.getAttribute("sticky-offset");
    if ( this.innerWidth <= 767 ) {
        if ( this.scrollY > navOffset ) {
            EnableSticky("#offcanvas-nav");
        } else if ( this.scrollY == 0 ) {
            DisableSticky("#offcanvas-nav");
        } else {
            DisableSticky("#offcanvas-nav");
        }
    }
};

//
//  Toggle on screen resize.
window.onresize = function() {
    PrepareSticky("#offcanvas-nav");
    if ( this.innerWidth >= 768 ) {
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
function PrepareSticky(el) {
    var el = document.querySelector(el);
    //  var offset = DistanceFromTop(el);
    //  test.setAttribute("sticky-offset", offset);
    var prev = el.previousElementSibling;
    el.setAttribute("sticky-offset", prev.offsetHeight);
};

//
//  Enable sticky element
function EnableSticky(el) {
    var el = document.querySelector(el);
    var prev = el.previousElementSibling;
    prev.style.marginBottom = el.offsetHeight + "px";
    el.setAttribute("sticky-state", "true");
};

//
//  Disable sticky element
function DisableSticky(el) {
    var el = document.querySelector(el);
    var prev = el.previousElementSibling;
    prev.style.marginBottom = 0;
    el.setAttribute("sticky-state", "false");
};

//
//  Gets element's distance from page top.
function DistanceFromTop(el) {
    var el = document.querySelector(el);
    var position = el.offsetTop;
    return position;
};
