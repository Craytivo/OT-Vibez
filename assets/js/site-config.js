(function () {
  const config = {
    bookingUrl: 'https://book.squareup.com/appointments/dcefn1rzex4bcs/location/L8GNSC31EZPQ3/services',
    phoneE164: '+17805221807',
    phoneDisplay: '(780) 522-1807',
    addressLine: 'Edmonton, Alberta'
  };

  window.OTVIBEZ_CONFIG = config;

  function hydrate(selector, apply) {
    document.querySelectorAll(selector).forEach(apply);
  }

  function applySiteConfig() {
    hydrate('[data-site-booking-url]', (el) => {
      el.setAttribute('href', config.bookingUrl);
    });

    hydrate('[data-site-phone]', (el) => {
      el.setAttribute('href', `tel:${config.phoneE164}`);
    });

    hydrate('[data-site-phone-text]', (el) => {
      el.textContent = config.phoneDisplay;
    });

    hydrate('[data-site-address]', (el) => {
      el.textContent = config.addressLine;
    });
  }

  window.OTVibezApplySiteConfig = applySiteConfig;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySiteConfig);
  } else {
    applySiteConfig();
  }
})();
