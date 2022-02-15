<template>
    <router-link tag="button" :to="{ name: appDestination }" class="flex flex-col justify-center items-center space-y-2 mx-2 w-32 h-32 md:w-48 md:h-48 mb-6 shadow-2xl rounded-3xl transition ease-in-out duration-500 transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 md:h-16 w-12 md:w-16" fill="none" viewBox="0 0 24 24" stroke="white">
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