(function () {
  var tracking = window.__otvTracking || {};
  var gtagId = tracking.gtagId;
  var clarityId = tracking.clarityId;
  var consentKey = "otv_consent_analytics";
  var booted = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  function loadScript(src, onload) {
    var script = document.createElement("script");
    script.src = src;
    script.async = true;
    if (typeof onload === "function") script.onload = onload;
    document.head.appendChild(script);
  }

  function initGtag() {
    if (!gtagId) return;
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gtagId), function () {
      window.gtag("js", new Date());
      window.gtag("config", gtagId);
    });
  }

  function initClarity() {
    if (!clarityId) return;
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
  }

  function boot() {
    if (booted) return;
    booted = true;
    initGtag();
    initClarity();
  }

  function hasAnalyticsConsent() {
    try {
      return window.localStorage.getItem(consentKey) === "granted";
    } catch (error) {
      return false;
    }
  }

  function setAnalyticsConsent(state) {
    try {
      if (state === "granted") {
        window.localStorage.setItem(consentKey, "granted");
        boot();
      } else {
        window.localStorage.setItem(consentKey, "denied");
      }
    } catch (error) {
      // no-op in restricted storage contexts
    }
  }

  function bindBootTriggers() {
    var trigger = function () {
      boot();
      window.removeEventListener("pointerdown", trigger);
      window.removeEventListener("keydown", trigger);
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("touchstart", trigger);
    };

    window.addEventListener("pointerdown", trigger, { once: true, passive: true });
    window.addEventListener("keydown", trigger, { once: true });
    window.addEventListener("scroll", trigger, { once: true, passive: true });
    window.addEventListener("touchstart", trigger, { once: true, passive: true });

    setTimeout(boot, 10000);
  }

  // Expose lightweight hooks so a consent UI can grant/revoke analytics later.
  window.OTVConsent = window.OTVConsent || {};
  window.OTVConsent.grantAnalytics = function () {
    setAnalyticsConsent("granted");
  };
  window.OTVConsent.denyAnalytics = function () {
    setAnalyticsConsent("denied");
  };

  if (!hasAnalyticsConsent()) {
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindBootTriggers, { once: true });
  } else {
    bindBootTriggers();
  }
})();
