<template>
  <div id="app">
    <nav-bar v-show="authenicated" />
    <aside-menu
      v-show="authenicated"
      :menu="menu"
    />
    <router-view />
    <footer-bar v-show="authenicated" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

export default defineComponent({
  name: 'AppComponent',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  data () {
    return {
      menu,
      authenicated: false
    }
  },
  created () {
    this.validateSession()
    // const tokenLocalStorage = JSON.parse(localStorage.getItem('userData')).token
    // if (tokenLocalStorage == null) {

    //   this.$router.push('/')
    // }
    // this.$store.commit('user', {
    //   name: 'John Doe',
    //   email: 'john@example.com',
    //   avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    // })
  },
  methods: {
    validateSession () {
      const tokenLocalStorage = JSON.parse(localStorage.getItem('userData')).token
      if (tokenLocalStorage != null) {
        this.authenicated = true
      } else {
        this.authenicated = false
      }
      return this.authenicated
    }
  }

})
</script>
