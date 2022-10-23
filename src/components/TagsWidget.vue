<template>
    <v-sheet>
        <v-select v-model="widgetTags" :items="tagNames" widgetTags clearable label="Tags" multiple
            prepend-icon="mdi-tag-multiple" solo v-if="!getTagError && tags.length > 0">
            <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="removeTag(item)">
                    <strong>{{ item }}</strong>&nbsp;
                </v-chip>
            </template>
        </v-select>
        <v-progress-circular v-if="tagLoading" indeterminate color="primary"></v-progress-circular>
        <v-alert v-if="getTagError" type="error">
            Could not retrieve tags. Please try again later.
        </v-alert>
    </v-sheet>
</template>

<script>
import axios from 'axios'

export default {
    name: 'TagsWidget',

    data: () => ({
        tags: [],
        getTagError: false,
        alertType: 'success',
        messages: [],
        tagLoading: true,
        widgetTags: []
    }),
    watch: {
        widgetTags(){
            this.$emit('updateTags', this.widgetTags);
        }
    },
    mounted() {
        axios
            .get('https://localhost:7060/api/Tags')
            .then(response => {
                this.tags = response.data;
                this.tagLoading = false;
            })
            .catch(error => {
                console.log(error)
                this.tagLoading = false;
                this.getTagError = true
            });
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
        removeTag(tag) {
            this.widgetTags.splice(this.widgetTags.indexOf(tag), 1)
        }
    },
}
</script>