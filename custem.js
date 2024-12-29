document.addEventListener('DOMContentLoaded', function() {
    // Define responsive breakpoints for different screen sizes
    var breakpoints = {
        xs: 0,      // Extra small devices (0px and up)
        sm: 375,    // Small devices (375px and up), such as small mobile screens
        md: 992,    // Medium devices (992px and up), typically tablets and small desktops
        lg: 1199    // Large devices (1199px and up), for larger desktops
    };
    const swiper = new Swiper('.swip-campanys', {
      // Optional parameters
        spaceBetween: 10,
        grabCursor: true,
        a11y: true,
        freeMode: true,
        speed: 4000,
        loop: true,
        slidesPerView: 1,  // moad
        slidesPerGroup: 1, // Number of slides per swipe
        autoplay: {
            delay: 0.5,
            disableOnInteraction: false,
        },
        breakpoints: {
            [breakpoints.xs]: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
            [breakpoints.sm]: {
                slidesPerView: 3,
            },
            [breakpoints.md]: {
                slidesPerView: 3,
            },
            [breakpoints.lg]: {
                slidesPerView: 5,
            }
        },
    });
    const swiper1 = new Swiper('.swip-expertise', {
        // Optional parameters
          spaceBetween: 10,
          grabCursor: true,
          a11y: true,
          freeMode: true,
          speed: 4000,
          loop: true,
          slidesPerView: 1,  // moad
          slidesPerGroup: 1, // Number of slides per swipe
          autoplay: {
              delay: 0.5,
              disableOnInteraction: false,
          },
          breakpoints: {
              [breakpoints.xs]: {
                  slidesPerView: 5,
                  spaceBetween: 10,
              },
              [breakpoints.sm]: {
                  slidesPerView: 2,
              },
              [breakpoints.md]: {
                  slidesPerView: 3,
              },
              [breakpoints.lg]: {
                  slidesPerView: 4,
              }
          },
      });
      const swiper2 = new Swiper('.swip-expertise2', {
        // Optional parameters
          spaceBetween: 10,
          grabCursor: true,
          a11y: true,
          freeMode: true,
          speed: 4000,
          loop: true,
          slidesPerView: 1,  // moad
          slidesPerGroup: 1, // Number of slides per swipe
          autoplay: {
              delay: 0.5,
              disableOnInteraction: false,
              reverseDirection: true, // Reverse autoplay direction
          },
          breakpoints: {
              [breakpoints.xs]: {
                  slidesPerView: 5,
                  spaceBetween: 10,
              },
              [breakpoints.sm]: {
                  slidesPerView: 2,
              },
              [breakpoints.md]: {
                  slidesPerView: 3,
              },
              [breakpoints.lg]: {
                  slidesPerView: 4,
              }
          },
      });
});
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.toggle_nav');
    const navLinks = document.querySelector('.nav_links');

    toggleButton.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
});