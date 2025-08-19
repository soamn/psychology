import prisma from "@/lib/prisma";
import InvertedGrid from "@/components/invertedGrid";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { LucideGhost } from "lucide-react";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subcategoryId = Number(slug);

  if (isNaN(subcategoryId)) {
    return notFound();
  }
  const getPosts = () =>
    unstable_cache(
      () =>
        prisma.post.findMany({
          where: { subcategoryId, published: true },
          include: { Subcategory: true, user: true },
          orderBy: { createdAt: "desc" },
        }),
      [`${subcategoryId}`],
      { tags: ["posts", "user"] }
    )();

  const allPosts = await getPosts();

  if (allPosts.length < 1) {
    return (
      <div className="p-10 bg-amber-50 h-screen flex flex-col items-center justify-center">
        <LucideGhost width={300} height="auto" />
        No posts under this category
        <a href="/" className="underline">
          Return to home
        </a>
      </div>
    );
  }
  const first = allPosts[0];
  const grids: (typeof allPosts)[] = [];
  const chunkSize = 5;
  const overlap = 2;

  for (let i = 0; i < allPosts.length; i += chunkSize - overlap) {
    const chunk = allPosts.slice(i, i + chunkSize);
    if (chunk.length > 0) {
      grids.push(chunk);
    }
  }

  return (
    <>
      <div className="w-full hidden md:block h-fit  px-8 bg-amber-50">
        <div className="py-24 space-y-20">
          {grids.map((posts, idx) => (
            <InvertedGrid key={idx} posts={posts} />
          ))}
        </div>
      </div>
      <div className="md:hidden  h-screen px-6  py-20 w-full bg-amber-50">
        <div className="w-full  h-60 px-1  flex flex-col mb-8">
          <div className="relative h-full md:hidden">
            <Link href={`/${first.slug}`}>
              <img
                src={first.thumbnail || "/opengraph-image.jpg"}
                alt=""
                className="absolute w-full h-full object-cover rounded-2xl"
              />

              <div className="absolute w-full bottom-0  px-1 py-2 flex flex-col space-y-1  ">
                <span className="text-[10px] px-2 py-1 bg-sky-300 w-fit rounded">
                  {first.Subcategory.name}
                </span>
                <h1 className=" line-clamp-2 text-xl font-medium">
                  {first.title}
                </h1>
              </div>
            </Link>
          </div>
          <div className="h-fit">
            <span className="text-[10px] text-gray-500">
              by <b className="text-black">{first.user.name}</b> 🕙{" "}
              <span>{new Date(first.createdAt).getDate()}</span>/
              <span>{new Date(first.createdAt).getMonth()}</span>/
              <span>{new Date(first.createdAt).getFullYear()}</span>
            </span>
            <p className="text-xs text-gray-400 line-clamp-3">
              {first.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col h-fit space-y-10 mb-8">
          {allPosts.slice(1).map((post, key) => (
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
      </div>
    </>
  );
}
