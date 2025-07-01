// filepath: c:\Users\HP\BIRTHDAY\script.js
document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect text array for slide 1
    const typewriterTexts = [
        "Why you should get Yomi an M3 MacBook Pro"
    ];
    
    // Typewriter effect text array for slide 2 (reasons)
    const reasonsTexts = [
        "21 is a special year",
        "An M3 is more than a gift, it is a future",
        "It would be a partner for years to come, increasing my productivity in tech ventures",
        "It was essential for completing my final year project",
        "Is is a necessary step for my skill and career progression",
        "Even this presentation was made with a Macbook"
    ];

    // Typewriter effect variables for slide 1
    const typewriterElement = document.getElementById('typewriter');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70; // milliseconds per character
    let holdTime = 2000; // time to hold the complete text
    
    // Typewriter effect variables for slide 2 (reasons)
    const typewriterReasonsElement = document.getElementById('typewriter-reasons');
    let reasonsTextIndex = 0;
    let reasonsCharIndex = 0;
    let isReasonDeleting = false;
    let reasonsTypingSpeed = 50; // milliseconds per character
    let reasonsHoldTime = 3000; // time to hold the complete reason

    // Slideshow variables
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;
    let autoScrollInterval;
    const autoScrollDelay = 30000; // 30 seconds between slides

    // Create dots for navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Typewriter effect function for slide 1
    function typeWriter() {
        const currentText = typewriterTexts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentText.substring(0, charIndex);
            charIndex--;
            typingSpeed = 30; // Faster when deleting
            
            if (charIndex < 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typewriterTexts.length;
                charIndex = 0;
                typingSpeed = 70; // Reset typing speed
                setTimeout(typeWriter, 500); // Pause before typing next text
                return;
            }
        } else {
            // Typing text
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            // If we've typed the full text, hold then start deleting
            if (charIndex === currentText.length) {
                isDeleting = false;
                setTimeout(() => {
                    // Since we only have one message, don't delete it after typing
                    // instead, add a subtle pulse animation
                    typewriterElement.style.animation = "pulse 1.5s infinite";
                }, holdTime);
                return;
            }
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Typewriter effect function for slide 2 (reasons)
    function typeWriterReasons() {
        // Only run this function when slide 2 is active
        if (!slides[1].classList.contains('active')) {
            setTimeout(typeWriterReasons, 500);
            return;
        }
        
        const currentReason = reasonsTexts[reasonsTextIndex];
        
        if (isReasonDeleting) {
            // Deleting text
            typewriterReasonsElement.textContent = currentReason.substring(0, reasonsCharIndex);
            reasonsCharIndex--;
            reasonsTypingSpeed = 20; // Faster when deleting
            
            if (reasonsCharIndex < 0) {
                isReasonDeleting = false;
                reasonsTextIndex = (reasonsTextIndex + 1) % reasonsTexts.length;
                reasonsCharIndex = 0;
                reasonsTypingSpeed = 50; // Reset typing speed
                setTimeout(typeWriterReasons, 500); // Pause before typing next text
                return;
            }
        } else {
            // Typing text
            typewriterReasonsElement.textContent = currentReason.substring(0, reasonsCharIndex + 1);
            reasonsCharIndex++;
            
            // If we've typed the full text, hold then start deleting
            if (reasonsCharIndex === currentReason.length) {
                isReasonDeleting = false;
                setTimeout(() => {
                    isReasonDeleting = true;
                    typeWriterReasons();
                }, reasonsHoldTime);
                return;
            }
        }
        
        setTimeout(typeWriterReasons, reasonsTypingSpeed);
    }

    // Slideshow navigation functions
    function goToSlide(index) {
        // Clear existing active classes
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
        
        // Set new active slide
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');
        
        // Reset auto-scroll timer
        resetAutoScroll();
        
        // Reset and start the reasons typewriter if going to slide 2
        if (currentSlide === 1) {
            reasonsTextIndex = 0;
            reasonsCharIndex = 0;
            isReasonDeleting = false;
            typewriterReasonsElement.textContent = '';
            setTimeout(typeWriterReasons, 500);
        }
    }

    function goToNextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        goToSlide(newIndex);
    }

    function goToPrevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
    }

    // Setup auto-scrolling
    function startAutoScroll() {
        autoScrollInterval = setInterval(goToNextSlide, autoScrollDelay);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        goToPrevSlide();
    });

    nextBtn.addEventListener('click', () => {
        goToNextSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        }
    });

    // Start the typewriter effects
    setTimeout(typeWriter, 1000);
    setTimeout(typeWriterReasons, 1000);

    // Start auto-scrolling
    startAutoScroll();
});
