<script setup lang='ts'>
import CommentBox from '@/components/CommentBox.vue'
import { useDiscussionsStore } from '@/stores/Discussions';
import type { IComment } from '@/types'
import { ref, computed } from 'vue';
const props = defineProps<{
    discussions: IComment[]
}>()
let message = ref('')
let replyMessage = ref('')
const store = useDiscussionsStore()
function createNewDiscussion() {
    store.createNewDiscussion(message.value)
    message.value = ''
}

let parentID = computed(() => store.getParentID)
function createReply() {
    store.createNewReply(replyMessage.value)
    store.parentID = null;
    replyMessage.value = ''
}

</script>

<template>

    <template v-if="parentID">
        <Teleport :to="`.comment-${store.parentID}`">
            <div class="new-discussion-container new-reply">
                <div>
                    <img src="https://secure.gravatar.com/avatar/815e75c46480518b8d3b93e371ac2b69?size=50" alt="">
                    <form @keydown.enter.exact.prevent="createReply()">
                        <textarea class="reply-text" rows="4" cols="40" v-model="replyMessage"
                            placeholder="Reply"></textarea>
                    </form>
                </div>
            </div>
        </Teleport>
    </template>
    <div class="new-discussion-container">
        <div>
            <img src="https://secure.gravatar.com/avatar/815e75c46480518b8d3b93e371ac2b69?size=50" alt="">
            <form @keydown.enter.exact.prevent="createNewDiscussion()">
                <textarea rows="4" cols="40" v-model="message" placeholder="Start a discussion"></textarea>
            </form>
        </div>
    </div>
    <CommentBox v-for="discussion in props.discussions" :key="discussion.id" :depth="0" :discussion="discussion" />
</template>

<style lang="scss">
.new-reply {
    background-color: transparent !important;
}

.new-discussion-container {
    padding: 20px;

    div {
        display: flex;
        gap: 12px;
    }

    form {
        padding: 5px 0;
        width: 100%;
        flex: 1;

        textarea {
            width: 100%;
            height: 37px;
            min-height: 30px;
            max-height: 100px;
            resize: none;
            padding: 5px 5px;
            border: 1px solid $border-color;
            background-color: white;
        }
    }

    background-color: $gray-color;

    img {
        @include avatar-maker;

    }
}
</style>