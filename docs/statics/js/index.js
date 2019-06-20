// functions for scroll sections
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}; // functions menu scrollTop


$(".js-menu li > a").on("click", e => {
  e.preventDefault();
  const ele = $(e.target);
  const li = ele.parent();
  $(".js-menu li").removeClass('active');
  li.addClass('active');
  const section = ele.attr("href");
  $(section).scrollView();
  $(".wrapper-menu").hide();
  $("nav").removeClass("open");
});
$(".menu-icon").on("click", function () {
  if ($(this).parent().hasClass('open')) {
    $(".wrapper-menu").hide();
    $("nav").removeClass("open");
  } else {
    $(".wrapper-menu").show();
    $("nav").addClass("open");
  }
});