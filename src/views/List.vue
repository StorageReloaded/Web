<template>
  <v-app>
    <app-drawer></app-drawer>
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
import AppDrawer from "@/components/AppDrawer.vue";

export default {
  components: { AppDrawer },
  data: () => ({
    items: [],
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