// Radha Traders Nagpur - App Logic

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initWeatherWidget();
    initProductSwitcher();
    initInteractiveGrinder();
    initCalculator();
    initScrollAnimations();
});

/* Navigation & Mobile Menu */
function initNavigation() {
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    // Sticky Header on Scroll (Throttled with requestAnimationFrame)
    let scrollLock = false;
    window.addEventListener('scroll', () => {
        if (!scrollLock) {
            scrollLock = true;
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                scrollLock = false;
            });
        }
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

/* Nagpur Weather Sourcing Widget */
function initWeatherWidget() {
    const tempText = document.getElementById('weather-temp-text');
    const dateText = document.getElementById('weather-date-text');
    
    // Simulate real-time Nagpur weather conditions
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const now = new Date();
    dateText.textContent = `${months[now.getMonth()]} Season ${now.getFullYear()}`;

    // Nagpur ranges from hot to very hot. August is monsoon/humid, temp around 30-34°C.
    const hour = now.getHours();
    let baseTemp = 32;
    if (hour >= 11 && hour <= 16) {
        baseTemp = 36; // Peak afternoon heat
    } else if (hour >= 20 || hour <= 6) {
        baseTemp = 28; // Night time cooling
    }
    
    // Add minor decimal fluctuation
    const finalTemp = (baseTemp + Math.random() * 2).toFixed(1);
    tempText.textContent = `${finalTemp}°C`;
}

/* Product Form & Specs Switcher */
const PRODUCT_DATA = {
    raw: {
        l1: {
            title: "L1 Supreme Raw Chilli",
            desc: "The crown jewel of Vidarbha's harvest. Fully intact, long shiny red pods, bright uniform crimson tone. Perfect for premium retail packing and high-color exports.",
            shu: "70,000 - 85,000 SHU",
            color: "120 - 140 ASTA",
            moist: "< 9.5%",
            use: "Exports, Premium Retail Packets",
            price: 240,
            img: "assets/chilli_l1.jpg"
        },
        l2: {
            title: "L2 Premium Raw Chilli",
            desc: "Excellent color value and solid pungency level. Medium-sized well-dried pods with very few broken stalks. Highly popular for industrial spice grinding and standard packaging.",
            shu: "50,000 - 65,000 SHU",
            color: "100 - 115 ASTA",
            moist: "< 10%",
            use: "Spice Mix Brands, Wholesale Packs",
            price: 210,
            img: "assets/chilli_l2.jpg"
        },
        l3: {
            title: "L3 Standard Raw Chilli",
            desc: "Highly economical choice for food processors and bulk commercial kitchens. Offers robust heat levels with a mix of pod sizes and traditional rustic color.",
            shu: "35,000 - 45,000 SHU",
            color: "80 - 95 ASTA",
            moist: "< 11%",
            use: "Pickle Factories, Commercial Masalas",
            price: 175,
            img: "assets/chilli_l3.jpg"
        }
    },
    powder: {
        l1: {
            title: "L1 Supreme Powder",
            desc: "Ultra-fine premium powder ground under cold temperatures. Deep red color, maximum natural capsaicin oil retention, intense aroma. No added colors or stabilizers.",
            shu: "80,000 - 90,000 SHU",
            color: "130 - 150 ASTA",
            moist: "< 8%",
            use: "Premium Spices Brands, Export Grade",
            price: 280,
            img: "assets/chilli_powder.jpg"
        },
        l2: {
            title: "L2 Premium Powder",
            desc: "Fine ground powder, excellent balance of hotness and vibrant red shading. Ground from selected grade L2 chillies. Ideal for culinary seasoning blends.",
            shu: "60,000 - 70,000 SHU",
            color: "110 - 120 ASTA",
            moist: "< 8.5%",
            use: "Restaurant Suppliers, Packaged Blends",
            price: 245,
            img: "assets/chilli_powder.jpg"
        },
        l3: {
            title: "L3 Standard Powder",
            desc: "Strong heat profile, rustic orange-red shading. Highly recommended for bulk cooking, snack manufacturers, commercial catering and value packaging.",
            shu: "40,000 - 50,000 SHU",
            color: "85 - 100 ASTA",
            moist: "< 9%",
            use: "Commercial Snack Plants, Local Dhabas",
            price: 205,
            img: "assets/chilli_powder.jpg"
        }
    }
};

let currentProductType = 'raw';

function initProductSwitcher() {
    const toggleButtons = document.querySelectorAll('#product-type-toggle .toggle-btn');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const selectedType = btn.getAttribute('data-type');
            currentProductType = selectedType;
            updateProductDisplay();
        });
    });

    // Handle grade selection buttons click to scroll and prefill form
    document.querySelectorAll('.enquire-grade-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const grade = btn.getAttribute('data-grade');
            const selectGrade = document.getElementById('enquiry-grade');
            const selectType = document.getElementById('enquiry-prod-type');
            
            selectGrade.value = grade;
            selectType.value = currentProductType;
            
            // Trigger calculation update
            updateCalculation();
        });
    });
}

function updateProductDisplay() {
    const typeData = PRODUCT_DATA[currentProductType];
    
    // Grade L1 elements
    document.getElementById('title-l1').textContent = typeData.l1.title;
    document.getElementById('img-l1').src = typeData.l1.img;
    document.getElementById('desc-l1').textContent = typeData.l1.desc;
    document.getElementById('shu-l1').textContent = typeData.l1.shu;
    document.getElementById('color-l1').textContent = typeData.l1.color;
    document.getElementById('moist-l1').textContent = typeData.l1.moist;
    document.getElementById('use-l1').textContent = typeData.l1.use;
    document.getElementById('price-l1').textContent = `₹${typeData.l1.price} / kg`;

    // Grade L2 elements
    document.getElementById('title-l2').textContent = typeData.l2.title;
    document.getElementById('img-l2').src = typeData.l2.img;
    document.getElementById('desc-l2').textContent = typeData.l2.desc;
    document.getElementById('shu-l2').textContent = typeData.l2.shu;
    document.getElementById('color-l2').textContent = typeData.l2.color;
    document.getElementById('moist-l2').textContent = typeData.l2.moist;
    document.getElementById('use-l2').textContent = typeData.l2.use;
    document.getElementById('price-l2').textContent = `₹${typeData.l2.price} / kg`;

    // Grade L3 elements
    document.getElementById('title-l3').textContent = typeData.l3.title;
    document.getElementById('img-l3').src = typeData.l3.img;
    document.getElementById('desc-l3').textContent = typeData.l3.desc;
    document.getElementById('shu-l3').textContent = typeData.l3.shu;
    document.getElementById('color-l3').textContent = typeData.l3.color;
    document.getElementById('moist-l3').textContent = typeData.l3.moist;
    document.getElementById('use-l3').textContent = typeData.l3.use;
    document.getElementById('price-l3').textContent = `₹${typeData.l3.price} / kg`;
}

/* Interactive Chilli Grinder Game */
function initInteractiveGrinder() {
    const pestle = document.getElementById('pestle-element');
    const chillies = document.getElementById('chillies-sprite');
    const grindBtn = document.getElementById('grind-btn-interactive');
    const grindBar = document.getElementById('grind-bar');
    const percentageText = document.getElementById('progress-percentage');
    const statusText = document.getElementById('grind-status-label');
    const particlesContainer = document.getElementById('particles-container');

    let progress = 0;
    let grindInterval = null;
    let isGrinding = false;

    function startGrinding() {
        if (progress >= 100) return;
        isGrinding = true;
        pestle.classList.add('animating');
        grindBtn.textContent = "Grinding...";
        
        grindInterval = setInterval(() => {
            progress += 1.5;
            if (progress >= 100) {
                progress = 100;
                stopGrinding();
                onGrindComplete();
            }
            updateGrindVisuals();
        }, 60);
    }

    function stopGrinding() {
        isGrinding = false;
        pestle.classList.remove('animating');
        if (grindInterval) {
            clearInterval(grindInterval);
        }
        if (progress < 100) {
            grindBtn.textContent = "Hold to Start Grinding";
        }
    }

    function updateGrindVisuals() {
        grindBar.style.width = `${progress}%`;
        percentageText.textContent = `${Math.floor(progress)}%`;

        // Update chilli crushing sprite appearance
        if (progress < 30) {
            statusText.textContent = "Crushing pods...";
            chillies.className = "bowl-chillies";
        } else if (progress >= 30 && progress < 65) {
            statusText.textContent = "Splitting seeds, releasing oils...";
            chillies.className = "bowl-chillies crushed-1";
        } else if (progress >= 65 && progress < 99) {
            statusText.textContent = "Cold-grinding spice texture...";
            chillies.className = "bowl-chillies crushed-2";
        }

        // Spawn spice particles dynamically
        if (isGrinding) {
            spawnSpiceParticle();
        }
    }

    function spawnSpiceParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle spiced';
        
        // Random trajectory angle and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 80;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        
        particle.style.setProperty('--x', `${targetX}px`);
        particle.style.setProperty('--y', `${targetY}px`);
        
        // Color variance: red/gold
        const colors = ['#B22222', '#D21F3C', '#E5A93C', '#F1C40F'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random start position within bowl
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        particle.style.left = `calc(50% + ${offsetX}px)`;
        particle.style.top = `calc(50% + ${offsetY}px)`;
        
        particlesContainer.appendChild(particle);
        
        // Cleanup particle
        setTimeout(() => {
            particle.remove();
        }, 1200);
    }

    function onGrindComplete() {
        statusText.innerHTML = "<span>Purity Achieved! Fine Powder Ready.</span>";
        chillies.className = "bowl-chillies powder";
        grindBtn.innerHTML = "Grind Completed <i class='fa-solid fa-check'></i>";
        grindBtn.style.background = "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)";
        grindBtn.style.pointerEvents = "none";
        
        // Add Reset button after short delay
        setTimeout(() => {
            grindBtn.innerHTML = "Reset Grinder <i class='fa-solid fa-rotate-left'></i>";
            grindBtn.style.background = "";
            grindBtn.style.pointerEvents = "auto";
            
            // Re-bind reset action
            const resetHandler = () => {
                progress = 0;
                updateGrindVisuals();
                grindBtn.innerHTML = "Hold to Start Grinding <i class='fa-solid fa-gear'></i>";
                grindBtn.removeEventListener('click', resetHandler);
                
                // Re-bind hold interactions
                bindHoldActions();
            };
            grindBtn.addEventListener('click', resetHandler);
        }, 2500);
    }

    function bindHoldActions() {
        // Desktop Hold Events
        grindBtn.addEventListener('mousedown', startGrinding);
        window.addEventListener('mouseup', stopGrinding);
        
        // Touch/Mobile Hold Events
        grindBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startGrinding();
        });
        window.addEventListener('touchend', stopGrinding);
        
        // Pestle Interaction
        pestle.addEventListener('mousedown', startGrinding);
        pestle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startGrinding();
        });

        // Click Fallback Interactions (for mobile/automated testing/tap behavior)
        grindBtn.addEventListener('click', () => {
            if (progress < 100 && !isGrinding) {
                progress += 5;
                if (progress >= 100) {
                    progress = 100;
                    onGrindComplete();
                }
                updateGrindVisuals();
            }
        });

        pestle.addEventListener('click', () => {
            if (progress < 100 && !isGrinding) {
                progress += 5;
                if (progress >= 100) {
                    progress = 100;
                    onGrindComplete();
                }
                updateGrindVisuals();
            }
        });
    }

    bindHoldActions();
}

/* Dynamic Inquiry Calculator & WhatsApp Builder */
function initCalculator() {
    const form = document.getElementById('wholesale-calc-form');
    const inputType = document.getElementById('enquiry-prod-type');
    const inputGrade = document.getElementById('enquiry-grade');
    const inputQty = document.getElementById('enquiry-quantity');
    const inputUnit = document.getElementById('enquiry-unit');
    const priceDisplay = document.getElementById('calc-price-display');

    // Trigger update on form changes
    [inputType, inputGrade, inputQty, inputUnit].forEach(el => {
        el.addEventListener('change', updateCalculation);
        el.addEventListener('input', updateCalculation);
    });

    function updateCalculation() {
        const type = inputType.value;
        const grade = inputGrade.value.toLowerCase();
        let qty = parseFloat(inputQty.value) || 0;
        const unit = inputUnit.value;
        
        // Minimum validation check
        if (qty < 0) qty = 0;
        
        // Map rates
        const ratePerKg = PRODUCT_DATA[type][grade].price;
        
        // Calculate Total
        let multiplier = 1;
        if (unit === 'tonnes') {
            multiplier = 1000; // 1 metric tonne = 1000 kg
        }
        
        const total = ratePerKg * qty * multiplier;
        
        // Format Currency in INR
        if (total > 0) {
            priceDisplay.textContent = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(total);
        } else {
            priceDisplay.textContent = "₹0";
        }
    }

    // Initialize display rate
    updateCalculation();

    // Form Submit WhatsApp Redirect
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('client-name').value.trim();
        const phone = document.getElementById('client-phone').value.trim();
        const type = inputType.options[inputType.selectedIndex].text;
        const grade = inputGrade.options[inputGrade.selectedIndex].text;
        const qty = inputQty.value;
        const unit = inputUnit.value;
        const estVal = priceDisplay.textContent;
        
        const message = `Hello Radhe Krishna Traders Nagpur!\n\nI would like to receive a custom wholesale quote with the following details:\n\n*Company/Name:* ${name}\n*Contact No:* ${phone}\n*Product:* ${type}\n*Quality:* ${grade}\n*Required Quantity:* ${qty} ${unit}\n*Estimated Market Value:* ${estVal}\n\nPlease confirm availability, logistics costs, and payment options for shipment.\n\nThank you!`;
        
        const encodedMessage = encodeURIComponent(message);
        
        // Radhe Krishna Traders registered trade WhatsApp number (Onkaar Uikey)
        const whatsappURL = `https://wa.me/919730312339?text=${encodedMessage}`;
        
        // Open WhatsApp in a new window/tab
        window.open(whatsappURL, '_blank');
    });

    window.updateCalculation = updateCalculation; // Export globally for toggle switcher reuse
}

/* Scroll Fade In Animations */
function initScrollAnimations() {
    const fadeSections = document.querySelectorAll('.id-scroll-target');

    // Add CSS initial fade class
    fadeSections.forEach(section => {
        section.classList.add('fade-in-section');
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, observerOptions);

    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // Synchronize active menu link on scroll using IntersectionObserver
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#nav-menu a');

    const navObserverOptions = {
        threshold: 0.15,
        rootMargin: "-20% 0px -60% 0px"
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });
}
