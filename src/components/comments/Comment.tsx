import {Comment as CommentType} from "@/src/type/Comment";
import {CommentStar} from "@/src/components/comments/CommentStar";
import {CommentRating} from "@/src/components/comments/CommentRating";
import {CommentActions} from "@/src/components/comments/CommentActions";
import {CommentAuthor} from "@/src/components/comments/CommentAuthor";
import {CommentText} from "@/src/components/comments/CommentText";

type CommentCardProps = {
    comment: CommentType;
    commentId: string;

    comments: {
        state: {
            deletingId: string | null;
        };

        actions: {
            startEdit: (comment: CommentType) => void;
            deleteComment: (id: string) => void;
        };
    };
};

export function Comment({comment, commentId, comments}: CommentCardProps) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <CommentAuthor author={comment.author} />
                    <CommentRating rating={comment.rating} />
                </div>
                <CommentActions commentId={commentId} comment={comment} comments={comments} />
            </div>
            <CommentText text={comment.text} />
        </div>
    );
}