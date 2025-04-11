import { trpc } from "@/utils/trpc";
import { Restaurant } from "@prisma/client"
import { Heart, Star } from "lucide-react";
import Image from "next/image"

interface RestaurantItemProps {
  restaurant: Restaurant
}

export default function RestaurantItem({restaurant}: RestaurantItemProps) {
  const utils = trpc.useUtils();
  const mutation = trpc.restaurant.addFavorite.useMutation({
    onSuccess: () => {
      utils.restaurant.getRestaurants.invalidate();
    },
  });

  const handleClick = () => {
    mutation.mutate(restaurant);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg w-[300px]">
      <Image
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
        width={150}
        height={150}
      />
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{restaurant.name}</h3>
          <button
            onClick={() => handleClick()}
            className={`p-1 rounded-full transition hover:cursor-pointer ${
              restaurant.isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart fill={restaurant.isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < restaurant.rating ? "fill-current" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">{restaurant.rating}/5</span>
        </div>
      </div>
    </div>
  );
}