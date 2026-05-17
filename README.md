# PPT Slide Capture

ショートカットキー一発でスライドをキャプチャし、まとめて ZIP ダウンロードできる Chrome 拡張機能です。
SharePoint / Office Online の PowerPoint に最適化されています。

A Chrome extension that captures presentation slides with a keyboard shortcut and downloads them as a ZIP file.
Optimized for PowerPoint on SharePoint / Office Online.

---

## インストール / Installation

1. このリポジトリを ZIP ダウンロードまたは `git clone` する
2. Chrome で `chrome://extensions` を開く
3. 右上の「デベロッパーモード」を ON にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、`ppt-slide-capture` フォルダを選択する

---

1. Download this repository as ZIP or `git clone` it
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the `ppt-slide-capture` folder

---

## 使い方 / Usage

| 操作 / Action | 方法 / How |
|---|---|
| スライドをキャプチャ / Capture slide | `Alt+Shift+S` または拡張アイコン → 「キャプチャ」ボタン |
| ZIP ダウンロード / Download ZIP | 拡張アイコン → ファイル名プレフィックスを入力 → 「ZIPダウンロード」 |
| リセット / Reset | 拡張アイコン → 「リセット」ボタン |

キャプチャ枚数はバッジ（拡張アイコン右下の数字）でも確認できます。
The badge on the extension icon shows how many slides have been captured.

---

## ショートカットキーの変更 / Change Keyboard Shortcut

`chrome://extensions/shortcuts` を開き、「PPT Slide Capture」の「現在のスライドを1枚キャプチャ」を変更してください。

Open `chrome://extensions/shortcuts`, find **PPT Slide Capture**, and rebind **"現在のスライドを1枚キャプチャ"**.

---

## アップデート手順 / Updating

```bash
git pull
```

その後、`chrome://extensions` でこの拡張の「更新」ボタンをクリックしてください。
After pulling, click the **Update** button for this extension on `chrome://extensions`.

---

## 対応サイト / Supported Sites

- `*.sharepoint.com`
- `*.officeapps.live.com`
- `*.office.com`

---

## ライセンス / License

MIT
