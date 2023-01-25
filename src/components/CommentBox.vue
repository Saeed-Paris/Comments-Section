<script setup lang="ts">
import UnknownAvatar from "@/components/UnknownAvatar.vue"
import type { IComment } from "@/types"
const props = defineProps<{
    discussion: IComment
}>()
</script>

<template>
    <div>
        <div>
            <img v-if="discussion.user.avatar" :src="discussion.user.avatar" :alt="`${discussion.user.name}'s avatar'`">
            <UnknownAvatar v-else />
            <div>
                <p>{{ discussion.user.name }}</p>
                <p>{{ discussion.text }}</p>
            </div>
            <div><button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none">
                        <g clip-path="url(#clip0_2_4613)">
                            <path d="M8 44H10V24C8.855 24 8 24 8 24C5.8 24 4 25.8 4 28V40C4 42.2 5.8 44 8 44Z"
                                fill="black" />
                            <path
                                d="M14 44H32.43C35.73 44 39.153 41.3 40.038 38L43.789 24C44.673 20.7 42.697 18 39.397 18C39.397 18 35 18 32 18C29 18 29.872 15 29.872 15L30.796 11.552C31.65 8.364 29.741 5.058 26.553 4.204C26.039 4.066 25.52 4 25.01 4C22.361 4 19.921 5.774 19.205 8.446L15.841 21C15.841 21 15.392 22.579 14 23.445V44Z"
                                fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2_4613">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg></button>
                <button v-if="discussion.replies?.length">Reply</button>
            </div>
        </div>
        <template v-if="discussion.replies">
            <CommentBox v-for="reply in discussion.replies" :key="reply.id" :discussion="reply" />
        </template>
    </div>
</template>

<style scoped>

</style>