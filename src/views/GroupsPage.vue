<template>
  <v-container>
    <NavigationBar @updateUser="fetchUser($event)" @updateUserProfile="fetchProfile($event)"/>
    <v-card v-if="activeProfile === 'Admin'" class="mx-auto" max-width="600" tile>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Groups</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list>
        <v-list-item-group v-model="selectedGroup" color="error">
          <v-list-item v-for="(item, i) in groups" :key="i" :value="item.groupId">
            <v-list-item-content>
              <v-list-item-title v-text="item.groupName"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-form ref="form" v-model="valid">
        <v-text-field outlined v-model="newGroup" :counter="50" :rules="groupNameRules" label="Add group" required>
        </v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="post">
          Submit
        </v-btn>
        <v-btn :disabled="!selectedGroup" color="error" class="mr-4" @click="removeGroup">
          Delete Selected
        </v-btn>
        <v-alert v-if="messages.length > 0" v-bind:type="alertType">
          <div v-for="(message, i) in messages" :key="i">{{message}}</div>
        </v-alert>
      </v-form>
    </v-card>
    <AccessDenied v-else />

  </v-container>
</template>
  
<script>
import NavigationBar from '@/components/NavigationBar';
import AccessDenied from '@/components/AccessDenied'
import axios from 'axios';

export default {
  name: 'GroupsPage',

  components: {
    NavigationBar,
    AccessDenied
  },

  data: () => ({
    groups: [],
    newGroup: null,
    submitted: false,
    messages: [],
    valid: false,
    activeUser: '',
    activeProfile: '',
    selectedGroup: null,
    alertType: 'success',
    groupNameRules: [
      v => !!v || 'Group Name is required'
    ],
  }),
  mounted() {
    axios
      .get('https://localhost:7060/api/Groups')
      .then(response => (this.groups = response.data))
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    async post() {
      this.messages = [];
      await axios
        .post('https://localhost:7060/api/Groups', {
          groupName: this.newGroup
        })
        .then(() => {
          this.alertType = 'success'
          this.messages.push('Group submitted successfully');
          this.$refs.form.reset();
          axios
      .get('https://localhost:7060/api/Groups')
      .then(response => (this.groups = response.data))
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
    removeGroup() {
      this.messages = [];
      axios
        .delete('https://localhost:7060/api/Groups/' + this.selectedGroup)
        .then(() => {
          this.alertType = 'success'
          this.messages.push('Group deleted successfully');
          axios
            .get('https://localhost:7060/api/Groups')
            .then(response => (this.groups = response.data))
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
          this.alertType = 'error';
          this.messages.push(error.response.data);
        });
    },
    fetchUser(userId) {
      this.activeUser = userId;
    },
    fetchProfile(profile) {
      this.activeProfile = profile;
    }
  }
}
</script>
  