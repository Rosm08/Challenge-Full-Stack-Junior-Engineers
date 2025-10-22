import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'OrderViews',
            component: () => import('@/views/OrderViews.vue')
        },
        {
            path: '/orderCreate',
            name: 'order-create',
            component: () => import('@/views/OrderCreate.vue')
        },
        {
            path: '/orderView/:id',
            name: 'order-view',
            component: () => import('@/views/OrderUpdate.vue')
        },
    ]
});

export default router;
