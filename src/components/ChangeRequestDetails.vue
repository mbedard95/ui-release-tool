<template>
    <v-container>
    <v-card elevation="2">
        <v-card-title>{{title}}</v-card-title>
        <v-card-text>{{description}}</v-card-text>
    </v-card>
</v-container>
</template>
  
<script>

export default {
    name: 'ChangeRequestDetails',

    props: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        releaseSteps: {
            type: String
        },
        rollbackProcedure: {
            type: String
        },
        tags: {
            type: Array
        },
        userGroups: {
            type: Array
        }
    }
}

</script>
  