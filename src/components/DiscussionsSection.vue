<script setup lang="ts">
import CommentBox from "@/components/CommentBox.vue"
import type { IComment } from "@/types"
const props = defineProps<{
    discussions: IComment[]
}>()
</script>

<template>
    <CommentBox v-for="discussion in props.discussions" :key="discussion.id" :discussion="discussion" />
</template>

<style scoped>

</style>