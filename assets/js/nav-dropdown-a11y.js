document.addEventListener('DOMContentLoaded', function () {
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
    if (!group) return;

    var panel = group.querySelector('div[class*="absolute"]');
    if (!panel) return;

    setPanelState(trigger, panel, false);

    group.addEventListener('mouseenter', function () {
      setPanelState(trigger, panel, true);
    });

    group.addEventListener('mouseleave', function () {
      setPanelState(trigger, panel, false);
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
  });
});
