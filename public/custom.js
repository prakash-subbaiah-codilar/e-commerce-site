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

/*  $('.navbar-nav').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});*/
$(document).on('click',function(){
    $('#navbarNav').collapse('hide');
});