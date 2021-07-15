<template>
  <v-app>
    <v-container fill-height fluid>
      <div class="mx-auto" width="600" outlined style="padding: 32px">
        <v-img
          :src="require('@/assets/banner.svg')"
          style="margin: 16px 64px"
        ></v-img>

        <v-card-text class="text-center" style="font-size: 14pt">
          <p >Simple self-hosted/all-in-one storage management system</p>
          <a href="https://github.com/StorageReloaded" target="_blank">GitHub</a>
        </v-card-text>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class About extends Vue {}
</script>