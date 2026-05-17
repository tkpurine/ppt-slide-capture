// popup.js

const countEl    = document.getElementById('count');
const thumbGrid  = document.getElementById('thumbGrid');
const emptyMsg   = document.getElementById('emptyMsg');
const btnCapture = document.getElementById('btnCapture');
const btnDownload= document.getElementById('btnDownload');
const btnClear   = document.getElementById('btnClear');
const prefixEl   = document.getElementById('prefix');
const toast      = document.getElementById('toast');

// ── i18n ────────────────────────────────────
document.querySelectorAll('[data-i18n]').forEach(el => {
  el.textContent = chrome.i18n.getMessage(el.dataset.i18n);
});
document.querySelectorAll('[data-i18n-title]').forEach(el => {
  el.title = chrome.i18n.getMessage(el.dataset.i18nTitle);
});

// ── 初期ロード ──────────────────────────────
chrome.runtime.sendMessage({ type: 'GET_STATE' }, (resp) => {
  if (chrome.runtime.lastError) return;
  renderAll(resp.slides);
});

// ── background からのリアルタイム通知 ────────
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'CAPTURED') {
    addThumb(msg.thumb, msg.index);
    countEl.textContent = msg.index;
    btnDownload.disabled = false;
    showToast(chrome.i18n.getMessage('toastCaptured', String(msg.index)));
  }
});

// ── ボタン操作 ───────────────────────────────
btnCapture.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'CAPTURE_NOW' }, () => {
    if (chrome.runtime.lastError) {
      showToast(chrome.i18n.getMessage('toastCaptureFailed'));
    }
  });
});

btnDownload.addEventListener('click', () => {
  const prefix = prefixEl.value.trim() || 'slide';
  chrome.runtime.sendMessage({ type: 'DOWNLOAD_ZIP', prefix }, () => {
    if (chrome.runtime.lastError) return;
    thumbGrid.innerHTML = '';
    thumbGrid.appendChild(emptyMsg);
    emptyMsg.style.display = '';
    countEl.textContent = '0';
    btnDownload.disabled = true;
    showToast(chrome.i18n.getMessage('toastDownloaded'));
  });
});

btnClear.addEventListener('click', () => {
  if (!confirm(chrome.i18n.getMessage('confirmReset'))) return;
  chrome.runtime.sendMessage({ type: 'CLEAR' }, () => {
    if (chrome.runtime.lastError) return;
    thumbGrid.innerHTML = '';
    thumbGrid.appendChild(emptyMsg);
    emptyMsg.style.display = '';
    countEl.textContent = '0';
    btnDownload.disabled = true;
    showToast(chrome.i18n.getMessage('toastReset'));
  });
});

// ── レンダリング ─────────────────────────────
function renderAll(slides) {
  thumbGrid.innerHTML = '';
  if (!slides || slides.length === 0) {
    thumbGrid.appendChild(emptyMsg);
    emptyMsg.style.display = '';
    countEl.textContent = '0';
    btnDownload.disabled = true;
    return;
  }
  emptyMsg.style.display = 'none';
  slides.forEach((dataUrl, i) => addThumb(dataUrl, i + 1));
  countEl.textContent = slides.length;
  btnDownload.disabled = false;
}

function addThumb(dataUrl, index) {
  if (emptyMsg.parentNode === thumbGrid) {
    emptyMsg.style.display = 'none';
  }

  const item = document.createElement('div');
  item.className = 'thumb-item';
  item.title = chrome.i18n.getMessage('slideTitle', String(index));

  const img = document.createElement('img');
  img.src = dataUrl;

  const num = document.createElement('div');
  num.className = 'thumb-num';
  num.textContent = index;

  item.appendChild(img);
  item.appendChild(num);

  item.addEventListener('click', () => {
    const byteStr = atob(dataUrl.split(',')[1]);
    const arr = new Uint8Array(byteStr.length);
    for (let i = 0; i < byteStr.length; i++) arr[i] = byteStr.charCodeAt(i);
    const blob = new Blob([arr], { type: 'image/png' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank', 'width=960,height=540');
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  });

  thumbGrid.appendChild(item);
  item.scrollIntoView({ block: 'nearest' });
}

// ── トースト ─────────────────────────────────
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
}
