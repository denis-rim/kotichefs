import { Fragment, useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { Tab } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { fetchProduct, ProductModel } from "../services/api/handlers/product";
import Button from "../components/shared/Button";

// const product = {
//   name: "Application UI Icon Pack",
//   version: { name: "1.0", date: "June 5, 2021", datetime: "2021-06-05" },
//   price: "$220",
//   description:
//     "The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.",
//   highlights: ["Salt", "Water", "Oil"],
//   imageSrc:
//     "https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg",
//   imageAlt:
//     "Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.",
// };
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>I just clicked on buy button, and now I'm millionaire!</p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this button is. Everything looks so consistent and each letter is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single button this good, so it's a steal at this price.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};
const faqs = [
  {
    question: "Ho to pay?",
    answer: "Just click the button, goddamn.",
  },
  {
    question: "Can I?",
    answer: "Yes.",
  },
  // More FAQs...
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function ProductPage() {
  const [product, setProduct] = useState<ProductModel | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    getProductById();
  }, [productId]);

  async function getProductById() {
    if (productId) {
      const response = await fetchProduct(productId);
      console.log(response);
      setProduct(response.data);
    } else return {};
  }

  if (!product) {
    return <div>No Data</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto py-4 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:row-end-1 lg:col-span-4">
            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={`${product.name} photo`}
                className="object-center object-cover"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <p className="text-m text-gray-600 mt-5">
                  Price: {product.price} EUR
                </p>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product?.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
              </div>
            </div>

            <p className="text-gray-500 mt-6">{product.description}</p>

            <div className="mt-10">
              <Button appearance="primary-big">Buy {product.price} €</Button>
            </div>

            <div className="border-t border-gray-200 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>
              <div className="mt-4 prose prose-sm text-gray-500">
                <ul role="list">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-900">By Chef</h3>
              Chef Avatar and info goes here
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-yellow-600 text-yellow-600"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm"
                      )
                    }
                  >
                    Customer Reviews
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-yellow-600 text-yellow-600"
                          : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                        "whitespace-nowrap py-6 border-b-2 font-medium text-sm"
                      )
                    }
                  >
                    FAQ
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="-mb-10">
                  <h3 className="sr-only">Customer Reviews</h3>

                  {reviews.featured.map((review, reviewIdx) => (
                    <div
                      key={review.id}
                      className="flex text-sm text-gray-500 space-x-4"
                    >
                      <div className="flex-none py-10">
                        <img
                          src={review.avatarSrc}
                          alt=""
                          className="w-10 h-10 bg-gray-100 rounded-full"
                        />
                      </div>
                      <div
                        className={classNames(
                          reviewIdx === 0 ? "" : "border-t border-gray-200",
                          "py-10"
                        )}
                      >
                        <h3 className="font-medium text-gray-900">
                          {review.author}
                        </h3>
                        <p>
                          <time dateTime={review.datetime}>{review.date}</time>
                        </p>

                        <div className="flex items-center mt-4">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review.rating > rating
                                  ? "text-yellow-400"
                                  : "text-gray-300",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {review.rating} out of 5 stars
                        </p>

                        <div
                          className="mt-4 prose prose-sm max-w-none text-gray-500"
                          dangerouslySetInnerHTML={{ __html: review.content }}
                        />
                      </div>
                    </div>
                  ))}
                </Tab.Panel>

                <Tab.Panel as="dl" className="text-sm text-gray-500">
                  <h3 className="sr-only">Frequently Asked Questions</h3>
                  {faqs.map((faq) => (
                    <Fragment key={faq.question}>
                      <dt className="mt-10 font-medium text-gray-900">
                        {faq.question}
                      </dt>
                      <dd className="mt-2 prose prose-sm max-w-none text-gray-500">
                        <p>{faq.answer}</p>
                      </dd>
                    </Fragment>
                  ))}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
