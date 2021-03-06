import React from "react";
import { StarIcon } from "@heroicons/react/solid";

import { classNames } from "../../utils/utils";

function Rating({
  rating,
  withReview = false,
}: {
  rating: number;
  withReview?: boolean;
}) {
  return (
    <div className="mt-2 mb-2 flex flex-col items-start">
      <p className="sr-only">{rating} out of 5 stars</p>
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((ratingArr) => (
          <StarIcon
            key={ratingArr}
            className={classNames(
              rating > ratingArr ? "text-yellow-400" : "text-gray-200",
              "flex-shrink-0 h-5 w-5"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      {withReview && <p className="mt-1 text-sm text-gray-500">3 reviews</p>}
    </div>
  );
}

export default Rating;
