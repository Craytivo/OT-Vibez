(function () {
  function boolFromAttr(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  }

  function track(el) {
    if (typeof window.gtag !== 'function') return;

    var eventName = el.getAttribute('data-analytics-event');
    if (!eventName) return;

    var category = el.getAttribute('data-analytics-category');
    var label = el.getAttribute('data-analytics-label');

    var params = {
      event_category: category || 'General',
      event_label: label || ''
    };

    var analyticsTest = el.getAttribute('data-analytics-test');
    var analyticsVariant = el.getAttribute('data-analytics-variant');
    var analyticsContext = el.getAttribute('data-analytics-context');
    var serviceName = el.getAttribute('data-analytics-service');
    var filterCategory = el.getAttribute('data-analytics-filter');
    var expandedBeforeBook = boolFromAttr(el.getAttribute('data-analytics-expanded-before-book'));

    if (analyticsTest) params.analytics_test = analyticsTest;
    if (analyticsVariant) params.analytics_variant = analyticsVariant;
    if (analyticsContext) params.analytics_context = analyticsContext;
    if (serviceName) params.service_name = serviceName;
    if (filterCategory) params.filter_category = filterCategory;
    if (typeof expandedBeforeBook === 'boolean') params.expanded_before_book = expandedBeforeBook;

    window.gtag('event', eventName, params);
  }

  document.addEventListener('click', function (event) {
    var target = event.target.closest('[data-analytics-event]');
    if (!target) return;
    track(target);
  });
})();
