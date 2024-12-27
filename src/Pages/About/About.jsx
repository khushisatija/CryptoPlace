import React from 'react';
import './About.css';
import profileImage from '../../assets/profile_image.jpg'; // Replace with your image path

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Me</h1>
      <div className="about-content">
        <div className="profile-image-container">
          <img src={profileImage} alt="Khushi" className="profile-image" />
        </div>
        <div className="text-content">
          <p>
            Hi, I'm Khushi! I'm a passionate software developer specializing in front-end technologies like React, JavaScript, and CSS. I enjoy building interactive and visually appealing user interfaces.
          </p>
          <p>
            My journey in tech started with a love for problem-solving, leading me to pursue a degree in Information Technology. I'm committed to creating digital solutions that not only meet user needs but exceed expectations.
          </p>
          <p>
            I believe in continuous learning and am always eager to collaborate with others to bring innovative projects to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
