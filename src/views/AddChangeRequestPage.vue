<template>
    <v-container>
        <NavigationBar @updateUser="fetchUser($event)"/>

        <h1>Add Change Request</h1>

        <ChangeRequestForm :userId="userId"/>

    </v-container>
</template>
  
<script>
import NavigationBar from '@/components/NavigationBar';
import ChangeRequestForm from '@/components/ChangeRequestForm'

export default {
    name: 'AddChangeRequest',

    components: {
        NavigationBar,
        ChangeRequestForm
    },

    data: () => ({
        userId: ''
    }),

    methods: {
        fetchUser(userId) {
            this.userId = userId
        }
    }
}
</script>
  