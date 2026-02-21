(function () {
  function startAOS() {
    if (!window.AOS) return;
    window.AOS.init({
      once: true,
      duration: 800,
      easing: "ease-out-cubic"
    });
  }

  function loadAOS() {
    if (!document.querySelector("[data-aos]")) return;
    if (window.AOS) {
      startAOS();
      return;
    }

    var existing = document.querySelector('script[src="/assets/vendor/aos-2.3.4.js"]');
    if (existing) {
      if (existing.dataset.loaded === "true") startAOS();
      else existing.addEventListener("load", startAOS, { once: true });
      return;
    }

    var script = document.createElement("script");
    script.src = "/assets/vendor/aos-2.3.4.js";
    script.defer = true;
    script.onload = function () {
      script.dataset.loaded = "true";
      startAOS();
    };
    document.body.appendChild(script);
  }

  function schedule() {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadAOS, { timeout: 1500 });
    } else {
      setTimeout(loadAOS, 300);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedule, { once: true });
  } else {
    schedule();
  }
})();
