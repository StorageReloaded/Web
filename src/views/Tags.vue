<template>
  <v-app>
    <app-drawer></app-drawer>
    <v-main>
      <v-row>
        <v-col>
          <v-container>
            <v-card v-if="tags.length > 0">
              <!-- Check if there are tags available for display -->
              <v-list two-line>
                <v-list-item-group v-model="selected">
                  <template v-for="(tag, index) in tags">
                    <!-- For every tag a list item -->
                    <v-list-item
                      v-on:click="selection = tag[index]"
                      :key="tag.name"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="tag.name"
                        ></v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon color="grey lighten-1"
                            >mdi-information</v-icon
                          >
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>

                    <v-divider
                      v-if="index + 1 != tags.length"
                      :key="index"
                      inset
                    >
                      <!-- Only divide if there is another tag after it -->
                    </v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
            <v-card v-else width="max-content" style="margin: auto">
              <!-- If no databases/Items are found, this card is shown. -->
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
import AppDrawer from "@/components/AppDrawer.vue";

import { getSessionId, getServerAddress } from "@/api/storage";
import { Tag } from "@/model/model";

@Component({ components: { AppDrawer } })
export default class Tags extends Vue {
  tags: Array<Tag> = [];
  selected: any = null;
  selectedTag: Tag = null;

  mounted() {
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
