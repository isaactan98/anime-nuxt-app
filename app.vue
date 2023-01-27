<template>
  <div class="min-h-screen bg-slate-900">
    <Navbar class="sticky top-0" :user-id="userId" />
    <NuxtLayout>
      <NuxtLoadingIndicator />
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
  }
}

</script>