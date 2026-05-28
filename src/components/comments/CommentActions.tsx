import {Comment} from "@/src/type/Comment";

type CommentActionsProps = {
    commentId: string;

    comment: Comment;

    comments: {
        state: {
            deletingId: string | null;
        };

        actions: {
            startEdit: (comment: Comment) => void;
            deleteComment: (id: string) => void;
        };
    };
};

export function CommentActions({
                                   commentId,
                                   comment,
                                   comments,
                               }: CommentActionsProps) {
    return (
        <div className="flex gap-2">
            <button
                onClick={() =>
                    comments.actions.startEdit(comment)
                }
                className="cursor-pointer rounded-xl bg-blue-500/10 px-3 py-2 text-blue-300 transition hover:bg-blue-500 hover:text-white"
            >
                ✏️
            </button>

            <button
                onClick={() =>
                    comments.actions.deleteComment(commentId)
                }
                disabled={
                    comments.state.deletingId === commentId
                }
                className="cursor-pointer rounded-xl bg-red-500/10 px-3 py-2 text-red-300 transition hover:bg-red-500 hover:text-white disabled:opacity-60"
            >
                {comments.state.deletingId === commentId
                    ? "..."
                    : "🗑️"}
            </button>
        </div>
    );
}