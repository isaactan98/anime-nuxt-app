<template>
  <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-300 ease-out"
              leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-[999]">
      <div class="bg-slate-800 p-8 rounded-3xl text-white shadow-md mx-5">
        <a href="https://www.buymeacoffee.com/iztan98" target="_blank">
          <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"
              style="height: 60px !important;width: 217px !important;"></a>
        <button @click="accept"
                class="block mx-auto mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: 'Buymecoffee pop up',
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    const storedDate = localStorage.getItem('buymecoffee');
    if (!storedDate) {
      this.buymeacoffee = true;
    } else {
      const setDate = new Date(storedDate);
      const currentDate = new Date();
      const timeDifference = currentDate - setDate; // Difference in milliseconds
      const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert to hours

      if (hoursDifference >= 24) {
        this.buymeacoffee = true;
      } else {
        this.buymeacoffee = false;
      }
    }
    this.show = this.buymeacoffee;
    console.log(`show is `, this.buymeacoffee)
  },
  methods: {
    accept() {
      this.show = false;
      localStorage.setItem('buymecoffee', new Date().toISOString());
      this.$emit('showPopup', false);
    },
  },
}
</script>