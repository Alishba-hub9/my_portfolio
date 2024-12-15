$('.testimonials-carousel').owlCarousel({
    loop:true,
    margin:15,
    nav: true,
    dots:false,
    items: 3,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:false,
        },
        780:{
            items:2,
        },
        1000:{
            items:3,
        }
    }
})

$('.contact-form').on('submit', function (e) {
    e.preventDefault();

    var name = $('#name').val();
    var email = $('#email').val();
    var gender = $('select').val();
    var message = $('textarea').val();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Gender:", gender);
    console.log("Message:", message);
});