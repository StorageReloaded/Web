<template>
  <div>
    <v-navigation-drawer v-model="drawer" expand-on-hover app clipped permanent>
      <v-list dense nav>
        <v-list-item
          v-for="folder in folders"
          :key="folder.title"
          link
          :href="folder.link"
        >
          <v-list-item-icon>
            <v-icon>{{ folder.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ folder.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link v-on:click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" elevate-on-scroll clipped-left>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-avatar size="44" style="margin: 0 8px">
        <v-img
          src="https://avatars.githubusercontent.com/u/73351643?s=200&v=4"
        ></v-img>
      </v-avatar>

      <v-toolbar-title>Storage Reloaded</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getSessionId, deleteSessionId } from "../api/api";

export default Vue.extend({
  name: "NavigationDrawer",
  data: () => ({
    drawer: true,
    folders: [
      { title: "Home", icon: "mdi-home", link: "#/" },
      { title: "Tags", icon: "mdi-tag-multiple", link: "#/tags" },
      { title: "Account", icon: "mdi-account", link: "#/account" },
    ],
  }),
  methods: {
    logout: function () {
      fetch("http://localhost:8081/api/v1/auth", {
        method: "DELETE",
        headers: {
          "X-StoRe-Session": getSessionId(),
        },
      });

      deleteSessionId();

      this.$router.push({ name: "Login" });
    },
  },
});
</script>