<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" expand-on-hover app clipped>
      <v-list dense nav>
        <v-list-item v-for="folder in folders" :key="folder.title" link>
          <v-list-item-icon>
            <v-icon>{{ folder.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ folder.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" elevate-on-scroll clipped-left>
      <v-app-bar-nav-icon>
        <v-avatar>
          <v-img
            src="https://avatars.githubusercontent.com/u/73351643?s=200&v=4"
          ></v-img>
        </v-avatar>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Storage Reloaded</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card>
          <v-list two-line>
            <v-list-item-group v-model="selected">
              <template v-for="(item, index) in items">
                <v-list-item :key="item.name">
                  <v-list-item-avatar>
                    <v-img :src="item.image"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>

                    <v-list-item-subtitle
                      v-text="item.description"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-divider v-if="index + 1 != items.length" :key="index" inset>
                </v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [],
    folders: [
      { title: "Home", icon: "mdi-home" },
      { title: "Account", icon: "mdi-account" },
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
    right: null,
  }),
  mounted() {
    fetch("http://localhost:8081/api/v1/items", {
      headers: {
        "X-StoRe-Session": "JsfF5l1k",
      },
    })
      .then((response) => response.json())
      .then((data) => (this.items = data));
  },
};
</script>