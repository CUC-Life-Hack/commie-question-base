import { defineConfig } from 'vite';

export default defineConfig({
	base: 'https://cuc-life-hack.github.io/commie-question-base/dist/',
	root: 'src',
	build: {
		emptyOutDir: true,
		outDir: '../dist'
	}
});
