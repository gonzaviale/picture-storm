import React from "react";

const HeroImage: React.FC = () => {

    return (
        <img
            className="hero-background filter brightness-75 transition-opacity duration-500"
            src="https://images.unsplash.com/photo-1682316953238-f1520b80618f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero image"
            loading="lazy"
        />
    );
};

export default HeroImage;
