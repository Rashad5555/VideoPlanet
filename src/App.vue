<template>
  <div id="app">
    <router-link to="/video-glav">
      <img style="width: 240px; margin: 14px" src="./assets/Tube.png" />
    </router-link>
    <router-view />
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'App',
  components: {
    // Убедитесь, что зарегистрировали компонент RouterLink
    RouterLink
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
