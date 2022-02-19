<template>
    <router-link tag="button" :to="{ name: appDestination }" class="flex flex-col justify-center items-center flex-wrap md:space-y-2 mx-2 w-24 h-24 md:w-28 md:h-28 mb-6 shadow-2xl rounded-3xl transition ease-in-out duration-500 transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 md:h-8 w-6 md:w-8" fill="none" viewBox="0 0 24 24" stroke="white">
            <slot></slot>
        </svg>
        <p class="text-white md:text-2xl font-bold md:font-normal">{{ appName }}</p>
    </router-link>
</template>

<script>
export default {
    name: 'MiniApplication',
    props: ['appName', 'appDestination'],
}
</script>

<style>

</style>