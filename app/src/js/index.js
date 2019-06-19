// functions for scroll sections
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

// function menu scrollTop
$(".js-menu li > a").on("click", (e) => {
  e.preventDefault();
  const ele = $(e.target);
  const section = ele.attr("href");
  $(section).scrollView();
  $(".wrapper-menu").addClass('hide');
  $(".menu-icon").removeClass('open')
})

$(".menu-icon:not('.open')").on("click", ()=>{
  console.log('here!')
  $(".wrapper-menu").removeClass("hide")
})