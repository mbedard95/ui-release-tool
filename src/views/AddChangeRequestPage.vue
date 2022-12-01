<template>
    <v-container>
        <NavigationBar @updateUser="fetchUser($event)" @updateUserProfile="fetchProfile($event)" />
        <v-container v-if="activeProfile">
            <v-container v-if="activeProfile === 'ReadAndWriteOnly'">
                <h1>Add Change Request</h1>
                <ChangeRequestForm :userId="userId" />
            </v-container>
            <AccessDenied v-else />
        </v-container>
    </v-container>
</template>
  
<script>
import NavigationBar from '@/components/NavigationBar';
import ChangeRequestForm from '@/components/ChangeRequestForm';
import AccessDenied from '@/components/AccessDenied';

export default {
    name: 'AddChangeRequest',

    components: {
        NavigationBar,
        ChangeRequestForm,
        AccessDenied
    },

    data: () => ({
        userId: '',
        activeProfile: ''
    }),

    methods: {
        fetchUser(userId) {
            this.userId = userId
        },
        fetchProfile(profile) {
            this.activeProfile = profile
        }
    }
}
</script>
  