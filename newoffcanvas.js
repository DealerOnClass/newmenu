//
//  Prepare Sticky Element
PrepareSticky("#offcanvas-nav");

//
//  Stick element based on distance from top.
window.onscroll = function() {
    var nav = document.querySelector("#offcanvas-nav");
    var navOffset = nav.getAttribute("sticky-offset");
    if ( this.scrollY > navOffset ) {
        EnableSticky("#offcanvas-nav");
    } else {
        DisableSticky("#offcanvas-nav");
    }
};

//
//  Prepare sticky element
function PrepareSticky(el) {
    var test = document.querySelector(el);
    var offset = DistanceFromTop(el);
    test.setAttribute("sticky-offset", offset);
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

//
//  Checks element type and returns appropriate selector.
//
//  Note: for now, only id works... : )
//  function GetElementByType(el) {
//      var el = document.querySelector(el);
//      //  var firstChar = el.substring(0,1);
//      //  if ( firstChar == "#" ) {
//      //      var el = el.substring(1);
//      //      var el = document.getElementById(el);
//      //  } else if ( firstChar == "." ) {
//      //      var el = el.substring(1);
//      //      var el = document.getElementsByClassName(el);
//      //  } else if ( firstChar != "#" || "." ) {
//      //      var el = el;
//      //  }
//      return el;
//  };
