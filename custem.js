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

document.addEventListener("DOMContentLoaded", function () {
     // Only run animations if the viewport width is 767px or more
    if (window.innerWidth < 767) {
        return;
    }
    const cursor = document.querySelector(".new_curser");
    const gallery = document.querySelector(".projects_gallery");
    // Only query for an image if the gallery exists.
    const galleryImg = gallery ? gallery.querySelector("img") : null;
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
          lastY = currentY;
          lastX = e.clientX;
  
          // Animate the cursor if it exists.
          if (cursor) {
            gsap.to(cursor, {
              x: lastX,
              y: lastY,
              duration: 0.6,
              ease: "power2.out"
            });
          }
  
          // Animate the gallery if it exists.
          if (gallery) {
            gsap.to(gallery, {
              x: lastX,
              y: lastY,
              duration: 1.2,
              ease: "power3.out"
            });
          }
  
          ticking = false; // Allow the next frame update
        });
        ticking = true;
      }
    }
  
    // Change Image & Background on Hover for each project item
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const newImgSrc = item.getAttribute("data-img");
        const newBgColor = item.getAttribute("data-color") || "#fff";
        const projectType = item.getAttribute("project-type");
  
        if (galleryImg && gallery) {
          // Optimize image swap: Only update if necessary
          if (galleryImg.src !== newImgSrc) {
            gsap.to(galleryImg, {
              y: lastY > window.innerHeight / 2 ? "100%" : "-100%",
              opacity: 0,
              duration: 0.3,
              ease: "power3.in",
              onComplete: () => {
                galleryImg.src = newImgSrc;
                gsap.fromTo(
                  galleryImg,
                  { y: "-100%", opacity: 0 },
                  { y: "0", opacity: 1, duration: 0.3, ease: "power3.out" }
                );
              }
            });
          }
  
          // Optimize background color change: Only update if different
          if (gallery.style.backgroundColor !== newBgColor) {
            gsap.to(gallery, { backgroundColor: newBgColor, duration: 0.3 });
          }
        }
  
        // Toggle class efficiently on the image if it exists.
        if (galleryImg) {
          galleryImg.classList.toggle("design-class", projectType === "designe");
        }
      });
    });
  
    // Attach events for showing/hiding elements, only if the list container exists.
    if (listContainer) {
      listContainer.addEventListener("mouseenter", () => {
        if (cursor && gallery) {
          gsap.to([cursor, gallery], { opacity: 1, scale: 1, duration: 0.3 });
        }
        document.addEventListener("mousemove", moveElements);
      });
  
      listContainer.addEventListener("mouseleave", () => {
        if (cursor && gallery) {
          gsap.to([cursor, gallery], { opacity: 0, scale: 0.5, duration: 0.3 });
        }
        document.removeEventListener("mousemove", moveElements);
      });
    }
});
  
document.addEventListener("DOMContentLoaded", function () {
    const rightContainer = document.querySelector(".swipe_right__project");
    const leftContainer = document.querySelector(".swipe_left__project");
    
    // Set initial positions
    gsap.set(rightContainer, { x: -190 });
    gsap.set(leftContainer, { x: -250 });
    
    // Scroll listener
    window.addEventListener("wheel", function(event) {
      if (event.deltaY > 0) {
        gsap.to(rightContainer, { x: "-=9", ease: "power2.out" });
        gsap.to(leftContainer, { x: "+=9", ease: "power2.out" });
      } else {
        gsap.to(rightContainer, { x: "+=9", ease: "power2.out" });
        gsap.to(leftContainer, { x: "-=9", ease: "power2.out" });
      }
    });
});
  
// Get all toggle buttons
const toggleButtons = document.querySelectorAll('.toggle-btn');
const navMobile = document.querySelector('.nav_mobile');
const overlay = document.querySelector('.overlay2');
const toggleBtn = document.querySelector(".toggle_nav2");

function toggleNav() {
    navMobile.classList.toggle('active');
    overlay.classList.toggle('active');
    toggleBtn.classList.add("show");
    // Check if navMobile is active, then update toggleBtn
    if (navMobile.classList.contains('active')) {
        toggleBtn.classList.add('open');
    } else {
        toggleBtn.classList.remove('open');
    }
    // Toggle class to change the button into "X"
}

// Add event listener to each toggle button
toggleButtons.forEach(button => {
    button.addEventListener('click', toggleNav);
});

// Close nav when clicking on overlay
overlay.addEventListener('click', () => {
    navMobile.classList.remove('active');
    overlay.classList.remove('active');
    
    // Ensure all buttons revert back
    toggleButtons.forEach(button => button.classList.remove('open'));
});


// animation H1
document.addEventListener("DOMContentLoaded", function () { 
    const typedEl = document.querySelector("#typed-text");
    if (typedEl) {
      new Typed("#typed-text", {
        strings: ["graphic designer", "UI/UX Designer", "Creative"], // Change these as needed
        typeSpeed: 100, // Speed of typing
        backSpeed: 50, // Speed of deleting
        backDelay: 1500, // Delay before deleting
        loop: true, // Keep looping
        showCursor: true, // Show the blinking cursor
      });
    } else {
      console.warn('Element with ID "#typed-text" was not found.');
    }
});
  

// toggel nav 
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".toggle_nav2");
    const targetSection = document.querySelector(".hero_section");
  
    // Check if toggleBtn exists before proceeding
    if (!toggleBtn) {
      console.warn('Element with class ".toggle_nav2" not found.');
      return;
    }
  
    // Initial state: adjust based on current scroll position (fallback logic)
    if (window.scrollY > 500) {
      toggleBtn.classList.add("show");
    } else {
      toggleBtn.classList.remove("show");
    }
  
    // If the hero_section exists, use IntersectionObserver
    if (targetSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When the target section is at least 50% visible, hide the button.
            // Otherwise, show the button.
            if (entry.isIntersecting) {
              toggleBtn.classList.remove("show");
            } else {
              toggleBtn.classList.add("show");
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% of targetSection is visible
      );
      observer.observe(targetSection);
    } else {
      // Fallback: if targetSection doesn't exist, show/hide button based on scroll position
      window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
          toggleBtn.classList.add("show");
        } else {
          toggleBtn.classList.remove("show");
        }
      });
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
// genrale magnatic 
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin();

    // Apply to all elements with class .magnatic
    document.querySelectorAll(".magnatic__gn").forEach((btn) => {
        // Mouse move event for magnetic effect
        btn.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = e.clientX - (left + width / 2); // X position of mouse relative to button center
            const y = e.clientY - (top + height / 2);  // Y position of mouse relative to button center

            // GSAP animation to move the button
            gsap.to(btn, {
                x: x * 0.5, // Multiply movement for magnetic effect
                y: y * 0.5,
                duration: 0.3, // Smooth movement
                ease: "power3.out", // Easing function for smooth effect
            });
        });

        // Mouse leave event to reset the button position
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0, // Reset to initial position
                y: 0,
                duration: 0.3, // Smooth reset
                ease: "power3.out", // Easing function
            });
        });
    });
});
//bottom div footer 

//--------------splid swiper
document.addEventListener('DOMContentLoaded', function () {
    const phoneSliderEl = document.querySelector('#phone-slider');
    if (phoneSliderEl) {
      new Splide('#phone-slider', {
        type: 'slide',
        perPage: 3,
        perMove: 1,
        gap: '5rem',
        breakpoints: {
            1200: { perPage: 3, gap: '4rem' },
            992:  { perPage: 2, gap: '3rem' },
            768: { perPage: 1 }
        }
      }).mount();
    } else {
      console.warn('Element with ID "#phone-slider" was not found.');
    }
  });
  
function initScrollTriggers() {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger is not loaded.');
      return;
    }
  
    // Check if the footer container exists
    const footerContainer = document.querySelector('.footer-container');
    if (!footerContainer) {
      console.warn('Element with class ".footer-container" not found.');
      return;
    }
  
    // Set initial state of the footer container
    gsap.set(footerContainer, { yPercent: -50 });
  
    // Create the timeline for the uncover animation
    const uncover = gsap.timeline({ paused: true });
    uncover.to(footerContainer, { yPercent: 0, ease: 'none' });
  
    // Check if the trigger element (main) exists
    const mainElement = document.querySelector('main');
    if (!mainElement) {
      console.warn('Main element not found.');
      return;
    }
  
    // Create the ScrollTrigger instance
    ScrollTrigger.create({
      trigger: mainElement,
      // markers: true,
      start: 'bottom bottom',
      end: '+=95%',
      animation: uncover,
      scrub: true,
    });
  
// Optionally restart the animation if needed:
// uncover.restart();
}

initScrollTriggers();

// FOOTER ANIMATIONS 
document.addEventListener("DOMContentLoaded", () => {
    // Check that GSAP and ScrollTrigger are loaded
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP or ScrollTrigger is not loaded.");
      return;
    }
    
    // Select the elements: your rounded footer and the footer itself as trigger
    const roundedFooter = document.querySelector(".rounded_footer");
    const footer = document.querySelector("footer");
    
    if (!roundedFooter) {
      console.warn("Element with class '.rounded_footer' not found.");
      return;
    }
    
    if (!footer) {
      console.warn("Footer element not found.");
      return;
    }
    
    // Define the maximum (grown) height you want for the element
    const grownHeight = 150; // Adjust this value as needed
    
    // Set the initial state of the rounded footer (grown height)
    gsap.set(roundedFooter, { height: grownHeight });
    

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",  // when the top of the footer enters the bottom of the viewport
        end: "bottom top",    // when the bottom of the footer leaves the top of the viewport
        scrub: 0.5,             // smooth transition over 2 seconds (adjust as needed)
        markers: false,        // enable markers for debugging; remove or set to false in production
      }
    });
    
    tl.to(roundedFooter, { height: 0, ease: "power2.out" })
      .to(roundedFooter, { height: grownHeight, ease: "power2.out" });
      // Function to update the translateY based on the current height of rounded_footer
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll("video");

    if (videos.length === 0) {
        console.warn("No videos found on the page.");
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 }); // Video plays when 50% is visible

    videos.forEach(video => observer.observe(video));
});
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".mouv-xy").forEach((el) => {
        let lastScrollTop = window.scrollY;

        ScrollTrigger.create({
            trigger: el,
            start: "top bottom", // Start animation when the element enters the viewport
            end: "bottom top", // Stop when the element leaves the viewport
            onUpdate: (self) => {
                let currentScrollTop = window.scrollY;
                let scrollDirection = currentScrollTop > lastScrollTop ? -1 : 1; // 1 = scrolling down, -1 = scrolling up
                lastScrollTop = currentScrollTop;

                gsap.to(el, {
                    y: `+=${1.5 * scrollDirection}`, // Move 5px up or down
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    function initButtonAnimation(selector, options) {
      const buttons = document.querySelectorAll(selector);
      
      buttons.forEach(button => {
        let circle = document.createElement('div');
        circle.classList.add('circle');
        button.appendChild(circle);
        
        let isAnimating = false;
        let enterAnimationCompleted = false;
        let pendingReset = false;
        
        function completeEnterAnimation() {
          enterAnimationCompleted = true;
          if (pendingReset) {
            resetAnimation();
          }
        }
        
        function resetAnimation() {
          // Reset button text color to its default
          button.style.transition = 'color 0.4s ease';
          button.style.color = options.defaultTextColor;
          
          // Fade out the circle
          circle.style.transition = 'opacity 0.3s ease';
          circle.style.opacity = '0';
          
          setTimeout(() => {
            isAnimating = false;
            enterAnimationCompleted = false;
            pendingReset = false;
            circle.style.borderRadius = '50%';
          }, 300);
        }
        
        button.addEventListener('mouseenter', function(e) {
          if (isAnimating) return;
          isAnimating = true;
          enterAnimationCompleted = false;
          pendingReset = false;
          
          // Reset circle initial state
          circle.style.transition = '';
          circle.style.width = '20px';
          circle.style.height = '20px';
          circle.style.left = '50%';
          circle.style.bottom = '0';
          circle.style.transform = 'translate(-50%, 100%)';
          circle.style.opacity = '1';
          circle.style.zIndex = '10';
          // Set the circle background color from options
          circle.style.backgroundColor = options.circleColor;
          
          // First animation: move to center
          setTimeout(() => {
            circle.style.transition = 'transform 0.3s ease';
            circle.style.transform = 'translate(-50%, -50%)';
            circle.style.top = '50%';
            
            // Second animation: expand to cover the button
            setTimeout(() => {
              // Move behind the button text as it expands
              circle.style.zIndex = '-1';
              circle.style.transition = 'width 0.4s ease, height 0.4s ease, border-radius 0.4s ease';
              circle.style.width = '100%';
              circle.style.height = '100%';
              circle.style.borderRadius = '0';
              
              // Change the button text color to the hover color
              button.style.transition = 'color 0.4s ease';
              button.style.color = options.hoverTextColor;
              
              // Mark the enter animation as completed after expansion finishes
              setTimeout(completeEnterAnimation, 400);
            }, 300);
          }, 10);
        });
        
        button.addEventListener('mouseleave', function() {
          if (!enterAnimationCompleted) {
            pendingReset = true;
          } else {
            resetAnimation();
          }
        });
      });
    }
    
    // Initialize animation for the primary buttons
    initButtonAnimation('.primary_btnv2', {
      defaultTextColor: 'var(--light-color)', // default text color
      hoverTextColor: '#000',                // hover text color for primary buttons
      circleColor: '#4BFFA5'                 // circle color for primary buttons (blue, for example)
    });
    
    // Initialize animation for secondary buttons with different colors
    initButtonAnimation('.animation__secondary', {
      defaultTextColor: 'var(--secondary-light-color)', // default text color for secondary
      hoverTextColor: '#4BFFA5',                           // hover text color for secondary buttons
      circleColor: '#000'                            // circle color for secondary buttons (red, for example)
    });
  });
  


