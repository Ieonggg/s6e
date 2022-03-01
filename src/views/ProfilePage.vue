<template>
    <div class="md:container mb-8 mx-7 rounded-3xl md:mx-auto mt-10 shadow-2xl">
    <div class="flex flex-row justify-start px-10 md:px-20 py-10 space-x-8 md:space-x-28 items-center">
      <router-link tag="button" :to="{ name: 'Home' }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
      </router-link>
      <p class="text-xl font-productSans">個人資料 | Profile</p>
    </div>

    
    <div v-if="status === 'ok'">
        <hr class="h-1 bg-gray-300 text-gray-300" />
        <div class="p-8" v-for="user in users" :key="user">
        <div class="flex flex-col items-center justify-center">
          <div class="mb-6 p-1 rounded-full bg-gradient-to-b from-pink-500 via-red-500 to-yellow-500">
            <div class="p-1 bg-white rounded-full">
              <img v-bind:src="user.photoURL" alt="User Photo" class="rounded-full"/>
            </div>
          </div>
          <p class="text-2xl rainbow-text font-bold">{{ user.displayName }}</p>
          <p class="text-gray-500 mb-6">{{ user.realIdentity }}</p>
          <p class="text-xl">電郵地址</p>
          <p class="text-gray-500 mb-6">{{ user.email }}</p>
          <p class="text-xl">電話號碼</p>
          <p class="text-gray-500">{{ user.phoneNum ? user.phoneNum : '未綁定' }}</p>
          <router-link tag="a" :to="{ name: 'Home' }" class="text-blue-500 underline ">
            {{ !user.phoneNum ? '點我去綁定！' : '修改/取消綁定' }}
          </router-link>
        </div>
      </div>
    </div>

    <TransitionRoot appear :show="notLogin" as="template">
      <Dialog as="div">
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen px-14 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
              <DialogOverlay class="fixed inset-0" />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
              <div class=" inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
                <DialogTitle as="h3" class="text-lg font-medium text-center leading-6 text-black">
                  提示
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-center text-black">請先登入</p>
                </div>

                <div class="mt-4 flex items-center justify-evenly">
                  <button type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" @click="notLogin = false;">
                    繼續
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle,} from "@headlessui/vue";

export default {
    name: 'ProfilePage',
    components: {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogOverlay,
        DialogTitle,
    },
    data() {
        return {
            status: 'loading',
            users: [],
            notLogin: false
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                let userInfo = [];
                const db = getFirestore();
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    // console.log(userSnap.data());
                    userInfo.push({ ...userSnap.data(), id: userSnap.id });
                    this.users = userInfo;
                    this.status = 'ok';
                } else {
                    this.notLogin = true;
                }
            } else {
                this.notLogin = true;
            }
        })
    }
}
</script>

<style>

</style>