import {Post} from "@/src/type/Post";
import {PostFormHeader} from "@/src/components/posts/PostFormHeader";

type PostFormProps = {
    form: {
        title: string;
        text: string;
        editId: number | null;
        setTitle: (value: string) => void;
        setText: (value: string) => void;
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
}

export function PostForm({form, actions, state} : PostFormProps){
    return (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <PostFormHeader editId={form.editId} />

            <form onSubmit={actions.handleSubmit} className="space-y-4">
                <input
                    value={form.title}
                    onChange={(e) => form.setTitle(e.target.value)}
                    placeholder="Заголовок"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                />

                <textarea
                    value={form.text}
                    onChange={(e) => form.setText(e.target.value)}
                    placeholder="Текст поста минимум 10 символов"
                    className="min-h-36 w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                />

                <div className="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        disabled={state.isSubmitting}
                        className="flex cursor-pointer items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {state.isSubmitting && (
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        )}

                        {form.editId
                            ? state.updating
                                ? "Обновление..."
                                : "Обновить пост"
                            : state.creating
                                ? "Создание..."
                                : "Добавить пост"}
                    </button>

                    {form.editId && (
                        <button
                            type="button"
                            onClick={actions.cancelEdit}
                            disabled={state.isSubmitting}
                            className="cursor-pointer rounded-2xl border border-slate-700 px-6 py-3 font-bold text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Отменить редактирование
                        </button>
                    )}
                </div>
            </form>
        </section>
    )
}