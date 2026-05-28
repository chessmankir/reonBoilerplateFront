"use client";

import { useComments } from "@/src/hooks/comments/useComments";
import { useParams } from "next/navigation";
import {CommentForm} from "@/src/components/comments/CommentForm";
import {Comment} from "@/src/components/comments/Comment";

export function Comments() {
    const { id } = useParams<{ id: string }>();

    const comments = useComments(Number(id));

    return (
        <div className="mt-10 border-t border-slate-800 pt-8">
            <h2 className="text-2xl font-bold">Комментарии</h2>
            <div className="mt-8 space-y-4">
                {comments.state.loadingComments ? (
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-950 p-5 text-slate-300">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
                        Загружаем комментарии...
                    </div>
                ) : comments.data.comments.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-6 text-center text-slate-400">
                        Комментариев пока нет.
                    </div>
                ) : (
                    comments.data.comments.map((comment) => {
                        const commentId =
                            comments.actions.getCommentId(comment);
                        return (
                            <Comment key={commentId} comment={comment} commentId={commentId} comments={comments} />
                        );
                    })
                )}
            </div>
            <CommentForm comments={comments} />
        </div>
    );
}