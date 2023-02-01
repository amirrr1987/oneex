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
            'primary': { DEFAULT: '#4A69BC', 50: '#D0D8EE', 100: '#C1CCE8', 200: '#A3B3DD', 300: '#869AD2', 400: '#6882C7', 500: '#4A69BC', 600: '#385196', 700: '#283B6D', 800: '#192544', 900: '#0A0F1B' },
            'secondary': { DEFAULT: '#4AC1C7', 50: '#D6F1F2', 100: '#C7ECEE', 200: '#A7E1E4', 300: '#88D6DA', 400: '#69CCD1', 500: '#4AC1C7', 600: '#33A0A6', 700: '#26777B', 800: '#194D50', 900: '#0B2425' },
        }
    }
})