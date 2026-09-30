import { Glob } from "bun";
import { homedir } from "node:os";

export function getChromePath(): string {
	const glob = new Glob(
		"chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell"
	);
	const path = [...glob.scanSync({ cwd: `${homedir()}/.cache/ms-playwright`, absolute: true })]
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
		.at(-1);

	if (!path) {
		throw new Error("chrome-headless-shell が見つかりません");
	}

	return path;
}
