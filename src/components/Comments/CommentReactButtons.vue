<script setup lang="ts">
import { useDiscussionsStore } from '@/stores/Discussions';
import { computed, nextTick } from 'vue'
import LikeSvg from '../svgs/LikeSvg.vue';


const props = defineProps<{
    isParent: boolean,
    id: number
    iLikedIt: boolean,
    likes: number
}>()
const store = useDiscussionsStore()
function toggleLike(id: number): void {
    store.toggleLike(id)
}
let parentID = computed(() => store.parentID)
async function newReply(id: number) {
    store.parentID == id ? store.parentID = null : store.parentID = id;
    let element = document.querySelector(`.comment-${store.parentID}`);
    let lastChildren = element?.children[element?.childElementCount - 1]
    if (lastChildren) {
        var headerOffset = 100;
        var elementPosition = lastChildren.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
        await nextTick()
        //@ts-ignore
        document.querySelector('.reply-text')?.focus()
    }

}
</script>

<template>
    <div>
        <button @click="toggleLike(props.id)" :class="{ 'active-btn': iLikedIt }" class="like-btn">
            <LikeSvg />
            <span>{{ props.likes }}</span>
        </button>
        <button class="reply-btn" v-if="isParent" @click="newReply(props.id)">{{
            parentID == props.id ? 'Cancel' : 'Reply'
        }}</button>

    </div>
</template>
