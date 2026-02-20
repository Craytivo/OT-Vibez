(function () {
  var tracking = window.__otvTracking || {};
  var gtagId = tracking.gtagId;
  var clarityId = tracking.clarityId;

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
    initGtag();
    initClarity();
  }

  if (document.readyState === "complete") {
    setTimeout(boot, 900);
  } else {
    window.addEventListener(
      "load",
      function () {
        setTimeout(boot, 900);
      },
      { once: true }
    );
  }
})();
