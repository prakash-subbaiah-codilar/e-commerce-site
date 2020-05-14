
  //Smooth scrool screen script
  $("#mainNav ul li a[href^='#']").on('click', function(e) {
    // prevent default anchor click behavior
    e.preventDefault();
    // store hash
    var hash = this.hash;
    // animate
    $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        // when done, add hash to url
        // (default click behaviour)
        window.location.hash = hash;
      });
 });
  

 
 //nav bar hide after select menu items in mobile view
 $(document).on('click',function(){
 $('#navbarNav').collapse('hide');
 });
 
 

 