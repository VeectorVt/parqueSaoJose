import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
    content: [
      './components/**/*.{js,vue,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './app.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
    theme: {
      extend: {
        fontFamily:{
          sans:['Kanit' , ...defaultTheme.fontFamily.sans],
        }
      },
    },
    plugins: [],
  }
  