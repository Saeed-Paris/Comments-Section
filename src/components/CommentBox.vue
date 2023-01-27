<script setup lang='ts'>
import UserTitles from '@/components/Comments/CommentTitles.vue'
import type { IComment } from '@/types'
import CommentAvatar from './Comments/CommentAvatar.vue';
import ReactButtonsComp from './Comments/CommentReactButtons.vue';
const props = defineProps<{
    discussion: IComment,
    depth: number, //for keeping track of depth of comment's reply and make margin-left of replies dynamic even for more layer of replies(in this scenario  challenge make us to have only 1 level of replies)
}>()


</script>

<template>
    <div class="discussion-container" :class="{ 'parent-comment': !props.depth }">
        <CommentAvatar :avatar="discussion.user?.avatar" :username="discussion.user.name"
            :is-long-enough="!!discussion.replies?.length" :depth="depth" />
        <div :class="`comment-${discussion.id}`" class="comment">
            <div class="comment-body">
                <UserTitles class="comment-user" :time-stamp="discussion.date" :user="discussion.user" />
                <p>{{ discussion.text }}</p>
                <ReactButtonsComp class="react-btn" :i-liked-it="discussion.iLikedIt" :is-parent="!!discussion.replies"
                    :id="discussion.id" />
            </div>
            <template v-if="discussion.replies">
                <CommentBox :depth="props.depth + 1" class="comment-replies" v-for="reply in discussion.replies"
                    :key="reply.id" :discussion="reply" />
            </template>
        </div>
    </div>
</template>

<style lang="scss">
.active-btn {
    background-color: $secondary-color;

    svg path {
        fill: white;
    }
}


new-discussion-container {
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

.comment-replies {
    margin-left: v-bind('`${props.depth * 2}%`');
    // background-color: $secondary-color;

}

.parent-comment {
    border-top: 1px solid $border-color;
    padding: 20px;
    border-bottom: 1px solid $border-color ;
}

.discussion-container {

    display: flex;
    gap: 2%;

    >div {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }



    .comment {
        width: 100%
    }

    .comment-body {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .react-btn {
            display: flex;
            gap: 8px;

            button {
                border-radius: 10px;
            }

            .reply-btn {
                background-color: transparent;
                padding: 10px 16px;
            }

            .like-btn {
                padding: 3px 16px;
            }
        }

        .comment-user {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;

            span {
                white-space: nowrap;
            }

            .comment-relative-time {
                color: #444
            }

            .comment-username {
                font-size: 18px;
            }
        }



        p {
            overflow-wrap: anywhere;
        }
    }




    .comment-avatar {
        p {
            position: absolute;
            left: 50%;
            border-left: 2px solid $border-color;
            top: 0;
            bottom: 0
        }



        >svg,
        >img {
            @include avatar-maker;
        }
    }

}
</style>