import React from "react";

const Page = () => {
  return (
    <div className="w-full h-fit flex flex-col items-center px-4  md:px-8 bg-amber-50">
      <div className="w-full h-full max-w-5xl mt-10 py-20 flex flex-col items-center">
        <div className="w-full aspect-[640/1685] max-w-full">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSc3OuuUL-RuECOFkEd_Xy3HRDN8qZTvbouU7HavedvozKH0Lg/viewform?embedded=true"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
