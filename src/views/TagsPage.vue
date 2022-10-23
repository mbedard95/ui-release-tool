<template>
  <v-container>
    <NavigationBar />
    <v-card class="mx-auto" max-width="600" tile>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Tags</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      
      <v-list>
        <v-list-item-group v-model="selectedTag" color="error">
          <v-list-item v-for="(item, i) in tags" :key="i" :value="item.tagId">
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-form ref="form" v-model="valid">
        <v-text-field outlined v-model="newTag" :counter="50" :rules="tagNameRules" label="Add tag" required>
        </v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="post">
          Submit
        </v-btn>
        <v-btn :disabled="!selectedTag" color="error" class="mr-4" @click="removeTag">
          Delete Selected
        </v-btn>
        <v-alert v-if="messages.length > 0" v-bind:type="alertType">
          <div v-for="(message, i) in messages" :key="i">{{message}}</div>
        </v-alert>
      </v-form>
    </v-card>


  </v-container>
</template>
  
<script>
import NavigationBar from '@/components/NavigationBar';
import axios from 'axios';

export default {
  name: 'TagsPage',

  components: {
    NavigationBar
  },

  data: () => ({
    tags: [],
    newTag: null,
    submitted: false,
    messages: [],
    valid: false,
    selectedTag: null,
    alertType: 'success',
    tagNameRules: [
      v => !!v || 'Tag Name is required'
    ],
  }),
  mounted() {
    axios
      .get('https://localhost:7060/api/Tags')
      .then(response => (this.tags = response.data))
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    async post() {
      this.messages = [];
      await axios
        .post('https://localhost:7060/api/Tags', {
          name: this.newTag
        })
        .then(() => {
          this.alertType = 'success'
          this.messages.push('Tag submitted successfully');
          this.$refs.form.reset();
          axios
            .get('https://localhost:7060/api/Tags')
            .then(response => (this.tags = response.data))
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
          this.alertType = 'error';
          if (error.response.data.errors) {
            Object.keys(error.response.data.errors).forEach(key => this.messages.push(error.response.data.errors[key][0]));
          }
          else {
            this.messages.push(error.response.data);
          }
        });
    },
    reset() {
      this.$refs.form.reset()
    },
    removeTag() {
      this.messages = [];
      axios
        .delete('https://localhost:7060/api/Tags/' + this.selectedTag)
        .then(() => {
          this.alertType = 'success'
          this.messages.push('Tag deleted successfully');
          axios
            .get('https://localhost:7060/api/Tags')
            .then(response => (this.tags = response.data))
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
          this.alertType = 'error';
          this.messages.push(error.response.data);
        });
    }
  }
}
</script>
  