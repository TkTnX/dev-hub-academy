import Image from "next/image";
import React from "react";

const About: React.FC = () => {
  return (
    <section className="container mt-14">
      <h2 className="text-center title-2">О сайте</h2>
      <div className="grid text-center lg:text-left lg:flex my-20 gap-10">
        <Image
          priority
          src="/images/about/img.jpg"
          className="border justify-self-center"
          width={600}
          height={400}
          alt="Компьютер"
        />
        <p className="text-base sm:text-lg md:text-xl">
          <span className="font-bold">Dev Hub Academy</span> - это ваш надежный
          помощник в мире веб-разработки. Мы предлагаем все необходимые ресурсы
          и поддержку, чтобы вы могли освоить и улучшить свои навыки в HTML,
          CSS, JavaScript и других технологиях веб-разработки.
        </p>
      </div>
    </section>
  );
};

export default About;
