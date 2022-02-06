<template>
  <p>{{ isOpen }}</p>
  <div class="fixed bottom-0 w-full h-5/6 flex flex-col justify-start items-center shadow-lg transition-all ease-in-out duration-300 " :class="isOpen ? '' : 'translate-y-[72vh]'">
    <button class="bg-white flex justify-center items-center w-full h-20 rounded-t-full" v-on:click="isOpen ? isOpen = false : isOpen = true">
      <div :class="isOpen ? 'hidden' : ''"> 
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </div>
      <div :class="isOpen ? '' : 'hidden'">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
    <div class="w-full h-full bg-white">

    </div>
  </div>
</template>

<script>
export default {
  name: "AppMenu",
  data() {
    return {
      isOpen: false,
    }
  }
};
</script>

<style>
</style>