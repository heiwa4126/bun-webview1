const path = Bun.env.BUN_CHROME_PATH;

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

await view.navigate("https://example.com");
await Bun.write("tmp/page.png", await view.screenshot());
