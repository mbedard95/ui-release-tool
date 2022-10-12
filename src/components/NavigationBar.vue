<template>
    <v-app-bar app color="light-blue lighten-5" dark>
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
                    <v-list-item v-bind:href="item.link" v-for="(item, index) in changeRequestItems" :key="index">
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
                <v-list-item v-for="(item, index) in userItems" :key="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu open-on-hover offset-y>
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
export default {
    name: 'NavigationBar',

    data: () => ({
        changeRequestItems: [
            {
                title: 'Add Change Request',
                link: '#/addchangerequest'
            },
            { title: 'View Change Requests' },
        ],
        userItems: [
            { title: 'Add User' },
            { title: 'View Users' },
        ],
        adminItems: [
            {
                title: 'Tags',
                link: '#/tags'
            },
            { title: 'Groups' },
        ],
    }),
}
</script>
  