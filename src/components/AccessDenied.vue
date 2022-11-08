<template>
    <v-card class="mx-auto" max-width="600">
        <v-card-title>
            <v-icon large justify='end'>mdi-lock</v-icon>
            Sorry!
        </v-card-title>
        <v-card-text>
            You do not have access to view this page.
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'AccessDenied'
}
</script>