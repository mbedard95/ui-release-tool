import Vue from 'vue'
import VueRouter from 'vue-router'
import AddChangeRequest from '@/views/AddChangeRequest'
import HomePage from '@/views/HomePage'
import TagsPage from '@/views/TagsPage'

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
        component: AddChangeRequest
    },
    {
        path: '/tags',
        name: 'Tags',
        component: TagsPage
    }
]

const router = new VueRouter({
    routes
})

export default router