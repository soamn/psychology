import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import React from "react";

const getfeaturedPosts = () =>
  unstable_cache(
    () =>
      prisma.post.findMany({
        where: {
          featured: true,
          published: true,
          Category: {
            name: "Psychology",
          },
        },
        include: { user: true, Subcategory: true },
        take: 5,
        orderBy: { updatedAt: "desc" },
      }),
    [],
    { tags: ["posts"] }
  )();
const getCategories = () =>
  unstable_cache(
    () =>
      prisma.subcategory.findMany({
        where: {
          Category: {
            name: "Psychology",
          },
        },
        include: {
          Post: {
            where: {
              published: true,
              featured: false,
            },
            include: { Subcategory: true, user: true },
            take: 3,
            orderBy: { updatedAt: "desc" },
          },
        },
      }),
    [],
    { tags: ["category"] }
  )();

const MobileHome = async () => {
  const featuredPosts = await getfeaturedPosts();
  const featuredPost = featuredPosts[0];
  const categories = await getCategories();
  return (
    <div className="md:hidden">
      <div className="w-full h-60 px-1  flex flex-col mb-8">
        <div className="relative h-full md:hidden">
          <Link href={`/${featuredPost.slug}`}>
            <img
              src={featuredPost.thumbnail || "/opengraph-image.jpg"}
              alt=""
              className="absolute w-full h-full object-cover rounded-2xl"
            />

            <div className="absolute w-full bottom-0 px-1 py-2 flex flex-col space-y-1  ">
              <span className="text-[10px] px-2 py-1 bg-sky-300 w-fit rounded">
                {featuredPost.Subcategory.name}
              </span>
              <h1 className=" line-clamp-2 text-xl font-medium">
                {featuredPost.title}
              </h1>
            </div>
          </Link>
        </div>
        <div className="h-fit">
          <span className="text-[10px] text-gray-500">
            by <b className="text-black">{featuredPost.user.name}</b> 🕙{" "}
            <span>{new Date(featuredPost.createdAt).getDate()}</span>/
            <span>{new Date(featuredPost.createdAt).getMonth()}</span>/
            <span>{new Date(featuredPost.createdAt).getFullYear()}</span>
          </span>
          <p className="text-xs text-gray-400 line-clamp-3">
            {featuredPost.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col h-fit space-y-10 mb-8">
        {featuredPosts.slice(1).map((post, key) => (
          <div className="flex flex-col space-y-1" key={key}>
            <Link href={`/${post.slug}`}>
              <div className="w-full flex space-x-4 items-center ">
                <div className="w-1/3  h-full ">
                  <img
                    src={`${post.thumbnail || "/opengraph-image.jpg"}`}
                    className="w-full rounded object-cover"
                    alt=""
                  />
                </div>
                <h2 className="text-2xl line-clamp-3 w-1/2 ">{post.title}</h2>
              </div>
            </Link>

            <span className="text-[10px] text-gray-500">
              by <b className="text-black">{post.user.name}</b> 🕙{" "}
              <span>{new Date(post.createdAt).getDate()}</span>/
              <span>{new Date(post.createdAt).getMonth()}</span>/
              <span>{new Date(post.createdAt).getFullYear()}</span>
            </span>
            <div className="flex-1">
              <p className="line-clamp-2 text-[12px] justify-center text-gray-500">
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {categories.map((cat, key) => (
        <div key={key}>
          {cat.Post.length > 0 && (
            <>
              <h2 className=" text-md mb-2">{cat.name}</h2>
              <div className="flex flex-col h-fit space-y-10 mb-8">
                {cat.Post.map((post, key) => (
                  <div className="flex flex-col space-y-1" key={key}>
                    <Link href={`/${post.slug}`}>
                      <div className="w-full flex space-x-4 items-center ">
                        <div className="w-1/3  h-full">
                          <img
                            src={`${post.thumbnail || "/opengraph-image.jpg"}`}
                            className="w-full rounded object-cover"
                            alt=""
                          />
                        </div>
                        <h2 className="text-2xl  line-clamp-3 w-1/2">
                          {post.title}
                        </h2>
                      </div>
                    </Link>
                    <span className="text-[8px] px-1  bg-sky-300 w-fit rounded">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      by <b className="text-black">{post.user.name}</b> 🕙{" "}
                      <span>{new Date(post.createdAt).getDate()}</span>/
                      <span>{new Date(post.createdAt).getMonth()}</span>/
                      <span>{new Date(post.createdAt).getFullYear()}</span>
                    </span>
                    <div className="flex-1">
                      <p className="line-clamp-2 text-[12px] justify-center text-gray-500">
                        {post.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileHome;
