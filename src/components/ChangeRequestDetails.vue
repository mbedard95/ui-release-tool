<template>
    <v-container v-if="loaded">
        <h1>{{ title }}</h1>
        <v-container>
            <v-card-title>Description</v-card-title>
            <v-card-text>
                <v-textarea outlined :readonly="true" :auto-grow="true" v-model="description"></v-textarea>
            </v-card-text>
            <v-card-title>Release Steps</v-card-title>
            <v-card-text>
                <v-textarea outlined :readonly="true" :auto-grow="true" v-model="releaseSteps"></v-textarea>
            </v-card-text>
            <v-card-title>Rollback Procedure</v-card-title>
            <v-card-text>
                <v-textarea outlined :readonly="true" :auto-grow="true" v-model="rollbackProcedure"></v-textarea>
            </v-card-text>
        </v-container>
        <v-row>
            <v-col>
                <v-card v-if="loaded">
                    <v-card-title>Approval Status:&nbsp;
                        <v-chip readonly :color="statusColor">
                            {{ changeRequestStatus }}
                        </v-chip>
                    </v-card-title>
                    <v-container>
                        <template>
                            <v-btn block @click="approvalDialog = !approvalDialog">
                                See List
                            </v-btn>
                        </template>
                    </v-container>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>Tags</v-card-title>
                    <v-container>
                        <v-chip-group v-if="tags.length > 0">
                            <v-chip v-for="tag in tags" :key="tag.tagId">{{ tag.tagName }}</v-chip>
                        </v-chip-group>
                        <v-card-text v-if="tags.length === 0">None</v-card-text>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="approvalDialog">
            <v-card v-if="approvals.length > 0">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    First Name
                                </th>
                                <th class="text-left">
                                    Last Name
                                </th>
                                <th class="text-left">
                                    Email
                                </th>
                                <th class="text-left">
                                    Status
                                </th>
                                <th class="text-left">
                                    Date Sent
                                </th>
                                <th class="text-left">
                                    Date Approved
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in approvals" :key="item.approvalId">
                                <td>{{ item.firstName }}</td>
                                <td>{{ item.lastName }}</td>
                                <td>{{ item.emailAddress }}</td>
                                <td>{{ item.approvalStatus }}</td>
                                <td>{{ formatDate(item.created) }}</td>
                                <td>{{ getApprovedDisplayDate(item.approvedDate) }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <v-card v-else>
                <v-container>
                    <v-card-title>No approvals found.</v-card-title>
                </v-container>
            </v-card>
        </v-dialog>
    </v-container>
</template>
  
<script>

import axios from 'axios'
import moment from 'moment'

export default {
    name: 'ChangeRequestDetails',

    components: {

    },

    data: () => ({
        groupIds: [],
        title: '',
        description: '',
        releaseSteps: '',
        rollbackProcedure: '',
        changeRequestStatus: '',
        tags: [],
        approvals: [],
        loaded: false,
        approvalDialog: false
    }),

    computed: {
        statusColor() {
            switch (this.changeRequestStatus) {
                case 'Active':
                    return 'secondary';
                case 'Approved':
                    return 'success';
                case 'Deployed':
                    return 'primary';
                case 'Abandoned':
                    return 'error';
                case 'Blocked':
                    return 'warning';
                default:
                    return 'secondary';
            }
        }
    },

    watch: {
        approvals() {
            this.$emit('updateApprovals', this.approvals);
        }
    },

    props: {
        changeRequestId: {
            type: String
        },
        activeUser: {
            type: String
        },
        activeProfile: {
            type: String
        }
    },

    mounted() {
        axios
            .get('https://localhost:7060/api/ChangeRequests/Details/' + this.changeRequestId)
            .then(response => {
                this.loaded = true;
                this.tags = response.data.tags;
                this.approvals = response.data.approvals;
                this.changeRequestStatus = response.data.changeRequestStatus
                this.title = response.data.title;
                this.description = response.data.description;
                this.releaseSteps = response.data.releaseSteps;
                this.rollbackProcedure = response.data.rollbackProcedure;
            })
            .catch(error => {
                console.log(error)
            });
    },

    methods: {
        getApprovedDisplayDate(date) {
            if (date === '9999-12-31T23:59:59.997') {
                return 'N/A';
            }
            else return this.formatDate(date);
        },
        formatDate(date) {
            return moment(date).format('MM/DD/YYYY hh:mm a');
        }
    }
}

</script>
  