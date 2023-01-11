<template>
    <div>
        <!-- video player -->

    </div>
</template>

<script lang="ts">
export default {
    mounted() {
        const route = useRoute();
        var id = route.params.watch;

        console.log(id)
    },
}
</script>

<style>

</style>