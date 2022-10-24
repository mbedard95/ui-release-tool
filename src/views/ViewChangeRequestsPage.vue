<template>
    <v-container>
        <NavigationBar />
        <ChangeRequestSearch />
        <template>
            <v-data-table :headers="headers" :items="changeRequests" :items-per-page="10" class="elevation-1"
                @click:row="handleClick">
            </v-data-table>
        </template>
        <v-dialog v-model="detailsDialog">
            <v-card>
                <ChangeRequestDetails v-bind:changeRequestId="changeRequestId" :key="changeRequestId" />
                <v-card-actions>
                    <v-btn color="error" icon large @click="deleteDialog = true;">
                        <v-icon dark>
                            mdi-delete-circle
                        </v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" text @click="detailsDialog = false;">
                        Approve
                    </v-btn>
                    <v-btn color="error" text @click="detailsDialog = false;">
                        Deny
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="detailsDialog = false;">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
        <v-dialog v-model="deleteDialog" max-width="600px">
            <v-card>
                <v-card-title class="text-h5">
                    Delete Change Request?
                </v-card-title>
                <v-card-text>Are you sure you want to delete this change request? This action cannot be undone.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="deleteDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="error" text @click="deleteDialog = false; detailsDialog = false; deleteChangeRequest()">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>

</template>

<script>
import NavigationBar from '@/components/NavigationBar';
import ChangeRequestSearch from '@/components/ChangeRequestSearch'
import ChangeRequestDetails from '@/components/ChangeRequestDetails'
import axios from 'axios'

export default {
    name: 'ViewChangeRequestsPage',

    components: {
        NavigationBar,
        ChangeRequestSearch,
        ChangeRequestDetails
    },

    data: () => ({
        changeRequestId: '',
        changeRequests: [],
        detailsDialog: false,
        deleteDialog: false,
        headers: [
            {
                text: 'Title',
                align: 'start',
                sortable: false,
                value: 'title',
            },
            { text: 'User', value: 'userDisplayName' },
            { text: 'Created', value: 'created' }
        ],
    }),

    mounted() {
        axios
            .get('https://localhost:7060/api/ChangeRequests')
            .then(response => {
                this.changeRequests = response.data;
            })
            .catch(error => {
                console.log(error)
            });
    },

    methods: {
        handleClick(row) {
            this.changeRequestId = row.changeRequestId,
                this.detailsDialog = true;
            this.$forceUpdate();
        },
        deleteChangeRequest() {
            axios
                .delete('https://localhost:7060/api/ChangeRequests/' + this.changeRequestId)
                .then(() => {
                    axios
                        .get('https://localhost:7060/api/ChangeRequests')
                        .then(response => {
                            this.changeRequests = response.data;
                        })
                        .catch(error => {
                            console.log(error)
                        });
                })
        }
    }
}
</script>