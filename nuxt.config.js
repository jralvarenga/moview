export default {
  head: {
    title: 'Moview',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Find something to watch easly' },
      { name: 'theme-color', content: '#141D26' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' }
    ],
  },

  css: [
    'vuesax/dist/vuesax.css'
  ],

  plugins: [
    '@/plugins/vuesax'
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Moview',
      short_name: 'Moview',
      lang: 'en',
      start_url: '/',
      background_color: '#141D26',
      theme_color: '#141D26',
      display: 'standalone',
      icons: [
        {
          src: '/icon-192.png',
          type: 'image/png',
          sizes: '192x192',
          purpose: 'any maskable'
        },
        {
          src: '/icon-512.png',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'any maskable'
        }
      ],
      description: 'Find something to watch easly'
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
