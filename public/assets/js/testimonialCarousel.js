$(".testimonialCarousel").owlCarousel({
  autoplayTimeout: 5000, // 5 seconds autoplay timeout
  smartSpeed: 1000, // Transition speed for smooth scrolling
  autoplaySpeed: 1000,
  margin: 20,
  autoplay: true,
  items: 4,
  loop: true,
  dots: false,
  autoplayHoverPause: true,
  nav: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
});