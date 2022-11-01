<template>
    <div></div>
</template>
  
<script>
import axios from 'axios'

export default {
    name: 'PermissionsComponent',

    data: () => ({

    }),

    mounted() {
        axios
            .get('https://localhost:7060/api/Users/ActiveUser')
            .then(response => {
                this.$emit('updateUser', response.data.userId);
                this.$emit('updateUserProfile', response.data.userProfile);
            })
            .catch(error => {
                console.log(error)
            });
    },
}

</script>
  