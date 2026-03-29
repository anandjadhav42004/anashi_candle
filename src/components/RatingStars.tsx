import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export default function RatingStars({ rating, className = '' }: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < Math.round(rating);
        return <Star key={index} size={14} className={filled ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} />;
      })}
    </div>
  );
}
