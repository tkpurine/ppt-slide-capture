# PPT Slide Capture

[English](#english) | [Japanese](#japanese)

---

<a name="english"></a>

A Chrome extension that captures presentation slides with a keyboard shortcut and downloads them as a ZIP file.
Optimized for PowerPoint on SharePoint / Office Online.

## Installation

1. Download this repository as ZIP or `git clone` it
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the `ppt-slide-capture` folder

## Usage

| Action | How |
|---|---|
| Capture slide | `Alt+Shift+S` or click the extension icon → **Capture** button |
| Download ZIP | Click the extension icon → enter a filename prefix → **Download ZIP** |
| Reset | Click the extension icon → **Reset** button |

The badge on the extension icon shows how many slides have been captured.

## Change Keyboard Shortcut

Open `chrome://extensions/shortcuts`, find **PPT Slide Capture**, and rebind **"現在のスライドを1枚キャプチャ"**.

## Updating

```bash
git pull
```

Then click the **Update** button for this extension on `chrome://extensions`.

## Supported Sites

- `*.sharepoint.com`
- `*.officeapps.live.com`
- `*.office.com`

## License

MIT

---

<a name="japanese"></a>

ショートカットキー一発でスライドをキャプチャし、まとめて ZIP ダウンロードできる Chrome 拡張機能です。
SharePoint / Office Online の PowerPoint に最適化されています。

## インストール

1. このリポジトリを ZIP ダウンロードまたは `git clone` する
2. Chrome で `chrome://extensions` を開く
3. 右上の「デベロッパーモード」を ON にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、`ppt-slide-capture` フォルダを選択する

## 使い方

| 操作 | 方法 |
|---|---|
| スライドをキャプチャ | `Alt+Shift+S` または拡張アイコン → 「キャプチャ」ボタン |
| ZIP ダウンロード | 拡張アイコン → ファイル名プレフィックスを入力 → 「ZIPダウンロード」 |
| リセット | 拡張アイコン → 「リセット」ボタン |

キャプチャ枚数はバッジ（拡張アイコン右下の数字）でも確認できます。

## ショートカットキーの変更

`chrome://extensions/shortcuts` を開き、「PPT Slide Capture」の「現在のスライドを1枚キャプチャ」を変更してください。

## アップデート手順

```bash
git pull
```

その後、`chrome://extensions` でこの拡張の「更新」ボタンをクリックしてください。

## 対応サイト

- `*.sharepoint.com`
- `*.officeapps.live.com`
- `*.office.com`

## ライセンス

MIT
