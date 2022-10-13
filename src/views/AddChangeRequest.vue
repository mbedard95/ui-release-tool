<template>
    <v-container>
        <NavigationBar />

        <h1>Add Change Request</h1>

        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field outlined v-model="title" :counter="100" :rules="titleRules" label="Title" required>
            </v-text-field>

            <v-textarea outlined name="description" v-model="description" label="Description" value="">
            </v-textarea>

            <v-textarea outlined name="releaseSteps" v-model="releaseSteps" label="Release Steps" value="">
            </v-textarea>

            <v-textarea outlined name="rollbackProcedure" v-model="rollbackProcedure" label="Rollback Procedure"
                value="">
            </v-textarea>

            <template>
                <v-combobox v-model="assignedTags" :items="tagNames" assignedTags clearable label="Tags" multiple
                    prepend-icon="mdi-tag-multiple" solo v-if="!apiError && tags.length > 0">
                    <template v-slot:selection="{ attrs, item, select, selected }">
                        <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="remove(tag)">
                            <strong>{{ item }}</strong>&nbsp;
                        </v-chip>
                    </template>
                </v-combobox>
            </template>

            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <v-alert v-if="apiError" type="error">
                Could not retrieve tags. Please try again later.
            </v-alert>
            
            <v-spacer></v-spacer>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                Submit
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
            </v-btn>

            <v-btn color="warning" @click="resetValidation">
                Reset Validation
            </v-btn>
        </v-form>
    </v-container>
</template>
  
<script>
import NavigationBar from '@/components/NavigationBar';
import axios from 'axios';
export default {
    name: 'AddChangeRequest',

    components: {
        NavigationBar
    },

    data: () => ({
        valid: true,
        title: '',
        description: '',
        releaseSteps: '',
        rollbackProcedure: '',
        titleRules: [
            v => !!v || 'Title is required',
            v => (v && v.length <= 100) || 'Title must be less than or equal to 100 characters',
        ],
        tags: [],
        assignedTags: [],
        apiError: false,
        loading: true
    }),
    mounted() {
        axios
            .get('https://localhost:7060/api/Tags')
            .then(response => {
                this.tags = response.data;
                this.loading = false;
            })
            .catch(error => {
                console.log(error)
                loading = false;
                this.apiError = true
            })
    },
    computed: {
        tagNames() {
            let names = [];
            for (let i = 0; i < this.tags.length; i++) {
                names.push(this.tags[i].name)
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
        remove(tag) {
            this.assignedTags.splice(this.assignedTags.indexOf(tag), 1)
        }
    },
}
</script>
  