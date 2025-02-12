import Vue from 'vue'
import VueRouter from 'vue-router'
import Students from '@/components/students.vue';
import Subjects from '@/components/subjects.vue';
import Exams from '@/components/exams.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/students' },
    { path: '/students', name: 'Students', component: Students },
    { path: '/subjects', name: 'Subjects', component: Subjects },
    { path: '/exams', name: 'Exams', component: Exams },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
