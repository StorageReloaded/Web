<template>
  <v-app>
    <v-container fill-height fluid>
      <v-card class="mx-auto" width="500" outlined :loading="loading">
        <v-img
          :src="require('@/assets/banner.svg')"
          style="margin: 64px"
        ></v-img>

        <v-card-text>
          <div style="padding: 0 24px">
            <v-text-field
              v-model="credentials.username"
              v-on:keyup.enter="login"
              :error="inputError != null"
              outlined
              label="Username"
            >
            </v-text-field>

            <v-text-field
              v-model="credentials.password"
              v-on:keyup.enter="login"
              :error-messages="inputError"
              outlined
              label="Password"
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass = !showPass"
            >
            </v-text-field>
          </div>

          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Advanced Settings
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="url"
                      v-on:keyup.enter="login"
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="serverError"
                      :hide-details="serverError == null"
                      outlined
                      label="Server-Address (Optional)"
                    >
                    </v-text-field>
                  </template>
                  <span>Example: https://store.examle.com</span>
                </v-tooltip>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <div
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-top: 24px;
            "
          >
            <v-checkbox
              v-model="remember"
              label="Remember me"
              color="primary"
              hide-details
              style="margin: 0; padding: 0"
            >
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
  loading = false;
  inputError: string = null;
  serverError: string = null;

  login(): void {
    this.loading = true;
    fetch(completeUrl(this.url) + "/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.credentials),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setSessionId(data.session_id, this.remember);
            setServerAddress(this.url);
            this.loading = false;
            this.inputError = null;
            this.serverError = null;
            this.$router.push({ name: "Home" });
          });
        } else {
          this.inputError = "Wrong username or password"
          this.serverError = null;
        }
      })
      .catch(() => {
        this.inputError = null;
        this.serverError = "Server could not be reached"
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>