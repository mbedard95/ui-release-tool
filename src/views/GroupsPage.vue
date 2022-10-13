<template>
    <v-container>
    <NavigationBar/>
    <v-card class="mx-auto" max-width="300" tile>
        <v-list disabled>
          <v-subheader>Groups</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in groups" :key="i">
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
    import NavigationBar from '@/components/NavigationBar';
    import axios from 'axios';
  
    export default {
      name: 'GroupsPage',
  
      components: {
      NavigationBar
    },
  
      data: () => ({
        groups: []
      }),
      mounted() {
        axios
            .get('https://localhost:7060/api/Groups')
            .then(response => (this.groups = response.data))
            .catch(error => {
                console.log(error)
            })
    },
    }
  </script>
  