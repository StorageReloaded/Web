<template>
  <v-app>
    <app-drawer></app-drawer>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="database in databases"
            :key="database.name"
            cols="3"
            md="2"
          >
            <v-card height="150" width="500" :to="'/list/' + database.id">
              <v-card-title>{{ database.name }}</v-card-title>
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
import AppDrawer from "@/components/AppDrawer.vue";
import { Database } from "@/model/model";

@Component({ components: { AppDrawer } })
export default class List extends Vue {
  databases: Array<Database> = [];
  
  mounted() {
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