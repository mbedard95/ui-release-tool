<template>
    <v-container v-if="loaded">
        <h1>{{title}}</h1>
        <v-container>
            <v-card-title>Description</v-card-title>
            <v-card-text>{{description}}</v-card-text>
            <v-card-title>Release Steps</v-card-title>
            <v-card-text>{{releaseSteps}}</v-card-text>
            <v-card-title>Rollback Procedure</v-card-title>
            <v-card-text>{{rollbackProcedure}}</v-card-text>
        </v-container>
        <v-row>
            <v-col>
                <v-card v-if="loaded">
                    <v-card-title>Approval Groups</v-card-title>
                    <v-container>
                        <v-chip-group v-if="userGroups.length > 0">
                            <UserGroupChip v-for="userGroup in userGroups" :key="userGroup.groupId"
                                v-bind:groupId="userGroup.groupId" v-bind:groupName="userGroup.groupName" />
                        </v-chip-group>
                        <v-card-text v-if="userGroups.length === 0">None</v-card-text>
                    </v-container>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>Tags</v-card-title>
                    <v-container>
                        <v-chip-group v-if="tags.length > 0">
                            <v-chip v-for="tag in tags" :key="tag.tagId">{{tag.tagName}}</v-chip>
                        </v-chip-group>
                        <v-card-text v-if="tags.length === 0">None</v-card-text>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import UserGroupChip from '@/components/UserGroupChip'
import axios from 'axios'

export default {
    name: 'ChangeRequestDetails',

    components: {
        UserGroupChip
    },

    data: () => ({
        groupIds: [],
        title: '',
        description: '',
        releaseSteps: '',
        rollbackProcedure: '',
        tags: [],
        userGroups: [],
        loaded: false
    }),

    props: {
        changeRequestId: {
            type: String
        }
    },

    mounted() {
        axios
            .get('https://localhost:7060/api/ChangeRequests/Details/' + this.changeRequestId)
            .then(response => {
                this.loaded = true;
                this.tags = response.data.tags;
                this.userGroups = response.data.userGroups;
                this.title = response.data.title;
                this.description = response.data.description;
                this.releaseSteps = response.data.releaseSteps;
                this.rollbackProcedure = response.data.rollbackProcedure;
            })
            .catch(error => {
                console.log(error)
            });
    },
}

</script>
  