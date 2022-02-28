<template>
    <div class=" p-0.5 rounded-full bg-gradient-to-b from-pink-500 via-red-500 to-yellow-500">
        <div class="p-0.5 bg-white rounded-full">
            <img v-bind:src="userPhoto" alt="User Photo" class="rounded-full h-[33px]"/>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    name: 'TopBarAccountRing',
    data() {
        return {
            userPhoto: '../assets/user.png'
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.userPhoto = user.photoURL;
                // ...
            } else {
                // User is signed out
                // ...
            }
        });

    }
}
</script>

<style>

</style>