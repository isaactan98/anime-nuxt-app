<template>
    <div class=" min-h-screen bg-black">
        <h1 class="text-white">Test</h1>
        <p>Test page</p>
    </div>
</template>

<script>
export default {
    mounted() {
        // check path if localhost:3000 else redirect to home
        if (process.env.NODE_ENV === "development") {
            console.log("dev")
        } else {
            console.log("prod")
            this.$router.push("/")
        }
    }
}
</script>

<style></style>