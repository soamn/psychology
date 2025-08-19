import React from "react";

const Page = () => {
  return (
    <div className="w-full h-fit flex flex-col items-center px-4  md:px-8 bg-amber-50">
      <div className="w-full h-full max-w-5xl mt-10 py-20 flex flex-col items-center">
        <div className="w-full aspect-[640/1685] max-w-full">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdO50dksWrmRY9xpD7CfcWIKVuDOa01ymh7aAncsnnqlG6QDg/viewform?embedded=true"
            className="w-full  border-0"
            height={600}
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Page;
