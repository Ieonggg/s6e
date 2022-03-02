<template>
    <div class="md:container mb-8 mx-7 rounded-3xl md:mx-auto mt-10 shadow-2xl">
        <div class="flex flex-row justify-start px-10 md:px-20 py-10 space-x-8 md:space-x-28 items-center">
        <router-link tag="button" :to="{ name: 'Duties' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
            </svg>
        </router-link>
        <p class="text-xl">值日評分表</p>
    </div>

    <div v-if="registrationOpen === 'true'">
    <hr class="h-1 bg-gray-300 text-gray-300" />
      <div class="pt-8 px-8">
        <p class="text-2xl">今日日期：</p>
        <p>{{ todayDate }}</p>
      </div>
      <div class="pt-8 px-8">
        <p class="text-2xl">值日生1：{{ student1 }}</p>
        <p class="text-2xl mt-1">值日生2：{{ student2 }}</p>
      </div>
      <div class="pt-8 px-8" id="performanceBoard">
        <div class="flex flex-row items-center">
          <p class="text-2xl">擦黑板：</p>
          <span class="text-red-600 text-base">[必填]</span>
        </div>
        <select class="my-4 w-full" v-model="performance['wipeBoard']" required>
          <option disabled value="">選擇...</option>
          <option>沒有完成</option>
          <option>做完同無做無分別</option>
          <option>可接受，但要改善</option>
          <option>做得OK</option>
          <option>做得非常好</option>
        </select>
      </div>
      <div class="pt-8 px-8" id="commentBoard">
        <p class="text-2xl">擦黑板 - 備註：</p>
        <textarea v-model="comments['wipeBoard']" class="my-4 w-full font-productSans border-2 rounded-sm border-gray-300"></textarea>
      </div>
      <div class="pt-8 px-8" id="performanceRubbish">
        <div class="flex flex-row items-center">
          <p class="text-2xl">揼垃圾：</p>
          <span class="text-red-600 text-base">[必填]</span>
        </div>
        <select class="my-4 w-full" v-model="performance['throwRubbish']" required>
          <option disabled value="">選擇...</option>
          <option>沒有完成</option>
          <option>做完同無做無分別</option>
          <option>可接受，但要改善</option>
          <option>做得OK</option>
          <option>做得非常好</option>
        </select>
      </div>
      <div class="pt-8 px-8" id="commentRubbish">
        <p class="text-2xl">揼垃圾 - 備註：</p>
        <textarea v-model="comments['throwRubbish']" class="my-4 w-full font-productSans border-2 rounded-sm border-gray-300"></textarea>
      </div>
      <div class="pt-8 px-8" id="performanceDesk">
        <div class="flex flex-row items-center">
          <p class="text-2xl">抹枱：</p>
          <span class="text-red-600 text-base">[必填]</span>
        </div>
        <select class="my-4 w-full" v-model="performance['deskCleaning']" required>
          <option disabled value="">選擇...</option>
          <option>沒有完成</option>
          <option>做完同無做無分別</option>
          <option>可接受，但要改善</option>
          <option>做得OK</option>
          <option>做得非常好</option>
        </select>
      </div>
      <div class="pt-8 px-8" id="commentDesk">
        <p class="text-2xl">抹枱 - 備註：</p>
        <textarea v-model="comments['deskCleaning']" class="my-4 w-full font-productSans border-2 rounded-sm border-gray-300"></textarea>
      </div>
      <div class="pt-8 px-8" id="performanceFloor">
        <div class="flex flex-row items-center">
          <p class="text-2xl">掃地：</p>
          <span class="text-red-600 text-base">[必填]</span>
        </div>
        <select class="my-4 w-full" v-model="performance['floorSweeping']" required>
          <option disabled value="">選擇...</option>
          <option>沒有完成</option>
          <option>做完同無做無分別</option>
          <option>可接受，但要改善</option>
          <option>做得OK</option>
          <option>做得非常好</option>
        </select>
      </div>
      <div class="pt-8 px-8" id="commentFloor">
        <p class="text-2xl">掃地 - 備註：</p>
        <textarea v-model="comments['floorSweeping']" class="my-4 w-full font-productSans border-2 rounded-sm border-gray-300"></textarea>
      </div>
      <div class="p-8" id="commentOthers">
        <p class="text-2xl">其他 - 備註：</p>
        <textarea v-model="comments['others']" class="my-4 w-full font-productSans border-2 rounded-sm border-gray-300"></textarea>
      </div>

      <hr class="h-1 bg-gray-300 text-gray-300" />

      <div class="pt-8 px-8">
        <div class="flex flex-row items-center">
          <p class="text-2xl">最終決定：</p>
          <span class="text-red-600 text-base">[必填]</span>
        </div>
        <select class="my-4 w-full" v-model="decision" required>
          <option disabled value="">請選擇...</option>
          <option>Pass 通過</option>
          <option>Semi-Fail 單一重做</option>
          <option>Fail 重做</option>
          <option>Send to Review 班主席決定</option>
        </select>
      </div>

      <div class="pt-8 px-8" v-if="decision === 'Pass 通過'">
        <div class="flex flex-row items-center">
          <p class="text-2xl">下一次值日生：</p>
          <span class="text-red-600 text-base">[必填]</span>
        </div>
        <select class="my-4 w-full" v-model="nextStudent1" required>
          <option disabled value="">值日生1</option>
          <option v-for="student in students" :key="student">
            {{ student }}
          </option>
        </select>
        <select class="my-4 w-full" v-model="nextStudent2" required>
          <option disabled value="">值日生2</option>
          <option v-for="student in students" :key="student">
            {{ student }}
          </option>
        </select>
      </div>

      <div class="pt-8 px-8" v-if="decision === 'Semi-Fail 單一重做'">
        <div class="flex flex-row items-center">
          <p class="text-2xl">下一次值日生：</p>
          <span class="text-red-600 text-base">[必填]</span>
        </div>
        <select class="my-4 w-full" v-model="nextStudent1" required>
          <option disabled value="">值日生1</option>
          <option>{{ student1 }}</option>
          <option>{{ student2 }}</option>
        </select>
        <select class="my-4 w-full" v-model="nextStudent2" required>
          <option disabled value="">值日生2</option>
          <option v-for="student in students" :key="student">
            {{ student }}
          </option>
        </select>
      </div>

      <div class="pt-8 px-8">
        <div class="flex flex-row items-center">
          <p class="text-2xl">評分者：</p>
        </div>
        <p class="mt-2">{{ identity }}</p>
      </div>

      <div class="p-2 text-center">
        <button class="standard-btn text-white mt-0 mb-8 bg-blue-500" type="submit" @click="this.isConfirmPageOpen = true">提交</button>
      </div>

    </div>

    <!-- <div v-else-if="registrationOpen === 'submitting'">
      <StatusText content="資料提交中" />
    </div>

    <div v-else-if="registrationOpen === 'success'">
      <StatusText content="完成" />
    </div> -->

    <TransitionRoot appear :show="dialogs['rated']" as="template">
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
              <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
                <DialogTitle as="h3" class="text-lg font-medium text-center leading-6 text-black">
                  提示
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-center text-black">本日值日已評等</p>
                </div>

                <div class="mt-4 flex items-center justify-evenly">
                  <button type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" @click="this.noDuties = false; this.$router.push('/duties');">
                    好
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="dialogs['noDuties']" as="template">
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
              <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
                <DialogTitle as="h3" class="text-lg font-medium text-center leading-6 text-black">提示
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-center text-black">本日無值日</p>
                </div>

                <div class="mt-4 flex items-center justify-evenly">
                  <button type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 bordeborder-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 " @click="this.noDuties = false; this.$router.push('/duties');">
                    好
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="dialogs['isConfirmPageOpen']" as="template">
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

              <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
                <DialogTitle as="h3" class="text-lg font-medium text-center leading-6 text-black">
                  提示
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-center text-black">你確定要提交嗎？</p>
                </div>

                <div class="mt-4 flex items-center justify-evenly">
                  <button type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 bord border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" @click="this.isConfirmPageOpen = false">
                    取消
                  </button>
                  <button type="button" class="inline-flex justify-center px-4 py-2 text-sm   font-medium text-blue-900 bg-blue-100 border border-transparent   rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 " @click="this.isConfirmPageOpen = false; submit();">
                    提交
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="dialogs['warning']" as="template">
      <Dialog as="div">
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen px-14 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0" />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
              <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
                <DialogTitle as="h3" class="text-lg font-bold text-center leading-6 text-red-500">
                  警告
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-center text-black">有啲部分未填完</p>
                </div>

                <div class="mt-4 flex items-center justify-center">
                  <button type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" @click="this.warning = false">
                    好
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
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from "@headlessui/vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, query, getDocs, onSnapshot } from "firebase/firestore";

export default {
    name: 'DutiesRegistation',
    components: {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogOverlay,
        DialogTitle
    },
    data() {
        return {
            registrationOpen: "loading",
            docID: "",
            dialogs: { warning: false, isConfirmPageOpen: false, noDuties: false, rated: false },
            identity: "載入中...",
            todayDate: "載入中...",
            student1: "載入中...",
            student2: "載入中...",
            performance: { wipeBoard: "", throwRubbish: "", deskCleaning: "", floorSweeping: "", },
            comments: { wipeBoard: "", throwRubbish: "", deskCleaning: "", floorSweeping: "", others: "", },
            decision: "",
            students: [],
            nextStudent1: "",
            nextStudent2: "",
        }
    },
    mounted() {
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", };
        let d = new Date();
        this.todayDate = d.toLocaleDateString("zh-tw", options);

        
        let [currentDate] = this.$root.checkTodayDate();
        currentDate = Number(currentDate);

        const auth = getAuth();

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const db = getFirestore();
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    if (userSnap.data().group === "regular") {
                        this.$router.push('/Duties');
                    } else {
                        this.identity = userSnap.data().realIdentity;
                        const dutiesRef = query(collection(db, 'duties'));
                        const dutiesSnapshot = await getDocs(dutiesRef);
                        dutiesSnapshot.forEach((doc) => {
                            if (doc.data().date === currentDate) {
                                const data = doc.data();
                                this.docID = doc.id;
                                this.student1 = data.student1;
                                this.student2 = data.student2;
                                if (data.status === "等待評分") {
                                  this.dialogs[noDuties] = false;
                                  this.registrationOpen = "true";
                                } else {
                                  this.dialogs[noDuties] = false;
                                  this.dialogs[rated] = true;
                                }
                            } else if (this.student1 === "載入中..." && this.student2 === "載入中...") {
                                this.dialogs[noDuties] = true;
                            }
                        })

                        const stdRef = doc(db, 'tools', 'luckyDraw');
                        const stdSnap = await getDoc(stdRef);
                        if (stdSnap.exists()) {
                            this.students = stdSnap.data().students;
                        }
                    }
                } else {
                    this.$router.push('/Duties');
                }
            } else {
                this.$router.push('/Duties');
            }
        })

    }
}
</script>

<style>

</style>