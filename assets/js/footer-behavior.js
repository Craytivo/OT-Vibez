(function () {
  function setFooterYear() {
    var footerYear = document.getElementById('footerYear');
    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setFooterYear);
  } else {
    setFooterYear();
  }
})();