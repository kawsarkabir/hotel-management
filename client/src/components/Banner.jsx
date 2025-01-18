import React from "react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import BannerTitle from "../sheard/BannerTitle";
const Banner = () => {
  return (
    <div className="mt-3 md:mb-0  w-full relative">
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src={banner1}
            className="w-full  md:h-[400px] h-[300px] lg:h-[500px] object-cover rounded-xl"
          />

          <div
            className="absolute mt-[50px] text-center ml-[10px] md:mt-[50px] md:ml-[100px] lg:mt-[150px] lg:ml-[400px]"
            data-aos="fade-down"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <div className="flex mx-auto text-center border"></div>
          </div>
          <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <BannerTitle
              heading={"A Feast Under the Stars"}
              description={
                "Immerse yourself in the enchanting ambiance of open-air street food markets. Enjoy the warm glow of lights, aromatic spices in the air, and the joy of discovering culinary gems that bring people together. From local favorites to international delights, it’s an unforgettable dining experience."
              }
            ></BannerTitle>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src={banner2}
            className="w-full object-cover md:h-[400px] h-[300px] lg:h-[500px] rounded-xl"
          />
          <div className="absolute mt-[50px] text-center ml-[10px] lg:mt-[150px] lg:ml-[0px]"></div>
          <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <BannerTitle
              heading={"Flavors of the Night"}
              description={
                "Dive into the bustling nightlife of street food vendors offering a variety of dishes made fresh before your eyes. From sizzling grills to steaming pots, explore the vibrant energy and mouthwatering creations that make every evening a celebration of taste."
              }
            ></BannerTitle>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src={banner3}
            className="w-full  object-cover md:h-[400px] lg:h-[500px]  h-[300px] rounded-xl"
          />
          <div className="absolute mt-[50px] text-center  lg:mt-[150px] lg:ml-[600px]"></div>
          <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <BannerTitle
              heading={"Savor the Magic of Street Food"}
              description={
                "Discover the heart and soul of culinary traditions at vibrant street food stalls. Each dish, crafted with passion and local ingredients, invites you to experience authentic flavors and unforgettable moments."
              }
            ></BannerTitle>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src={banner4}
            className="w-full h-[300px] object-cover  md:h-[400px] lg:h-[500px] relative rounded-xl"
          />
          <div className="absolute lg:mt-[150px] lg:ml-[300px]"></div>
          <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <BannerTitle
              heading={"Explore the World of Street Food Delights"}
              description={
                "Unleash your taste buds with vibrant street food from bustling markets around the globe. From savory tacos to sizzling barbecue and exotic stir-fried delicacies, each bite tells a story of culture and flavor. Whether its a cozy corner stall or a lively food bazaar there s always an adventure waiting in every dish"
              }
            ></BannerTitle>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
