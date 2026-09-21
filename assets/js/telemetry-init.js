(function () {
  var tracking = window.__otvTracking || {};
  var gtagId = tracking.gtagId;
  var clarityId = tracking.clarityId;
  var consentKey = "otv_consent_analytics";
  var booted = false;

  function initGtag() {
    if (!gtagId) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
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

  // Expose lightweight hooks so a consent UI can grant/revoke analytics later.
  window.OTVConsent = window.OTVConsent || {};
  window.OTVConsent.grantAnalytics = function () {
    setAnalyticsConsent("granted");
  };
  window.OTVConsent.denyAnalytics = function () {
    setAnalyticsConsent("denied");
  };

  if (!hasAnalyticsConsent()) return;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindBootTriggers, { once: true });
  } else {
    bindBootTriggers();
  }
})();
