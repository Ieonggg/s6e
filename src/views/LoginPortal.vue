<template>
    <div class="md:container mb-8 mx-7 rounded-3xl md:mx-auto mt-10 shadow-2xl">
    <div
      class="flex flex-row justify-evenly px-10 md:px-20 py-10 items-center">
      <router-link
        tag="button"
        :to="{ name: 'Home' }"
        :class="procedingCheck ? 'hidden' : ''"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
      </router-link>
      <p class="text-xl font-productSans">登入</p>
      <router-link tag="button" :to="{ name: 'Home' }" :class="procedingCheck ? 'hidden' : ''">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      </router-link>
    </div>

    <hr class="h-1 bg-gray-300 text-gray-300" />

    <div class="flex flex-col flex-wrap items-center pb-10 md:pt-0 md:px-52">
      <p class="text-xl mt-10" v-if="procedingLogin" :class="procedingCheck ? 'hidden' : ''">
        正在登入
      </p>

      <button class="standard-btn bg-gray-300 text-black" @click="signInWithGoogleLocal()" v-else>
        用谷歌登入
      </button>
      <p class="pt-8 px-8 text-center text-gray-400" :class="procedingLogin ? 'hidden' : ''">使用以上任一方式登入，即代表你同意本系統的<a href="" class="text-blue-500 underline" v-on:click="this.$router.push('/Privacy');">隱私權保護政策</a>。</p>
      <p class="text-xl mt-10" v-if="procedingCheck">正在檢查</p>
    </div>
  </div>
</template>

<script>
import { Capacitor } from '@capacitor/core';
import { getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { cfaSignIn } from "quahk-capacitor-firebase-auth";

export default {
    name: 'LoginPortal',
    data() {
        return {
            procedingLogin: true,
            procedingCheck: false,
        }
    },
    mounted() {
        
        const auth = getAuth();
        
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.procedingLogin = true;
                this.procedingCheck = true;
                const db = getFirestore();
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setDoc(doc(db, 'users', user.uid), {
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email,
                        uid: user.uid,
                    }, { merge: true })
                    this.$router.push("/Profile");
                } else {
                    setDoc(doc(db, 'users', user.uid), {
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email,
                        uid: user.uid,
                        group: "regular",
                        realIdentity: "未實名",
                    }, { merge: false })
                    this.$router.push("/Profile");
                }
            } else {
                this.procedingLogin = false;
            }
        })
    },
    methods: {
        async signInWithGoogleLocal() {
            
            this.procedingLogin = true;
            if (Capacitor.getPlatform() === 'ios') {
                cfaSignIn("google.com").subscribe(function (user) {
          });
            } else {
                const provider = new GoogleAuthProvider();
                auth.useDeviceLanguage();
                signInWithRedirect(auth, provider);
      }
      // cfaSignIn("google.com").subscribe(function (user) {
      //   //return console.log(user.displayName);
        
      // });
    },
    }
}
</script>

<style>

</style>