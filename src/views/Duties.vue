<template>
  <div class="md:container mb-8 mx-7 rounded-3xl md:mx-auto mt-10 shadow-2xl bg-white">
    <div
      class=" flex flex-row px-10 md:px-20 py-10 items-center justify-evenly space-x-0"
    >
      <router-link tag="button" :to="{ name: 'Home' }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
      </router-link>
      <p class="text-xl font-productSans">值日生 | Duties</p>
      <button @click="toRegistation()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
      </button>
    </div>
  </div>
  <div class="flex flex-col md:flex-row flex-wrap justify-center container md:mx-auto">
  <div
    class="md:w-5/12 mb-8 mx-7 md:mx-3 rounded-3xl shadow-2xl bg-white"
    v-for="record in records"
    :key="record"
  >
    <div class="p-8 font-productSans space-y-3">
      <p class="text-3xl">{{ record.date }}</p>
      <p>值日生1：{{ record.student1 }}</p>
      <p>值日生2：{{ record.student2 }}</p>
      <p>狀態：{{ record.status }}</p>
      <details>
        <summary>評分</summary>
        <p class="m-2">擦黑板：{{ record.performance['wipeBoard'] }}</p>
        <p class="m-2">揼垃圾：{{ record.performance['throwRubbish'] }}</p>
        <p class="m-2">抹枱：{{ record.performance['deskCleaning'] }}</p>
        <p class="m-2">掃地：{{ record.performance['floorSweeping'] }}</p>
      </details>
      <details>
        <summary>備註</summary>
        <p class="m-2">擦黑板：{{ record.comments['wipeBoard'] }}</p>
        <p class="m-2">揼垃圾：{{ record.comments['throwRubbish'] }}</p>
        <p class="m-2">抹枱：{{ record.comments['deskCleaning'] }}</p>
        <p class="m-2">掃地：{{ record.comments['floorSweeping'] }}</p>
        <p class="m-2">其他：{{ record.comments['others'] }}</p>
      </details>
      <p>評分者：{{ record.ratingAdmin }}</p>
    </div>
  </div>
  </div>
  <TransitionRoot appear :show="notPermitDialog" as="template">
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
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium text-center leading-6 text-black"
                >
                  提示
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-center text-black">此功能只供主席及班長使用</p>
                </div>

                <div class="mt-4 flex items-center justify-evenly">
                  <button type="button" class=" inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" @click="notPermitDialog = false">
                    好
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>

<script>
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import NoticeDialog from '../components/NoticeDialog.vue';
import StandardDialogBtn from '../components/StandardDialogBtn.vue';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle,} from "@headlessui/vue";

export default {
  name: "Duties",
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    NoticeDialog,
    StandardDialogBtn
  },
  data() {
    return {
      records: [],
      notPermitDialog: false
    }
  },
  mounted() {
    const db = getFirestore();
    
    const recordsRef = query(collection(db, 'duties'), orderBy("date", "desc"));
    // firebase.firestore().collection("duties").orderBy("date", "desc");
    onSnapshot(recordsRef, (snapshot) => {
      let records = [];
      snapshot.forEach((doc) => {
        records.push({ ...doc.data(), id: doc.id });
        // console.log(doc.data().performance['wipeBoard'])
      });

      this.records = records;
      // console.log(records);
    });
  },
  methods: {
    async toRegistation() {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          if (userSnap.data().group === 'root' || userSnap.data().group === 'admin' || userSnap.data().group === 'subAdmin') {
            this.$router.push('/Duites/Registation');
          } else {
            this.notPermitDialog = true;
          }
        } else {
          this.notPermitDialog = true;
        }
      } else {
        this.notPermitDialog = true;
      }
    },
  }
};
</script>

<style>
</style>