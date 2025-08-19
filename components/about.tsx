import React from "react";

const About = ({ user }: any) => {
  return (
    <>
      <h2 className="text-xl md:text-5xl">About the Author</h2>
      <div className="mt-2 flex flex-col lg:flex-row space-x  w-full h-fit items-center   space-x-4">
        <div className=" w-1/2  rounded-4xl overflow-clip ">
          <img
            src={`${user.image || "doctor.jpg"}`}
            alt=""
            className="w-full  object-cover"
          />
        </div>
        <div className="  h-full flex flex-col w-fit items-center space-y-4">
          <div className="  w-full ">
            <h2 className="md:text-5xl  w-full font-medium mb-5">
              {user.name}
            </h2>
            <p className="text-xs md:text-lg xl:text-xl line-clamp-5">
              {user.about}
            </p>
          </div>
          <div className="mb-5">
            <button className="bg-lime-300 px-2 py-1 rounded">
              <a href="/get-in-touch">Get In Touch</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
