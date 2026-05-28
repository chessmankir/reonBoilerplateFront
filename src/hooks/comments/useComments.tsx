"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Comment } from "@/src/type/Comment";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/comments`;

export function useComments(postId: number) {
    const [comments, setComments] = useState<Comment[]>([]);

    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(5);

    const [editId, setEditId] = useState<string | null>(null);

    const [loadingComments, setLoadingComments] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const isSubmitting = creating || updating;

    async function fetchComments() {
        try {
            setLoadingComments(true);

            const res = await fetch(`${API_URL}/post/${postId}`);

            if (!res.ok) {
                throw new Error("Ошибка загрузки комментариев");
            }

            const data = await res.json();
            setComments(data);
        } catch {
            toast.error("Не удалось загрузить комментарии");
        } finally {
            setLoadingComments(false);
        }
    }

    useEffect(() => {
        const loadComments = async () => {
            if (postId) {
                await fetchComments();
            }
        };

        loadComments();
    }, [postId]);

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const trimmedText = text.trim();
        const trimmedAuthor = author.trim();

        if (!trimmedAuthor) {
            toast.error("Введите автора комментария");
            return;
        }

        if (rating < 1 || rating > 5) {
            toast.error("Выберите оценку от 1 до 5");
            return;
        }

        if (rating >= 2 && rating <= 4 && trimmedText.length < 10) {
            toast.error("Для оценки от 2 до 4 текст должен быть минимум 10 символов");
            return;
        }

        const body = {
            postId,
            text: trimmedText,
            author: trimmedAuthor,
            rating: Number(rating),
        };

        try {
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
                    throw new Error("Ошибка обновления");
                }

                toast.success("Комментарий обновлён");
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
                    throw new Error("Ошибка создания");
                }

                toast.success("Комментарий добавлен");
            }

            setText("");
            setAuthor("");
            setRating(5);
            setEditId(null);

            await fetchComments();
        } catch {
            toast.error(
                editId
                    ? "Не удалось обновить комментарий"
                    : "Не удалось добавить комментарий",
            );
        } finally {
            setCreating(false);
            setUpdating(false);
        }
    }

    function getCommentId(comment: Comment) {
        return comment.id ?? comment._id ?? "";
    }

    function startEdit(comment: Comment) {
        setEditId(getCommentId(comment));
        setText(comment.text ?? "");
        setAuthor(comment.author ?? "");
        setRating(comment.rating ?? 5);
    }

    function cancelEdit() {
        setEditId(null);
        setText("");
        setAuthor("");
        setRating(5);
    }

    async function deleteComment(id: string) {
        try {
            setDeletingId(id);

            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Ошибка удаления");
            }

            toast.success("Комментарий удалён");

            await fetchComments();
        } catch {
            toast.error("Не удалось удалить комментарий");
        } finally {
            setDeletingId(null);
        }
    }

    return {
        data: {
            comments,
        },

        form: {
            text,
            author,
            rating,
            editId,
            setText,
            setAuthor,
            setRating,
        },

        state: {
            loadingComments,
            creating,
            updating,
            deletingId,
            isSubmitting,
        },

        actions: {
            fetchComments,
            handleSubmit,
            startEdit,
            cancelEdit,
            deleteComment,
            getCommentId,
        },
    };
}