# 東京工科大学 八王子キャンパスマップ

東京工科大学八王子キャンパスの施設と紅華祭のイベントを確認できる、GitHub Pages対応の非公式静的Webサイトです。

## Features

- OpenStreetMapとLeafletによるキャンパスマップ
- Browser Geolocation APIを使った現在地表示
- 現在地の精度円と現在地へ戻るボタン
- 地図を初期表示位置へ戻すボタン
- コンパス表示
- キャンパス施設13か所の地図ピン
- 紅華祭26会場の地図ピン
- 会場別イベント一覧
- イベント名、団体名、カテゴリ、会場名、開催日時による検索
- イベント名、団体名、カテゴリ、開催日時の表示
- イベント画像URLのJSON管理と一覧・吹き出しでのアイコン表示
- PCとスマートフォンに対応したレスポンシブ表示

## Files

| ファイル | 内容 |
| --- | --- |
| `index.html` | ページの構造、地図、施設配置図、イベント一覧 |
| `style.css` | レイアウトとデザイン |
| `script.js` | Leaflet、現在地取得、施設ピン、イベント表示の処理 |
| `events.json` | 紅華祭の会場・イベントデータ |
| `2026紅華祭.txt` | イベント情報の元データ |

## Local Development

ビルドやパッケージのインストールは必要ありません。ただし、`fetch('events.json')`を使っているため、HTMLファイルを直接開くのではなくローカルサーバー経由で確認してください。

例：VS CodeのLive Serverなどで`index.html`を開きます。

```text
http://127.0.0.1:5500/index.html
```

## GitHub Pagesへの公開

1. このフォルダーをGitHubリポジトリへ push します。
2. GitHubリポジトリの **Settings** を開きます。
3. **Pages** の **Build and deployment** で、Sourceに **Deploy from a branch** を選びます。
4. 公開するブランチとフォルダー（通常は`/(root)`）を選び、**Save** を押します。
5. 数分後に表示されるURLへアクセスします。

このプロジェクトは静的ファイルだけで構成されているため、サーバーサイド処理やビルド設定は不要です。

## Location Information

現在地を表示するには、ブラウザの位置情報利用を許可してください。位置情報はブラウザ内でのみ使用し、このサイトからサーバーへ送信・保存しません。

位置情報機能は、通常HTTPS環境で動作します。`localhost`や`127.0.0.1`でのローカル確認も可能です。

## Updating Events

イベントを更新する場合は、元データの`2026紅華祭.txt`を更新し、`events.json`へ反映してください。サイト側の表示処理は`events.json`を読み込むため、データの更新だけでイベント一覧と地図ポップアップに反映されます。

`events.json`は次の情報を持ちます。

- `venue`: 会場名
- `coordinates`: 会場の緯度・経度
- `title`: イベント名
- `organization`: 団体名
- `categories`: カテゴリ
- `dates`: 開催日
- `schedule`: 開催日時

## Data Sources

- 地図タイル: [OpenStreetMap](https://www.openstreetmap.org/)
- 地図ライブラリ: [Leaflet](https://leafletjs.com/)
- キャンパス配置図・施設情報: [東京工科大学公式サイト](https://www.teu.ac.jp/campus/map/index.html)
