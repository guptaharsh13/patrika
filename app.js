// Mobile menu functionality
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const navbar = document.querySelector(".navbar");

// Show navbar on page load after a short delay
window.addEventListener("load", () => {
  setTimeout(() => {
    navbar.style.display = "block";
    navbar.style.opacity = "0";
    navbar.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      navbar.style.opacity = "1";
    }, 100);
  }, 500);
});

// Open mobile menu
hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
});

// Close mobile menu
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "auto"; // Re-enable scrolling
});

// Close menu when clicking on a link
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close menu when clicking outside
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close mobile menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Handle window resize - close mobile menu if opened and switched to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && mobileMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll behavior - hide/show on scroll
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// Optimize background images for mobile
function optimizeBackgroundImages() {
  const isMobile = window.innerWidth < 768;
  const sections = document.querySelectorAll(".background[id]");

  sections.forEach((section) => {
    if (isMobile) {
      // On mobile, adjust background position for better viewing
      section.style.backgroundPosition = "center top";
      section.style.backgroundAttachment = "scroll";
    } else {
      // On desktop, use original settings
      section.style.backgroundPosition = "center center";
      section.style.backgroundAttachment = "fixed";
    }
  });
}

// Run on load and resize
window.addEventListener("load", optimizeBackgroundImages);
window.addEventListener("resize", optimizeBackgroundImages);

// Add loading state for images
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".background[id]");

  sections.forEach((section) => {
    const img = new Image();
    const bgImage = window.getComputedStyle(section).backgroundImage;
    const url = bgImage.slice(4, -1).replace(/"/g, "");

    if (url && url !== "none") {
      img.onload = () => {
        section.classList.add("loaded");
      };
      img.src = url;
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all sections for animation
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".background");
  sections.forEach((section) => {
    observer.observe(section);
  });
});
