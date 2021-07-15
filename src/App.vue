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
html {
  overflow: hidden;
}

#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>