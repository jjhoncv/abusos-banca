// functions for scroll sections
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

// functions menu scrollTop
$(".js-menu li > a").on("click", (e) => {
  e.preventDefault();
  const ele = $(e.target);
  const section = ele.attr("href");
  $(section).scrollView();
  $(".wrapper-menu").hide();
  $(".menu-icon").removeClass('open').addClass('close')
})

$(".menu-icon.close").on("click", ()=>{
  $(this).removeClass('close').addClass('open')
  $(".wrapper-menu").show();
})

$(".menu-icon.open").on("click", ()=>{
  $(this).removeClass('open').addClass('close')
  $(".wrapper-menu").hide();
})