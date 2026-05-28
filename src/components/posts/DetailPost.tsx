import { useRouter } from "next/navigation";
import { Post } from "@/src/type/Post";

type DetailPostProps = {
    post: Post;
};

export function DetailPost({ post }: DetailPostProps) {
    const router = useRouter();

    return (
        <div>
            <button
                onClick={() => router.push("/")}
                className="mb-6 rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
            >
                ← Назад к постам
            </button>

            <h1 className="mt-5 text-4xl font-black">
                {post.title}
            </h1>

            <p className="mt-6 whitespace-pre-wrap text-lg leading-8 text-slate-300">
                {post.text}
            </p>
        </div>
    );
}