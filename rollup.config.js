import commonjs from '@rollup/plugin-commonjs';
import html from 'rollup-plugin-html2';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import preprocess from 'svelte-preprocess';
import { transformSync } from '@swc/core';
import css from 'rollup-plugin-css-only';

const buildDir = 'dist'
const isDev = process.env.NODE_ENV === 'development';
const port = 3000;

const plugins = [
    svelte({
        dev: isDev,
        extensions: ['.svelte'],
        preprocess: preprocess({
            typescript({content}) {
                const { code } = transformSync(content, {
                    jsc: {
                        parser: {syntax: 'typescript'}
                    }
                });
                return { code };
            }
        })
    }),
    css({ output: `bundle.css` }),
    typescript({sourceMap: isDev}),
    resolve({
        browser: true,
        dedupe: ['svelte']
    }),
    commonjs(),
    html({
        template: './src/index.html',
        fileName: 'index.html'
    })
]

if (isDev) {
    plugins.push(
        serve({
            contentBase: buildDir,
            historyApiFallback: true,
            port
        }),
        livereload({watch: buildDir})
    );
} else {
    plugins.push(terser())
}

module.exports = {
    input: 'src/main.ts',
    output: {
        name: 'bundle',
        file: `${buildDir}/bundle.js`,
        format: 'iife',
        sourceMap: isDev
    },
    plugins
}