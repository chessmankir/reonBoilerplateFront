import {Post as PostType} from "@/src/type/Post";
import {useRouter} from "next/navigation";

type PostProps = {
    post: PostType;

    form: {
        editId: number | null;
    };

    state: {
        deletingId: number | null;
    };

    actions: {
        startEdit: (post: PostType) => void;
        deletePost: (id: number) => void;
    };
};

export function Post({post,form,  state,  actions, }: PostProps) {
    const router = useRouter();
    return(
        <article
            key={post.id}
            className={`rounded-2xl border p-5 shadow-lg transition ${
                form.editId === post.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-800 bg-slate-950 hover:border-blue-500/50"
            }`}
        >
            <div className="mb-4 flex items-start justify-between gap-4">
                <h3
                    onClick={() => router.push(`/posts/${post.id}`)}
                    className="cursor-pointer text-xl font-bold transition hover:text-blue-400"
                >
                    {post.title}
                </h3>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => actions.startEdit(post)}
                        title="Редактировать"
                        className="cursor-pointer rounded-xl bg-blue-500/10 p-2 text-blue-300 transition hover:bg-blue-500 hover:text-white"
                    >
                        ✏️
                    </button>

                    <button
                        onClick={() => actions.deletePost(post.id)}
                        disabled={state.deletingId === post.id}
                        title="Удалить"
                        className="cursor-pointer rounded-xl bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {state.deletingId === post.id ? (
                            <span className="block h-5 w-5 animate-spin rounded-full border-2 border-red-300 border-t-transparent" />
                        ) : (
                            "🗑️"
                        )}
                    </button>
                </div>
            </div>

            <p className="mb-5 whitespace-pre-wrap text-slate-300">
                {post.text.length > 60
                    ? `${post.text.slice(0, 60)}...`
                    : post.text}
            </p>
        </article>
    )
}