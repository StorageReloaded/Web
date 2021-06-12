<template>
  <v-app>
    <app-drawer></app-drawer>

    <v-main class="grey">
      <v-container>
        <v-card width="500" style="margin: auto">
          <v-card-title class="text-center">Account</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-title class="font-weight-medium">
                NAME
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>Password:</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-card-subtitle></v-card-subtitle>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer.vue";

export default {
  components: {
    AppDrawer,
  },
};
</script>