import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const revalidate = 7200;
export const dynamicParams = true;
const getPost = (slug: string) =>
  unstable_cache(
    () =>
      prisma.post.findUnique({
        where: {
          slug: slug,
          published: true,
          Category: {
            name: "Psychology",
          },
        },
        include: { user: true, Subcategory: true },
      }),
    [`post-${slug}`],
    { tags: [`post-${slug}`, "user"] }
  )();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug: slug, published: true },
  });

  const title = post?.title || "Indian Psychology";
  const description = post?.description || "Indian Psychology";
  const image = post?.thumbnail || "";
  const url = `https://${process.env.NEXT_PUBLIC_API_URL}/${slug}`;

  return {
    title: { absolute: title },
    description,
    keywords: post?.tags,
    openGraph: {
      title,
      description,
      url,
      siteName: "Indian Psychology",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/opengraph-image.jpg`
    ),
    alternates: {
      canonical: url,
    },
  };
}

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const article = await getPost(slug);

  if (!article) {
    return notFound();
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.thumbnail || "opengraph-image.jpg",
    author: {
      "@type": "Person",
      name: "Aman Negi",
    },
    datePublished: new Date(article.createdAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_API_URL}/${article.slug}`,
    },
  };
  let date = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const wordsPerMinute = 250;
  const wordCount = article.content.trim().split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  return (
    <>
      <div className="w-full max-h-fit min-h-dvh   flex flex-col  items-center px-4 sm:px-6 md:px-8 bg-amber-50">
        <div className="w-full flex-1 max-w-4xl mt-10 py-5 md:py-20 ">
          <div className="relative w-full">
            <div className="tag3 bg-amber-50 min-w-53 h-10 absolute right-0 rounded-4xl rounded-tr-none">
              <span className="text-xs absolute top-0 py-2  text-center w-full z-50">
                <b>Category :</b>
                {article?.Subcategory.name}
              </span>
            </div>
            <div className="absolute  md:min-w-90 min-w-50 flex items-center space-x-2 bg-amber-50 rounded-4xl  bottom-0 px-2 py-5  tag">
              <img
                src={article.user.image || "/doctor.jpg"}
                alt=""
                className=" rounded-full w-10 h-10"
              />
              <p>
                <span className="text-xs ">
                  <b>Author</b>
                </span>
                <span className="block text-sm">{article.user.name}</span>
              </p>
            </div>
            <img
              alt={article.title}
              src={article.thumbnail || "opengraph-image.jpg"}
              className="mb-10 w-full h-50 rounded-4xl object-cover"
            />
          </div>
          <div className="text-center text-xs w-full p-5 text-gray-600">
            <small className="italic">{date}</small>
            <p className="inline pl-5">| {readTimeMinutes} min Read</p>
          </div>
          <article
            className="prose prose-sm sm:prose md:prose-base lg:prose-lg max-w-none article"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></article>
        </div>
        <div className="py-10 ">
          <ul className="flex space-x-5 items-center *:cursor-pointer">
            <li>
              <a href="/about-us">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <button className="bg-lime-300 px-2 py-1 rounded">
                <a href="/get-in-touch">Get In Touch</a>
              </button>
            </li>
          </ul>
        </div>
        <Script
          id="application/ld+json"
          type="application/ld+json"
          suppressHydrationWarning
          key="blog-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p className="text-xs text-center   py-2 w-full  ">
          © {new Date().getUTCFullYear()} IndianPsychology.xyz | All rights
          reserved.
        </p>
      </div>
    </>
  );
};

export default PostPage;
