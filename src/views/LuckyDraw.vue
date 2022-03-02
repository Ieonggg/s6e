<template>
  <div class="md:container mb-8 mx-7 rounded-3xl md:mx-auto mt-10 shadow-2xl">
    <div class="flex flex-row justify-start px-10 md:px-20 pt-20 pb-10 space-x-8 md:space-x-28 items-center">
      <router-link tag="button" :to="{ name: 'Home' }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
      </router-link>
      <p class="text-xl font-productSans">抽籤 | Lucky Draw</p>
    </div>

    <hr class="h-1 bg-gray-300 text-gray-300" />

    <div class="flex flex-col flex-wrap items-center py-10 md:px-52">
      <div v-if="serviceStatus === 'up'" class="flex flex-col flex-wrap items-center justify-center w-full">
        <p class=" rainbow-text text-5xl md:text-8xl my-10 w-full font-bold font-productSans text-center" id="resultText">
          {{ result }}
        </p>
        <button class=" shadow-lg rounded-md bg-gray-300 text-black font-productSans w-1/2 md:text-3xl py-4 my-5" @click="spin()">
          {{ spinBtnText }}
        </button>
        <div class="flex py-10 items-center justify-center w-full">
          <div class="mr-8 text-gray-700 md:text-2xl font-productSans">中文</div>
          <label for="switchLanguage" class="flex items-center cursor-pointer">
            <!-- toggle -->
            <div class="relative">
              <!-- input -->
              <input id="switchLanguage" type="checkbox" class="sr-only" v-model="switchLanguage"/>

              <!-- line -->
              <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>

              <!-- dot -->
              <div class=" dot absolute w-6 h-6 bg-red-500 rounded-full shadow -left-1 -top-1 transition"></div>
            </div>
            <!-- label -->
            <div class="ml-8 text-gray-700 md:text-2xl font-productSans">
              English
            </div>
          </label>
        </div>
      </div>
      <div v-else-if="serviceStatus === 'down'">
        <p class="text-xl font-bold font-productSans">Out Of Service</p>
      </div>

      <p class="text-xl font-bold font-productSans" v-else>正在檢查</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "luckyDraw",
  data() {
    return {
      langStudents: [],
      students: [],
      result: "你準備好未？",
      serviceStatus: "checking",
      switchLanguage: false,
      spinBtnText: "抽籤！",
    };
  },
  mounted() {
    firebase
      .firestore()
      .collection("tools")
      .doc("luckyDraw")
      .onSnapshot((doc) => {
        this.langStudents = doc.data();
        if (this.switchLanguage === true) {
          this.spinBtnText = "Spin!";
          this.students = this.langStudents.students_eng;
        } else {
          this.spinBtnText = "抽籤！";
          this.students = this.langStudents.students_chi;
        }

        this.students === undefined
          ? (this.serviceStatus = "down")
          : (this.serviceStatus = "up");
      });
  },
  watch: {
    switchLanguage: function () {
      if (this.switchLanguage === true) {
        this.result = "Are You Ready?";
        this.spinBtnText = "Spin!";
        this.students = this.langStudents.students_eng;
      } else {
        this.result = "你準備好未？";
        this.spinBtnText = "抽籤！";
        this.students = this.langStudents.students_chi;
      }
    },
  },
  methods: {
    spin() {
      const students = this.students;
      const total = students.length;
      const selected = Math.floor(Math.random() * total);
      document.getElementById("resultText").classList.remove("rainbow-text");

      for (let i = 0; i < total; i++) {
        setTimeout(
          ((i) => {
            return () => {
              // console.log(data().result)
              this.result = students[i];
              if (i === selected) {
                document
                  .getElementById("resultText")
                  .classList.add("rainbow-text");
              }
            };
          })(i),
          i * 33
        );
        if (i === selected) {
          // code here will execute immediately
          break;
        }
      }
    },
  },
};
</script>

<style>
</style>