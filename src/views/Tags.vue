<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col>
          <v-container>
            <!-- Check if there are tags available for display -->
            <v-list
              v-if="tags.length > 0"
              elevation="1"
              style="border-radius: 8px"
            >
              <v-list-item-group v-model="selected">
                <template v-for="(tag, index) in tags">
                  <!-- For every tag a list item -->
                  <v-list-item
                    v-on:click="selection = tag[index]"
                    :key="tag.name"
                  >
                    <v-list-item-avatar>
                      <v-icon>mdi-label-outline</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="tag.name"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider v-if="index + 1 != tags.length" :key="index">
                    <!-- Only divide if there is another tag after it -->
                  </v-divider>
                </template>
              </v-list-item-group>
            </v-list>

            <!-- If no databases/Items are found, this card is shown. -->
            <v-card v-else width="max-content" style="margin: auto">
              <v-card-title>
                Whoops! No tags has been added to your collection yet!
              </v-card-title>
              <v-card-text>
                After registering your first tags, they'll be displayed here!
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { getSessionId, getServerAddress } from "@/api/storage";
import { Tag } from "@/model/model";

@Component
export default class Tags extends Vue {
  tags: Array<Tag> = [];
  selected: number = null;
  selectedTag: Tag = null;

  mounted(): void {
    fetch(getServerAddress() + "/api/v1/tags", {
      headers: {
        "X-StoRe-Session": getSessionId(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.tags = data;
      });
  }
}
</script>
