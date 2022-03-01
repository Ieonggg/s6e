<template>
  <div class="md:container mb-8 mx-7 rounded-3xl md:mx-auto mt-10 shadow-2xl ">
    <div
      class="
        flex flex-row
        px-10
        md:px-20
        py-10
        items-center
        justify-evenly space-x-0
      "
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
      <button>
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="flex flex-col md:flex-row flex-wrap justify-center container md:mx-auto ">
  <div
    class="md:w-5/12 mb-8 mx-7 md:mx-3 rounded-3xl shadow-2xl"
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
</template>

<script>
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "Duties",
  data() {
    return {
      records: [],
      userLevel: 'guest'
    };
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
  method: {
    toRegistation() {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        if (userSnap.data().group === 'root' || userSnap.data().group === 'admin' || userSnap.data().group === 'subAdmin') {
          
        } else {

        }
      } else {
        // No user is signed in.
      }

    }
  }
};
</script>

<style>
</style>