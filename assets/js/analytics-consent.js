(function () {
  var key = "otv_consent_analytics";
  function state() { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function set(value) { try { localStorage.setItem(key, value); } catch (e) {} }
  function init() {
    var banner = document.getElementById("analytics-consent");
    if (!banner || state()) return;
    banner.classList.remove("hidden");
    var allow = document.getElementById("analytics-consent-allow");
    var deny = document.getElementById("analytics-consent-deny");
    var close = document.getElementById("analytics-consent-close");
    if (allow) allow.addEventListener("click", function () {
      set("granted");
      if (window.OTVConsent && window.OTVConsent.grantAnalytics) window.OTVConsent.grantAnalytics();
      banner.classList.add("hidden");
    });
    if (deny) deny.addEventListener("click", function () {
      set("denied");
      if (window.OTVConsent && window.OTVConsent.denyAnalytics) window.OTVConsent.denyAnalytics();
      banner.classList.add("hidden");
    });
    if (close) close.addEventListener("click", function () {
      set("denied");
      banner.classList.add("hidden");
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();