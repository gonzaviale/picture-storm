import React from "react";

const HeroImage: React.FC = () => {

    return (
        <img
            className="hero-background filter brightness-75 transition-opacity duration-500"
            src="/hero-image-png.png"
            alt="Hero image"
            loading="lazy"
        />
    );
};

export default HeroImage;
