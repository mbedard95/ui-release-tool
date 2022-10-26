<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-text-field outlined v-model="title" :counter="100" :rules="titleRules" label="Title" required>
            </v-text-field>

            <v-textarea outlined name="description" :rules="descriptionRules" v-model="description" label="Description"
                required value="">
            </v-textarea>

            <v-textarea outlined name="releaseSteps" :rules="releaseStepsRules" v-model="releaseSteps"
                label="Release Steps" required value="">
            </v-textarea>

            <v-textarea outlined name="rollbackProcedure" :rules="rollbackProcedureRules" v-model="rollbackProcedure"
                label="Rollback Procedure" required value="">
            </v-textarea>

            <TagsWidget @updateTags="fetchTags($event)" /> 
            <GroupsWidget @updateGroups="fetchGroups($event)" />

        </v-form>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="addChangeRequest">
            Submit
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
            Reset Validation
        </v-btn>
        <v-alert v-if="messages.length > 0" v-bind:type="alertType">
            <div v-for="(message, i) in messages" :key="i">{{message}}</div>
        </v-alert>

    </v-container>
</template>

<script>
import TagsWidget from '@/components/TagsWidget';
import GroupsWidget from '@/components/GroupsWidget';

import axios from 'axios';
export default {
    name: 'ChangeRequestForm',

    components: {
        TagsWidget,
        GroupsWidget
    },

    data: () => ({
        valid: false,
        title: '',
        description: '',
        releaseSteps: '',
        rollbackProcedure: '',
        titleRules: [
            v => !!v || 'Title is required',
            v => (v && v.length <= 100) || 'Title must be less than or equal to 100 characters',
        ],
        descriptionRules: [
            v => !!v || 'Description is required'
        ],
        rollbackProcedureRules: [
            v => !!v || 'Rollback Procedure is required'
        ],
        releaseStepsRules: [
            v => !!v || 'Release Steps is required'
        ],
        assignedGroups: [],
        assignedTags: [],
        alertType: 'success',
        messages: [],
    }),
    computed: {
        groupNames() {
            let names = [];
            for (let i = 0; i < this.groups.length; i++) {
                names.push(this.groups[i].groupName)
            }
            return names;
        }
    },
    methods: {
        validate() {
            this.$refs.form.validate()
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        removeTag(tag) {
            this.assignedTags.splice(this.assignedTags.indexOf(tag), 1)
        },
        removeGroup(group) {
            this.assignedGroups.splice(this.assignedGroups.indexOf(group), 1)
        },
        fetchTags(tags) {
            this.assignedTags = tags
        },
        fetchGroups(groups) {
            this.assignedGroups = groups
        },
        addChangeRequest() {
            this.messages = [];
            axios
                .post('https://localhost:7060/api/ChangeRequests', {
                    title: this.title,
                    description: this.description,
                    releaseSteps: this.releaseSteps,
                    rollbackProcedure: this.rollbackProcedure,
                    tags: this.assignedTags,
                    userGroups: this.assignedGroups,
                    userId: 'C4D812FA-DFF2-44ED-A330-64413EEECC99'
                })
                .then(() => {
                    this.alertType = 'success'
                    this.messages.push('Change Request submitted successfully');
                    this.$refs.form.reset();
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
    },
}
</script>
  