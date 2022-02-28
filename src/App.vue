<script>
import AppMenu from './components/AppMenu.vue';
import TopBar from './components/TopBar.vue';
import { Capacitor } from '@capacitor/core';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
export default {
  name: 'App',
  data() {
      return {
      }
  },
  components: {
        AppMenu,
        TopBar
    },
    methods: {
        checkTime() {
            let d = new Date();
            let h = d.getHours();
            let m = d.getMinutes();
            if (m < 10) {
                let timeNow = `${h}0${m}`;
                //console.log(timeNow)
                return timeNow;
            } else {
                let timeNow = `${h}${m}`;
                //console.log(timeNow)
                return timeNow;
            }
        },
        checkTodayDate() {
            const d = new Date();
            let day = d.getDate();
            let month = d.getMonth();
            const year = d.getFullYear();
            const weekday = d.getDay();
            if (month + 1 < 10) {
              month = `0${month + 1}`;
            } else {
              month = `${month + 1}`;
            }
            if (day < 10) {
              day = `0${day}`;
            }
            const todayDate = `${year}${month}${day}`;
            return [todayDate, weekday];
        },
        checkTmrDate() {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            let day = tomorrow.getDate();
            let month = tomorrow.getMonth();
            const year = tomorrow.getFullYear();
            const weekday = tomorrow.getDay();
            if (month + 1 < 10) {
                month = `0${month + 1}`;
            } else {
                month = `${month + 1}`;
            }
            if (day < 10) {
              day = `0${day}`;
            }
            const tomorrowDate = `${year}${month}${day}`;
            return [tomorrowDate, weekday];
        },
        isNative() {
            return Capacitor.isNativePlatform();
        }
    }
}
</script>

<template>
    <TopBar />
    <div :class="isNative() ? 'pt-32' : 'pt-24'">
        <router-view></router-view>
    </div>
    <AppMenu />
</template>

<style>

</style>
