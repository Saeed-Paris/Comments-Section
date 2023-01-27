export interface IUser {
    name: string;
    avatar?: string;
}

export interface IComment {
    id: number;
    date: number;
    user: IUser;
    text: string;
    likes: number;
    iLikedIt: boolean;
    replies?: IComment[]; //I moved replies here to have infinit layer of comments of replies
}

// export interface IDiscussion extends IComment {
//     replies: IComment[];
// }

// export interface IProps {
//     comments: IComment[];
// }
