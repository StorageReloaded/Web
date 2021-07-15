<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col>
          <v-container>
            <!-- Check if there are tags available for display -->
            <v-list
              v-if="items.length > 0"
              two-line
              elevation="1"
              style="border-radius: 8px"
            >
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
                      <v-list-item-title v-text="item.name"></v-list-item-title>

                      <v-list-item-subtitle
                        v-text="item.description"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
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

            <!-- If no databases/Items are found, this card is shown. -->
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
        <v-col v-if="selectedItem != null">
          <v-container>
            <v-img
              :src="selectedItem.image"
              max-width="500"
              max-height="500"
            ></v-img>
            <v-text-field
              label="Name"
              v-model="selectedItem.name"
            ></v-text-field>
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
import { Item, Location } from "@/model/model";

@Component
export default class List extends Vue {
  selected: number = null;
  baseItems: Array<Item> = [];
  locations: Array<Location> = [];
  selectedItem: Item = null;

  // gives back all items that should be shown
  get items(): Array<Item> {
    let items: Array<Item> = [];
    this.baseItems.forEach((item) => {
      if (
        this.locations[item.location].database.toString() ===
        this.$route.params.id
      ) {
        items.push(item);
      }
    });
    return items;
  }

  update(): void {
    fetch(getServerAddress() + "/api/v1/item/" + this.selectedItem.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-StoRe-Session": getSessionId(),
      },
      body: JSON.stringify(this.selectedItem),
    });
  }

  remove(): void {
    fetch(getServerAddress() + "/api/v1/item/" + this.selectedItem.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-StoRe-Session": getSessionId(),
      },
    });
  }

  mounted(): void {
    getLocations().then((data) => {
      data.forEach((location) => {
        this.locations[location.id] = location;
      });
    });

    getItems().then((items) => {
      this.baseItems = items;
    });
  }
}
</script>