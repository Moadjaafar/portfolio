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
    
});
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.toggle_nav');
    const navLinks = document.querySelector('.nav_links');

    toggleButton.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".new_curser");
    const gallery = document.querySelector(".projects_gallery");
    const galleryImg = gallery.querySelector("img");
    const items = document.querySelectorAll(".project_iteme");
    const listContainer = document.querySelector(".list_projectitems");

    let lastY = 0; // Store the last Y position of the cursor

    // Mousemove handler
    function moveElements(e) {
        const currentY = e.clientY;
        const movingDown = currentY > lastY; // Determine if moving down or up
        lastY = currentY; // Update the lastY position

        // Move cursor
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.9,
            ease: "power2.out"
        });

        // Move gallery (centered with delay)
        gsap.to(gallery, {
            x: e.clientX, 
            y: e.clientY,
            duration: 1.9, 
            ease: "power3.out"
        });

        // Image change effect based on direction
        items.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                const newImgSrc = item.getAttribute("data-img");
                const newBgColor = item.getAttribute("data-color") || "#fff"; // Default color if not provided
                const projectType = item.getAttribute("project-type"); // Get the project type

                // Check if the project type is "designe"
                if (projectType === "designe") {
                    galleryImg.classList.add("design-class"); // Add the class if it's a "designe" project
                } else {
                    galleryImg.classList.remove("design-class"); // Remove the class if it's not a "designe" project
                }

                // Slide out the old image (from opposite direction)
                gsap.to(galleryImg, {
                    y: movingDown ? "100%" : "-100%", // If moving down, slide out from bottom, else top
                    opacity: 0,
                    duration: 0.3,
                    ease: "power3.in",
                    onComplete: () => {
                        // Change the image source
                        galleryImg.src = newImgSrc;
                        // Slide in the new image (from the direction of movement)
                        gsap.fromTo(galleryImg, {
                            y: movingDown ? "-100%" : "100%", // Slide from top or bottom based on movement
                            opacity: 0
                        }, {
                            y: "0", // Move to the center
                            opacity: 1,
                            duration: 0.3,
                            ease: "power3.out"
                        });
                    }
                });

                // Change background color
                gsap.to(gallery, { backgroundColor: newBgColor, duration: 0.3 });
            });
        });
    }

    // Show on mouse enter
    listContainer.addEventListener("mouseenter", () => {
        gsap.to([cursor, gallery], { opacity: 1, scale: 1, duration: 0.3 });
        document.addEventListener("mousemove", moveElements);
    });

    // Hide on mouse leave
    listContainer.addEventListener("mouseleave", () => {
        gsap.to([cursor, gallery], { opacity: 0, scale: 0.5, duration: 0.3 });
        document.removeEventListener("mousemove", moveElements);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const rightContainer = document.querySelector(".swipe_right__project");
    const leftContainer = document.querySelector(".swipe_left__project");
    const projectItems = document.querySelectorAll(".project_iteme__galry");

    let translateXRight = -190; // Start slightly off-screen
    let translateXLeft = -150; // Start slightly off-screen
    let scrollSpeed = 0.5;
    let animationActive = false;

    // Apply initial positioning using CSS transform
    rightContainer.style.transform = `translateX(${translateXRight}px)`;
    leftContainer.style.transform = `translateX(${translateXLeft}px)`;

    // Intersection Observer to check visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animationActive = true; // Start animation when an item is visible
            }
        });
    }, { threshold: 0.2 });

    projectItems.forEach(item => observer.observe(item));

    // Scroll event listener
    window.addEventListener("wheel", function (event) {
        if (!animationActive) return;

        if (event.deltaY > 0) {
            translateXRight -= scrollSpeed;
            translateXLeft += scrollSpeed;
        } else {
            translateXRight += scrollSpeed;
            translateXLeft -= scrollSpeed;
        }

        rightContainer.style.transform = `translateX(${translateXRight}px)`;
        leftContainer.style.transform = `translateX(${translateXLeft}px)`;
    });
});







