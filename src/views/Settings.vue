<template>
  <div class="md:container mb-8 mx-7 rounded-3xl md:mx-auto mt-10 shadow-2xl">
    <div
      class="flex flex-row justify-start px-10 md:px-20 pt-20 pb-10 space-x-8 md:space-x-28 items-center">
      <button @click="back()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
      </button>
      <p class="text-xl font-productSans">設定 | Settings</p>
    </div>

    <hr class="h-1 bg-gray-300 text-gray-300" />

    <div class="flex pt-8 md:py-16 md:px-52 items-center justify-center md:justify-start w-full">
      <label for="switchClassroomMode" class="flex items-center cursor-pointer">
        <!-- toggle -->
        <div class="relative">
          <!-- input -->
          <input id="switchClassroomMode" v-model="classroomModeStatus" type="checkbox" class="sr-only"/>
          <!-- line -->
          <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <!-- dot -->
          <div
            class=" dot absolute w-6 h-6 bg-gray-300 rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <!-- label -->
        <div class="ml-8 text-gray-700 md:text-2xl">課室模式</div>
      </label>
    </div>
    <div class="flex flex-col flex-wrap items-center md:items-start pt-10 md:pt-0 md:px-52">
      <div v-if="loginStatus === 'signedIn'" class="flex flex-col flex-wrap items-center md:flex-row md:justify-center">
        <p class="text-xl">你已登入</p>
        <button class="standard-btn md:mt-0 md:ml-8 bg-blue-500 text-white" @click="signOut">
          登出
        </button>
      </div>
      <div v-else-if="loginStatus === 'signedOut'" class="flex flex-col flex-wrap items-center md:flex-row">
        <p class="text-xl">你尚未登入</p>
        <router-link tag="button" class="standard-btn md:mt-0 md:ml-8 bg-blue-500 text-white" :to="{ name: 'authLogin' }">登入</router-link
        >
      </div>
      <div v-else class="flex flex-col flex-wrap items-center md:flex-row">
        <p class="text-xl">正在檢查</p>
      </div>
    </div>
    <div class="my-10">
      <p class="text-xl font-productSans md:px-52 text-center text-gray-400">
        Quahk S6E
      </p>
      <p class="text-xl font-productSans md:px-52 text-center text-gray-400">
        Version 1.6
      </p>
      <p class="text-xl font-productSans pb-16 text-center md:px-52 text-gray-400">
        Build 1
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth'
import { Capacitor } from '@capacitor/core';
import { cfaSignOut } from "capacitor-firebase-auth";

export default {
  data() {
    //const user = firebase.auth().currentUser;
    //console.log(user)
    return {
      classroomModeStatus: this.$store.state.classroomModeStatus,
      loginStatus: "checking",
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginStatus = "signedIn";
      } else {
        this.loginStatus = "signedOut";
      }
    });
  },
  updated() {
    this.$store.commit("updateClassroomModeStatus", this.classroomModeStatus);
  },
  methods: {
    signOut() {
      if (Capacitor.getPlatform() === 'ios') {
        
        cfaSignOut().subscribe(function () {});
      } else {
        firebase.auth().signOut().then(() => {
    // Sign-out successful.
        }).catch((error) => {
    // An error happened.
          });
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
};
</script>

<style>
</style>