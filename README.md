# bun-webview1

[Bun.WebView()](https://bun.com/docs/runtime/webview)
(Bun Headless Browser Automation) を使って
スクリーンショットを取る練習。

実行すると
<https://example.com>
のスクリーンショットを
`tmp/page.png`
に生成します
([WebView | Bun Docs](https://bun.com/docs/runtime/webview)
の最初のサンプルにほぼ同じ)。

## 準備

最低でもヘッドレス Chrome が必要。

### Ubuntu 24.04 LTS の場合

```sh
# ヘッドレスブラウザをインストール
bunx playwright install chromium-headless-shell --with-deps
## with-depth オプションで、必要なaptパッケージもインストールする

# これやらないと日本語のページが化ける
sudo apt install -y fonts-noto-cjk

# ブラウザのパスを設定
bun run set-chrome-path
```

## 実行

To install dependencies:

```bash
bun ci
```

To run:

```bash
bun index.ts
```

### 実行例

```console
$ bun index.ts

[0930/133715.673565:WARNING:media/gpu/vaapi/vaapi_wrapper.cc:1660] drmGetDevices2() has not found any devices
[0930/133715.674706:WARNING:sandbox/policy/linux/sandbox_linux.cc:405] InitializeSandbox() called with multiple threads in process gpu-process.
```

これで`tmp/page.png`が生成されます。

2 つ出ている警告は、

- **`drmGetDevices2() has not found any devices`**: GPU(DRM デバイス)がないサーバで、ハードウェアによる映像処理の初期化に失敗したという意味。GUI も GPU もない環境なら想定どおり
- **`InitializeSandbox() called with multiple threads in process gpu-process`**: GPU プロセスのサンドボックス初期化が、スレッドが複数ある状態で呼ばれたという Chromium 内部の警告。ヘッドレス Chrome を Linux で動かすと出る例が多く、スクリーンショットの生成は問題なく進む

ということなので無視していいです。

`backend: { type: "chrome", stderr: "inherit" },`
を
`backend: { type: "chrome", stderr: "ignore" },`
に変えて、表示しなくてもいい。

あるいは環境変数 DEBUG で切り替えるなど。

## メモ

cron で実行するときは

```sh
export BUN_CHROME_PATH=...
```

にする。

または TypeScript 内にロジックを書く ⇒ 実装した。`src/shot2.ts` 参照
