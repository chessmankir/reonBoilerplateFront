"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Post } from "@/src/type/Post";
import {Comments} from "@/src/components/comments/Comments";
import {DetailPost} from "@/src/components/posts/DetailPost";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/posts`;

export default function PostDetailPage() {
    const { id } = useParams<{ id: string }>();

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
                <DetailPost post={post} />
                <Comments />
            </div>
        </main>
    );
}