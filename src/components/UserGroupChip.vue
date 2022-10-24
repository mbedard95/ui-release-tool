<template>
    <v-dialog v-model="dialog" scrollable max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-chip color="primary" dark v-bind="attrs" v-on="on">
                {{groupName}}
            </v-chip>
        </template>
        <v-card>
            <v-card-title>Users</v-card-title>
            <v-divider></v-divider>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.userId">
                            <td>{{ user.firstName + ' ' + user.lastName }}</td>
                            <td>{{ user.emailAddress }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script>
import axios from 'axios'

export default {
    name: 'UserGroupChip',

    data: () => ({
        users: [],
        dialog: false
    }),

    props: {
        groupName: {
            type: String
        },
        groupId: {
            type: String
        }
    },

    mounted() {
        axios
            .get('https://localhost:7060/api/Groups/Users/' + this.groupId)
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                console.log(error)
            });
    },
}

</script>
  