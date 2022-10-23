<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col>
            <v-text-field clearable outlined v-model="firstName" :counter="100" label="First Name">
            </v-text-field>
        </v-col>
        <v-col>
            <v-text-field clearable outlined v-model="lastName" :counter="100" label="Last Name">
            </v-text-field>
        </v-col>
        <v-col>
            <v-text-field clearable outlined v-model="email" label="Email">
            </v-text-field>
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
    name: 'UserSearch',

    data: () => ({
        valid: true,
        firstName: '',
        lastName: '',
        email: '',
    }),
    methods: {
        reset() {
            this.$refs.form.reset()
        }
    }
}
</script>
  