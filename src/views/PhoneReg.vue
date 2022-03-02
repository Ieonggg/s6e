<template>
  <div class="md:container mb-8 mx-7 rounded-3xl md:mx-auto mt-10 shadow-2xl">
    <div class=" flex flex-row justify-start px-10 md:px-20 pt-20 pb-10 space-x-8 md:space-x-28 items-center">
      <button @click="back()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
      </button>
      <p class="text-xl">綁定電話號碼 | Phone Number Registration</p>
    </div>

    <hr class="h-1 bg-gray-300 text-gray-300" />

    <div v-if="status === 'ok'">
      <div class="flex flex-col items-center justify-center">
        <p class="text-xl text-center mt-8">請選擇區碼</p>
        <p class="text-xl text-center mb-8">並輸入您的電話號碼</p>
        <p class="text-xl text-center mb-2 w-full">區碼</p>
        <select class="mx-8 mb-8" v-model="areaCode" required>
          <option value="+853">+853 澳門</option>
          <option value="+852">+852 香港</option>
          <option value="+86">+86 中國</option>
        </select>
        <p class="text-xl text-center mb-2">電話號碼</p>
        <input class="text-center border-2 border-gray-400 rounded-xl" type="tel" name="userPhoneInput" v-model="phoneNumber"/>

        <button class="standard-btn mb-8 bg-blue-500 text-white" @click="vaildation()">
          下一步
        </button>
        <div class="pb-8 text-center text-2xl font-bold" v-if="warning === 'missing'">
          <p class="text-red-600">！請輸入您的電話號碼！</p>
        </div>
        <div class="pb-8 text-center text-2xl font-bold" v-if="warning === 'wrongFormat'">
          <p class="text-red-600">！電話號碼格式錯誤！</p>
        </div>
        <div class="pb-8 text-center text-2xl font-bold" v-if="warning === 'unknown'">
          <p class="text-red-600">！未知的錯誤！</p>
        </div>

        <div class="pb-8 text-center text-2xl font-bold" v-if="warning === 'tooManyAttempt'">
          <p class="text-red-600">！請求驗證碼次數過多，請稍後再試！</p>
        </div>
      </div>
    </div>

    <div v-else-if="status === 'menuSelect'">
      <div class="flex flex-col items-center justify-center p-8">
        <p class="text-xl">你已綁定以下電話號碼</p>
        <p class="text-gray-500">{{ phoneNumber }}</p>

        <button class="standard-btn bg-gray-300 text-black" @click="this.phoneNumber = ''; this.status = 'ok'">
          修改電話號碼
        </button>
        <!-- <button
          class="shadow-lg rounded-md py-2 px-8 bg-gray-300 text-black"
        >
          取消綁定
        </button> -->
      </div>
    </div>

    <div v-else-if="status === 'inputCode'">
      <div class="flex flex-col items-center justify-center">
        <p class="text-xl text-center mt-8">驗證碼已發送至</p>
        <!-- <p class="text-xl text-center">您的電話號碼</p> -->
        <p class="text-xl text-center mb-2">
          {{ this.areaCode + this.phoneNumber }}
        </p>
        <p class="text-xl text-center">請檢查短信</p>
        <p class="text-xl text-center mb-2">並在下方輸入驗證碼</p>

        <input class="text-center border-2 border-gray-400 rounded-xl" type="text" v-model="verifyCode"/>

        <button class="standard-btn mb-4 bg-blue-500 text-white" @click="codeHelper()">
          驗證並連結
        </button>
        <button class="shadow-lg rounded-md py-2 px-8 mb-8 bg-gray-300 text-black" @click="this.status = 'ok'">
          修改電話號碼
        </button>
        <div class="pb-8 text-center text-2xl font-bold" v-if="warning === 'codeMissing'">
          <p class="text-red-600">！請輸入驗證碼！</p>
        </div>
        <div class="pb-8 text-center text-2xl font-bold" v-if="warning === 'codeWrongFormat'">
          <p class="text-red-600">！驗證碼錯誤！</p>
        </div>
      </div>
    </div>

    <div v-else-if="status === 'confirmNumberPage'">
      <div class="flex flex-col items-center justify-center">
        <p class="text-xl text-center mt-8">如下列資訊沒有問題</p>
        <p class="text-xl text-center">請按一下「繼續」</p>
        <p class="text-xl text-center mb-8">否則請按一下「返回」</p>
        <p class="text-xl text-center mb-2 w-full">區碼</p>
        <p class="text-xl text-center mb-2">{{ areaCode }}</p>

        <p class="text-xl text-center mb-2">電話號碼</p>
        <p class="text-xl text-center">{{ phoneNumber }}</p>

        <button class="standard-btn mb-4 bg-blue-500 text-white" @click="submitForVerify()">
          繼續
        </button>
        <button class="shadow-lg rounded-md py-2 px-8 mb-8 bg-gray-300 text-black" @click="this.status = 'ok'">
          返回
        </button>
      </div>
    </div>

    <div v-else-if="status === 'notLogin'">
      <StatusText content="請先登入" />
    </div>

    <div v-else-if="status === 'submitting'">
      <StatusText content="資料處理中" />
    </div>

    <div v-else-if="status === 'end'">
      <StatusText content="完成" />
    </div>

    <div v-else>
      <StatusText content="資料載入中" />
    </div>
  </div>
</template>

<script>
import StatusText from "../../components/StatusText.vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

export default {
  name: "PhoneReg",
  props: ['destination'],
  components: {
    StatusText,
  },
  data() {
    return {
      status: "else",
      areaCode: "+853",
      phoneNumber: "",
      warning: "clear",
      verifyCode: "",
      uid: "",
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
        firebase.firestore().collection('users').doc(user.uid).get().then((result) => {
          if (result.data().phoneNum === '' || result.data().phoneNum === undefined) {
            this.status = "ok";
          } else {
            this.phoneNumber = result.data().phoneNum;
            this.status = 'menuSelect';
          }
        })
        
      } else {
        this.status = "notLogin";
      }
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    submitForVerify() {
      this.status = "submitting";
      var sendCode = firebase.functions().httpsCallable("sendVerifyCodeViaSMS");
      sendCode({ phoneNumber: `${this.areaCode}${this.phoneNumber}` })
        .then((result) => {
          if (result.data.status === "pending") {
            this.status = "inputCode";
          } else {
            this.status = "ok";
            this.warning = "unknown";
          }
        })
        .catch((error) => {
          if (error.code === 500) {
            this.status = "ok";
            this.warning = "tooManyAttempt";
          } else {
            this.status = "ok";
            //console.log(error.code);
            this.warning = "unknown";
          }
        });
    },
    vaildation() {
      if (this.phoneNumber !== "" && this.areaCode !== "") {
        this.status = "submitting";
        var checkPhoneNumFormat = firebase
          .functions()
          .httpsCallable("checkPhoneNumberFormat");
        checkPhoneNumFormat({
          phoneNumber: `${this.areaCode}${this.phoneNumber}`,
        }).then((result) => {
          if (result.data.status === "exists") {
            this.status = "confirmNumberPage";
            this.warning = "clear";
          } else {
            this.status = "ok";
            this.warning = "wrongFormat";
          }
        });
      } else {
        this.warning = "missing";
      }
    },
    codeHelper() {
      if (this.verifyCode !== "") {
        this.status = 'submitting';
        var checkVerifyCode = firebase
          .functions()
          .httpsCallable("checkVerifyCode");
        checkVerifyCode({
          phoneNumber: `${this.areaCode}${this.phoneNumber}`,
          code: this.verifyCode,
          uid: this.uid,
        }).then((result) => {
          if (result.data.checkStatus === 'success') {
            this.status = 'end';
            setTimeout(() => {
              this.$router.push("/profile");
            }, 3000);
          } else {
            this.status = 'inputCode';
            this.warning = 'codeWrongFormat';
          }
        });
      } else {
        this.warning = 'codeMissing'
      }
    },
  },
};
</script>

<style>
</style>