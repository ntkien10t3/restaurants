import { trpc } from "@/utils/trpc";
import { Restaurant } from "@prisma/client"
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
  
  return <>
    <div className="flex flex-col w-[300px]">
      <div className="flex items-center justify-center rounded-e-lg w-[300px] h-[150px]">
        <Image src={restaurant.image} width={100} height={100} alt="" className="justify-center"></Image>
      </div>
      <p className="text-orange-300">{restaurant.featuredText}</p>
      <div className="flex justify-between">
        <p className="font-bold">{restaurant.name}</p>
        <div className="flex gap-x-[2px] text-[14px] text-[#666666]">
          <p>{restaurant.rating}</p>
          <p>({restaurant.ratingCount})</p>
        </div>
      </div>
      <p className="text-[14px] text-[#333333]">{restaurant.description}</p>
      <p className="text-[16px] text-[#333333]"><span className="uppercase">{restaurant.city}</span> - <span>{restaurant.category}</span> - <span>{restaurant.priceRange}</span></p>
      <button
        onClick={handleClick}
        className="mt-2 inline-flex items-center px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
      >
        {restaurant.isFavorite ? 'Favorited ❤️' : 'Add to Favorite'}
      </button>
    </div>
  </>
}