document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });
    
    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                // Close mobile menu
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Carousel functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselPrevBtn = document.querySelector('.carousel-btn-prev');
    const carouselNextBtn = document.querySelector('.carousel-btn-next');
    
    if (carouselTrack && carouselItems.length > 0) {
        // Dynamically add images to carousel
        const imageNames = [
            'sc1.png', 'sc2.png', 'sc3.png', 'sc4.png', 'sc5.png',
            'sc6.png', 'sc7.png', 'sc8.png', 'sc9.png', 'sc10.png',
            'sc11.png', 'sc12.png', 'sc13.png'
        ];
        
        // Clear existing content and add images
        carouselTrack.innerHTML = '';
        
        // Add original images
        imageNames.forEach(imageName => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            
            const
// Separate function for Bible verse functionality
function initBibleVerse() {
    // Bible verses database
    const bibleVerses = [
        {
            text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
            reference: "John 3:16"
        },
        {
            text: "Jesus said to him, 'I am the way, and the truth, and the life. No one comes to the Father except through me.'",
            reference: "John 14:6"
        },
        {
            text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
            reference: "Proverbs 3:5-6"
        },
        {
            text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
            reference: "Matthew 6:33"
        },
        {
            text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
            reference: "Jeremiah 29:11"
        },
        {
            text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters.",
            reference: "Psalm 23:1-2"
        },
        {
            text: "I can do all things through him who strengthens me.",
            reference: "Philippians 4:13"
        },
        {
            text: "Be strong and courageous. Do not fear or be in dread of them, for it is the Lord your God who goes with you. He will not leave you or forsake you.",
            reference: "Deuteronomy 31:6"
        },
        {
            text: "For where two or three are gathered in my name, there am I among them.",
            reference: "Matthew 18:20"
        },
        {
            text: "The Lord is my light and my salvation; whom shall I fear? The Lord is the stronghold of my life; of whom shall I be afraid?",
            reference: "Psalm 27:1"
        }
    ];

    // Get DOM elements - check if they exist
    const currentVerse = document.getElementById('currentVerse');
    const verseText = document.getElementById('verseText');
    const verseReference = document.getElementById('verseReference');
    const prevVerseBtn = document.getElementById('prevBtn');
    const nextVerseBtn = document.getElementById('nextBtn');
    const autoPlayBtn = document.getElementById('autoBtn');
    const autoIcon = document.getElementById('autoIcon');
    const autoText = document.getElementById('autoText');
    const progressDots = document.getElementById('progressDots');
    const copyBtn = document.getElementById('copyBtn');
    const shareBtn = document.getElementById('shareBtn');

    // If elements don't exist, return early
    if (!currentVerse || !verseText || !verseReference) {
        console.log('Bible verse elements not found. Skipping initialization.');
        return;
    }

    console.log('Bible Verse elements found:', {
        currentVerse: !!currentVerse,
        verseText: !!verseText,
        verseReference: !!verseReference,
        prevBtn: !!prevVerseBtn,
        nextBtn: !!nextVerseBtn,
        autoBtn: !!autoPlayBtn
    });

    // State
    let currentVerseIndex = 0;
    let autoPlayInterval = null;
    let isAutoPlaying = true;
    let changeInterval = 5000; // Change verse every 5 seconds

    // Initialize
    function init() {
        console.log('Initializing Bible Verse Section...');
        createProgressDots();
        updateVerseDisplay();
        startAutoPlay();
        setupEventListeners();
        console.log('Bible verse initialized with index:', currentVerseIndex);
    }

    // Create progress dots
    function createProgressDots() {
        if (!progressDots) return;
        
        progressDots.innerHTML = '';
        bibleVerses.forEach((verse, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === currentVerseIndex ? 'active' : ''}`;
            dot.dataset.index = index;
            dot.addEventListener('click', () => {
                console.log('Dot clicked, index:', index);
                goToVerse(index);
            });
            progressDots.appendChild(dot);
        });
    }

    // Update progress dots
    function updateProgressDots() {
        if (!progressDots) return;
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentVerseIndex);
        });
    }

    // Go to specific verse
    function goToVerse(index) {
        if (index >= 0 && index < bibleVerses.length) {
            currentVerseIndex = index;
            console.log('Going to verse index:', index, bibleVerses[index].reference);
            updateVerseDisplay();
            if (isAutoPlaying) {
                resetAutoPlay();
            }
        }
    }

    // Next verse
    function nextVerse() {
        currentVerseIndex = (currentVerseIndex + 1) % bibleVerses.length;
        console.log('Next verse, new index:', currentVerseIndex);
        updateVerseDisplay();
    }

    // Previous verse
    function prevVerse() {
        currentVerseIndex = currentVerseIndex === 0 ? bibleVerses.length - 1 : currentVerseIndex - 1;
        console.log('Previous verse, new index:', currentVerseIndex);
        updateVerseDisplay();
    }

    // Update verse display with animation - SIMPLIFIED
    function updateVerseDisplay() {
        const verse = bibleVerses[currentVerseIndex];
        console.log('Updating verse display to:', verse.reference);
        
        // Fade out current content
        currentVerse.style.opacity = '0';
        currentVerse.style.transition = 'opacity 0.5s ease';
        
        // Wait for fade out, then update and fade in
        setTimeout(() => {
            // Update text
            verseText.textContent = `"${verse.text}"`;
            verseReference.textContent = `- ${verse.reference}`;
            
            // Fade in new content
            currentVerse.style.opacity = '1';
            
            // Update progress dots
            updateProgressDots();
            
            console.log('Verse updated successfully:', verse.reference);
        }, 500); // Wait for fade out before updating
    }

    // Auto-play functions
    function startAutoPlay() {
        if (isAutoPlaying) {
            console.log('Starting auto-play...');
            stopAutoPlay(); // Clear any existing interval
            
            autoPlayInterval = setInterval(() => {
                console.log('Auto-play timer triggered');
                nextVerse();
            }, changeInterval);
            
            if (autoIcon && autoText && autoPlayBtn) {
                autoIcon.className = 'fas fa-pause';
                autoText.textContent = 'Pause Auto';
                autoPlayBtn.classList.add('playing');
            }
        }
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            console.log('Auto-play stopped');
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    function toggleAutoPlay() {
        isAutoPlaying = !isAutoPlaying;
        console.log('Toggle auto-play, new state:', isAutoPlaying);
        
        if (isAutoPlaying) {
            startAutoPlay();
        } else {
            stopAutoPlay();
            if (autoIcon && autoText && autoPlayBtn) {
                autoIcon.className = 'fas fa-play';
                autoText.textContent = 'Play Auto';
                autoPlayBtn.classList.remove('playing');
            }
        }
    }

    // Copy verse to clipboard
    function copyVerseToClipboard() {
        const verse = bibleVerses[currentVerseIndex];
        const verseContent = `"${verse.text}"\n- ${verse.reference}`;
        
        navigator.clipboard.writeText(verseContent)
            .then(() => {
                console.log('Verse copied to clipboard');
                if (copyBtn) {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    copyBtn.classList.add('copied');
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }
            })
            .catch(err => {
                console.error('Failed to copy verse:', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = verseContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (copyBtn) {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    copyBtn.classList.add('copied');
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }
            });
    }

    // Share verse
    function shareVerse() {
        const verse = bibleVerses[currentVerseIndex];
        const shareText = `${verse.text} - ${verse.reference}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Bible Verse',
                text: shareText,
                url: window.location.href
            })
            .then(() => console.log('Verse shared successfully'))
            .catch((error) => console.log('Error sharing:', error));
        } else {
            copyVerseToClipboard();
            if (shareBtn) {
                shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                shareBtn.classList.add('shared');
                
                setTimeout(() => {
                    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
                    shareBtn.classList.remove('shared');
                }, 2000);
            }
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Button listeners
        if (prevVerseBtn) {
            prevVerseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Previous button clicked');
                prevVerse();
                if (isAutoPlaying) {
                    resetAutoPlay();
                }
            });
        }
        
        if (nextVerseBtn) {
            nextVerseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next button clicked');
                nextVerse();
                if (isAutoPlaying) {
                    resetAutoPlay();
                }
            });
        }
        
        if (autoPlayBtn) {
            autoPlayBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Auto-play button clicked');
                toggleAutoPlay();
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                shareVerse();
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                copyVerseToClipboard();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevVerse();
                if (isAutoPlaying) {
                    resetAutoPlay();
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextVerse();
                if (isAutoPlaying) {
                    resetAutoPlay();
                }
            } else if (e.key === ' ') {
                e.preventDefault();
                toggleAutoPlay();
            }
        });
        
        // Pause auto-play when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && isAutoPlaying) {
                stopAutoPlay();
            } else if (!document.hidden && isAutoPlaying && !autoPlayInterval) {
                startAutoPlay();
            }
        });
        
        console.log('Event listeners set up successfully');
    }

    // Add debug functions to window
    window.debugBibleVerse = {
        next: nextVerse,
        prev: prevVerse,
        goTo: goToVerse,
        toggle: toggleAutoPlay,
        current: () => currentVerseIndex,
        verses: bibleVerses
    };

    // Initialize the verse section
    init();
    
    console.log('Bible verse section initialized successfully!');
}

// Main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (mobileMenuBtn && navLinks) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
        
        // Handle dropdowns on mobile
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('.nav-link');
            
            if (dropdownLink) {
                dropdownLink.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        
                        // Close other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                        
                        // Toggle current dropdown
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    // Close mobile menu
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    
                    // Close all dropdowns
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            }
        });
    }
    
    // Carousel functionality (if exists)
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        console.log('Carousel found, initializing...');
        // Add your carousel initialization here
    }
    
    // Initialize Bible Verse
    console.log('Initializing Bible Verse...');
    initBibleVerse();
    
    // Test function - manually change verse after 3 seconds
    setTimeout(() => {
        console.log('Test: Attempting to change verse automatically...');
        if (window.debugBibleVerse && window.debugBibleVerse.next) {
            window.debugBibleVerse.next();
        }
    }, 3000);
});

// Fallback in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // The function will run from above
    });
} else {
    // DOMContentLoaded has already fired
    console.log('DOM already loaded, running Bible verse init...');
    initBibleVerse();
}
// Modern Church Leaders Carousel
function initLeadersCarousel() {
    const leadersCarouselTrack = document.getElementById('leadersCarouselTrack');
    const leadersCarouselPrev = document.getElementById('leadersCarouselPrev');
    const leadersCarouselNext = document.getElementById('leadersCarouselNext');
    const leadersCarouselDots = document.getElementById('leadersCarouselDots');
    
    if (!leadersCarouselTrack) return;
    
    // Duplicate leader cards for infinite effect
    const originalCards = leadersCarouselTrack.innerHTML;
    leadersCarouselTrack.innerHTML = originalCards + originalCards;
    
    const leaderCards = leadersCarouselTrack.querySelectorAll('.leader-card');
    const totalOriginalCards = leaderCards.length / 2;
    const gap = 40;
    
    // Create dots for original cards only
    createDots();
    
    // Animation state
    let isPlaying = true;
    let currentSpeed = 50; // seconds for full loop
    let animationId = null;
    
    // Create navigation dots
    function createDots() {
        leadersCarouselDots.innerHTML = '';
        
        for (let i = 0; i < totalOriginalCards; i++) {
            const dot = document.createElement('button');
            dot.className = `leaders-carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.dataset.index = i;
            dot.addEventListener('click', () => goToCard(i));
            leadersCarouselDots.appendChild(dot);
        }
    }
    
    // Update active dot
    function updateDots(currentIndex) {
        const dots = leadersCarouselDots.querySelectorAll('.leaders-carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === (currentIndex % totalOriginalCards));
        });
    }
    
    // Go to specific card
    function goToCard(index) {
        if (index < 0) index = totalOriginalCards - 1;
        if (index >= totalOriginalCards) index = 0;
        
        const cardWidth = leaderCards[0].offsetWidth;
        const targetPosition = -index * (cardWidth + gap);
        
        // Reset animation
        stopAnimation();
        leadersCarouselTrack.style.animation = 'none';
        leadersCarouselTrack.style.transform = `translateX(${targetPosition}px)`;
        
        // Update dots
        updateDots(index);
        
        // Restart animation after a delay
        setTimeout(() => {
            if (isPlaying) {
                startAnimation();
            }
        }, 1000);
    }
    
    // Start animation
    function startAnimation() {
        leadersCarouselTrack.style.animation = `scrollLeaders ${currentSpeed}s linear infinite`;
    }
    
    // Stop animation
    function stopAnimation() {
        leadersCarouselTrack.style.animation = 'none';
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            startAnimation();
        } else {
            stopAnimation();
        }
        
        // Update play/pause button if exists
        const playPauseBtn = document.getElementById('leadersPlayPause');
        if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('i');
            icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }
    
    // Change speed
    function changeSpeed(speed) {
        currentSpeed = speed;
        if (isPlaying) {
            stopAnimation();
            startAnimation();
        }
    }
    
    // Setup event listeners
    if (leadersCarouselPrev) {
        leadersCarouselPrev.addEventListener('click', () => {
            const currentIndex = getCurrentCardIndex();
            goToCard(currentIndex - 1);
        });
    }
    
    if (leadersCarouselNext) {
        leadersCarouselNext.addEventListener('click', () => {
            const currentIndex = getCurrentCardIndex();
            goToCard(currentIndex + 1);
        });
    }
    
    // Get current card index based on scroll position
    function getCurrentCardIndex() {
        const cardWidth = leaderCards[0].offsetWidth;
        const transform = leadersCarouselTrack.style.transform || 'translateX(0px)';
        const match = transform.match(/translateX\(([-]?\d+)px\)/);
        const currentPosition = match ? parseInt(match[1]) : 0;
        
        return Math.abs(Math.round(currentPosition / (cardWidth + gap))) % totalOriginalCards;
    }
    
    // Setup speed controls
    const speedControls = document.querySelector('.leaders-speed-controls');
    if (!speedControls) {
        // Create speed controls if they don't exist
        const controlsHTML = `
            <div class="leaders-carousel-status">
                <button class="carousel-play-pause" id="leadersPlayPause">
                    <i class="fas fa-pause"></i>
                </button>
                <span>Auto-scroll: <span id="leadersSpeedStatus">${currentSpeed}s</span></span>
            </div>
            <div class="leaders-speed-controls">
                <button class="speed-control-btn" data-speed="70">
                    <i class="fas fa-snail"></i> Slow
                </button>
                <button class="speed-control-btn active" data-speed="50">
                    <i class="fas fa-walking"></i> Normal
                </button>
                <button class="speed-control-btn" data-speed="30">
                    <i class="fas fa-running"></i> Fast
                </button>
                <button class="speed-control-btn" data-speed="15">
                    <i class="fas fa-bolt"></i> Very Fast
                </button>
            </div>
        `;
        
        const controlsContainer = document.createElement('div');
        controlsContainer.innerHTML = controlsHTML;
        leadersCarouselContainer.appendChild(controlsContainer);
        
        // Add event listeners for new controls
        const playPauseBtn = document.getElementById('leadersPlayPause');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
        }
        
        // Speed control buttons
        document.querySelectorAll('.speed-control-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const speed = parseInt(this.dataset.speed);
                
                // Update active state
                document.querySelectorAll('.speed-control-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update speed
                changeSpeed(speed);
                
                // Update status
                const status = document.getElementById('leadersSpeedStatus');
                if (status) {
                    status.textContent = `${speed}s`;
                }
            });
        });
    }
    
    // Handle infinite scroll reset
    leadersCarouselTrack.addEventListener('animationiteration', () => {
        // Reset to start for seamless loop
        leadersCarouselTrack.style.animation = 'none';
        setTimeout(() => {
            if (isPlaying) {
                leadersCarouselTrack.style.animation = `scrollLeaders ${currentSpeed}s linear infinite`;
            }
        }, 10);
    });
    
    // Pause on hover
    leadersCarouselTrack.addEventListener('mouseenter', () => {
        if (isPlaying) {
            leadersCarouselTrack.style.animationPlayState = 'paused';
        }
    });
    
    leadersCarouselTrack.addEventListener('mouseleave', () => {
        if (isPlaying) {
            leadersCarouselTrack.style.animationPlayState = 'running';
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset animation
            stopAnimation();
            if (isPlaying) {
                startAnimation();
            }
        }, 250);
    });
    
    // Start animation initially
    startAnimation();
    
    // Update dots periodically
    setInterval(() => {
        if (isPlaying) {
            const currentIndex = getCurrentCardIndex();
            updateDots(currentIndex);
        }
    }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLeadersCarousel();
});