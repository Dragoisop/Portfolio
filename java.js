// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slide = document.querySelector('.slide');
    let items = document.querySelectorAll('.slide .item');
    let activeIndex = 1; // Active item is the second one (index 1)
    
    // Set initial positions
    function setupCarousel() {
        const totalItems = items.length;
        const angleIncrement = 360 / totalItems;
        
        activeIndex = Math.floor(totalItems / 2); // Middle item is active
        
        updateCarousel();
    }
    
    // Update the carousel when active index changes
    function updateCarousel() {
        positionItems();
        
        // Update carousel responsiveness based on screen width
        updateResponsiveness();
    }
    
    // Position all items based on active index
    function positionItems() {
        items.forEach((item, index) => {
            // Reset item styles
            item.style.transition = 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
            item.style.opacity = '1';
            item.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
            item.classList.remove('active'); // Remove active class from all items
            
            // Calculate position relative to active item
            const relativeIndex = getRelativeIndex(index);
            
            // Position and style each item based on its relative position to active item
            if (relativeIndex === 0) { // Active item
                item.style.zIndex = '10';
                item.style.left = '50%';
                item.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.1) translateX(-50%)';
                item.style.filter = 'brightness(1.1) contrast(1.0)';
                item.classList.add('active'); // Add active class to current active item
                
                // Show content for active item
                const content = item.querySelector('.content');
                if (content) {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }
                
                // Set up View button click to same function as Watch Reel
                const viewButton = item.querySelector('.view-button');
                const watchButton = item.querySelector('.content button');
                if (viewButton && watchButton) {
                    viewButton.onclick = function() {
                        watchButton.click(); // Trigger the Watch Reel button click
                    };
                }
            } 
            else if (relativeIndex === -1) { // Left of active
                item.style.zIndex = '5';
                item.style.left = '30%';
                item.style.transform = 'perspective(1000px) rotateY(15deg) scale(0.9) translateX(-50%)';
                item.style.filter = 'brightness(0.7) blur(1px)';
                hideContent(item);
            } 
            else if (relativeIndex === 1) { // Right of active
                item.style.zIndex = '5';
                item.style.left = '70%';
                item.style.transform = 'perspective(1000px) rotateY(-15deg) scale(0.9) translateX(-50%)';
                item.style.filter = 'brightness(0.7) blur(1px)';
                hideContent(item);
            } 
            else if (relativeIndex === -2) { // Far left
                item.style.zIndex = '1';
                item.style.left = '15%';
                item.style.transform = 'perspective(1000px) rotateY(30deg) scale(0.7) translateX(-50%)';
                item.style.filter = 'brightness(0.5) blur(2px)';
                hideContent(item);
            } 
            else if (relativeIndex === 2) { // Far right
                item.style.zIndex = '1';
                item.style.left = '85%';
                item.style.transform = 'perspective(1000px) rotateY(-30deg) scale(0.7) translateX(-50%)';
                item.style.filter = 'brightness(0.5) blur(2px)';
                hideContent(item);
            } 
            else { // Off-screen items
                item.style.zIndex = '0';
                item.style.left = relativeIndex < 0 ? '0%' : '100%';
                item.style.transform = `perspective(1000px) rotateY(${relativeIndex < 0 ? '40deg' : '-40deg'}) scale(0.5) translateX(-50%)`;
                item.style.opacity = '0';
                hideContent(item);
            }
        });
        
        // Refresh slide height based on the active item
        const activeItem = items[activeIndex];
        if (activeItem) {
            slide.style.height = `${activeItem.offsetHeight * 1.2}px`; // Increased height to accommodate View button
        }
    }
    
    // Hide content for non-active items
    function hideContent(item) {
        const content = item.querySelector('.content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
        }
    }
    
    // Calculate relative position to active item
    function getRelativeIndex(index) {
        return index - activeIndex;
    }
    
    // Go to next slide
    function goToNext() {
        activeIndex = (activeIndex + 1) % items.length;
        positionItems();
        addParticleEffect();
    }
    
    // Go to previous slide
    function goToPrev() {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        positionItems();
        addParticleEffect();
    }
    
    // Add a creative particle effect when changing slides
    function addParticleEffect() {
        // Create a container for particles
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        slide.appendChild(particleContainer);
        
        // Create multiple particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position, size and color
            const size = Math.random() * 10 + 5;
            const xPos = Math.random() * 100;
            const yPos = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const duration = Math.random() * 1 + 1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${xPos}%`;
            particle.style.top = `${yPos}%`;
            particle.style.background = Math.random() > 0.5 ? 
                'var(--primary-color)' : 'var(--secondary-color)';
            particle.style.animation = `particleFade ${duration}s ease-out ${delay}s forwards`;
            
            particleContainer.appendChild(particle);
        }
        
        // Remove particles after animation completes
        setTimeout(() => {
            slide.removeChild(particleContainer);
        }, 2500);
    }
    
    // Add particle animation style
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particle-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 100;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            border-radius: 50%;
            opacity: 0;
            transform: scale(0);
        }
        
        @keyframes particleFade {
            0% {
                opacity: 0.8;
                transform: scale(0) translateY(0);
            }
            100% {
                opacity: 0;
                transform: scale(1.5) translateY(-100px);
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Event listeners
    next.addEventListener('click', function() {
        goToNext();
    });
    
    prev.addEventListener('click', function() {
        goToPrev();
    });
    
    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    slide.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    
    slide.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance
        if (touchEndX < touchStartX - threshold) {
            goToNext(); // Swipe left, go next
        } else if (touchEndX > touchStartX + threshold) {
            goToPrev(); // Swipe right, go previous
        }
    }
    
    // Auto slide functionality
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(goToNext, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Item click functionality
    items.forEach((item, index) => {
        item.addEventListener('click', function() {
            const relativeIndex = getRelativeIndex(index);
            if (relativeIndex !== 0) { // If not already active
                if (relativeIndex > 0) {
                    // Move forward the right number of times
                    for (let i = 0; i < relativeIndex; i++) {
                        setTimeout(() => goToNext(), i * 200);
                    }
                } else {
                    // Move backward the right number of times
                    for (let i = 0; i < Math.abs(relativeIndex); i++) {
                        setTimeout(() => goToPrev(), i * 200);
                    }
                }
            }
        });
    });
    
    // Initialize
    setupCarousel();
    
    // Handle window resize for responsiveness
    window.addEventListener('resize', debounce(function() {
        updateResponsiveness();
    }, 150));
    
    // Debounce function to limit resize event calls
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
    }
    
    // Stop auto slide on hover
    slide.addEventListener('mouseenter', stopAutoSlide);
    slide.addEventListener('mouseleave', function() {
        // Don't restart auto-slide on mouse leave per user request
        // startAutoSlide();
    });

    // Video modal functionality
    const videoButtons = document.querySelectorAll('.item button');
    const modal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModal = document.querySelector('.close-modal');
    
    videoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering item click
            const videoUrl = this.getAttribute('data-video');
            
            // Create container for the content
            const videoContainer = document.querySelector('.video-container');
            videoContainer.innerHTML = ''; // Clear previous content
            
            // Check if it's a local video file (doesn't start with http)
            if (!videoUrl.startsWith('http')) {
                // Create video element for local videos
                const videoElement = document.createElement('video');
                videoElement.className = 'local-video';
                videoElement.src = videoUrl;
                videoElement.controls = true;
                videoElement.autoplay = true;
                videoElement.style.width = '100%';
                videoElement.style.height = '100%';
                videoElement.style.objectFit = 'contain';
                // Add contrast enhancement only
                videoElement.style.filter = 'contrast(1.1)';
                
                // Add a video wrapper for enhanced styling
                const videoWrapper = document.createElement('div');
                videoWrapper.className = 'video-wrapper';
                videoWrapper.style.position = 'absolute';
                videoWrapper.style.top = '0';
                videoWrapper.style.left = '0';
                videoWrapper.style.width = '100%';
                videoWrapper.style.height = '100%';
                videoWrapper.style.borderRadius = '18px';
                videoWrapper.style.overflow = 'hidden';
                videoWrapper.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8)';
                
                // Add gradient border effect
                const borderEffect = document.createElement('div');
                borderEffect.className = 'video-border-effect';
                borderEffect.style.position = 'absolute';
                borderEffect.style.top = '-3px';
                borderEffect.style.left = '-3px';
                borderEffect.style.right = '-3px';
                borderEffect.style.bottom = '-3px';
                borderEffect.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
                borderEffect.style.borderRadius = '22px';
                borderEffect.style.zIndex = '-1';
                borderEffect.style.opacity = '0.6';
                borderEffect.style.animation = 'videoBorderGlow 3s infinite alternate';
                
                // Add keyframe animation if not already present
                if (!document.getElementById('video-animations-style')) {
                    const animStyle = document.createElement('style');
                    animStyle.id = 'video-animations-style';
                    animStyle.textContent = `
                        @keyframes videoBorderGlow {
                            0% { opacity: 0.4; filter: blur(6px); }
                            100% { opacity: 0.8; filter: blur(3px); }
                        }
                    `;
                    document.head.appendChild(animStyle);
                }
                
                // Add elements to the container
                videoContainer.appendChild(borderEffect);
                videoWrapper.appendChild(videoElement);
                videoContainer.appendChild(videoWrapper);
                
                // Error handling for missing videos
                videoElement.addEventListener('error', function() {
                    // Create error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'video-missing';
                    errorMessage.innerHTML = `
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Video not found. Please make sure the file "${videoUrl}" exists in the correct location.</p>
                    `;
                    
                    // Replace video with error message
                    videoContainer.innerHTML = '';
                    videoContainer.appendChild(errorMessage);
                });
            }
            // Check for Instagram links
            else if (videoUrl.includes('instagram.com')) {
                // For Instagram, we'll create a different display
                const instagramLink = document.createElement('a');
                instagramLink.href = videoUrl;
                instagramLink.target = '_blank';
                instagramLink.className = 'instagram-link';
                instagramLink.innerHTML = `
                    <div class="instagram-preview">
                        <i class="fab fa-instagram"></i>
                        <p>View on Instagram</p>
                    </div>
                `;
                videoContainer.appendChild(instagramLink);
                
                // Add Instagram preview style if not already added
                if (!document.getElementById('instagram-preview-style')) {
                    const instagramStyle = document.createElement('style');
                    instagramStyle.id = 'instagram-preview-style';
                    instagramStyle.textContent = `
                        .instagram-preview {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
                            padding: 40px;
                            border-radius: 10px;
                            color: white;
                            text-align: center;
                            height: 100%;
                            min-height: 300px;
                            transition: all 0.3s ease;
                        }
                        
                        .instagram-preview:hover {
                            transform: scale(1.02);
                        }
                        
                        .instagram-preview i {
                            font-size: 4rem;
                            margin-bottom: 20px;
                        }
                        
                        .instagram-preview p {
                            font-size: 1.5rem;
                            font-weight: bold;
                        }
                        
                        .instagram-link {
                            display: block;
                            width: 100%;
                            height: 100%;
                            text-decoration: none;
                        }
                    `;
                    document.head.appendChild(instagramStyle);
                }
            }
            // Check for YouTube links and format properly for embedding if needed
            else if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com/shorts')) {
                // Extract video ID from YouTube URL
                let videoId = '';
                if (videoUrl.includes('youtube.com/watch')) {
                    videoId = new URL(videoUrl).searchParams.get('v');
                } else if (videoUrl.includes('youtu.be')) {
                    videoId = videoUrl.split('/').pop().split('?')[0];
                } else if (videoUrl.includes('youtube.com/shorts')) {
                    const parts = videoUrl.split('/shorts/');
                    if (parts[1]) {
                        videoId = parts[1].split('?')[0];
                    }
                }
                
                if (videoId) {
                    const embeddedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&origin=${location.origin}`;
                    
                    // Create iframe for YouTube videos
                    const iframe = document.createElement('iframe');
                    iframe.id = 'video-frame';
                    iframe.src = embeddedUrl;
                    iframe.frameBorder = "0";
                    iframe.allowFullscreen = true;
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                    iframe.setAttribute('playsinline', '1');
                    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                    
                    // Add same styling elements as for local videos
                    // Add a video wrapper for enhanced styling
                    const videoWrapper = document.createElement('div');
                    videoWrapper.className = 'video-wrapper';
                    videoWrapper.style.position = 'absolute';
                    videoWrapper.style.top = '0';
                    videoWrapper.style.left = '0';
                    videoWrapper.style.width = '100%';
                    videoWrapper.style.height = '100%';
                    videoWrapper.style.borderRadius = '18px';
                    videoWrapper.style.overflow = 'hidden';
                    
                    // Add gradient border effect
                    const borderEffect = document.createElement('div');
                    borderEffect.className = 'video-border-effect';
                    borderEffect.style.position = 'absolute';
                    borderEffect.style.top = '-3px';
                    borderEffect.style.left = '-3px';
                    borderEffect.style.right = '-3px';
                    borderEffect.style.bottom = '-3px';
                    borderEffect.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
                    borderEffect.style.borderRadius = '22px';
                    borderEffect.style.zIndex = '-1';
                    borderEffect.style.opacity = '0.6';
                    borderEffect.style.animation = 'videoBorderGlow 3s infinite alternate';
                    
                    // Add elements to the container
                    videoContainer.appendChild(borderEffect);
                    videoWrapper.appendChild(iframe);
                    videoContainer.appendChild(videoWrapper);
                }
            } 
            // If it's already an embed URL, use it directly
            else if (!videoUrl.includes('/embed/') && videoUrl.includes('youtube.com')) {
                const base = videoUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/');
                const hasQuery = base.includes('?');
                const embeddedUrl = `${base}${hasQuery ? '&' : '?'}autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&origin=${location.origin}`;
                
                // Create iframe for YouTube videos
                const iframe = document.createElement('iframe');
                iframe.id = 'video-frame';
                iframe.src = embeddedUrl;
                iframe.frameBorder = "0";
                iframe.allowFullscreen = true;
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                iframe.setAttribute('playsinline', '1');
                iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                
                // Add same styling elements as for local videos
                // Add a video wrapper for enhanced styling
                const videoWrapper = document.createElement('div');
                videoWrapper.className = 'video-wrapper';
                videoWrapper.style.position = 'absolute';
                videoWrapper.style.top = '0';
                videoWrapper.style.left = '0';
                videoWrapper.style.width = '100%';
                videoWrapper.style.height = '100%';
                videoWrapper.style.borderRadius = '18px';
                videoWrapper.style.overflow = 'hidden';
                
                // Add gradient border effect
                const borderEffect = document.createElement('div');
                borderEffect.className = 'video-border-effect';
                borderEffect.style.position = 'absolute';
                borderEffect.style.top = '-3px';
                borderEffect.style.left = '-3px';
                borderEffect.style.right = '-3px';
                borderEffect.style.bottom = '-3px';
                borderEffect.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
                borderEffect.style.borderRadius = '22px';
                borderEffect.style.zIndex = '-1';
                borderEffect.style.opacity = '0.6';
                borderEffect.style.animation = 'videoBorderGlow 3s infinite alternate';
                
                // Add elements to the container
                videoContainer.appendChild(borderEffect);
                videoWrapper.appendChild(iframe);
                videoContainer.appendChild(videoWrapper);
            }
            else {
                // For other video sources, use the iframe
                const iframe = document.createElement('iframe');
                iframe.id = 'video-frame';
                iframe.src = videoUrl;
                iframe.frameBorder = "0";
                iframe.allowFullscreen = true;
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                iframe.setAttribute('playsinline', '1');
                iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                
                // Add same styling elements as for local videos
                // Add a video wrapper for enhanced styling
                const videoWrapper = document.createElement('div');
                videoWrapper.className = 'video-wrapper';
                videoWrapper.style.position = 'absolute';
                videoWrapper.style.top = '0';
                videoWrapper.style.left = '0';
                videoWrapper.style.width = '100%';
                videoWrapper.style.height = '100%';
                videoWrapper.style.borderRadius = '18px';
                videoWrapper.style.overflow = 'hidden';
                
                // Add gradient border effect
                const borderEffect = document.createElement('div');
                borderEffect.className = 'video-border-effect';
                borderEffect.style.position = 'absolute';
                borderEffect.style.top = '-3px';
                borderEffect.style.left = '-3px';
                borderEffect.style.right = '-3px';
                borderEffect.style.bottom = '-3px';
                borderEffect.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
                borderEffect.style.borderRadius = '22px';
                borderEffect.style.zIndex = '-1';
                borderEffect.style.opacity = '0.6';
                borderEffect.style.animation = 'videoBorderGlow 3s infinite alternate';
                
                // Add elements to the container
                videoContainer.appendChild(borderEffect);
                videoWrapper.appendChild(iframe);
                videoContainer.appendChild(videoWrapper);
            }
            
            // Display the modal with animation
            modal.classList.add('active');
            setTimeout(() => {
                modal.querySelector('.modal-content').style.transform = 'translateY(0) scale(1)';
                modal.querySelector('.modal-content').style.opacity = '1';
            }, 10);
            
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            stopAutoSlide(); // Stop auto slide when modal is open
        });
    });
    
    closeModal.addEventListener('click', function() {
        closeVideoModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    
    function closeVideoModal() {
        modal.querySelector('.modal-content').style.transform = 'translateY(50px) scale(0.9)';
        modal.querySelector('.modal-content').style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('active');
            const videoContainer = document.querySelector('.video-container');
            videoContainer.innerHTML = ''; // Clear content
            document.body.style.overflow = 'auto'; // Enable scrolling
            // startAutoSlide(); - Auto-slide disabled per user request
        }, 300);
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
            // Toggle icon based on menu state
            const icon = this.querySelector('i');
        if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
        } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = nav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Adjust carousel for mobile devices
    if (isMobileDevice()) {
        // Ensure carousel is properly sized
        updateResponsiveness();
        
        // Reduce the animation duration for mobile
        items.forEach(item => {
            item.style.transition = 'all 0.5s ease';
        });
        
        // Make card dimensions more mobile-friendly
        const contentElements = document.querySelectorAll('.content');
        contentElements.forEach(content => {
            content.style.bottom = '20px';
            content.style.left = '20px';
        });
        
        // Adjust names and descriptions for better mobile display
        const nameElements = document.querySelectorAll('.content .name');
        nameElements.forEach(name => {
            name.style.fontSize = '1.5rem';
            name.style.marginBottom = '5px';
        });
        
        // Ensure buttons are the right size for touch
        const contentButtons = document.querySelectorAll('.content button');
        contentButtons.forEach(button => {
            button.style.padding = '10px 20px';
            button.style.fontSize = '0.85rem';
        });
    }

    // Rest of the code unchanged
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '15px 5%';
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.padding = '20px 5%';
            header.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });
    
    // Add cool animations for Portfolio and Services sections
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const nav = document.querySelector('nav');
            
            if (targetElement) {
                // Close mobile menu if open
                nav.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Special animations for Portfolio and Services sections
                if (targetId === '#showcase') {
                    // Portfolio animation
                    animatePortfolioSection();
                } else if (targetId === '#services') {
                    // Services animation
                    animateServicesSection();
                } else if (targetId === '#about') {
                    // About animation
                    animateAboutSection();
                } else if (targetId === '#contact') {
                    // Contact animation
                    animateContactSection();
                }
                
                // Scroll to the target section
                const offsetTop = targetElement.offsetTop - header.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio section animation
    function animatePortfolioSection() {
        const showcaseItems = document.querySelectorAll('.slide .item');
        const sectionTitle = document.querySelector('#showcase .section-title');
        
        // Reset animations by removing and adding classes
        sectionTitle.style.animation = 'none';
        sectionTitle.offsetHeight; // Force reflow
        
        // Animate the title with a bounce effect
        sectionTitle.style.animation = 'titleBounce 1s ease-out forwards';
        
        // Add 3D rotation effect to carousel
        slide.classList.add('animate-3d');
        setTimeout(() => {
            slide.classList.remove('animate-3d');
            // Re-position items after animation
            setupCarousel();
        }, 1500);
        
        // Add special effect to the slider buttons
        const buttons = document.querySelectorAll('.button button');
        buttons.forEach(button => {
            button.style.animation = 'pulseGlow 1.5s infinite';
        });
        
        // Remove button animation after 3 seconds
        setTimeout(() => {
            buttons.forEach(button => {
                button.style.animation = '';
            });
        }, 3000);
    }
    
    // Services section animation
    function animateServicesSection() {
        const serviceCards = document.querySelectorAll('.service-card');
        const sectionTitle = document.querySelector('#services .section-title');
        
        // Reset animations
        sectionTitle.style.animation = 'none';
        sectionTitle.offsetHeight; // Force reflow
        
        // Animate the title with a slide-in effect
        sectionTitle.style.animation = 'titleSlideIn 1s ease-out forwards';
        
        // Reset and animate service cards with a staggered 3D flip effect
        serviceCards.forEach((card, index) => {
            // Reset card
            card.style.transition = 'none';
            card.style.opacity = '0';
            card.style.transform = 'rotateY(90deg)';
            
            // Force reflow
            card.offsetHeight;
            
            // Animate with staggered delay
            card.style.transition = 'all 0.7s ease-out';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'rotateY(0deg)';
                
                // Add a glowing effect to the icon
                const icon = card.querySelector('i');
                icon.style.animation = 'iconGlow 2s ease-in-out';
                
                // Remove icon animation after it completes
                setTimeout(() => {
                    icon.style.animation = '';
                }, 2000);
            }, 150 * index);
        });
    }
    
    // About section animation
    function animateAboutSection() {
        const sectionTitle = document.querySelector('#about .section-title');
        const aboutImage = document.querySelector('.image-container');
        const aboutText = document.querySelector('.about-text');
        const skillItems = document.querySelectorAll('.skills span');
        
        // Reset animations
        sectionTitle.style.animation = 'none';
        aboutImage.style.animation = 'none';
        aboutText.style.animation = 'none';
        skillItems.forEach(item => {
            item.style.animation = 'none';
        });
        
        // Force reflow
        sectionTitle.offsetHeight;
        
        // Animate section title with a fade-in and rotate effect
        sectionTitle.style.animation = 'titleRotateIn 1.2s ease-out forwards';
        
        // Animate the image with a reveal effect
        aboutImage.style.transform = 'translateX(-100%)';
        aboutImage.style.opacity = '0';
        aboutImage.style.transition = 'all 1s cubic-bezier(0.17, 0.84, 0.44, 1)';
        
        setTimeout(() => {
            aboutImage.style.transform = 'translateX(0)';
            aboutImage.style.opacity = '1';
            
            // Add ripple effect to image
            const ripple = document.createElement('div');
            ripple.className = 'image-ripple';
            aboutImage.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                aboutImage.removeChild(ripple);
            }, 1500);
        }, 300);
        
        // Animate the text with a fade-in-up effect
        aboutText.style.transform = 'translateY(50px)';
        aboutText.style.opacity = '0';
        aboutText.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            aboutText.style.transform = 'translateY(0)';
            aboutText.style.opacity = '1';
        }, 600);
        
        // Animate skills with a staggered pop-in effect
        skillItems.forEach((item, index) => {
            item.style.transform = 'scale(0)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
            
            setTimeout(() => {
                item.style.transform = 'scale(1)';
                item.style.opacity = '1';
            }, 1000 + (index * 150));
        });
    }
    
    // Contact section animation
    function animateContactSection() {
        const sectionTitle = document.querySelector('#contact .section-title');
        const contactInfo = document.querySelector('.contact-info');
        const infoItems = document.querySelectorAll('.info-item');
        const socialIcons = document.querySelectorAll('.social-icons a');
        
        // Reset animations
        sectionTitle.style.animation = 'none';
        contactInfo.style.animation = 'none';
        infoItems.forEach(item => {
            item.style.animation = 'none';
        });
        socialIcons.forEach(icon => {
            icon.style.animation = 'none';
        });
        
        // Force reflow
        sectionTitle.offsetHeight;
        
        // Animate section title with a typing effect
        sectionTitle.style.animation = 'titleType 1s ease-out forwards';
        
        // Animate the contact info container
        contactInfo.style.transform = 'scale(0.8)';
        contactInfo.style.opacity = '0';
        contactInfo.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            contactInfo.style.transform = 'scale(1)';
            contactInfo.style.opacity = '1';
        }, 400);
        
        // Animate each info item with a slide-in effect
        infoItems.forEach((item, index) => {
            item.style.transform = 'translateX(-50px)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
                
                // Add highlight to the icon
                const icon = item.querySelector('i');
                icon.style.animation = 'iconPulse 1s';
            }, 600 + (index * 200));
        });
        
        // Animate social icons with a staggered drop-in effect
        socialIcons.forEach((icon, index) => {
            icon.style.transform = 'translateY(-30px)';
            icon.style.opacity = '0';
            icon.style.transition = 'all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
            
            setTimeout(() => {
                icon.style.transform = 'translateY(0)';
                icon.style.opacity = '1';
                
                // Add hover effect temporarily
                icon.style.animation = 'socialIconWave 1.5s ease-in-out';
            }, 1200 + (index * 150));
        });
    }

    // Scroll Indicator and Active Navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Create scroll indicator element
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    // Update scroll indicator and active nav link on scroll
    window.addEventListener('scroll', function() {
        // Update scroll indicator width
        const scrollPosition = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        scrollIndicator.style.width = scrollPercentage + '%';
        
        // Update active navigation link based on scroll position
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Add smooth hover effect to nav items
    const addHoverEffect = (event) => {
        const item = event.currentTarget;
        const siblings = Array.from(item.parentNode.parentNode.children)
            .filter(sibling => sibling !== item.parentNode);
        
        siblings.forEach(sibling => {
            sibling.querySelector('a').style.opacity = '0.5';
        });
    };
    
    const removeHoverEffect = (event) => {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.style.opacity = '1';
        });
    };
    
    document.querySelectorAll('nav ul li').forEach(item => {
        item.addEventListener('mouseenter', addHoverEffect);
        item.addEventListener('mouseleave', removeHoverEffect);
    });

    // Add smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add click animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (document.querySelector('nav').classList.contains('active')) {
                    document.querySelector('nav').classList.remove('active');
                    document.querySelector('.mobile-menu-toggle').innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Add animation for "View My Work" CTA button
    const ctaButton = document.querySelector('.hero .cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation to the button
            this.style.animation = 'ctaPulse 0.5s forwards';
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Create spotlight effect that follows cursor to target
                const spotlight = document.createElement('div');
                spotlight.className = 'cta-spotlight';
                document.body.appendChild(spotlight);
                
                // Position spotlight at the button
                const buttonRect = this.getBoundingClientRect();
                spotlight.style.top = `${buttonRect.top + buttonRect.height/2}px`;
                spotlight.style.left = `${buttonRect.left + buttonRect.width/2}px`;
                
                // Animate spotlight to target section
                setTimeout(() => {
                    const targetRect = targetSection.getBoundingClientRect();
                    spotlight.style.top = `${targetRect.top + window.scrollY + 100}px`;
                    spotlight.style.left = `${targetRect.left + targetRect.width/2}px`;
                    
                    // Scale up spotlight during movement
                    spotlight.style.transform = 'translate(-50%, -50%) scale(5)';
                }, 50);
                
                // Do smooth scroll after a slight delay
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Trigger special animation on the showcase section
                    animateShowcaseEntrance();
                    
                    // Remove spotlight after animation completes
                    setTimeout(() => {
                        spotlight.remove();
                    }, 800);
                }, 400);
            }
        });
    }
    
    // Special animation for showcase entrance from CTA click
    function animateShowcaseEntrance() {
        const showcase = document.getElementById('showcase');
        if (!showcase) return;
        
        // Add the CTA entrance class to trigger animations
        showcase.classList.add('cta-entrance');
        
        // Animate the section title with a special reveal
        const showcaseTitle = showcase.querySelector('h1');
        if (showcaseTitle) {
            showcaseTitle.style.animation = 'titleRevealFromCenter 0.8s forwards';
        }
        
        // Get all items and animate them with a staggered entrance
        const items = showcase.querySelectorAll('.item');
        items.forEach((item, index) => {
            // Reset any existing transforms
            item.style.transform = 'scale(0.8) translateY(20px)';
            item.style.opacity = '0';
            
            // Apply staggered animation
            setTimeout(() => {
                item.style.transform = 'scale(1) translateY(0)';
                item.style.opacity = '1';
            }, 100 + (index * 80));
        });
        
        // Remove the class after animation completes
        setTimeout(() => {
            showcase.classList.remove('cta-entrance');
        }, 3000);
    }
    
    // Set up background particle effect for enhanced visual appeal
    function setupParticleEffect() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-background';
        heroSection.appendChild(particleContainer);
        
        // Add 30 particles
        for (let i = 0; i < 30; i++) {
            createParticle(particleContainer);
        }
        
        // Create particle style if needed
        if (!document.getElementById('particle-bg-style')) {
            const particleStyle = document.createElement('style');
            particleStyle.id = 'particle-bg-style';
            particleStyle.textContent = `
                .particle-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 1;
                }
                
                .bg-particle {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    pointer-events: none;
                }
                
                @keyframes floatParticle {
                    0% {
                        transform: translateY(0) rotate(0deg);
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(particleStyle);
        }
    }
    
    // Create individual floating particles
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        
        // Random properties
        const size = Math.random() * 15 + 5;
        const startPos = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 10;
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startPos}%`;
        particle.style.bottom = `-${size}px`;
        particle.style.opacity = opacity;
        particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
        
        // Add to container
        container.appendChild(particle);
        
        return particle;
    }

    // New function to handle responsive adjustments
    function updateResponsiveness() {
        const screenWidth = window.innerWidth;
        
        // Adjust item positioning and styling based on screen size
        if (screenWidth <= 768) {
            // Mobile/tablet view adjustments
            items.forEach((item, index) => {
                const relativeIndex = getRelativeIndex(index);
                
                // Hide items that are too far from active (improve performance on mobile)
                if (Math.abs(relativeIndex) > 2) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                    
                    // Make items more compact on mobile
                    if (relativeIndex === 0) { // Active item
                        item.style.left = '50%';
                        item.style.transform = 'perspective(800px) rotateY(0deg) scale(1) translateX(-50%)';
                    } else if (relativeIndex === -1) { // Left of active
                        item.style.left = '25%';
                        item.style.transform = 'perspective(800px) rotateY(10deg) scale(0.8) translateX(-50%)';
                    } else if (relativeIndex === 1) { // Right of active
                        item.style.left = '75%';
                        item.style.transform = 'perspective(800px) rotateY(-10deg) scale(0.8) translateX(-50%)';
                    }
                }
            });
            
            // Adjust slide height for mobile
            const activeItem = items[activeIndex];
            if (activeItem) {
                slide.style.height = `${activeItem.offsetHeight * 1.1}px`;
            }
        } else if (screenWidth <= 992) {
            // Tablet/small desktop adjustments
            items.forEach((item, index) => {
                const relativeIndex = getRelativeIndex(index);
                
                // Show all items but adjust their positioning
                item.style.display = 'block';
                
                if (Math.abs(relativeIndex) > 2) {
                    item.style.opacity = '0';
                }
            });
            
            // Adjust slide height for tablet
            const activeItem = items[activeIndex];
            if (activeItem) {
                slide.style.height = `${activeItem.offsetHeight * 1.15}px`;
            }
        } else {
            // Desktop view - show all items
            items.forEach((item) => {
                item.style.display = 'block';
            });
        }
    }

    // Add responsive styles for navigation and other components
    const responsiveStyles = document.createElement('style');
    responsiveStyles.textContent = `
        @media (max-width: 1200px) {
            .container, .section-content {
                width: 95%;
                padding: 0 10px;
            }
            
            header .logo h2 {
                font-size: 1.8rem;
            }
            
            nav ul li {
                margin-left: 20px;
            }
            
            .hero h1 {
                font-size: 3rem;
            }
            
            .service-cards {
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }
        }
        
        @media (max-width: 992px) {
            header {
                padding: 15px 4%;
            }
            
            nav ul li {
                margin-left: 15px;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1.1rem;
                max-width: 90%;
            }
            
            .about-content {
                flex-direction: column;
            }
            
            .image-container, .about-text {
                width: 100%;
            }
            
            .image-container {
                margin-bottom: 30px;
            }
            
            .modal-content {
                width: 95%;
                height: auto;
                max-height: 90vh;
            }
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.2rem;
            }
            
            .section-title {
                font-size: 1.8rem;
            }
            
            .service-cards {
                grid-template-columns: 1fr;
            }
            
            .contact-content {
                flex-direction: column;
            }
            
            .contact-info, .contact-form {
                width: 100%;
            }
            
            .contact-form {
                margin-top: 30px;
            }
            
            .slide {
                height: 500px;
            }
            
            .slide .item {
                width: 85%;
            }
            
            nav {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(10, 10, 10, 0.95);
                padding: 0;
                height: 0;
                overflow: hidden;
                transition: height 0.3s ease-out;
                z-index: 100;
            }
            
            nav.active {
                height: auto;
                padding: 20px 0;
            }
            
            nav ul {
                flex-direction: column;
                width: 100%;
                text-align: center;
            }
            
            nav ul li {
                margin: 15px 0;
                width: 100%;
            }
            
            .mobile-menu-toggle {
                display: block;
            }
        }
        
        @media (max-width: 576px) {
            .hero h1 {
                font-size: 1.8rem;
            }
            
            .section-title {
                font-size: 1.5rem;
            }
            
            .slide {
                height: 450px;
            }
            
            .slide .item {
                width: 90%;
            }
            
            .button {
                margin-top: 20px;
            }
            
            .skills {
                flex-wrap: wrap;
            }
            
            .skills span {
                margin: 5px;
            }
            
            .modal-content {
                width: 95%;
                padding: 15px;
            }
            
            .video-container {
                height: 300px;
            }
            
            .social-icons {
                justify-content: center;
            }
            
            .social-icons a {
                margin: 0 10px;
            }
        }
    `;
    document.head.appendChild(responsiveStyles);

    // Ensure modal is responsive
    function ensureModalResponsiveness() {
        const modal = document.getElementById('video-modal');
        if (!modal) return;
        
        const modalContent = modal.querySelector('.modal-content');
        
        // Adjust modal size based on screen size
        if (window.innerWidth <= 768) {
            modalContent.style.width = '95%';
            modalContent.style.height = 'auto';
            
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.style.height = '300px';
            }
        } else {
            modalContent.style.width = '80%';
            modalContent.style.height = 'auto';
            
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.style.height = '60vh';
            }
        }
    }

    // Call responsive functions on load and resize
    window.addEventListener('load', ensureModalResponsiveness);
    window.addEventListener('resize', debounce(ensureModalResponsiveness, 150));

    // Check if we're on a mobile device
    function isMobileDevice() {
        return (window.innerWidth <= 768) || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    }

    // Handle window resize for carousel adjustments
    window.addEventListener('resize', function() {
        // Update carousel dimensions and positioning
        setupCarousel();
        
        // Update any responsive elements
        updateResponsiveness();
        
        // Update modal if it's open
        if (document.getElementById('video-modal').classList.contains('active')) {
            ensureModalResponsiveness();
        }
    });

    // Adjust touch handling for mobile
    if (isMobileDevice()) {
        // Make swipe detection more sensitive on mobile
        slide.addEventListener('touchmove', function(e) {
            // Prevent page scrolling when interacting with the carousel
            if (e.target.closest('.slide')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Increase the tap target size for mobile navigation buttons
        const navButtons = document.querySelectorAll('.button button');
        navButtons.forEach(button => {
            button.style.width = '50px';
            button.style.height = '50px';
        });
    }

    // Ensure responsive images in carousel
    items.forEach(item => {
        // Force the background image to load before calculating heights
        const bgImg = new Image();
        const style = getComputedStyle(item);
        const bgImgUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "");
        
        bgImg.onload = function() {
            // Update carousel after images are loaded
            updateCarousel();
        };
        
        if (bgImgUrl) {
            bgImg.src = bgImgUrl;
        }
    });
});

// Add new animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes titleBounce {
        0% { transform: translateY(-50px); opacity: 0; }
        60% { transform: translateY(20px); opacity: 1; }
        80% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
    
    @keyframes titleSlideIn {
        0% { transform: translateX(-100px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes pulseGlow {
        0% { transform: scale(1); box-shadow: 0 0 5px rgba(255, 62, 108, 0.5); }
        50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(255, 62, 108, 0.8), 0 0 30px rgba(0, 200, 255, 0.6); }
        100% { transform: scale(1); box-shadow: 0 0 5px rgba(255, 62, 108, 0.5); }
    }
    
    @keyframes iconGlow {
        0% { transform: scale(1); text-shadow: none; }
        50% { transform: scale(1.5); text-shadow: 0 0 20px var(--primary-color), 0 0 30px var(--secondary-color); }
        100% { transform: scale(1); text-shadow: none; }
    }
    
    @keyframes titleRotateIn {
        0% { transform: rotateY(90deg); opacity: 0; transform-origin: left; }
        100% { transform: rotateY(0deg); opacity: 1; transform-origin: left; }
    }
    
    @keyframes titleType {
        0% { clip-path: inset(0 100% 0 0); opacity: 1; }
        100% { clip-path: inset(0 0 0 0); opacity: 1; }
    }
    
    @keyframes iconPulse {
        0% { background: var(--dark-bg); }
        50% { background: linear-gradient(90deg, var(--primary-color), var(--secondary-color)); transform: scale(1.2); }
        100% { background: var(--dark-bg); }
    }
    
    @keyframes socialIconWave {
        0% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
        50% { transform: translateY(0); }
        70% { transform: translateY(-7px); }
        100% { transform: translateY(0); }
    }
    
    .image-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        border-radius: 50%;
        animation: ripple 1.5s ease-out forwards;
        z-index: 2;
    }
    
    @keyframes ripple {
        0% { width: 10px; height: 10px; opacity: 1; }
        100% { width: 300px; height: 300px; opacity: 0; }
    }
    
    .slide.animate-3d {
        animation: carousel3D 1.5s ease-out;
    }
    
    @keyframes carousel3D {
        0% { transform: perspective(1000px) rotateX(0deg); }
        50% { transform: perspective(1000px) rotateX(10deg) scale(0.9); }
        100% { transform: perspective(1000px) rotateX(0deg); }
    }
    
    .modal-content {
        transition: all 0.3s ease-out;
        transform: translateY(50px) scale(0.9);
        opacity: 0;
    }
    
    .mobile-menu-toggle {
        display: none;
        cursor: pointer;
        font-size: 1.5rem;
        color: var(--text-color);
    }
    
    @media screen and (max-width: 576px) {
        .mobile-menu-toggle {
            display: block;
        }
    }
`;
document.head.appendChild(animationStyles);

