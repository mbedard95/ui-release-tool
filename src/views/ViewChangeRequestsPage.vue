<template>
    <v-container>
        <NavigationBar />
        <ChangeRequestSearch />
        <v-card>
            <ChangeRequestDetails 
            v-bind:changeRequestId="changeRequestId"/>
        </v-card>
    </v-container>
</template>

<script>
import NavigationBar from '@/components/NavigationBar';
import ChangeRequestSearch from '@/components/ChangeRequestSearch'
import ChangeRequestDetails from '@/components/ChangeRequestDetails'

export default {
    name: 'ViewChangeRequestsPage',

    components: {
        NavigationBar,
        ChangeRequestSearch,
        ChangeRequestDetails
    },

    data: () => ({
        changeRequestId: "9C513DBA-F2EA-44F2-A01E-08DAB53F6C20"
    })
}
</script>