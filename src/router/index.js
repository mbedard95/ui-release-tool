import Vue from 'vue'
import VueRouter from 'vue-router'
import AddChangeRequestPage from '@/views/AddChangeRequestPage'
import HomePage from '@/views/HomePage'
import TagsPage from '@/views/TagsPage'
import GroupsPage from '@/views/GroupsPage'
import AddUserPage from '@/views/AddUserPage'
import ViewChangeRequestsPage from '@/views/ViewChangeRequestsPage'
import ViewUsersPage from '@/views/ViewUsersPage'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/addchangerequest',
        name: 'AddChangeRequest',
        component: AddChangeRequestPage
    },
    {
        path: '/tags',
        name: 'Tags',
        component: TagsPage
    },
    {
        path: '/groups',
        name: 'Groups',
        component: GroupsPage
    },
    {
      path: '/addUser',
      name: 'AddUser',
      component: AddUserPage
    },
    {
        path: '/viewusers',
        name: 'ViewUsers',
        component: ViewUsersPage
    },
    {
      path: '/viewchangerequests',
      name: 'ViewChangeRequests',
      component: ViewChangeRequestsPage
    }
]

const router = new VueRouter({
    routes
})

export default router