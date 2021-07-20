<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col
            cols="auto"
            lg="3"
            md="4"
            sm="6"
            xs="12"
            v-for="database in databases"
            :key="database.id"
          >
            <v-card :to="'/list/' + database.id">
              <v-card-title>{{ database.name }}</v-card-title>

              <v-card-subtitle v-if="counts.get(database.id) != 1">
                {{ counts.get(database.id) }} items
              </v-card-subtitle>
              <v-card-subtitle v-else> 1 item</v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.prevent="edit = database" text color="primary">
                  <v-icon left> mdi-pencil </v-icon> Edit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-overlay v-if="edit != null">
      <v-card width="500">
        <v-card-title>
          Title
          <v-spacer></v-spacer>
          <v-btn v-on:click="edit = null" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="edit.name"
            outlined
            label="Name"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-on:click="deleteDatabase" text color="error">
            <v-icon left> mdi-delete </v-icon> Delete
          </v-btn>

          <v-btn v-on:click="saveDatabase" text color="primary">
            <v-icon left> mdi-content-save </v-icon> Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { getSessionId, getServerAddress } from "@/api/storage";
import { getItems, getLocations } from "@/api/network";
import { Database, Location, Item } from "@/model/model";
import { countItemsInDatabase } from "@/api/utils";

@Component
export default class List extends Vue {
  databases: Array<Database> = [];
  locations: Array<Location> = [];
  items: Array<Item> = [];

  counts: Map<number, number> = new Map();
  edit: Database = null;

  mounted(): void {
    fetch(getServerAddress() + "/api/v1/databases", {
      headers: {
        "X-StoRe-Session": getSessionId(),
      },
    })
      .then((response) => response.json())
      .then((data) => (this.databases = data));

    getItems().then((items) => {
      this.items = items;
      this.tryCalcItemCounts();
    });

    getLocations().then((locations) => {
      this.locations = locations;
      this.tryCalcItemCounts();
    });
  }

  tryCalcItemCounts(): void {
    if (
      this.locations != null &&
      this.locations.length != 0 &&
      this.items != null &&
      this.items.length != 0
    )
      this.counts = countItemsInDatabase(this.locations, this.items);
  }

  saveDatabase(): void {
    this.edit = null;
  }

  deleteDatabase(): void {
    this.edit = null;
  }
}
</script>