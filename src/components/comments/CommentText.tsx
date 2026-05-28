type CommentTextProps = {
    text: string;
}

export function CommentText({text} : CommentTextProps){
    return (
        <p className="mt-4 whitespace-pre-wrap text-slate-300">
            {text || "Без текста"}
        </p>
    )
}