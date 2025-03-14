document.addEventListener("DOMContentLoaded", function () {
    // Text to display during transitions
    const textArray = [
        "Hello", "Bonjour", "Hola", "Ciao", "こんにちは", 
        "Привет", "你好", "안녕하세요", "Olá", "مرحبا"
    ];
    
    let textIndex = 0;
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error("GSAP is not loaded. Please include the GSAP library.");
        return;
    }
    
    // Elements
    const mainContent = document.querySelector('main');
    const transitionWrapper = document.querySelector(".transition-wrapper");
    const changingText = document.getElementById("changing-text");
    
    // Initial state - hide the main content
    gsap.set(mainContent, {
        opacity: 0,
        y: 50,
        scale: 0.95
    });
    
    // Show transition wrapper
    gsap.to(transitionWrapper, { 
        opacity: 1, 
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: startTextAnimation
    });
    
    // Text animation function
    async function startTextAnimation() {
        // Text cycling animation
        for (let i = 0; i < 5; i++) {
            await typeText(changingText, textArray[textIndex]);
            textIndex = (textIndex + 1) % textArray.length;
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // Hide transition wrapper
        gsap.to(transitionWrapper, { 
            opacity: 0, 
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: showMainContent
        });
    }
    
    // Show main content
    function showMainContent() {
        // Animate in the main content
        gsap.to(mainContent, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
        });
        
        // Add extra animations for elements inside the page
        const heading = mainContent.querySelector('h1');
        const paragraph = mainContent.querySelector('p');
        const link = mainContent.querySelector('a');
        
        gsap.from([heading, paragraph, link], {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.5,
            ease: "power2.out"
        });
    }
    
    // Typing animation function
    async function typeText(element, text) {
        return new Promise(resolve => {
            element.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                } else {
                    setTimeout(resolve, 300);
                }
            }
            
            type();
        });
    }
});