<template>
  <v-app>
    <app-drawer></app-drawer>
    <v-main>
      <v-row>
        <v-col>
          <v-container>
            <v-card v-if="items.length > 0">
              <!-- Check if there are tags available for display -->
              <v-list two-line>
                <v-list-item-group v-model="selected">
                  <template v-for="(item, index) in items">
                    <!-- For every item a list item -->
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
                      <!-- Only divide if there is another item after it -->
                    </v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
            <v-card v-else width="max-content" style="margin: auto">
              <!-- If no databases/Items are found, this card is shown. -->
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
            <v-img
              :src="selection.image"
              max-width="500"
              max-height="500"
            ></v-img>
            <v-text-field label="Name" v-model="selection.name"></v-text-field>
            <v-text-field
              label="Description"
              v-model="selection.description"
            ></v-text-field>
            <v-text-field
              type="number"
              label="Amount"
              v-model.number="selection.amount"
            ></v-text-field>
            <v-btn
              style="margin-right: 16px"
              outlined
              v-on:click="update"
              color="primary"
              >Save</v-btn
            >

            <v-btn outlined v-on:click="remove" color="red">Delete</v-btn>
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
    baseItems: [], //An empty array for storing the items.
    locations: [], //An empty array for storing the databases.
    selected: null, //A boolean for the selection event.
    selection: -1, //A integer for determining the selected item. Default -1
  }),
  computed: {
    items: function () {
      //Get items/databases into the array.
      let items = [];
      this.baseItems.forEach((item) => {
        if (this.locations[item.location].database == this.$route.params.id) {
          //Filter out the items which are not in the shown location
          items.push(item);
        }
      });
      return items;
    },
  },
  mounted() {
    fetch(getServerAddress() + "/api/v1/locations", {
      //Fetch locations from server
      headers: {
        "X-StoRe-Session": getSessionId(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((location) => {
          this.locations[location.id] = location;
        });
      });
    fetch(getServerAddress() + "/api/v1/items", {
      //Fetch Items from server
      headers: {
        "X-StoRe-Session": getSessionId(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.baseItems = data;
        console.log(this.baseItems);
      });
  },
  methods: {
    update: function (event) {
      fetch(getServerAddress() + "/api/v1/item/" + this.selection.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-StoRe-Session": getSessionId(),
        },
        body: JSON.stringify(this.selection),
      });
    },
    remove: function (event) {
      fetch(getServerAddress() + "/api/v1/item/" + this.selection.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-StoRe-Session": getSessionId(),
        },
      });
    },
  },
};
</script>