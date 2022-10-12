<template>
  <v-app>
    <v-main>
      <AddChangeRequest />     
    </v-main>
  </v-app>
</template>
<script>
//import HomePage from './components/HomePage';
import AddChangeRequest from './components/AddChangeRequest'

export default {
  name: 'App',

  components: {
    //HomePage,
    AddChangeRequest
},

  data: () => ({
    
  }),
};
</script>
