document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const ul = document.querySelector('nav ul');
  if (toggle && ul) {
    toggle.addEventListener('click', function () {
      ul.classList.toggle('open');
    });
  }
  // Restore saved language
  setLang(localStorage.getItem('lang') || 'en');
});

function setLang(lang) {
  document.body.classList.remove('lang-en', 'lang-zh');
  document.body.classList.add('lang-' + lang);
  localStorage.setItem('lang', lang);

  document.querySelectorAll('.lang-toggle').forEach(function (b) {
    b.textContent = (lang === 'en') ? '中文' : 'English';
  });

  document.querySelectorAll('.btn-abstract').forEach(function (b) {
    const ab = b.closest('.paper-item').querySelector('.paper-abstract');
    const open = ab && ab.classList.contains('open');
    b.textContent = (lang === 'zh')
      ? (open ? '收起摘要' : '摘要')
      : (open ? 'Hide Abstract' : 'Abstract');
  });
}

function toggleLang() {
  const zh = document.body.classList.contains('lang-zh');
  setLang(zh ? 'en' : 'zh');
}

function toggleAbstract(btn) {
  const ab = btn.closest('.paper-item').querySelector('.paper-abstract');
  ab.classList.toggle('open');
  const zh = document.body.classList.contains('lang-zh');
  const open = ab.classList.contains('open');
  btn.textContent = open
    ? (zh ? '收起摘要' : 'Hide Abstract')
    : (zh ? '摘要' : 'Abstract');
}
