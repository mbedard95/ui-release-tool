<template>
    <v-container>
        <NavigationBar />

        <h1>Add User</h1>

        <UserForm />

    </v-container>
</template>
  
<script>
import NavigationBar from '@/components/NavigationBar';
import UserForm from '@/components/UserForm'

export default {
    name: 'AddUserPage',

    components: {
        NavigationBar,
        UserForm
    }
}
</script>
  