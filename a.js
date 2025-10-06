/**
 * Smooth Scroll-Based Animations with Intersection Observer
 *
 * This script uses the Intersection Observer API to detect when
 * sections enter the user's viewport, adding an 'in-view' class
 * to trigger the CSS animations defined in styles.css.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. RANDOM CUSTOMER REVIEWS DATA ---
    const allReviews = [
        { text: "if you eat one banana a day for a year youll find yourself pooping roughly 30,000 times", author: "ima idiot, co-founder and host of women stupidity" },
        { text: "great dildo alternative!", author: "Mike T., Busy Dad" },
        { text: "Forget coffee, the humble banana is my go-to for beating the afternoon slump. Absolutely essential.", author: "Jessica M., Graphic Designer" },
        { text: "I bought them for banana bread, but ended up just eating them plain. So sweet and creamy!", author: "Chef Ben R." },
        { text: "The potassium boost is real! My legs feel great after long runs. Nature's sports drink.", author: "Alex F., Marathon Runner" },
        { text: "I'm a picky eater, but a perfectly ripe banana never fails to satisfy. Ten out of ten!", author: "Chris P., Student" }
    ];

    /**
     * Function to randomly select a specified number of unique reviews.
     * @param {number} count - The number of reviews to select.
     * @returns {Array} An array of unique review objects.
     */
    function getRandomReviews(count) {
        // Simple shuffle and slice to get unique random reviews
        const shuffled = [...allReviews].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    /**
     * Function to generate and insert the review HTML.
     */
    function loadReviews() {
        const reviewsContainer = document.getElementById('reviews-container');
        const selectedReviews = getRandomReviews(3); // We want 3 reviews

        // Clear the placeholder content
        reviewsContainer.innerHTML = '';

        selectedReviews.forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            
            // Set a timeout to apply a staggered animation class
            setTimeout(() => {
                reviewCard.classList.add('revealed');
            }, 100 * index); // 100ms delay for each card

            reviewCard.innerHTML = `
                <p class="review-text">"${review.text}"</p>
                <p class="review-author">— ${review.author}</p>
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    }

    // Load the reviews when the page loads
    loadReviews();

    // --- 2. Setup Intersection Observer for Animations (Original Logic) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- 3. Smooth Scrolling for Navigation Links (Original Logic) ---
    const navLinks = document.querySelectorAll('nav ul li a, .btn');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only handle internal section links starting with '#'
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

