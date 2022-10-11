<template>
  <v-app>
    <v-main>
      <TagsPage />     
    </v-main>
  </v-app>
</template>
<script>
//import HomePage from './components/HomePage';
//import AddChangeRequest from './components/AddChangeRequest'
import TagsPage from './components/TagsPage'

export default {
  name: 'App',

  components: {
    //HomePage,
    //AddChangeRequest,
    TagsPage
  },

  data: () => ({
    
  }),
};
</script>
