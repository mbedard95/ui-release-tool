<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-text-field outlined v-model="firstName" :rules="[rules.required]" :counter="100" label="First Name" required>
            </v-text-field>

            <v-text-field outlined v-model="lastName" :rules="[rules.required]" :counter="100" label="Last Name" required>
            </v-text-field>

            <v-text-field outlined v-model="emailAddress" :rules="[rules.required]" :counter="100" label="Email Address" required>
            </v-text-field>

            <v-text-field outlined v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]" :type="showPassword ? 'text' : 'password'" name="input-10-1"
                label="Password" hint="At least 8 characters" counter @click:append="showPassword = !showPassword">
            </v-text-field>
            <v-container>
            <v-select v-model="selectedProfile" :rules="[rules.required]" :items="profiles" item-value="value" item-text="name"
                label="User Profile" outlined></v-select>
            
                <v-card align-center v-if="selectedProfile != null">
                    <v-card-text>
                        <v-row>
                            <v-icon :color="readIcon.color">
                                {{readIcon.icon}}
                            </v-icon>Can search and read change requests
                        </v-row>
                        <v-row>
                            <v-icon :color="writeIcon.color">
                                {{writeIcon.icon}}
                            </v-icon>Can submit new change requests
                        </v-row>
                        <v-row>
                            <v-icon :color="approveIcon.color">
                                {{approveIcon.icon}}
                            </v-icon>Can adjudicate change requests for assigned groups
                        </v-row>
                        <v-row>
                            <v-icon :color="manageTagsIcon.color">
                                {{manageTagsIcon.icon}}
                            </v-icon>Can manage tags
                        </v-row>
                        <v-row>
                            <v-icon :color="manageUsersIcon.color">
                                {{manageUsersIcon.icon}}
                            </v-icon>Can manage users
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-container>
            <GroupsWidget v-if="selectedProfile === 'Approver'" @updateGroups="fetchGroups($event)" />
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
import GroupsWidget from '@/components/GroupsWidget';

import axios from 'axios';
export default {
    name: 'UserForm',

    components: {
        GroupsWidget
    },

    data: () => ({
        valid: false,
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        showPassword: false,
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => (`The email and password you entered don't match`),
        },
        profiles: [
            {
                value: "ReadOnly",
                name: "Read Only",
                canRead: true,
                canWrite: false,
                canApprove: false,
                canManageTags: false,
                canManageUsers: false
            },
            {
                value: "ReadAndWriteOnly",
                name: "Read and Write",
                canRead: true,
                canWrite: true,
                canApprove: false,
                canManageTags: false,
                canManageUsers: false
            },
            {
                value: "Approver",
                name: "Approver",
                canRead: true,
                canWrite: false,
                canApprove: true,
                canManageTags: false,
                canManageUsers: false
            },
            {
                value: "Admin",
                name: "Admin",
                canRead: true,
                canWrite: false,
                canApprove: false,
                canManageTags: true,
                canManageUsers: true
            }
        ],
        selectedProfile: null,
        assignedGroups: [],
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
        },
        readIcon() {
            for (let i = 0; i < this.profiles.length; i++) {
                if (this.selectedProfile === this.profiles[i].value) {
                    if (this.profiles[i].canRead) {
                        return { icon: "mdi-check-circle", color: "success" }
                    }
                    else return { icon: "mdi-alpha-x-circle", color: "error" }
                }
            }
            return { icon: "mdi-help-circle" };
        },
        writeIcon() {
            for (let i = 0; i < this.profiles.length; i++) {
                if (this.selectedProfile === this.profiles[i].value) {
                    if (this.profiles[i].canWrite) {
                        return { icon: "mdi-check-circle", color: "success" }
                    }
                    else return { icon: "mdi-alpha-x-circle", color: "error" }
                }
            }
            return null;
        },
        approveIcon() {
            for (let i = 0; i < this.profiles.length; i++) {
                if (this.selectedProfile === this.profiles[i].value) {
                    if (this.profiles[i].canApprove) {
                        return { icon: "mdi-check-circle", color: "success" }
                    }
                    else return { icon: "mdi-alpha-x-circle", color: "error" }
                }
            }
            return null;
        },
        manageTagsIcon() {
            for (let i = 0; i < this.profiles.length; i++) {
                if (this.selectedProfile === this.profiles[i].value) {
                    if (this.profiles[i].canManageTags) {
                        return { icon: "mdi-check-circle", color: "success" }
                    }
                    else return { icon: "mdi-alpha-x-circle", color: "error" }
                }
            }
            return null;
        },
        manageUsersIcon() {
            for (let i = 0; i < this.profiles.length; i++) {
                if (this.selectedProfile === this.profiles[i].value) {
                    if (this.profiles[i].canManageUsers) {
                        return { icon: "mdi-check-circle", color: "success" }
                    }
                    else return { icon: "mdi-alpha-x-circle", color: "error" }
                }
            }
            return null;
        },
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
        removeGroup(group) {
            this.assignedGroups.splice(this.assignedGroups.indexOf(group), 1)
        },
        fetchGroups(groups) {
            this.assignedGroups = groups
        },
        addChangeRequest() {
            this.messages = [];
            axios
                .post('https://localhost:7060/api/Users', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    emailAddress: this.emailAddress,
                    password: this.password,
                    userProfile: this.selectedProfile,
                    groups: this.assignedGroups,
                })
                .then(() => {
                    this.alertType = 'success'
                    this.messages.push('User created successfully');
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
  