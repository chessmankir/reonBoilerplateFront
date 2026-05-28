type CommentStarProps = {
    star: number;
    rating: number;
};

export function CommentStar({  star,   rating  }: CommentStarProps) {
    return (
        <span
            className={`text-lg ${
                star <= rating
                    ? "text-yellow-400"
                    : "text-slate-700"
            }`}
        >
      ★
    </span>
    );
}