import { Post, Subcategory, user } from "@/app/generated/prisma";
import { ArrowUpRight } from "lucide-react";
import React from "react";
type PostWithData = Post & {
  user: user;
  Subcategory: Subcategory;
};
type Props = {
  posts: PostWithData[];
};
const Featured = ({ posts }: Props) => {
  const first = posts[0];
  const second = posts[1] || posts[0];
  const third = posts[2] || posts[0];
  const link1 = posts[3] || posts[0];
  const link2 = posts[4] || posts[0];
  if (!posts[0]) {
    return null;
  }
  const firstTitle = splitTitleByLines(first.title, { totalLines: 2 });
  const secondTitle = splitTitleByLines(second.title, {
    totalLines: 2,
    wordsPerLine: [3],
  });
  const thirdTitle = splitTitleByLines(third.title, { totalLines: 2 });

  return (
    <>
      {/* Grid */}
      <div className="w-full h-[800px]  mb-50 grid grid-cols-2 space-x-2 ">
        {/* First */}
        <div className=" relative rounded-4xl rounded-bl-none rounded-tr-none overflow-hidden">
          <div className=" py-8 px-5 text-2xl absolute bottom-15 bg-amber-50 h-15 w-fit  min-w-60 max-w-75  tag rounded-tr-4xl">
            <span className="text-[12px] absolute top-1 ">
              <span className="block">
                <b>Category :</b>
                {first.Subcategory.name}
              </span>
              <span>
                {new Date(first.createdAt).getDate()}/
                {new Date(first.createdAt).getUTCMonth() + 1}/
                {new Date(first.createdAt).getFullYear()}
              </span>
            </span>

            <h2 className="font-medium">{firstTitle[0]}</h2>
          </div>
          <div className="px-5 py-3 text-2xl absolute bottom-0  bg-amber-50 h-15 min-w-100  w-fit max-w-full tag rounded-tr-4xl">
            <h2 className="font-medium">{firstTitle[1]}</h2>
          </div>
          <div className="bg-amber-50 absolute  right-0 w-25 h-25 flex  rounded-4xl rounded-tl-none rounded-tr-none rounded-br-none items-center justify-center tag2">
            <a
              href={`/${first.slug}`}
              className="bg-amber-200 hover:scale-110 cursor-pointer  transition-all transition-500 rounded-full w-18 h-18 flex items-center justify-center"
            >
              <ArrowUpRight width={50} height={50} stroke="#fffefe" />
            </a>
          </div>
          <img
            src={first.thumbnail || "/opengraph-image.jpg"}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Second */}
        <div className=" grid grid-rows-2 h-full space-y-1 ">
          {/* middle 1 */}
          <div className="bg-lime-200 rounded-4xl relative px-5 z-50 ">
            <div className="bg-amber-50 absolute right-0 w-15 h-15 flex rounded-4xl rounded-tl-none rounded-tr-none rounded-br-none items-center justify-center tag2">
              <a
                href={`/${second.slug}`}
                className="bg-lime-200 hover:scale-110 cursor-pointer transition-all transition-500 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <ArrowUpRight width={20} height={20} stroke="#fffefe" />
              </a>
            </div>
            <div className="p-2">
              <span className="text-sm">
                <b>Category :</b> {second.Subcategory.name} |{" "}
                <span className="px-1">
                  {new Date(second.createdAt).getDate()}/
                  {new Date(second.createdAt).getUTCMonth()}/
                  {new Date(second.createdAt).getFullYear()}
                </span>{" "}
              </span>
              <h2 className="text-4xl font-bold mb-2">
                {secondTitle[0]}
                <br />
                {secondTitle[1]}
                <br />
                {secondTitle[2]}
              </h2>

              <p className="text-sm line-clamp-3"> {second.description}</p>
              <div className="flex flex-col p-2 font-bold">
                <div className="border-t-1  py-3">
                  <a href={`/${link1.slug}`}>{link1.title}</a>
                  <ArrowUpRight className="inline" />
                </div>
                <div className="border-t-1  py-3">
                  <a href={`/${link2.slug}`}>{link2.title}</a>
                  <ArrowUpRight className="inline" />
                </div>
              </div>
            </div>
          </div>
          {/* middle 2*/}
          <div className="bg-amber-50 rounded-4xl rounded-tr-none relative overflow-hidden  ">
            <div className="absolute w-full h-full ">
              <img
                src={`${third.thumbnail || "/opengraph-image.jpg"}`}
                alt=""
              />
            </div>
            <div className="bg-amber-50 absolute right-0 w-15 h-15 flex rounded-4xl rounded-tl-none rounded-tr-none rounded-br-none items-center justify-center tag2">
              <a
                href={`/${third.slug}`}
                className="bg-sky-200 hover:scale-110 cursor-pointer transition-all transition-500 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <ArrowUpRight width={20} height={20} stroke="#fffefe" />
              </a>
            </div>
            <div className=" py-8 px-5 text-2xl absolute bottom-15 bg-amber-50 h-15 w-fit  min-w-60 max-w-75  tag rounded-tr-4xl">
              <span className="text-[12px] absolute top-1 ">
                <span className="block">
                  <b>Category :</b>
                  {third.Subcategory.name}
                </span>
                <span>
                  {new Date(third.createdAt).getDate()}/
                  {new Date(third.createdAt).getUTCMonth()}/
                  {new Date(third.createdAt).getFullYear()}
                </span>
              </span>
              <h1 className="font-medium">{thirdTitle[0]}</h1>
            </div>
            <div className="px-5 py-3 text-2xl absolute bottom-0  bg-amber-50 h-15 min-w-100  w-fit max-w-full tag rounded-tr-4xl">
              <h1 className="font-medium">{thirdTitle[1]}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;

type SplitConfig =
  | {
      totalLines: number;
      wordsPerLine?: never; // can't specify both
    }
  | {
      totalLines: number;
      wordsPerLine: number[]; // must match totalLines or totalLines - 1
    };

function splitTitleByLines(text: string, config: SplitConfig): string[] {
  const words = text.trim().split(/\s+/);
  const chunks: string[] = [];

  if (config.wordsPerLine) {
    // ✅ Check that wordsPerLine length is correct
    if (
      config.wordsPerLine.length !== config.totalLines &&
      config.wordsPerLine.length !== config.totalLines - 1
    ) {
      throw new Error(
        `wordsPerLine length must be either totalLines (${
          config.totalLines
        }) or totalLines - 1 (${config.totalLines - 1})`
      );
    }

    let start = 0;
    config.wordsPerLine.forEach((count, idx) => {
      chunks.push(words.slice(start, start + count).join(" "));
      start += count;
    });

    // last line gets remaining words if array is shorter
    if (config.wordsPerLine.length < config.totalLines) {
      chunks.push(words.slice(start).join(" "));
    }
  } else {
    // Equal distribution except last line
    const perLine = Math.floor(words.length / config.totalLines);
    let start = 0;
    for (let i = 0; i < config.totalLines - 1; i++) {
      chunks.push(words.slice(start, start + perLine).join(" "));
      start += perLine;
    }
    chunks.push(words.slice(start).join(" "));
  }

  return chunks;
}
