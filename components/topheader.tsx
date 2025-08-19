import prisma from "@/lib/prisma";
import React from "react";

const TopHeader = async () => {
  const categories = await prisma.subcategory.findMany({
    where: { categoryId: 1 },
    take: 5,
  });
  return (
    <div className="p-4 w-screen  z-50 absolute hidden md:block">
      <ul className=" flex justify-evenly text-xs">
        {categories.map((cat, key) => (
          <li key={key}>
            <a className=" visited:underline" href={`/categories/${cat.id}`}>
              {cat.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopHeader;
