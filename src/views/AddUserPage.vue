<template>
    <v-container>
        <NavigationBar @updateUserProfile="fetchProfile($event)" />
        <v-container v-if="activeProfile === 'Admin'">
            <h1>Add User</h1>
            <UserForm />
        </v-container>
        <AccessDenied v-else />
    </v-container>
</template>
  
<script>
import NavigationBar from '@/components/NavigationBar';
import UserForm from '@/components/UserForm'
import AccessDenied from '@/components/AccessDenied';

export default {
    name: 'AddUserPage',

    components: {
        NavigationBar,
        UserForm,
        AccessDenied
    },

    data: () => ({
        activeProfile: ''
    }),

    methods: {
        fetchProfile(profile) {
            this.activeProfile = profile
        }
    }
}
</script>
  