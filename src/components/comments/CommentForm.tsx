import { Comment } from "@/src/type/Comment";

type CommentsHook = {
    form: {
        text: string;
        author: string;
        rating: number;
        editId: string | null;
        setText: (value: string) => void;
        setAuthor: (value: string) => void;
        setRating: (value: number) => void;
    };

    state: {
        creating: boolean;
        updating: boolean;
        isSubmitting: boolean;
    };

    actions: {
        handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
        cancelEdit: () => void;
    };
};

type CommentFormProps = {
    comments: CommentsHook;
};

export function CommentForm({ comments }: CommentFormProps) {
    return (
        <form onSubmit={comments.actions.handleSubmit} className="mt-5 space-y-4">
            <input
                value={comments.form.author}
                onChange={(e) => comments.form.setAuthor(e.target.value)}
                placeholder="Автор комментария"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => comments.form.setRating(star)}
                        className={`cursor-pointer text-3xl transition hover:scale-110 ${
                            star <= comments.form.rating
                                ? "text-yellow-400"
                                : "text-slate-600"
                        }`}
                    >
                        ★
                    </button>
                ))}

                <span className="ml-2 text-sm text-slate-400">
          {comments.form.rating}/5
        </span>
            </div>

            <textarea
                value={comments.form.text}
                onChange={(e) => comments.form.setText(e.target.value)}
                placeholder="Для оценки 2–4 нужен отзыв минимум 10 символов"
                className="min-h-28 w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={comments.state.isSubmitting}
                    className="cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-bold hover:bg-blue-500 disabled:opacity-60"
                >
                    {comments.form.editId
                        ? comments.state.updating
                            ? "Обновление..."
                            : "Обновить комментарий"
                        : comments.state.creating
                            ? "Добавление..."
                            : "Добавить комментарий"}
                </button>

                {comments.form.editId && (
                    <button
                        type="button"
                        onClick={comments.actions.cancelEdit}
                        className="cursor-pointer rounded-xl border border-slate-700 px-5 py-3 font-bold text-slate-300 hover:bg-slate-800"
                    >
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
}