// ============================
// MikrodTech JavaScript
// Features: Responsive nav toggle + smooth scrolling
// ============================


// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    mainNav.classList.toggle("active");
  });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    // Only handle on-page links
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // offset for header
          behavior: "smooth"
        });
        // Close mobile nav after click
        mainNav.classList.remove("active");
        navToggle.setAttribute("aria-expanded", false);
      }
    }
  });
});


// ==== Backend API URL ====
const isLocalhost = (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.startsWith("192.168.") ||
  window.location.hostname.startsWith("10.") ||
  window.location.hostname.startsWith("172.")
);


 


// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      gtag('event', 'contact_form_submission', {
        'event_category': 'Form',
        'event_label': 'Contact Form'
      });
    });
  }
});



// ============================
// Gmail Contact Redirect
// ============================

document.addEventListener("DOMContentLoaded", () => {

  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const service =
      contactForm.querySelector("[name='service']").value;

    const name =
      contactForm.querySelector("[name='name']").value;

    const email =
      contactForm.querySelector("[name='email']").value;

    const phone =
      contactForm.querySelector("[name='phone']").value;

    const message =
      contactForm.querySelector("[name='message']").value;

    const subject =
      `MikrodTech Service Request - ${service}`;

    const body =
`Hello MikrodTech,

I would like assistance with: ${service}

Name: ${name}
Email: ${email}
Phone: ${phone}

Issue/Project Details:
${message}
`;

    const gmailURL =
`https://mail.google.com/mail/?view=cm&fs=1&to=info@mikrodtech.co.ke&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailURL, "_blank");

  });

});

// ===============================
// Contact Page Email Redirect
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const emailBtn = document.getElementById("emailBtn");
  const serviceSelect = document.getElementById("serviceSelect");

  if (emailBtn && serviceSelect) {

    emailBtn.addEventListener("click", () => {

      const selectedService = serviceSelect.value;

      // Ensure service selected
      if (!selectedService) {
        alert("Please select a service first.");
        return;
      }

      // Email configuration
      const email = "info@mikrodtech.co.ke";
      const subject = encodeURIComponent(selectedService);

      const body = encodeURIComponent(
`Hello MikrodTech,

I would like assistance regarding: ${selectedService}

Please contact me with more information.

Thank you.`
      );

      // Open user's email app
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });

  }

});

// ======================================
// Service Buttons Email Redirect
// ======================================

document.addEventListener("DOMContentLoaded", () => {

  const serviceButtons =
    document.querySelectorAll(".service-email-btn");

  if (!serviceButtons.length) return;

  serviceButtons.forEach((button) => {

    button.addEventListener("click", (e) => {

      e.preventDefault();

      const service =
        button.dataset.service || "MikrodTech Service";

      const email = "info@mikrodtech.co.ke";

      const subject =
        encodeURIComponent(`Service Inquiry - ${service}`);

      const body = encodeURIComponent(
`Hello MikrodTech,

I would like assistance with:
${service}

Please provide more information about this service.

Thank you.`
      );

      // Open Gmail compose window
      const gmailURL =
`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

      window.open(gmailURL, "_blank");

    });

  });

});


/* ================= MASHUJAA CONSULTATION TABS ================= */

(() => {
  const section = document.getElementById('mashujaa-consultation');

  if (!section) return;

  const services = {
    software: {
      name: 'Software Engineering',
      description:
        "Have an idea for a website, mobile app, business system or custom software? Let's explore how to bring it to life."
    },
    cyber: {
      name: 'Cybersecurity',
      description:
        'Discuss securing your website, applications, business data, devices or organization against digital threats.'
    },
    iot: {
      name: 'IoT & Smart Systems',
      description:
        'Explore smart homes, connected devices, automation, intelligent monitoring or a custom IoT solution.'
    }
  };

  const tabs = section.querySelectorAll('.mashujaa-tab');
  const title = document.getElementById('mashujaa-service-title');
  const description = document.getElementById(
    'mashujaa-service-description'
  );
  const whatsapp = document.getElementById('mashujaa-whatsapp');
  const panel = document.getElementById('panel-software');

  function selectService(key) {
    const service = services[key];

    if (!service) return;

    tabs.forEach(tab => {
      const selected = tab.dataset.service === key;

      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    title.textContent = service.name;
    description.textContent = service.description;
    panel.setAttribute('aria-labelledby',
      document.getElementById(
        key === 'software' ? 'tab-software' :
        key === 'cyber' ? 'tab-cyber' : 'tab-iot'
      ).id
    );

    const message =
      `Hello MikrodTech, I would like to book a free consultation ` +
      `under the Mashujaa Weekend Free Consultation Offer for ` +
      `${service.name}. Please guide me on the next steps.`;

    whatsapp.href =
      'https://wa.me/254769329029?text=' +
      encodeURIComponent(message);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      selectService(tab.dataset.service);
    });

    tab.addEventListener('keydown', event => {
      let nextIndex = index;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIndex = (index + 1) % tabs.length;
      } else if (
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowUp'
      ) {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else {
        return;
      }

      event.preventDefault();
      tabs[nextIndex].focus();
      selectService(tabs[nextIndex].dataset.service);
    });
  });

  selectService('software');
})();
