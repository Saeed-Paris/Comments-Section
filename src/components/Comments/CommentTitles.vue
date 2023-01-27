<script setup lang="ts">
import { timestampToRelative } from "@/utiles"
import type { IUser } from "@/types"

const props = defineProps<{
    user: IUser,
    timeStamp: number
}>()
</script>

<template>
    <div>
        <span class="comment-username">{{ props.user.name }}</span>
        <span class="comment-relative-time">{{ timestampToRelative(props.timeStamp) }}</span>
    </div>
</template>
