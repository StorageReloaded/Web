<template>
  <v-app>
    <app-drawer v-if="!isLogin()"></app-drawer>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppDrawer from "@/components/AppDrawer.vue";

@Component({ components: { AppDrawer } })
export default class App extends Vue {
  mounted(): void {
    console.log(this.$router.getRoutes());
  }

  isLogin(): boolean {
    return this.$router.currentRoute.name === "Login";
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');

html {
  overflow: hidden !important;
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>