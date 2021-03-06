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
                      v-on:click="selectedItem = items[index]"
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
        <v-col v-if="selectedItem != -1">
          <v-container>
            <v-img
              :src="selectedItem.image"
              max-width="500"
              max-height="500"
            ></v-img>
            <v-text-field label="Name" v-model="selectedItem.name"></v-text-field>
            <v-text-field
              label="Description"
              v-model="selectedItem.description"
            ></v-text-field>
            <v-text-field
              type="number"
              label="Amount"
              v-model.number="selectedItem.amount"
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

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { getSessionId, getServerAddress } from "@/api/storage";
import { getItems, getLocations } from "@/api/network";
import AppDrawer from "@/components/AppDrawer.vue";

@Component
export default class List extends Vue {
  selected: any = null;
  baseItems: Array<StoRe.Item> = [];
  locations: Array<StoRe.Location> = [];
  selectedItem: StoRe.Item = null;

  // gives back all items that should be shown
  get items() {
    let items: Array<StoRe.Item> = [];
    this.baseItems.forEach((item) => {
      if (
        this.locations[item.location].database.toString() ==
        this.$route.params.id
      ) {
        //Filter out the items which are not in the shown location
        items.push(item);
      }
    });
    return items;
  }

  update() {
    fetch(getServerAddress() + "/api/v1/item/" + this.selectedItem.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-StoRe-Session": getSessionId(),
      },
      body: JSON.stringify(this.selectedItem),
    });
  }

  remove() {
    fetch(getServerAddress() + "/api/v1/item/" + this.selectedItem.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-StoRe-Session": getSessionId(),
      },
    });
  }

  mounted() {
    getLocations().then((data) => {
      data.forEach((location) => {
        this.locations[location.id] = location;
      });
    });

    getItems().then((items) => {
      this.baseItems = items;
      console.log(this.baseItems);
    });
  }
}
</script>