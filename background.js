// background.js
importScripts('jszip.min.js');

// ショートカットキーでキャプチャ
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'capture-slide') {
    await captureCurrentSlide();
  }
});

// popup の「キャプチャ」ボタンからも呼べる
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'CAPTURE_NOW') {
    captureCurrentSlide().then(() => sendResponse({ ok: true }));
    return true; // async response
  }
  if (msg.type === 'DOWNLOAD_ZIP') {
    const safePrefix = sanitizePrefix(msg.prefix || 'slide');
    downloadZip(safePrefix).then(() => sendResponse({ ok: true }));
    return true;
  }
  if (msg.type === 'CLEAR') {
    chrome.storage.local.set({ slides: [], meta: [] }, () => {
      chrome.action.setBadgeText({ text: '' });
      sendResponse({ ok: true });
    });
    return true;
  }
  if (msg.type === 'GET_STATE') {
    chrome.storage.local.get(['slides', 'meta'], (data) => {
      sendResponse({ slides: data.slides || [], meta: data.meta || [] });
    });
    return true;
  }
});

function sanitizePrefix(prefix) {
  return prefix.replace(/[\\/:*?"<>|]/g, '_').slice(0, 64) || 'slide';
}

async function captureCurrentSlide() {
  let dataUrl;
  try {
    dataUrl = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
  } catch (e) {
    console.error('captureVisibleTab failed:', e);
    return;
  }

  const { slides = [], meta = [] } = await chrome.storage.local.get(['slides', 'meta']);

  const index = slides.length + 1;
  const timestamp = new Date().toLocaleTimeString('ja-JP');

  slides.push(dataUrl);
  meta.push({ index, timestamp });

  await chrome.storage.local.set({ slides, meta });

  chrome.action.setBadgeText({ text: String(index) });
  chrome.action.setBadgeBackgroundColor({ color: '#0078d4' });

  chrome.runtime.sendMessage({ type: 'CAPTURED', index, timestamp, thumb: dataUrl })
    .catch(() => {});
}

async function downloadZip(prefix) {
  const { slides = [], meta = [] } = await chrome.storage.local.get(['slides', 'meta']);
  if (slides.length === 0) return;

  const zip = new JSZip();
  for (let i = 0; i < slides.length; i++) {
    const base64 = slides[i].split(',')[1];
    const num = String(i + 1).padStart(3, '0');
    zip.file(`${prefix}_${num}.png`, base64, { base64: true });
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);

  chrome.downloads.onChanged.addListener(function onChanged(delta) {
    if (delta.state && delta.state.current === 'complete') {
      URL.revokeObjectURL(url);
      chrome.downloads.onChanged.removeListener(onChanged);
    }
  });

  await chrome.downloads.download({
    url,
    filename: `${prefix}_${Date.now()}.zip`,
    saveAs: false,
  });
}
