<template>
  <v-app>
    <app-drawer></app-drawer>
    <v-main>
      <v-row>
        <v-col>
          <v-container>
            <v-card v-if="items.length > 0">
              <v-list two-line>
                <v-list-item-group v-model="selected">
                  <template v-for="(item, index) in items">
                    <v-list-item
                      v-on:click="selection = items[index]"
                      :key="item.name"
                    >
                      <v-list-item-avatar>
                        <v-img :src="item.image"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="item.description"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon color="grey lighten-1"
                            >mdi-information</v-icon
                          >
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>

                    <v-divider
                      v-if="index + 1 != items.length"
                      :key="index"
                      inset
                    >
                    </v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
            <v-card v-else width="max-content" style="margin: auto">
              <v-card-title>
                Whoops! No item has been added to your collection yet!
              </v-card-title>
              <v-card-text>
                After registering your first items, they'll be displayed here!
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
        <v-col v-if="selection != -1">
          <v-container>
            <v-img :src="selection.image" max-width="500"></v-img>
            <v-text-field label="Name" v-model="selection.name"></v-text-field>
            <v-text-field
              label="Description"
              v-model="selection.description"
            ></v-text-field>
            <v-btn outlined color="primary">Save</v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import { getSessionId, getServerAddress } from "@/api/api";
import AppDrawer from "@/components/AppDrawer.vue";

export default {
  components: { AppDrawer },
  data: () => ({
    baseItems: [],
    locations: [],
    selected: null,
    selection: -1,
  }),
  computed: {
    items: function () {
      let items = [];
      this.baseItems.forEach((item) => {
        if (this.locations[item.location].database == this.$route.params.id) {
          items.push(item);
        }
      });
      return items;
    },
  },
  mounted() {
    fetch(getServerAddress() + "/api/v1/items", {
      headers: {
        "X-StoRe-Session": getSessionId(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.baseItems = data;
        console.log(this.baseItems);
      });

    fetch(getServerAddress() + "/api/v1/locations", {
      headers: {
        "X-StoRe-Session": getSessionId(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((location) => {
          this.locations[location.id] = location;
        });
        console.log(this.locations);
      });
  },
};
</script>