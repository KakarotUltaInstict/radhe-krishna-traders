/* ==========================================================================
   Radhe Krishna Traders - Premium Spice Showcase Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Navigation Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const bars = navToggle.querySelectorAll('.bar');
            if (navToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close nav menu on clicking navigation links (mobile)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.querySelectorAll('.bar').forEach(bar => bar.style.transform = 'none');
                navToggle.querySelectorAll('.bar')[1].style.opacity = '1';
            });
        });
    }

    // --- 3. Interactive Ratio Sliders & Heat Estimator ---
    const l1Slider = document.getElementById('l1-ratio');
    const l2Slider = document.getElementById('l2-ratio');
    const l3Slider = document.getElementById('l3-ratio');

    const l1Val = document.getElementById('l1-val');
    const l2Val = document.getElementById('l2-val');
    const l3Val = document.getElementById('l3-val');

    const resultClass = document.getElementById('result-class');
    const resultShu = document.getElementById('result-shu');
    const resultPairing = document.getElementById('result-pairing');

    // Heat constants (SHU values)
    const L1_SHU = 55000;
    const L2_SHU = 32500;
    const L3_SHU = 15000;

    // Normalization logic: ensure sliders always sum up to exactly 100%
    function handleSliderChange(activeSlider) {
        let val1 = parseInt(l1Slider.value);
        let val2 = parseInt(l2Slider.value);
        let val3 = parseInt(l3Slider.value);
        
        let sum = val1 + val2 + val3;
        
        if (sum !== 100) {
            const diff = 100 - sum;
            
            if (activeSlider === 'l1') {
                // Adjust L2 and L3 proportionally
                const rem = val2 + val3;
                if (rem > 0) {
                    val2 = Math.round(val2 + (diff * (val2 / rem)));
                    val3 = 100 - val1 - val2;
                } else {
                    val2 = Math.round(diff / 2);
                    val3 = 100 - val1 - val2;
                }
            } else if (activeSlider === 'l2') {
                // Adjust L1 and L3 proportionally
                const rem = val1 + val3;
                if (rem > 0) {
                    val1 = Math.round(val1 + (diff * (val1 / rem)));
                    val3 = 100 - val1 - val2;
                } else {
                    val1 = Math.round(diff / 2);
                    val3 = 100 - val1 - val2;
                }
            } else if (activeSlider === 'l3') {
                // Adjust L1 and L2 proportionally
                const rem = val1 + val2;
                if (rem > 0) {
                    val1 = Math.round(val1 + (diff * (val1 / rem)));
                    val2 = 100 - val1 - val3;
                } else {
                    val1 = Math.round(diff / 2);
                    val2 = 100 - val1 - val3;
                }
            }
            
            // Constrain values to 0 - 100
            val1 = Math.max(0, Math.min(100, val1));
            val2 = Math.max(0, Math.min(100, val2));
            val3 = Math.max(0, Math.min(100, val3));

            // Force exact sum corrections
            const finalSum = val1 + val2 + val3;
            if (finalSum !== 100) {
                val3 += (100 - finalSum);
            }

            l1Slider.value = val1;
            l2Slider.value = val2;
            l3Slider.value = val3;
        }

        // Update displays
        l1Val.textContent = val1;
        l2Val.textContent = val2;
        l3Val.textContent = val3;

        // Perform calculation
        calculateHeat(val1, val2, val3);
    }

    function calculateHeat(r1, r2, r3) {
        // Weighted average of SHU
        const totalSHU = Math.round((r1 * L1_SHU + r2 * L2_SHU + r3 * L3_SHU) / 100);
        resultShu.textContent = totalSHU.toLocaleString() + ' SHU';

        // Spiciness Class and Pairings mapping
        let spicinessClass = '';
        let pairingText = '';
        let classColor = '';

        if (totalSHU < 20000) {
            spicinessClass = 'Mild Warmth';
            pairingText = 'Excellent choice for mild commercial gravies, pickles, and baby food seasonings. Offers deep color with very subtle warmth.';
            classColor = '#f4a261'; // Gold
        } else if (totalSHU >= 20000 && totalSHU < 30000) {
            spicinessClass = 'Medium Spicy';
            pairingText = 'Ideal for daily home cooking, lentils, and general dry rubs. Provides a pleasant, widely accepted warmth suitable for average palate.';
            classColor = '#e85d04'; // Light Orange
        } else if (totalSHU >= 30000 && totalSHU < 45000) {
            spicinessClass = 'Medium Hot';
            pairingText = 'Perfect for traditional Indian curries, masala powders, and general marinades. Adds a noticeable kick without overpowering the tastebuds.';
            classColor = '#d62828'; // Crimson Red
        } else if (totalSHU >= 45000 && totalSHU < 53000) {
            spicinessClass = 'Fiery Hot';
            pairingText = 'Recommended for spicy Southeast Asian curries, hot wings, and hot sauces. Designed for spice enthusiasts who love a robust punch.';
            classColor = '#b51717'; // Rich Crimson
        } else {
            spicinessClass = 'Supreme Fiery';
            pairingText = 'Extremely spicy! Best reserved for specialized high-heat export products, industrial extractors, and intense specialty hot sauce brands.';
            classColor = '#ff002b'; // Neon Red
        }

        resultClass.textContent = spicinessClass;
        resultClass.style.color = classColor;
        resultClass.style.textShadow = `0 0 20px ${classColor}40`;
    }

    // Attach event listeners to sliders
    if (l1Slider && l2Slider && l3Slider) {
        l1Slider.addEventListener('input', () => handleSliderChange('l1'));
        l2Slider.addEventListener('input', () => handleSliderChange('l2'));
        l3Slider.addEventListener('input', () => handleSliderChange('l3'));

        // Initialize values
        handleSliderChange('l1');
    }

    // --- 4. Wholesale Form Submission Simulation ---
    const enquiryForm = document.getElementById('enquiry-form');
    const formMessage = document.getElementById('form-message');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Values
            const name = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const spiceSelect = document.getElementById('spicetype');
            const spiceName = spiceSelect.options[spiceSelect.selectedIndex].text;
            const quantity = document.getElementById('quantity').value;
            const submitBtn = enquiryForm.querySelector('button[type="submit"]');

            // Visual feedback - Submitting state
            submitBtn.textContent = 'Registering Enquiry...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                // Success state response
                formMessage.textContent = `Thank you, ${name}! Your wholesale inquiry for ${quantity} kg of ${spiceName} has been successfully logged. Our sales desk will reach out to you at ${email} or via WhatsApp at ${phone} within 12 hours.`;
                formMessage.className = 'form-message success';
                
                // Reset form fields
                enquiryForm.reset();
                
                // Restore button state
                submitBtn.textContent = 'Submit Wholesale Inquiry';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';

                // Fade message out after 10 seconds
                setTimeout(() => {
                    formMessage.style.opacity = '0';
                    setTimeout(() => {
                        formMessage.textContent = '';
                        formMessage.className = 'form-message';
                    }, 500);
                }, 10000);

            }, 1500); // Simulated API latency
        });
    }
});
