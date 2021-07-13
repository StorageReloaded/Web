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

<script>
import { getSessionId, getServerAddress } from "@/api/storage";
import AppDrawer from "@/components/AppDrawer.vue";

export default {
  components: {
    AppDrawer,
  },
  data: () => ({
    databases: [],
  }),
  mounted() {
    fetch(getServerAddress() + "/api/v1/databases", {
      headers: {
        "X-StoRe-Session": getSessionId(),
      },
    })
      .then((response) => response.json())
      .then((data) => (this.databases = data));
  },
};
</script>