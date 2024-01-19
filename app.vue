<template>
  <SpeedInsights />
  <div class="relative " style="background-color: #15151d; min-height: 100svh;">
    <CookiePopup v-if="!cookieAccepted" />
    <Navbar class="sticky top-0" :user-id="userId" />
    <NuxtLayout>
      <NuxtLoadingIndicator color="#c084fc" />
      <NuxtPage class=" relative" />
    </NuxtLayout>
    <Footer class="mt-10"></Footer>
    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-100 ease-out"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <button @click="goToTop" v-show="showButton" id="goToTopButton"
        class="fixed z-50 bg-black rounded-full bottom-4 right-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class=" w-10 h-10 rotate-180 text-white">
          <path fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

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
    localStorage.setItem('server', 'gogoanime')
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
      // 2 hour timeout
      const timeoutMinute = 2 * 60 * 60 * 1000;
      clearTimeout(this.setTimeoutVar);
      this.setTimeoutVar = setTimeout(() => {
        alert('You have been inactive for 2 hour. Page will be refreshed.');
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