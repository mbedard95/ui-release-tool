<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
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
                <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly
                    @click="dateDialog=true"></v-text-field>
                <v-col>
                    <v-checkbox v-model="assignedToUser" label="Assigned to me"></v-checkbox>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-btn x-large :disabled="!valid" color="success" class="mr-4">
                        Search
                    </v-btn>
                </v-col>

            </v-row>
        </v-form>
    </v-container>
</template>
  
<script>
export default {
    name: 'ChangeRequestSearch',

    data: () => ({
        valid: true,
        title: '',
        email: '',
        tags: [],
        dates: [],
        assignedToUser: false,
        dateDialog: false
    }),
    methods: {
        reset() {
            this.$refs.form.reset()
        }
    },
    computed: {
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
    },
}
</script>
  