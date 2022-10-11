<template>
    <v-container>
    <NavigationBar/>
    <v-card class="mx-auto" max-width="300" tile>
        <v-list disabled>
          <v-subheader>Tags</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in tags" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </template>
  
  <script>
    import NavigationBar from './NavigationBar';
    import axios from 'axios';
  
    export default {
      name: 'TagsPage',
  
      components: {
      NavigationBar
    },
  
      data: () => ({
        tags: []
      }),
      mounted() {
        axios
            .get('https://localhost:7060/api/Tags')
            .then(response => (this.tags = response.data))
            .catch(error => {
                console.log(error)
            })
    },
    }
  </script>
  