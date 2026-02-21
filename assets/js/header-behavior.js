(function () {
  var initialized = false;
  var logoScrollBound = false;
  var focusBound = false;
  var desktopDropdownBound = false;

  function initHeaderBehavior() {
    if (initialized) return;

    var logoContainer = document.getElementById('logo-container');
    var toggleBtn = document.getElementById('menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    var backdrop = document.getElementById('mobile-backdrop');
    var mobileCloseBtn = document.getElementById('mobile-close');

    if (!toggleBtn || !mobileMenu || !backdrop || !mobileCloseBtn) return;

    if (!logoScrollBound) {
      window.addEventListener('scroll', function () {
        if (logoContainer) {
          logoContainer.classList.toggle('scale-90', window.scrollY > 40);
        }
      });
      logoScrollBound = true;
    }

    var closeMenu = function () {
      mobileMenu.classList.add('hidden');
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    };

    var openMenu = function () {
      mobileMenu.classList.remove('hidden');
      backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
    };

    toggleBtn.addEventListener('click', function () {
      var isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    backdrop.addEventListener('click', closeMenu);
    mobileCloseBtn.addEventListener('click', closeMenu);

    var menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    initialized = true;
  }

  function bindMenuFocusManagement() {
    if (focusBound) return;

    var mobileToggle = document.getElementById('menu-toggle');
    var mobileClose = document.getElementById('mobile-close');

    if (!mobileToggle || !mobileClose) return;

    mobileToggle.addEventListener('click', function () {
      setTimeout(function () {
        mobileClose.focus();
      }, 100);
    });

    mobileClose.addEventListener('click', function () {
      setTimeout(function () {
        mobileToggle.focus();
      }, 100);
    });

    focusBound = true;
  }

  function bindDesktopDropdownAria() {
    if (desktopDropdownBound) return;

    var dropdowns = document.querySelectorAll('[data-desktop-nav-dropdown]');
    if (!dropdowns.length) return;

    dropdowns.forEach(function (dropdown) {
      var trigger = dropdown.querySelector('.nav-dropdown-trigger');
      if (!trigger) return;

      var setExpanded = function (isExpanded) {
        trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      };

      dropdown.addEventListener('mouseenter', function () { setExpanded(true); });
      dropdown.addEventListener('mouseleave', function () { setExpanded(false); });
      dropdown.addEventListener('focusin', function () { setExpanded(true); });
      dropdown.addEventListener('focusout', function (event) {
        if (!dropdown.contains(event.relatedTarget)) {
          setExpanded(false);
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') setExpanded(false);
      });
    });

    desktopDropdownBound = true;
  }

  function run() {
    initHeaderBehavior();
    bindMenuFocusManagement();
    bindDesktopDropdownAria();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
