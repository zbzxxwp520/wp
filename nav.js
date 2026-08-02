var ABSTRACT_LABELS = {
  en: { show: 'Abstract',  hide: 'Hide Abstract' },
  zh: { show: '摘要',      hide: '收起摘要' },
  ko: { show: '초록',      hide: '초록 닫기' }
};

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

function currentLang() {
  if (document.body.classList.contains('lang-zh')) return 'zh';
  if (document.body.classList.contains('lang-ko')) return 'ko';
  return 'en';
}

function setLang(lang) {
  document.body.classList.remove('lang-en', 'lang-zh', 'lang-ko');
  document.body.classList.add('lang-' + lang);
  localStorage.setItem('lang', lang);

  document.querySelectorAll('.lang-switch [data-lang]').forEach(function (b) {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });

  document.querySelectorAll('.btn-abstract').forEach(function (b) {
    const ab = b.closest('.paper-item').querySelector('.paper-abstract');
    const open = ab && ab.classList.contains('open');
    b.textContent = open ? ABSTRACT_LABELS[lang].hide : ABSTRACT_LABELS[lang].show;
  });
}

function toggleAbstract(btn) {
  const ab = btn.closest('.paper-item').querySelector('.paper-abstract');
  ab.classList.toggle('open');
  const open = ab.classList.contains('open');
  const lang = currentLang();
  btn.textContent = open ? ABSTRACT_LABELS[lang].hide : ABSTRACT_LABELS[lang].show;
}
