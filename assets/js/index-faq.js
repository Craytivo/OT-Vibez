(function () {
  if (window.__otvFaqHydrated) return;
  window.__otvFaqHydrated = true;

  function readFaqData() {
    var node = document.getElementById("otv-faq-data");
    if (!node) return [];
    try {
      var parsed = JSON.parse(node.textContent || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  window.OTV_FAQ_ITEMS = readFaqData();

  window.faqComponent = function faqComponent() {
    return {
      selectedQuestion: null,
      search: "",
      activeTopic: "all",
      defaultVisible: 6,
      expanded: false,
      topics: [
        { id: "all", label: "All" },
        { id: "booking", label: "Booking" },
        { id: "studio", label: "Studio" },
        { id: "podcast", label: "Podcast" },
        { id: "support", label: "Support" }
      ],
      faqList: Array.isArray(window.OTV_FAQ_ITEMS) ? window.OTV_FAQ_ITEMS : [],
      get filteredFaqs() {
        var term = this.search.toLowerCase();
        return this.faqList.filter((item) => {
          var topicMatch = this.activeTopic === "all" || item.topic === this.activeTopic;
          var termMatch = item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term);
          return topicMatch && termMatch;
        });
      },
      get displayedFaqs() {
        if (this.search.trim().length || this.expanded) return this.filteredFaqs;
        return this.filteredFaqs.slice(0, this.defaultVisible);
      },
      toggleFaq(question) {
        var wasOpen = this.selectedQuestion === question;
        this.selectedQuestion = wasOpen ? null : question;
        this.trackEvent("faq_item_toggle", {
          event_category: "FAQ",
          event_label: question,
          faq_state: wasOpen ? "closed" : "opened"
        });
      },
      isOpen(question) {
        return this.selectedQuestion === question;
      },
      setTopic(topicId) {
        if (this.activeTopic === topicId) return;
        this.activeTopic = topicId;
        this.expanded = false;
        this.selectedQuestion = null;
        this.trackEvent("faq_topic_select", {
          event_category: "FAQ",
          event_label: topicId
        });
      },
      toggleExpanded() {
        this.expanded = !this.expanded;
        this.trackEvent("faq_visibility_toggle", {
          event_category: "FAQ",
          event_label: this.expanded ? "show_all" : "show_fewer"
        });
      },
      trackAffiliateClick(label, url) {
        this.trackEvent("affiliate_click", {
          event_category: "Affiliate",
          event_label: label,
          affiliate_url: url
        });
      },
      trackEvent(name, params) {
        if (typeof gtag === "function") {
          gtag("event", name, params || {});
        }
      },
      clearSearch() {
        this.search = "";
      },
      init() {
        this.$watch("search", (value) => {
          var term = value.trim().toLowerCase();
          var results = this.filteredFaqs;
          if (!term) {
            this.selectedQuestion = null;
            return;
          }
          this.selectedQuestion = results.length ? results[0].q : null;
        });
      },
      highlightText(text) {
        var term = this.search.trim();
        var source = String(text || "");
        var escapeHtml = function (value) {
          return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
        };
        var escapedText = escapeHtml(source);
        if (!term) return escapedText;
        var escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        var regex = new RegExp("(" + escapedTerm + ")", "gi");
        return escapedText.replace(regex, '<mark class="rounded bg-amber-200 px-0.5 text-amber-900">$1</mark>');
      }
    };
  };

  (function syncFaqSchema() {
    var faqItems = Array.isArray(window.OTV_FAQ_ITEMS) ? window.OTV_FAQ_ITEMS : [];
    var faqSchemaNode = document.getElementById("faq-schema-jsonld");
    if (!faqSchemaNode) return;
    var schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(function (item) {
        return {
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a
          }
        };
      })
    };
    faqSchemaNode.textContent = JSON.stringify(schema);
  })();
})();
