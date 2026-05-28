type CommentAuthorProps = {
    author: string;
}

export function CommentAuthor({author} : CommentAuthorProps){
    return (
        <p className="font-semibold text-white">
            {author}
        </p>
    )
}