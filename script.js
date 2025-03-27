(function ($) {
    "use strict";

    function scrollBanner() {
        $(document).on('scroll', function () {
            var scrollPos = $(this).scrollTop();
            $('.pal').css({
                'top': (scrollPos / 2) + 'px',
                'opacity': 1 - (scrollPos / 700)
            });
        });
    }
    scrollBanner();

    $(document).ready(function () {
        var offset = 300;
        var duration = 400;

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > offset) {
                $('.scroll-to-top').addClass('active-arrow');
            } else {
                $('.scroll-to-top').removeClass('active-arrow');
            }
        });

        $('.scroll-to-top').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        function fadeInOnScroll() {
            let title = document.querySelector(".fade-title");
            if (!title) return;
            let titlePosition = title.getBoundingClientRect().top;
            let screenPosition = window.innerHeight / 1.5;

            if (titlePosition < screenPosition) {
                title.classList.add("fade-in");
            } else {
                title.classList.remove("fade-in");
            }
        }

        window.addEventListener("scroll", fadeInOnScroll);
        fadeInOnScroll();
    });

