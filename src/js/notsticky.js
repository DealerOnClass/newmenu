////////////////////////////////////////////
//
//  TOGGLE FIXED NAV   -   START
//
//
InitializeNav();

window.onresize = function() {
    ToggleNavCollapse();
    InitializeNav();
};

function InitializeNav() {
    header.style.marginTop = nav.offsetHeight + "px";   /* 1 */
};
//
//
//  TOGGLE FIXED NAV   -   END
//
////////////////////////////////////////////
