var ABSTRACT_LABELS = {
  en: { show: 'Abstract', hide: 'Hide Abstract' },
  zh: { show: '摘要',     hide: '收起摘要' },
  tw: { show: '摘要',     hide: '隱藏摘要' },
  ko: { show: '초록',     hide: '초록 닫기' },
  ja: { show: '要旨',     hide: '要旨を閉じる' }
};

var LANGS = ['en', 'zh', 'tw', 'ko', 'ja'];

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
  for (var i = 0; i < LANGS.length; i++) {
    if (document.body.classList.contains('lang-' + LANGS[i])) return LANGS[i];
  }
  return 'en';
}

function setLang(lang) {
  LANGS.forEach(function (l) { document.body.classList.remove('lang-' + l); });
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
