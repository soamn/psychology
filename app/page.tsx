import About from "@/components/about";
import Header from "@/components/header";
import Hero from "@/components/hero";
import InvertedGrid from "@/components/invertedGrid";
import MobileHome from "@/components/mobilehome";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getPosts = () =>
  unstable_cache(
    () =>
      prisma.post.findMany({
        where: { featured: true, published: true },
        include: { user: true, Subcategory: true },
        orderBy: { updatedAt: "desc" },
      }),
    [],
    { tags: ["posts"] }
  )();

const getUser = () =>
  unstable_cache(
    () =>
      prisma.user.findFirst({
        where: { email: `${process.env.NEXT_PUBLIC_EDITOR_EMAIL}` },
      }),
    [],
    { tags: ["user"], revalidate: 300 }
  )();
export default async function Home() {
  const posts = await getPosts();

  let user = await getUser();
  if (!user) {
    user = {
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "",
      email: "",
      password: "",
      roleId: 0,
      image: "",
      emailVerified: true,
      about: "",
    };
  }

  return (
    <>
      <div className="w-screen h-screen md:px-20 md:py-15 ">
        <div
          className="lg:p-10 md:p-8 px-2 md:py-10  w-full      h-full shadow-xl bg-amber-50   md:rounded-4xl relative overflow-y-scroll overflow-clip"
          style={{
            scrollbarWidth: "none",
            scrollBehavior: "smooth",
          }}
        >
          <Header />
          <div className="hidden md:block">
            <div className="flex ">
              <Hero />
              <img
                src="./landingnew.webp"
                alt=""
                className="absolute right-0 top-0   w-1/2 h-full  object-contain  "
              />
            </div>

            <h1 className=" text-5xl mb-2">Top Stories Today</h1>
            <InvertedGrid posts={posts} />
          </div>
          <MobileHome />

          <About user={user} />
          <p className="text-xs text-center lg:hidden py-2 w-full  ">
            © {new Date().getUTCFullYear()} IndianPsychology.xyz | All rights
            reserved.
          </p>
        </div>
      </div>
      <p className="text-xs text-center hidden md:block fixed  bottom-0 py-2 w-full  ">
        © {new Date().getUTCFullYear()} IndianPsychology.xyz | All rights
        reserved.
      </p>
    </>
  );
}
