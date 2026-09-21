(function () {
  var tracking = window.__otvTracking || {};
  var gtagId = tracking.gtagId;
  var clarityId = tracking.clarityId;
  var consentKey = "otv_consent_analytics";
  var booted = false;

  function loadScript(src, onload) {
    var script = document.createElement("script");
    script.src = src;
    script.async = true;
    if (typeof onload === "function") script.onload = onload;
    document.head.appendChild(script);
  }

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
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
  }

  function hasConsent() {
    try { return window.localStorage.getItem(consentKey) === "granted"; }
    catch (error) { return false; }
  }

  function boot() {
    if (booted || !hasConsent()) return;
    booted = true;
    initGtag();
    initClarity();
  }

  window.OTVConsent = window.OTVConsent || {};
  window.OTVConsent.grantAnalytics = function () {
    try { window.localStorage.setItem(consentKey, "granted"); } catch (error) {}
    boot();
  };
  window.OTVConsent.denyAnalytics = function () {
    try { window.localStorage.setItem(consentKey, "denied"); } catch (error) {}
  };

  if (hasConsent()) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
    else boot();
  }
})();