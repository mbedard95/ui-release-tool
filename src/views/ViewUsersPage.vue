<template>
    <v-container>
        <NavigationBar @updateUser="fetchUser($event)" />

        <v-data-table v-model="selected" :headers="headers" :items="users" single-select item-key="userId" show-select
            class="elevation-1" @click:row="handleClick">
            <template v-slot:top>
                <v-btn depressed :disabled="selected.length === 0" color="success" @click="setActiveUser">
                    Save Active User
                </v-btn>
            </template>
        </v-data-table>
        <v-alert v-if="messages.length > 0" v-bind:type="alertType">
            <v-container>
                <v-row>
                    <div v-for="(message, i) in messages" :key="i">{{ message }}</div>
                    <v-spacer></v-spacer>
                    <v-btn justify="end" color="green darken-4" @click="reload">Reload Page</v-btn>
                </v-row>
            </v-container>
        </v-alert>
        <v-dialog v-model="detailsDialog" max-width="600px">
            <v-card>
                <v-container>
                <h1>User Details</h1>
                <v-card-title>Name:</v-card-title><v-card-text>{{detailsUser.firstName}} {{detailsUser.lastName}}</v-card-text>
                <v-card-title>Email:</v-card-title><v-card-text>{{detailsUser.emailAddress}}</v-card-text>
                <v-card-title>Profile:</v-card-title><v-card-text>{{detailsUser.userProfile}}</v-card-text>
                <v-card  v-if="detailsUser && detailsUser.userProfile === 'Approver'">
                    <v-card-title>Groups:</v-card-title>
                   <v-container>
                        <v-chip-group>
                            <v-chip v-for="group in detailsUser.groups" :key="group">{{ group }}</v-chip>
                        </v-chip-group>
                        <v-card-text v-if="detailsUser.groups && detailsUser.groups.length === 0">None</v-card-text>
                    </v-container> 
                </v-card>
            </v-container>
            </v-card>
        </v-dialog>
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
        detailsUserId: '',
        detailsUser: {},
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
        detailsDialog: false
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
        },
        handleClick(row) {
            this.detailsUserId = row.userId;
            axios
            .get('https://localhost:7060/api/Users/' + row.userId)
            .then(response => {
                this.detailsUser = response.data;
            })
            .catch(error => {
                console.log(error)
            });
            this.detailsDialog = true;
        },
        reload() {
            location.reload();
        }
    }
}

</script>