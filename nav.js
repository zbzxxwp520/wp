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
  showNotice();
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

function toggleQuestion(btn) {
  const q = btn.closest('.paper-item').querySelector('.paper-question');
  if (q) q.classList.toggle('open');
}

var NOTICE_KEY = 'wpNoticeHideUntil';
var NOTICE_DAYS = 30;

var NOTICE_BODY = {
  en: 'I am on leave from September to November 2026. For urgent matters, please leave a message by email.',
  zh: '2026年9月至11月我正在休假,如有急事请邮件留言。',
  tw: '2026年9月至11月我正在休假,如有急事請郵件留言。',
  ko: '2026년 9월부터 11월까지 휴가 중입니다. 급한 일이 있으시면 이메일로 메시지를 남겨 주십시오.',
  ja: '2026年9月から11月まで休暇中です。お急ぎの場合はメールにてご連絡ください。'
};
var NOTICE_CLOSE = { en: 'Close', zh: '关闭', tw: '關閉', ko: '닫기', ja: '閉じる' };
var NOTICE_MUTE = {
  en: 'Hide for 30 days', zh: '30天内不再显示', tw: '30天內不再顯示',
  ko: '30일간 보지 않기', ja: '30日間表示しない'
};

function langSpans(map) {
  return LANGS.map(function (l) {
    return '<span class="' + l + '">' + map[l] + '</span>';
  }).join('');
}

// the notice itself is shown in all five languages at once, not switched
function noticeLines() {
  return LANGS.map(function (l) {
    return '<p class="notice-line" lang="' + (l === 'tw' ? 'zh-Hant' : l === 'zh' ? 'zh-Hans' : l) + '">' + NOTICE_BODY[l] + '</p>';
  }).join('');
}

function noticeMuted() {
  try {
    var t = parseInt(localStorage.getItem(NOTICE_KEY) || '0', 10);
    return !!t && Date.now() < t;
  } catch (e) { return false; }
}

function muteNotice(days) {
  try { localStorage.setItem(NOTICE_KEY, String(Date.now() + days * 86400000)); } catch (e) {}
}

function showNotice() {
  if (noticeMuted()) return;
  // assembled at runtime so the address is not a literal string in the source
  var mail = 'wangpan' + '@' + 'hanyang' + '.ac.kr';
  var overlay = document.createElement('div');
  overlay.className = 'notice-overlay';
  overlay.innerHTML =
    '<div class="notice-box" role="dialog" aria-modal="true" aria-label="Notice">' +
      '<div class="notice-text">' + noticeLines() + '</div>' +
      '<p class="notice-mail"><a href="mailto:' + mail + '">' + mail + '</a></p>' +
      '<div class="notice-actions">' +
        '<button type="button" class="notice-mute">' + langSpans(NOTICE_MUTE) + '</button>' +
        '<button type="button" class="notice-close">' + langSpans(NOTICE_CLOSE) + '</button>' +
      '</div>' +
    '</div>';

  function closeNotice() {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.removeEventListener('keydown', onNoticeKey);
  }
  function onNoticeKey(e) { if (e.key === 'Escape' || e.keyCode === 27) closeNotice(); }

  overlay.querySelector('.notice-close').addEventListener('click', closeNotice);
  overlay.querySelector('.notice-mute').addEventListener('click', function () {
    muteNotice(NOTICE_DAYS);
    closeNotice();
  });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeNotice(); });
  document.addEventListener('keydown', onNoticeKey);

  document.body.appendChild(overlay);
  overlay.querySelector('.notice-close').focus();
}
