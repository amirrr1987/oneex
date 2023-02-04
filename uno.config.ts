import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerCompileClass from '@unocss/transformer-compile-class'

export default defineConfig({
    // ...
    transformers: [
        transformerDirectives(),
        transformerCompileClass(),
    ],
    theme: {
        colors: {
            'primary': {
                '50': '#f3f7ff',
                '100': '#e3eaf6',
                '200': '#cedbef',
                '300': '#acc2e4',
                '400': '#84a4d6',
                '500': '#6a89cc',
                '600': '#536dbd',
                '700': '#4a69bc',
                '800': '#404d8d',
                '900': '#154576',
            },

            'secondary': { DEFAULT: '#4AC1C7', 50: '#D6F1F2', 100: '#C7ECEE', 200: '#A7E1E4', 300: '#88D6DA', 400: '#69CCD1', 500: '#4AC1C7', 600: '#33A0A6', 700: '#26777B', 800: '#194D50', 900: '#0B2425' },
            accent: {
                DEFAULT: '#50c2c6'
            },
            warning: {
                DEFAULT: '#fd9c26'
            }
        }
    }
})