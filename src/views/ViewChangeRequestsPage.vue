<template>
    <v-container>
        <NavigationBar @updateUser="fetchUser($event)" @updateUserProfile="fetchProfile($event)" />
        <ChangeRequestSearch @updateParams="fetchParams($event)" @initiateSearch="searchChangeRequests" :activeProfile="activeProfile" />
        <template>
            <v-data-table :headers="headers" :items="formattedChangeRequests" :items-per-page="10" class="elevation-1"
                @click:row="handleClick">
            </v-data-table>
        </template>
        <v-dialog v-model="detailsDialog">
            <v-card>
                <ChangeRequestDetails :changeRequestId="selectedChangeRequest.changeRequestId" :key="selectedChangeRequest.changeRequestId"
                    @updateApprovals="fetchApprovals($event)" />
                <v-card-actions>
                    <v-btn v-if="canDelete" color="error" icon x-large @click="deleteDialog = true;">
                        <v-icon dark>
                            mdi-delete-circle
                        </v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="canApprove" color="success" text
                        @click="updateApproval('Approved'); detailsDialog = false;">
                        Approve
                    </v-btn>
                    <v-btn v-if="canApprove" color="error" text
                        @click="updateApproval('Denied'); detailsDialog = false;">
                        Deny
                    </v-btn>
                    <v-btn color="secondary" text @click="detailsDialog = false;">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteDialog" max-width="600px">
            <v-card>
                <v-card-title class="text-h5">
                    Abandon Change Request?
                </v-card-title>
                <v-card-text>Are you sure you want to abandon this change request? This action cannot be undone.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="deleteDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="error" text
                        @click="deleteDialog = false; detailsDialog = false; deleteChangeRequest()">
                        Abandon
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
import moment from 'moment'

export default {
    name: 'ViewChangeRequestsPage',

    components: {
        NavigationBar,
        ChangeRequestSearch,
        ChangeRequestDetails
    },

    data: () => ({
        selectedChangeRequest: {},
        approvals: [],
        changeRequests: [],
        detailsDialog: false,
        deleteDialog: false,
        includeInactive: true,
        activeUser: '',
        activeProfile: '',
        action: '',
        searchParams: {},
        headers: [
            {
                text: 'Title',
                align: 'start',
                sortable: false,
                value: 'title',
            },
            { text: 'User', value: 'userDisplayName' },
            { text: 'Status', value: 'changeRequestStatus' },
            { text: 'Created', value: 'created' }
        ],
    }),

    computed: {
        formattedChangeRequests() {
            let formattedList = [];
            for (let i = 0; i < this.changeRequests.length; i++) {
                let request = this.changeRequests[i];
                request.created = this.formatDate(request.created);
                formattedList.push(request);
            }
            return formattedList;
        },
        canDelete() {
            if (this.selectedChangeRequest) {
                for (let i = 0; i < this.changeRequests.length; i++) {
                    if (this.changeRequests[i].changeRequestId === this.selectedChangeRequest.changeRequestId
                        && this.changeRequests[i].userId === this.activeUser
                        && this.changeRequests[i].changeRequestStatus != 'Abandoned') {
                        return true;
                    }
                }
            }
            return false;
        },
        canApprove() {
            if (this.activeProfile != 'Approver') {
                return false;
            }
            for (let i = 0; i < this.approvals.length; i++) {
                if (this.approvals[i].userId == this.activeUser) {
                    let changeId = this.approvals[i].changeRequestId;
                    for (let j = 0; j < this.changeRequests.length; j++) {
                        if (this.changeRequests[j].changeRequestId === changeId
                            && (this.changeRequests[j].changeRequestStatus === 'Active'
                            || this.changeRequests[j].changeRequestStatus === 'Blocked')) {
                            return true
                        }
                    }
                }
            }
            return false;
        },
        canDeploy() {
            if (this.activeProfile != 'Admin') {
                return false;
            }
            return true;
        }
    },

    mounted() {
        axios
            .get('https://localhost:7060/api/ChangeRequests', { params: { includeInactive: this.includeInactive } })
            .then(response => {
                this.changeRequests = response.data;
            })
            .catch(error => {
                console.log(error)
            });
    },

    methods: {
        handleClick(row) {
            this.selectedChangeRequest = row;
            this.detailsDialog = true;
            this.$forceUpdate();
        },
        deleteChangeRequest() {
            axios
                .delete('https://localhost:7060/api/ChangeRequests/' + this.selectedChangeRequest.changeRequestId)
                .then(() => {
                    axios
                        .get('https://localhost:7060/api/ChangeRequests', { params: { includeInactive: this.includeInactive } })
                        .then(response => {
                            this.changeRequests = response.data;
                        })
                        .catch(error => {
                            console.log(error)
                        });
                })
        },
        updateApproval(status) {
            axios
                .put('https://localhost:7060/api/Approvals/' + this.getApprovalId(), {
                    approvalStatus: status,
                    userId: this.activeUser
                })
                .then(() => {
                    location.reload();
                })
        },
        fetchUser(userId) {
            this.activeUser = userId;
        },
        fetchProfile(profile) {
            this.activeProfile = profile;
        },
        fetchApprovals(approvals) {
            this.approvals = approvals;
        },
        fetchParams(params) {
            this.searchParams = params;
        },
        getApprovalId() {
            for (let i = 0; i < this.approvals.length; i++) {
                if (this.approvals[i].userId == this.activeUser) {
                    return this.approvals[i].approvalId;
                }
            }
            return '';
        },
        searchChangeRequests() {
            axios
                .post('https://localhost:7060/api/ChangeRequests/SearchChangeRequests', this.searchParams)
                .then(response => {
                    this.changeRequests = response.data;
                })
                .catch(error => {
                    console.log(error)
                });
        },
        formatDate(date) {
            return moment(date).format('MM/DD/YYYY hh:mm a');
        }
    }
}
</script>