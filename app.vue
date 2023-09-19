<template>
  <div class="min-h-screen " style="background-color: #15151d;">
    <CookiePopup v-if="!cookieAccepted" />
    <Navbar class="sticky top-0" :user-id="userId" />
    <NuxtLayout>
      <NuxtLoadingIndicator color="#c084fc" />
      <NuxtPage />
    </NuxtLayout>
    <Footer class="mt-10"></Footer>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  data() {
    return {
      userId: '',
      cookieAccepted: false,
      setTimeoutVar: null
    }
  },
  mounted() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        sessionStorage.setItem('userId', user.uid)
        this.userId = user.uid
      }
    });
    if (localStorage.getItem('cookie-accepted')) {
      this.cookieAccepted = true
    }
    this.checkInactive();
    this.resetTimeout();
  },
  methods: {
    checkInactive() {

      document.addEventListener('mousemove', this.resetTimeout);
      document.addEventListener('mousedown', this.resetTimeout);
      document.addEventListener('keydown', this.resetTimeout);
      document.addEventListener('touchmove', this.resetTimeout);
      document.addEventListener('touchstart', this.resetTimeout);

    },
    resetTimeout() {
      // console.warn('resetTimeout');
      // 1 hour timeout
      const timeoutMinute = 60 * 60 * 1000;
      clearTimeout(this.setTimeoutVar);
      this.setTimeoutVar = setTimeout(() => {
        console.warn('refreshing');
        window.location.href = '/';
      }, timeoutMinute);

    }
  }
}

</script>