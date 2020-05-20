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

$(document).on('click',function(){
    $('#navbarNav').collapse('hide');
});


