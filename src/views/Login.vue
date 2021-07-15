<template>
  <v-app>
    <v-container fill-height fluid>
      <v-card class="mx-auto" width="500" outlined style="padding: 32px">
        <v-img
          :src="require('@/assets/banner.svg')"
          style="margin: 16px 64px"
        ></v-img>

        <v-card-text>
          <v-text-field
            v-model="credentials.username"
            v-on:keyup.enter="login"
            outlined
            label="Username"
          >
          </v-text-field>

          <v-text-field
            v-model="credentials.password"
            v-on:keyup.enter="login"
            outlined
            label="Password"
            :type="showPass ? 'text' : 'password'"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
          >
          </v-text-field>

          <v-expansion-panels v-model="panel" :disabled="disabled" flat>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Advanced Settings</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="url"
                      v-on:keyup.enter="login"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      label="Server-Address (Optional)"
                    >
                    </v-text-field>
                  </template>
                  <span>https://store.examle.com</span>
                </v-tooltip>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <div style="display: flex; flex-direction: row">
            <v-checkbox v-model="remember" label="Remember me" color="primary">
            </v-checkbox>
            <v-spacer></v-spacer>
            <v-btn
              v-on:click="login"
              color="primary"
              style="align-self: center"
            >
              Login
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { setSessionId, setServerAddress } from "@/api/storage";
import { completeUrl } from "@/api/utils";
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Login extends Vue {
  url = "";
  showPass = false;
  remember = false;
  credentials = {
    username: "",
    password: "",
  };

  login(): void {
    fetch(completeUrl(this.url) + "/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        setSessionId(data.session_id, this.remember);
        setServerAddress(this.url);
        this.$router.push({ name: "Home" });
      });
  }
}
</script>