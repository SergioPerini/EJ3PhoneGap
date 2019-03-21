function navnext( next ) {
    $( ":mobile-pagecontainer" ).pagecontainer( "change", next, {
        transition: "slide"
    });
}
function navprev( prev ) {
    $( ":mobile-pagecontainer" ).pagecontainer( "change", prev, {
        transition: "slide",
        reverse: true
    });
}


$( document ).one( "pagecreate", "body", function() {

    $( document ).on( "swipeleft", ".ui-page", function( event ) {
        var next = $( this ).jqmData( "next" );
        if ( next ) {
            navnext( next );
        }
    });

    $( document ).on( "swiperight", ".ui-page", function( event ) {
        var prev = $( this ).jqmData( "prev" );
        if (prev) {
            navprev( prev );
        }
    });
});