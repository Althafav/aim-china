

$(".ParticipateCarouselFF").owlCarousel({
    slideSpeed: 500,
    paginationSpeed: 400,
    margin: 20,
    autoplay: false,
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    responsiveClass: true,
    animateIn: 'slideInDown', // You might need to define custom animations
    animateOut: 'slideOutUp',
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
});
var owl = $('.ParticipateCarouselFF');

owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});
