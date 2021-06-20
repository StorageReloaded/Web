<template>
  <v-app>
    <v-container fill-height fluid primary>
      <v-card
        class="mx-auto"
        width="300"
        outlined
        align="center"
        justify="center"
      >
        <v-card-text three-line>
          <v-text-field
            v-model="credentials.username"
            v-on:keyup.enter="login"
            outlined
            dense
            label="Username"
          >
          </v-text-field>

          <v-text-field
            v-model="credentials.password"
            v-on:keyup.enter="login"
            outlined
            dense
            label="Password"
            :type="showPass ? 'text' : 'password'"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
          >
          </v-text-field>

          <v-text-field
            v-model="url"
            v-on:keyup.enter="login"
            outlined
            dense
            label="Server-Address (Optional)"
          >
          </v-text-field>

          <v-checkbox v-model="remember" label="Remember me" color="primary">
          </v-checkbox>

          <v-btn v-on:click="login" color="primary"> Login </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import {
  getSessionId,
  setSessionId,
  setServerAddress,
  getServerAddress,
} from "../api/api";
import Vue from "vue";

export default Vue.extend({
  name: "Login",
  data: () => ({
    url: "",
    showPass: false,
    remember: false,
    credentials: {
      username: "",
      password: "",
    },
  }),
  methods: {
    login: function (event) {
      setServerAddress(this.url);
      fetch(getServerAddress() + "/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.credentials),
      })
        .then((response) => response.json())
        .then((data) => {
          setSessionId(data.session_id, this.remember);
          this.$router.push({ name: "Home" });
        });
    },
  },
});
</script>