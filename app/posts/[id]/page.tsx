"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Post } from "@/src/type/Post";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/posts`;

export default function PostDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`${API_URL}/${id}`);
            const data = await res.json();
            setPost(data);
            setLoading(false);
        }

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 p-10 text-white">
                <div className="mx-auto max-w-3xl rounded-2xl bg-slate-900 p-6">
                    Загрузка поста...
                </div>
            </main>
        );
    }

    if (!post) {
        return (
            <main className="min-h-screen bg-slate-950 p-10 text-white">
                <div className="mx-auto max-w-3xl rounded-2xl bg-slate-900 p-6">
                    Пост не найден
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
            <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                <button
                    onClick={() => router.push("/")}
                    className="mb-6 rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                    ← Назад к постам
                </button>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
          Пост #{post.id}
        </span>

                <h1 className="mt-5 text-4xl font-black">{post.title}</h1>

                <p className="mt-6 whitespace-pre-wrap text-lg leading-8 text-slate-300">
                    {post.text}
                </p>
            </div>
        </main>
    );
}