<template>
  <div class="min-h-screen relative " style="background-color: #15151d;">
    <CookiePopup v-if="!cookieAccepted" />
    <Navbar class="sticky top-0" :user-id="userId" />
    <NuxtLayout>
      <NuxtLoadingIndicator color="#c084fc" />
      <NuxtPage />
    </NuxtLayout>
    <Footer class="mt-10"></Footer>
    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-100 ease-out"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <button @click="goToTop" v-show="showButton" id="goToTopButton"
        class="fixed z-50 p-3 bg-white rounded-full bottom-4 right-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-3 h-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  data() {
    return {
      userId: '',
      cookieAccepted: false,
      setTimeoutVar: null,
      showButton: false
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
    window.addEventListener('scroll', () => {
      this.showButton = window.scrollY > 100
    });

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

    },
    goToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}

</script>