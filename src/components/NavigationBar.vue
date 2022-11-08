<template>
    <v-app-bar app color="light-blue lighten-5" dark>
        <PermissionsComponent @updateUser="fetchUser($event)" @updateUserProfile="fetchProfile($event)"/>
        <div class="d-flex align-center">
            <a href="/">
                <v-img alt="Alegeus" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
                    src="https://www.alegeus.com/wp-content/uploads/2020/06/Alegeus_Logo_RGB_Blue.svg" width="100" />
            </a>
        </div>

        <v-spacer></v-spacer>
        <div class="text-center">
            <v-menu open-on-hover offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        Change Requests
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-bind:href="item.link" v-for="(item, index) in computedChangeRequestItems" :key="index">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <v-spacer></v-spacer>
        <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Users
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-bind:href="item.link" v-for="(item, index) in computedUserItems" :key="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu v-if="profile === 'Admin'" open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Admin
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-bind:href="item.link" v-for="(item, index) in adminItems" :key="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-spacer></v-spacer>

        <v-btn href="https://github.com/mbedard95/ui-release-tool" target="_blank" text color="black">
            <span class="mr-2">Source Code</span>
            <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
    </v-app-bar>
</template>
  
<script>
import PermissionsComponent from '@/components/PermissionsComponent';

export default {
    name: 'NavigationBar',

    components: {
        PermissionsComponent
    },

    watch: {
        userId(){
            this.$emit('updateUser', this.userId);
        },
        profile() {
            this.$emit('updateUserProfile', this.profile);
        }
    }, 

    computed: {
        computedChangeRequestItems() {
            let items = [];
            if (this.profile === 'ReadAndWriteOnly') {
                items.push(this.changeRequestItems[0]);
            }
            items.push(this.changeRequestItems[1]);
            return items;
        },
        computedUserItems() {
            let items = [];
            if (this.profile === 'Admin') {
                items.push(this.userItems[0]);
            }
            items.push(this.userItems[1]);
            return items;
        }
    },

    data: () => ({
        changeRequestItems: [
            {
                title: 'Add Change Request',
                link: '#/addchangerequest'
            },
            {
                title: 'View Change Requests',
                link: '#/viewchangerequests'
            },
        ],
        userItems: [
            {
                title: 'Add User',
                link: '#/addUser'
            },
            {
                title: 'View Users',
                link: '#/viewusers'
            }
        ],
        adminItems: [
            {
                title: 'Tags',
                link: '#/tags'
            },
            {
                title: 'Groups',
                link: '#/groups'
            },
        ],
        userId: '',
        profile: ''
    }),
    methods: {
        fetchUser(userId) {
            this.userId = userId;
        },
        fetchProfile(profile) {
            this.profile = profile;
        }
    }
}
</script>
  