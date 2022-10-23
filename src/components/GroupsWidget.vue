<template>
    <v-sheet>
        <v-select v-model="widgetGroups" :items="groupNames" widgetGroups clearable label="User Groups" multiple
            prepend-icon="mdi-account" solo v-if="!getGroupError && groups.length > 0">
            <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="removeGroup(item)">
                    <strong>{{ item }}</strong>&nbsp;
                </v-chip>
            </template>
        </v-select>
        <v-progress-circular v-if="groupLoading" indeterminate color="primary"></v-progress-circular>
        <v-alert v-if="getGroupError" type="error">
            Could not retrieve groups. Please try again later.
        </v-alert>
    </v-sheet>
</template>

<script>
import axios from 'axios'

export default {
    name: 'GroupsWidget',

    data: () => ({
        groups: [],
        getGroupError: false,
        alertType: 'success',
        messages: [],
        groupLoading: true,
        widgetGroups: []
    }),
    watch: {
        widgetGroups() {
            this.$emit('updateGroups', this.widgetGroups);
        }
    },
    mounted() {
        axios
            .get('https://localhost:7060/api/Groups')
            .then(response => {
                this.groups = response.data;
                this.groupLoading = false;
            })
            .catch(error => {
                console.log(error)
                this.groupLoading = false;
                this.getGroupError = true
            });
    },
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
        removeGroup(group) {
            this.widgetGroups.splice(this.widgetGroups.indexOf(group), 1)
        }
    },
}
</script>