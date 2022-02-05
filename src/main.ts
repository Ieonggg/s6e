import { createApp, VueElement, h } from 'vue'
import App from './App.vue'
import './index.css'
import Home from './views/Home.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

const app = createApp({
    render: () => h(App)
});

app.use(router);

app.mount("#app")

// createApp(App).use(router).mount('#app')