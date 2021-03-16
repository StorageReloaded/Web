<template>
  <v-app>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-card-text three-line>

        <v-text-field 
          outlined
          dense 
          label="Benutzername"
          clearable>
        </v-text-field>

        <v-text-field 
          outlined
          dense
          label="Passwort"
          clearable>
        </v-text-field>

        <v-checkbox
          v-model="ex4"
          label="Logindaten merken"
          color="primary">
        </v-checkbox>

        <v-btn
          color="primary"
          outlined>
        Login
        </v-btn>
      </v-card-text>      
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  components: {},
});
</script>
