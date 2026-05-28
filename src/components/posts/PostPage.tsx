"use client";

import { useRouter } from "next/navigation";
import { usePosts } from "@/src/hooks/posts/usePosts";
import {HeaderPost} from "@/src/components/posts/HeaderPost";
import {Posts} from "@/src/components/posts/Posts";
import {PostForm} from "@/src/components/posts/PostForm";

export default function PostsPage() {
    const { data, form, state, actions } = usePosts();
    const router = useRouter();

    return (
        <main className="min-h-screen bg-[#050816] px-4 py-10 text-white">
            <div className="mx-auto max-w-6xl">

                <HeaderPost />
                <Posts data={data} actions={actions} form={form} state={state} />
                <PostForm form={form} state={state} actions={actions} />
            </div>
        </main>
    );
}