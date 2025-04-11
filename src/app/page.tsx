"use client";

import RestaurantItem from "@/components/restaurant-item/restauran-item";
import SkeletonCard from "@/components/skeleton/skeleton-card";
import { useDebounce } from "@/hooks/useDebounce";
import { trpc } from "@/utils/trpc";
import { Restaurant } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState<string>()
  const {data: restaurantResponse, isLoading} = trpc.restaurant.getRestaurants.useQuery({keyword});
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 1000)

  useEffect(() => {
    setKeyword(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    if (restaurantResponse === undefined) return

    const results: Restaurant[] = [];
    for (let i = 0; i < restaurantResponse.length; i++) {
      const item = restaurantResponse[i];
      const res: Restaurant = {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        rating: item.rating,
        ratingCount: item.ratingCount,
        category: item.category,
        city: item.city,
        priceRange: item.priceRange,
        isFavorite: item.isFavorite,
        featuredText: item.featuredText,
        featuredIcon: item.featuredIcon,
        createdAt: new Date(item.createdAt),
      }

      results.push(res)
    }

    setRestaurants(results)
  }, [restaurantResponse])

  const handleSearch = (value: string) => {
    setInputValue(value)
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-1" >
          Search
        </label>
        <input
          type="text"
          placeholder="input your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-[20] gap-y-[20] bg-[#F7F8F9] p-4">
        {isLoading && (
           <div className="w-[300px] h-[150px]">
            <SkeletonCard></SkeletonCard>
          </div>
        )}
        {!isLoading && restaurants.length > 0 && restaurants?.map((item) => (
          <RestaurantItem key={item.id} restaurant={item}></RestaurantItem>
        ))}
        {!isLoading && restaurants.length == 0 && (
          <div className="text-center py-8 text-gray-500">
            There is no results
          </div>
        )}
      </div>
    </>
  );
}
