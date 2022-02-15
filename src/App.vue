<script>
import AppMenu from './components/AppMenu.vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
export default {
  name: 'App',
  components: {
        AppMenu
    }
}
</script>

<template>
    <router-view></router-view>
    <AppMenu />
</template>

<style>

</style>
