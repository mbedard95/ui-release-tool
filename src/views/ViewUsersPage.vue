<template>
    <v-container>
        <NavigationBar @updateUser="fetchUser($event)" />

        <v-data-table v-model="selected" :headers="headers" :items="users" single-select item-key="userId" show-select
            class="elevation-1">
            <template v-slot:top>
                <v-btn depressed :disabled="selected.length === 0" color="success" @click="setActiveUser">
                    Save Active User
                </v-btn>
            </template>
        </v-data-table>
        <v-alert v-if="messages.length > 0" v-bind:type="alertType">
            <div v-for="(message, i) in messages" :key="i">{{ message }}</div>
        </v-alert>
    </v-container>
</template>

<script>
import NavigationBar from '@/components/NavigationBar';
import axios from 'axios'

export default {
    name: 'ViewUsersPage',

    components: {
        NavigationBar,
    },

    data: () => ({
        users: [],
        selected: [],
        userId: '',
        headers: [
            {
                text: 'Email Address',
                align: 'start',
                sortable: true,
                value: 'emailAddress',
            },
            { text: 'First Name', value: 'firstName' },
            { text: 'Last Name', value: 'lastName' },
            { text: 'Profile', value: 'userProfile' }
        ],
        alertType: 'success',
        messages: [],
    }),

    mounted() {
        axios
            .get('https://localhost:7060/api/Users')
            .then(response => {
                this.users = response.data;
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].userId === this.userId) {
                        this.selected.push(this.users[i]);
                    }
                }

            })
            .catch(error => {
                console.log(error)
            });
    },

    methods: {
        fetchUser(userId) {
            this.userId = userId;
        },
        setActiveUser() {
            this.messages = [];
            axios
                .put('https://localhost:7060/api/Users/ActiveUser/' + this.selected[0].userId)
                .then(() => {
                    this.alertType = 'success'
                    this.messages.push('Active user set successfully');
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
        }
    }
}

</script>