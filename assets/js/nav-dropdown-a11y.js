function initNavDropdownA11y() {
  var triggers = document.querySelectorAll('.nav-dropdown-trigger');
  if (!triggers.length) return;

  function setPanelState(trigger, panel, isOpen) {
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    if (isOpen) {
      panel.classList.remove('invisible', 'opacity-0', 'translate-y-1');
      panel.classList.add('visible', 'opacity-100', 'translate-y-0');
      panel.querySelectorAll('a').forEach(function (link) {
        link.removeAttribute('tabindex');
      });
      return;
    }

    panel.classList.add('invisible', 'opacity-0', 'translate-y-1');
    panel.classList.remove('visible', 'opacity-100', 'translate-y-0');
    panel.querySelectorAll('a').forEach(function (link) {
      link.setAttribute('tabindex', '-1');
    });
  }

  triggers.forEach(function (trigger) {
    var group = trigger.closest('.group');
    if (!group || group.dataset.dropdownBound === 'true') return;

    var panel = group.querySelector('div[class*="absolute"]');
    if (!panel) return;

    setPanelState(trigger, panel, false);

    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      triggers.forEach(function (otherTrigger) {
        if (otherTrigger === trigger) return;
        var otherGroup = otherTrigger.closest('.group');
        if (!otherGroup) return;
        var otherPanel = otherGroup.querySelector('div[class*="absolute"]');
        if (!otherPanel) return;
        setPanelState(otherTrigger, otherPanel, false);
      });

      setPanelState(trigger, panel, !isOpen);
    });

    trigger.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setPanelState(trigger, panel, true);
        var firstLink = panel.querySelector('a');
        if (firstLink) firstLink.focus();
      }

      if (event.key === 'Escape') {
        setPanelState(trigger, panel, false);
        trigger.focus();
      }
    });

    panel.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setPanelState(trigger, panel, false);
        trigger.focus();
      }
    });

    group.addEventListener('focusout', function () {
      window.setTimeout(function () {
        if (!group.contains(document.activeElement)) {
          setPanelState(trigger, panel, false);
        }
      }, 0);
    });

    document.addEventListener('click', function (event) {
      if (!group.contains(event.target)) {
        setPanelState(trigger, panel, false);
      }
    });

    group.dataset.dropdownBound = 'true';
  });
}

document.addEventListener('DOMContentLoaded', initNavDropdownA11y);
