// 環境変数 BUN_CHROME_PATH を使用せず、Playwright のキャッシュから chrome-headless-shell のパスを取得する

import { getChromePath } from "./find-chrome";

const path = getChromePath();

await using view = new Bun.WebView({
	width: 1280,
	height: 720,
	backend: {
		type: "chrome",
		path,
		url: false, // 既存 Chrome への自動接続をせず、必ず新規起動
		stderr: "inherit" // 起動失敗時の原因調査用
		// argv: ["--no-sandbox"],  // root で実行する場合のみ(後述)
	}
});

await view.navigate("https://bun.sh/");
await Bun.write("tmp/shot2.png", await view.screenshot());
