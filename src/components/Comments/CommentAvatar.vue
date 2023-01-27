<script setup lang="ts">
import UnknownAvatar from '@/components/svgs/UnknownAvatar.vue'
const props = defineProps<{
    depth: number,
    avatar?: string,
    username: string,
    isLongEnough: boolean
}>()
</script>

<template>
    <div class="comment-avatar">
        <p v-if="props.depth == 0 && isLongEnough"></p>
        <img v-if="avatar" loading="lazy" :src="avatar" :alt="`${username}'s avatar'`">
        <UnknownAvatar v-else />
    </div>
</template>

<style scoped>

</style>