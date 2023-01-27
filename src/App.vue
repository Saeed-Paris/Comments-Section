<script setup lang="ts">
import { useDiscussionsStore } from "@/stores/Discussions"
import DiscussionsSection from "@/components/DiscussionsSection.vue"
import { computed } from "vue";
const store = useDiscussionsStore()

let discussions = computed(() => store.getAllDiscussions)

</script>

<template>
  <main>
    <DiscussionsSection :discussions="discussions" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }



  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
