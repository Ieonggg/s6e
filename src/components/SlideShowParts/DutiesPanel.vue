<template>
  <div
    class="
      flex flex-col
      items-center
      shadow-2xl
      mt-10
      mb-8
      mx-7
      p-12
      rounded-3xl
      space-y-6
    "
  >
    <p class="text-3xl rainbow-text font-bold sm:text-4xl">{{ title }}</p>
    <p class="text-3xl sm:text-3xl font-productSans">{{ dutyStudent1 }}</p>
    <p class="text-3xl sm:text-3xl font-productSans">{{ dutyStudent2 }}</p>
  </div>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/firestore'
//import Home from '../views/Home.vue';

export default {
  name: "SlideShowDutiesPanel",
  data() {
    return {
      title: "本日值日生",
      dutyStudent1: "(暫未有安排)",
      dutyStudent2: "(暫未有安排)",
      
    };
  },
  mounted() {
    //console.log(this.showPanel)
    let [currentDate] = this.$root.checkTodayDate();
    currentDate = Number(currentDate);
    const currentTime = this.$root.checkTime();
    if (currentTime >= 2100) {
      this.title = "明日值日生";
      let [tomorrowDate, tomorrowWeekDay] = this.$root.checkTmrDate();
      tomorrowDate = Number(tomorrowDate);
      // console.log(tomorrowDate)
      const dutiesRef = firebase.firestore().collection("duties");
      dutiesRef.onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().date === tomorrowDate) {
            this.dutyStudent1 = doc.data().student1;
            this.dutyStudent2 = doc.data().student2;
          }
        });
      });
    } else {
          this.title = "本日值日生";
          const dutiesRef = firebase.firestore().collection("duties");
          dutiesRef.onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              if (doc.data().date === currentDate) {
                this.dutyStudent1 = doc.data().student1;
                this.dutyStudent2 = doc.data().student2;
              }
            });
          });
    }
  },
};
</script>

<style>
</style>