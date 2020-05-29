$(document).ready(function(){
    $(".show-modal").click(function(){
        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
});


$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
  });


/*$(function(){
  // mobile menu slide from the left
  $('[data-toggle="slide-collapse"]').on('click', function() {
    $navMenuCont = $($(this).data('target'));
    $navMenuCont.animate({'width':'toggle'}, 280);
  });
})*/


