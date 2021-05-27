<template>
  <v-app>
    <app-drawer></app-drawer>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="category in categories"
            :key="category.title"
            cols="3"
            md="2"
          >
            <v-card height="150" width="500" :to="category.router">
              <v-card-title>{{ category.title }}</v-card-title>
              <v-card-subtitle v-if="category.count > 1"
                >{{ category.count }} Elemente</v-card-subtitle
              >
              <v-card-subtitle v-else> Ein Element</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
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
  data: () => ({
    categories: [
      { title: "Kühlschrank", count: "4", router: "/list" },
      { title: "Schrank", count: "4", router: "/list" },
      { title: "Meister Proper Handkiste", count: "4", router: "/list" },
    ],
  }),
};
</script>