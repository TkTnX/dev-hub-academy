import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="container relative heroSection mb-20 md:mb-40">
      <h1
        className="pt-28 text-2xl vsm:text-3xl sm:text-6xl lg:text-7xl font-bold text-center "
        style={{ lineHeight: 1.5 }}
      >
        - Повторить <span className=" text-blue-200">Frontend</span>?
        <br /> - <span className="animatedText">Легко!</span>
      </h1>
    </section>
  );
};

export default Hero;
