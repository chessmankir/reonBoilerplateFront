import {Post as PostType} from "@/src/type/Post";
import {Post} from "@/src/components/posts/Post";

type PostsProps = {
    data: {
        posts: PostType[];
    };

    state: {
        loadingPosts: boolean;
        deletingId: number | null;
    };

    form: {
        editId: number | null;
    };

    actions: {
        startEdit: (post: PostType) => void;
        deletePost: (id: number) => void;
    };
};

export function Posts({state, data, form, actions}: PostsProps){
    return (
        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Список постов</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Всего постов: {data.posts.length}
                    </p>
                </div>
            </div>

            {state.loadingPosts ? (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-300">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
                    Загружаем посты...
                </div>
            ) : data.posts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center text-slate-400">
                    Постов пока нет. Добавь первый пост ниже.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {data.posts.map((post) => (
                       <Post key={post.id} post={post}  state={state} form={form}  actions={actions} />
                    ))}
                </div>
            )}
        </section>
    )
}