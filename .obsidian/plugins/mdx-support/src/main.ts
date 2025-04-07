import { Manifest } from "next/dist/lib/metadata/types/manifest-types";
import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginManifest,
	PluginSettingTab,
	Setting,
} from "obsidian";

export default class NextraEdit extends Plugin {
	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
	}

	async onload() {
		await super.onload();
		this.registerExtensions(["mdx"], "markdown");
		this.registerExtensions(["json", "ts", "js"], "markdown");
	}
}
