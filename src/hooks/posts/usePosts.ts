"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Post } from "@/src/type/Post";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/posts`;

export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const [editId, setEditId] = useState<number | null>(null);

    const [loadingPosts, setLoadingPosts] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [error, setError] = useState("");

    const isSubmitting = creating || updating;

    async function fetchPosts() {
        try {
            setLoadingPosts(true);
            setError("");

            const res = await fetch(API_URL);

            if (!res.ok) {
                throw new Error("Не удалось загрузить посты");
            }

            const data: Post[] = await res.json();
            setPosts(data);
        } catch {
            setError("Ошибка загрузки постов");
            toast.error("Не удалось загрузить посты");
        } finally {
            setLoadingPosts(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!title.trim() || !text.trim()) {
            setError("Заполни заголовок и текст");
            toast.error("Заполни заголовок и текст");
            return;
        }

        const body = {
            title,
            text,
        };

        try {
            setError("");

            if (editId) {
                setUpdating(true);

                const res = await fetch(`${API_URL}/${editId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!res.ok) {
                    throw new Error("Ошибка обновления поста");
                }

                toast.success("Пост успешно обновлён");
            } else {
                setCreating(true);

                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!res.ok) {
                    throw new Error("Ошибка создания поста");
                }

                toast.success("Пост успешно добавлен");
            }

            setTitle("");
            setText("");
            setEditId(null);

            await fetchPosts();
        } catch {
            const message = editId
                ? "Не удалось обновить пост"
                : "Не удалось создать пост";

            setError(message);
            toast.error(message);
        } finally {
            setCreating(false);
            setUpdating(false);
        }
    }

    function startEdit(post: Post) {
        setEditId(post.id);
        setTitle(post.title);
        setText(post.text);
        setError("");

        toast.info("Режим редактирования включён");
    }

    function cancelEdit() {
        setEditId(null);
        setTitle("");
        setText("");
        setError("");

        toast.info("Редактирование отменено");
    }

    async function deletePost(id: number) {
        try {
            setDeletingId(id);
            setError("");

            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Ошибка удаления");
            }

            toast.success("Пост удалён");

            await fetchPosts();
        } catch {
            setError("Не удалось удалить пост");
            toast.error("Не удалось удалить пост");
        } finally {
            setDeletingId(null);
        }
    }

    return {
        data: {
            posts,
        },

        form: {
            title,
            text,
            editId,
            setTitle,
            setText,
        },

        state: {
            loadingPosts,
            creating,
            updating,
            deletingId,
            error,
            isSubmitting,
        },

        actions: {
            fetchPosts,
            handleSubmit,
            startEdit,
            cancelEdit,
            deletePost,
        },
    };
}