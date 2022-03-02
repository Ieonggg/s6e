<template>
  <div class="md:container mb-8 mx-7 rounded-3xl md:mx-auto mt-10 shadow-2xl">
    <div class="flex flex-row justify-start px-10 md:px-20 pt-20 pb-10 space-x-8 md:space-x-28 items-center">
      <router-link tag="button" :to="{ name: 'Home' }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
      </router-link>
      <p class="text-xl font-productSans">座位表 | Seat Plan</p>
      
    </div>
  </div>
  <div class="flex flex-col justify-center items-center container p-8 mx-auto my-10 shadow-2xl rounded-3xl">
    <table class="text-3xl w-full text-center font-productSans table-fixed">
      
      <SeatPlanRow />
     <caption class="m-8" align='bottom'>
        黑板 Black Board
      </caption>
    </table>
  </div>
</template>

<script>
import SeatPlanRow from '../components/SeatPlanRow.vue';

export default {
  name: "SeatPlan",
  components: {
      SeatPlanRow
  },
  mounted() {
    //console.log(this.status)
  }
};
</script>

<style>
</style>