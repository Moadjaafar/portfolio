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


// document.addEventListener("DOMContentLoaded", function () {
//     const cursor = document.querySelector(".new_curser");
//     const gallery = document.querySelector(".projects_gallery");
//     const galleryImg = gallery.querySelector("img");
//     const items = document.querySelectorAll(".project_iteme");
//     const listContainer = document.querySelector(".list_projectitems");

//     let lastY = 0; // Store the last Y position of the cursor

//     // Mousemove handler
//     function moveElements(e) {
//         const currentY = e.clientY;
//         const movingDown = currentY > lastY; // Determine if moving down or up
//         lastY = currentY; // Update the lastY position

//         // Move cursor
//         gsap.to(cursor, {
//             x: e.clientX,
//             y: e.clientY,
//             duration: 0.9,
//             ease: "power2.out"
//         });

//         // Move gallery (centered with delay)
//         gsap.to(gallery, {
//             x: e.clientX, 
//             y: e.clientY,
//             duration: 1.9, 
//             ease: "power3.out"
//         });

//         // Image change effect based on direction
//         items.forEach((item) => {
//             item.addEventListener("mouseenter", () => {
//                 const newImgSrc = item.getAttribute("data-img");
//                 const newBgColor = item.getAttribute("data-color") || "#fff"; // Default color if not provided
//                 const projectType = item.getAttribute("project-type"); // Get the project type

//                 // Check if the project type is "designe"
//                 if (projectType === "designe") {
//                     galleryImg.classList.add("design-class"); // Add the class if it's a "designe" project
//                 } else {
//                     galleryImg.classList.remove("design-class"); // Remove the class if it's not a "designe" project
//                 }

//                 // Slide out the old image (from opposite direction)
//                 gsap.to(galleryImg, {
//                     y: movingDown ? "100%" : "-100%", // If moving down, slide out from bottom, else top
//                     opacity: 0,
//                     duration: 0.3,
//                     ease: "power3.in",
//                     onComplete: () => {
//                         // Change the image source
//                         galleryImg.src = newImgSrc;
//                         // Slide in the new image (from the direction of movement)
//                         gsap.fromTo(galleryImg, {
//                             y: movingDown ? "-100%" : "100%", // Slide from top or bottom based on movement
//                             opacity: 0
//                         }, {
//                             y: "0", // Move to the center
//                             opacity: 1,
//                             duration: 0.3,
//                             ease: "power3.out"
//                         });
//                     }
//                 });

//                 // Change background color
//                 gsap.to(gallery, { backgroundColor: newBgColor, duration: 0.3 });
//             });
//         });
//     }

//     // Show on mouse enter
//     listContainer.addEventListener("mouseenter", () => {
//         gsap.to([cursor, gallery], { opacity: 1, scale: 1, duration: 0.3 });
//         document.addEventListener("mousemove", moveElements);
//     });

//     // Hide on mouse leave
//     listContainer.addEventListener("mouseleave", () => {
//         gsap.to([cursor, gallery], { opacity: 0, scale: 0.5, duration: 0.3 });
//         document.removeEventListener("mousemove", moveElements);
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".new_curser");
    const gallery = document.querySelector(".projects_gallery");
    const galleryImg = gallery.querySelector("img");
    const items = document.querySelectorAll(".project_iteme");
    const listContainer = document.querySelector(".list_projectitems");

    let lastY = 0;
    let lastX = 0;
    let ticking = false; // To throttle `mousemove` events

    // Move Elements (Throttled)
    function moveElements(e) {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentY = e.clientY;
                const movingDown = currentY > lastY;
                lastY = currentY;
                lastX = e.clientX;

                // Cursor animation
                gsap.to(cursor, {
                    x: lastX,
                    y: lastY,
                    duration: 0.6,
                    ease: "power2.out"
                });

                // Gallery movement (delayed for smoothness)
                gsap.to(gallery, {
                    x: lastX, 
                    y: lastY,
                    duration: 1.2, 
                    ease: "power3.out"
                });

                ticking = false; // Allow the next frame update
            });
            ticking = true;
        }
    }

    // Change Image & Background on Hover
    items.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            const newImgSrc = item.getAttribute("data-img");
            const newBgColor = item.getAttribute("data-color") || "#fff";
            const projectType = item.getAttribute("project-type");

            // Optimize image swap: Only update if necessary
            if (galleryImg.src !== newImgSrc) {
                gsap.to(galleryImg, {
                    y: lastY > window.innerHeight / 2 ? "100%" : "-100%",
                    opacity: 0,
                    duration: 0.3,
                    ease: "power3.in",
                    onComplete: () => {
                        galleryImg.src = newImgSrc;
                        gsap.fromTo(galleryImg, { y: "-100%", opacity: 0 }, { y: "0", opacity: 1, duration: 0.3, ease: "power3.out" });
                    }
                });
            }

            // Optimize background color change: Only update if different
            if (gallery.style.backgroundColor !== newBgColor) {
                gsap.to(gallery, { backgroundColor: newBgColor, duration: 0.3 });
            }

            // Toggle class efficiently
            galleryImg.classList.toggle("design-class", projectType === "designe");
        });
    });

    // Show Elements on Hover
    listContainer.addEventListener("mouseenter", () => {
        gsap.to([cursor, gallery], { opacity: 1, scale: 1, duration: 0.3 });
        document.addEventListener("mousemove", moveElements);
    });

    // Hide Elements on Mouse Leave
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



// Select the button element from the document
// const button = document.querySelector('.magnatic');

// // Get the button's bounding rectangle dimensions and position
// let boundingRect = button.getBoundingClientRect();

// // Add an event listener to the window to update the bounding rectangle dimensions
// // when the window is resized
// window.addEventListener('resize', () => {
//   boundingRect = button.getBoundingClientRect();
// });

// // Add an event listener for mouse movement over the button
// button.addEventListener('mousemove', (e) => {
//   // Calculate mouse position relative to the button
//   const mousePosX = e.x - boundingRect.left; // X position
//   const mousePosY = e.y - boundingRect.top;  // Y position
  
//   // Use GSAP (GreenSock Animation Platform) to animate the button
//   // This creates a 'magnetic' effect where the button moves towards the mouse
//   gsap.to(button, {
//     x: (mousePosX - boundingRect.width / 30) * 0.2, // Move horizontally towards mouse
//     y: (mousePosY - boundingRect.height / 30) * 0.2, // Move vertically towards mouse
//     duration: 0.8, // Duration of the animation
//     ease: 'power3.out', // Easing function for smooth animation
//   });
// });

// // Add an event listener for when the mouse leaves the button area
// button.addEventListener('mouseleave', () => {
//   // Animate the button back to its original position
//   gsap.to(button, {
//     x: 0, // Reset horizontal position
//     y: 0, // Reset vertical position
//     duration: 0.8, // Duration of the animation
//     ease: 'elastic.out(1,0.3)' // Easing function for a 'springy' return
//   });
// });


// document.getElementById("toggle-btn").addEventListener("click", function() {
//     const nav = document.querySelector(".nav_mobile");
    
//     // Check if the menu is currently off-screen
//     if (nav.style.right === "-100%" || nav.style.right === "") {
//         nav.style.right = "0"; // Slide in
//     } else {
//         nav.style.right = "-100%"; // Slide out
//     }
// });

// Get elements
// Get all toggle buttons
const toggleButtons = document.querySelectorAll('.toggle-btn');
const navMobile = document.querySelector('.nav_mobile');
const overlay = document.querySelector('.overlay2');

// Function to toggle nav and overlay
function toggleNav() {
    navMobile.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Add event listener to each toggle button
toggleButtons.forEach(button => {
    button.addEventListener('click', toggleNav);
});

// Close the nav and overlay when overlay is clicked
overlay.addEventListener('click', () => {
    navMobile.classList.remove('active');
    overlay.classList.remove('active');
});

// animation H1
document.addEventListener("DOMContentLoaded", function () {
    new Typed("#typed-text", {
      strings: ["graphic designer", "UI/UX Designer", "Creative"], // Change these as needed
      typeSpeed: 100, // Speed of typing
      backSpeed: 50, // Speed of deleting
      backDelay: 1500, // Delay before deleting
      loop: true, // Keep looping
      showCursor: true, // Show the blinking cursor
    });
  });


  // smouth scroll
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    mouseMultiplier: 2,
    smoothWheel: true,
    wheelMultiplier: 2,
    tablet: { smooth: false, breakpoint: 1024 },
    smartphone: { smooth: false, breakpoint: 768 }
  });
  let rafId;
  window.addEventListener('resize', () => {
    lenis.stop();
    clearTimeout(rafId);
    rafId = setTimeout(() => lenis.start(), 100);
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  window.scrollTo(0, 0);
  window.scrollToLenis = (target) => {
    lenis.scrollTo(target, {
      offset: 0,
      immediate: false,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  };
  window.stopLenis = () => lenis.stop();
  window.startLenis = () => lenis.start();

// toggel nav 
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".toggle_nav2");
    const targetSection = document.querySelector(".hero_section");

    // Ensure button starts hidden
    toggleBtn.classList.add("hidden");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    toggleBtn.classList.remove("hidden"); // Hide when in view
                } else {
                    toggleBtn.classList.add("hidden"); // Show when out of view
                }
            });
        },
        { threshold: 0.5 } // Adjust to trigger at 50% visibility
    );

    if (targetSection) {
        observer.observe(targetSection);
    }
});
// magnatic 

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin();

    document.querySelectorAll(".toggle_nav2").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = e.clientX - (left + width / 2);
            const y = e.clientY - (top + height / 2);

            gsap.to(btn, {
                x: x * 0.5,
                y: y * 0.5,
                duration: 0.3,
                ease: "power3.out",
            });
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power3.out",
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin();

    document.querySelectorAll(".magnatic").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = e.clientX - (left + width / 2);
            const y = e.clientY - (top + height / 2);

            gsap.to(btn, {
                x: x * 0.5,
                y: y * 0.5,
                duration: 0.3,
                ease: "power3.out",
            });
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power3.out",
            });
        });
    });
});