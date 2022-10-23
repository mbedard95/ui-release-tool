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
        startDate: '',
        endDate: '',
        assignedToUser: false
    }),
    methods: {
        reset() {
            this.$refs.form.reset()
        }
    }
}
</script>
  