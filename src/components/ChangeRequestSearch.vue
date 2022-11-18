<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row align="center" justify="space-around">
                <v-col>
                    <v-text-field dense clearable outlined v-model="title" :counter="100" label="Title">
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field dense clearable outlined v-model="email" :counter="100" label="Email">
                    </v-text-field>
                </v-col>

                <v-dialog v-model="dateDialog" max-width="300px">
                    <v-date-picker v-model="dates" range></v-date-picker>
                </v-dialog>
                <v-col>
                    <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly
                        @click="dateDialog = true"></v-text-field>
                </v-col>
                <v-col>
                    <v-checkbox v-model="assignedToUser" label="Assigned to me"></v-checkbox>
                </v-col>
                <v-col>
                    <v-btn depressed @click="handleFilterClick">
                        More filters
                        <v-icon>
                            {{ filterButton }}
                        </v-icon>
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn x-large :disabled="!valid" color="success" class="mr-4" @click="emitSearch">
                        Search
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="showAllFilters">
                <v-col>
                    <TagsWidget @updateTags="fetchTags($event)" />
                </v-col>
                <v-col>
                    <v-select v-model="statusValues" :items="statusItems" clearable chips label="Change Request Status" multiple solo></v-select>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
  
<script>
import TagsWidget from '@/components/TagsWidget'

export default {
    name: 'ChangeRequestSearch',

    components: {
        TagsWidget
    },

    data: () => ({
        valid: true,
        title: '',
        email: '',
        tags: [],
        dates: [null, null],
        statuses: [],
        assignedToUser: false,
        dateDialog: false,
        filterButton: 'mdi-menu-down',
        showAllFilters: false,
        statusItems: ['Active', 'Approved', 'Abandoned', 'Deployed'],
        statusValues: []
    }),

    watch: {
        params() {
            this.$emit('updateParams', this.params);
        }
    },

    computed: {
        params() {
            return {
                title: this.title,
                email: this.email,
                startDate: this.startDate,
                endDate: this.endDate,
                assignedToActiveUser: this.assignedToUser,
                statuses: this.statusValues,
                tags: this.tags
            }
        },

        startDate() {
            if (this.dates.length > 0) {
                return this.dates[0];
            }
            else return '';
        },

        endDate() {
            if (this.dates.length > 1) {
                return this.dates[1];
            }
            else return '';
        },

        dateRangeText() {
            return this.dates.join(' ~ ')
        }
    },

    methods: {
        reset() {
            this.$refs.form.reset()
        },
        handleFilterClick() {
            this.showAllFilters = !this.showAllFilters;
            if (this.showAllFilters) {
                this.filterButton = 'mdi-menu-up';
            }
            else {
                this.filterButton = 'mdi-menu-down';
            }
        },
        fetchTags(tags) {
            this.tags = tags
        },
        emitSearch() {
            this.$emit('initiateSearch');
        }
    }
}
</script>
  