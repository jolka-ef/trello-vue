// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css : ['~/assets/css/vallo.css',]
  devtools: { enabled: true },
  modules : ['@nuxt/ui','@pinia/nuxt'],
  colorMode: {
    preference: 'light'
  }
})
