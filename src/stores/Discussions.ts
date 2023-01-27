import { defineStore } from "pinia";
import type { IComment } from "@/types/index"

interface State {
    lastID: number,
    discussions: IComment[],
    cachedDiscussions: { [key: number]: IComment } | {}
    parentID: number | null,
}
export const useDiscussionsStore = defineStore({
    id: 'Discussions',
    state: (): State => ({
        lastID: 7,
        cachedDiscussions: {},
        discussions: [
            { id: 7, date: 1674754732522, user: { name: "Saeed Jalali", avatar: "https://secure.gravatar.com/avatar/815e75c46480518b8d3b93e371ac2b69?size=50" }, text: "testestest", likes: 4, iLikedIt: false, replies: [] },
            {
                id: 3,
                date: 1672576574000,
                user: {
                    name: "Bessie Cooper",
                    avatar: "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg"
                },
                text: "I think for our second compaign we can try to target a different audience. How does it sound for you?",
                likes: 2,
                iLikedIt: false,
                replies: [
                    {
                        id: 5,
                        date: 1672581014000,
                        user: {
                            name: "Marvin McKinney",
                            avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                        },
                        text: "Yes, that sounds good! I can think about this tomorrow. Then do we plan to start that compaign?",
                        likes: 3,
                        iLikedIt: true,
                    },
                    {
                        id: 6,
                        date: 1672581614000,
                        user: {
                            name: "Bessie Cooper",
                            avatar: "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
                        },
                        text: "We plan to run the compaign on Friday - as far as I know. Do you think you will get this done by Thursday @Marvin?",
                        likes: 0,
                        iLikedIt: false,
                    },
                ]
            },
            {
                id: 2,
                date: 1672232414000,
                user: {
                    name: "Marvin McKinney",
                    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                },
                text: "The first compaign went smoothly. Please make sure to see all attachments with the results to understand the flow.",
                likes: 2,
                iLikedIt: false,
                replies: []
            },
            {
                id: 1,
                date: 1671886814000,
                user: {
                    name: "Savannah Nguyen"
                },
                text: "We have just published the first campaign. Let's see the results in the 5 days and we will iterate on this.",
                likes: 50,
                iLikedIt: true,
                replies: []
            },
        ],
        parentID: null
    }),
    getters: {

    },
    actions: {
        createNewDiscussion(msg: string) {
            this.discussions.unshift({
                id: ++this.lastID,
                date: new Date().getTime(),
                user: {
                    name: "Saeed Jalali",
                    avatar: "https://secure.gravatar.com/avatar/815e75c46480518b8d3b93e371ac2b69?size=50"
                },
                text: msg,
                likes: 0,
                iLikedIt: false,
                replies: []
            })
        },
        createNewReply(msg: string) {
            console.log(this.parentID)
            if (this.parentID) {
                // i could pass index instead of parentID but i didnt bcuz 
                // 1-in real projects we will send a post request to an API and we don't really care about index of comment in array
                // 2- maybe comments can sort based on (likes or most relevant or even newest and oldest) so keeping track of index is not a good approach. 

                //with index
                // this.discussions[index].replies?.unshift({


                this.discussions.find((comment) => comment.id == this.parentID)?.replies?.unshift({
                    id: ++this.lastID,
                    date: new Date().getTime(),
                    user: {
                        name: "Saeed Jalali",
                        avatar: "https://secure.gravatar.com/avatar/815e75c46480518b8d3b93e371ac2b69?size=50"
                    },
                    text: msg,
                    likes: 0,
                    iLikedIt: false,
                })
            }
        },
        toggleLike(id: number) {
            let selectedComment;
            if (id in this.cachedDiscussions) {
                //@ts-ignore
                selectedComment = this.cachedDiscussions[id];
            }
            else {
                const comments = this.discussions

                for (const comment of comments) {
                    if (comment.id === id) {
                        selectedComment = comment
                        break
                    }
                    if (comment.replies)
                        for (const reply of comment.replies) {
                            if (reply.id === id) {
                                selectedComment = reply
                                break
                            }
                        }
                }
                //@ts-ignore
                this.cachedDiscussions[id] = selectedComment;
            }
            if (selectedComment) {
                selectedComment.iLikedIt = !selectedComment.iLikedIt
                selectedComment.iLikedIt ? ++selectedComment.likes : selectedComment.likes--
            }
        }

    }
})