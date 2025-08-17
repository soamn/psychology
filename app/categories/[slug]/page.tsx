import prisma from "@/lib/prisma";
import InvertedGrid from "@/components/invertedGrid";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { LucideGhost } from "lucide-react";

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
    <div className="w-full h-fit px-6 md:px-8 bg-amber-50">
      <div className="py-24 space-y-20">
        {grids.map((posts, idx) => (
          <InvertedGrid key={idx} posts={posts} />
        ))}
      </div>
    </div>
  );
}
