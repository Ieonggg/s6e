import { createApp, VueElement, h } from 'vue'
import App from './App.vue'
import './index.css'
import Home from './views/Home.vue';
import Duties from './views/Duties.vue';
import DutiesRegistation from './views/DutiesRegistation.vue';
import { createRouter, createWebHistory } from 'vue-router'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyCD8lAxCGDpMwmMMrpMOWhlYB5X6CV8x94",
    authDomain: "quahk-s6e.firebaseapp.com",
    databaseURL: "https://quahk-s6e.firebaseio.com",
    projectId: "quahk-s6e",
    storageBucket: "quahk-s6e.appspot.com",
    messagingSenderId: "98530986080",
    appId: "1:98530986080:web:cbb4c095dffbe573055b05",
    measurementId: "G-KB7Y3BQF2L"
};


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/Duties',
        name: 'Duties',
        component: Duties
    },
    {
        path: '/Duties/Registation',
        name: 'DutiesRegistation',
        component: DutiesRegistation
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);



const app = createApp({
    render: () => h(App)
});

app.use(router);

app.mount("#app")

// createApp(App).use(router).mount('#app')