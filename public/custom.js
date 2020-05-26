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


$(document).ready(function(){
    $('.dropdown-submenu a.test').on("click", function(e){
      $(this).next('ul').toggle();
      e.stopPropagation();
      e.preventDefault();
    });
  });