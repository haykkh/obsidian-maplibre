import esbuildSvelte from "esbuild-svelte"
import sveltePreprocess from "svelte-preprocess"
import esbuild from "esbuild"
import process from "process"
import builtins from "builtin-modules"
import fs from 'fs'

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`

const prod = process.argv[2] === "production"

// https://designdebt.club/a-basic-custom-esbuild-rename-plugin/
const renamePlugin = () => ({
  name: 'rename-plugin',
  setup(build) {
    build.onEnd(async () => {
      try {
        fs.renameSync('./main.css', './styles.css')
      } catch (e) {
        console.error('Failed to rename file:', e)
      }
    })
  },
})

const context = await esbuild.context({
	plugins: [
		esbuildSvelte({
			compilerOptions: { css: true },
			preprocess: sveltePreprocess(),
		}), 
		renamePlugin(),
	],
	banner: {
		js: banner,
	},
	entryPoints: ["src/main.ts"],
	bundle: true,
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtins,
	],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile: "main.js",
	minify: prod,
})

if (prod) {
	await context.rebuild()
	process.exit(0)
} else {
	await context.watch()
}
