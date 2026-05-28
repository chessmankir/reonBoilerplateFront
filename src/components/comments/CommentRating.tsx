import { CommentStar } from "@/src/components/comments/CommentStar";

type CommentRatingProps = {
    rating: number;
};

export function CommentRating({  rating  }: CommentRatingProps) {
    return (
        <div className="mt-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <CommentStar
                    key={star}
                    star={star}
                    rating={rating}
                />
            ))}

            <span className="ml-2 text-sm text-slate-400">
        {rating}/5
      </span>
        </div>
    );
}