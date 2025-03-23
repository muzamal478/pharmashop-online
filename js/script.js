// Sample product data
const products = [
    { id: 1, name: "Paracetamol", price: 5.99, image: "../images/paracetamol.jpg" },
    { id: 2, name: "Ibuprofen", price: 7.99, image: "../images/vitamin.jpg" },
    { id: 3, name: "Vitamin C", price: 9.99, image: "../images/vitaminc.jpg" },
    { id: 4, name: "Aspirin", price: 4.99, image: "../images/aspirin.jpg" },
    { id: 5, name: "Amoxicillin", price: 12.99, image: "../images/amoxicillin.jpg" },
    { id: 6, name: "Vitamin D", price: 8.99, image: "../images/vitaminD.jpg" }
];

// Function to load products dynamically with staggered animations
function loadProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) {
        console.error("Product list element not found!");
        return;
    }

    products.forEach((product, index) => {
        const productCard = `
            <div class="col-md-4 mb-4 animate__animated animate__fadeInUp" style="animation-delay: ${index * 0.2}s;">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary buy-btn" data-id="${product.id}">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });

    // Attach event listeners to Buy buttons
    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id");
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                alert(`Added ${product.name} to your cart!`);
                // Future: Add to localStorage or backend cart system
            } else {
                console.error("Product not found!");
            }
        });
    });
}

// Enhanced Contact Form Logic
function initializeContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) {
        console.error("Contact form element not found!");
        return;
    }

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!validateForm(name, email, message)) {
            return;
        }

        // Simulate form submission (replace with real backend logic later)
        submitForm({ name, email, message })
            .then(() => {
                alert("Thank you! Your message has been sent successfully.");
                contactForm.reset();
            })
            .catch((error) => {
                alert("Oops! Something went wrong. Please try again.");
                console.error("Form submission error:", error);
            });
    });
}

// Form validation function
function validateForm(name, email, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
        alert("Please enter your name.");
        return false;
    }
    if (!email || !emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!message) {
        alert("Please enter your message.");
        return false;
    }
    return true;
}

// Simulated form submission (replace with real API call later)
function submitForm(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // For demo purposes, assume success
            if (data.name && data.email && data.message) {
                console.log("Form submitted:", data);
                resolve();
            } else {
                reject(new Error("Invalid form data"));
            }
        }, 1000); // 1-second delay to mimic server response
    });
}

// Scroll animation observer
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate__animated", "animate__fadeIn");
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll("section").forEach(section => observer.observe(section));
}

// Initialize everything on page load
window.onload = function () {
    loadProducts();
    initializeContactForm();
    setupScrollAnimations();
};