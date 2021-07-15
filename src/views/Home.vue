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
            :key="database.name"
          >
            <v-card :to="'/list/' + database.id">
              <v-card-title>{{ database.name }}</v-card-title>
              <v-card-text> Text </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary">
                  <v-icon left> mdi-pencil </v-icon> Edit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { getSessionId, getServerAddress } from "@/api/storage";
import { Database } from "@/model/model";

@Component
export default class List extends Vue {
  databases: Array<Database> = [];

  mounted(): void {
    fetch(getServerAddress() + "/api/v1/databases", {
      headers: {
        "X-StoRe-Session": getSessionId(),
      },
    })
      .then((response) => response.json())
      .then((data) => (this.databases = data));
  }
}
</script>