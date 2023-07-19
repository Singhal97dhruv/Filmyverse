import React from "react";
import "./about.css";
// import { Button, Avatar } from "@material-ui/core";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import GitHubIcon from '@mui/icons-material/GitHub';
// import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';

import { Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';


const About = () => {
  const visitLinkedIn = () => {
    window.location = "https://linkedin.com/in/singhal97";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        {/* <Typography component="h1">About Us</Typography> */}
        <h1>About Us</h1>

        <div>
          <div>
            <div className="profilePicContainer">
              <Avatar className="profilePic"
                style={{ width: "12vmax", height: "12vmax", margin: "2vmax 0" }}
                src="https://res.cloudinary.com/dsk75d0xd/image/upload/v1681936975/avatars/Untitled_design_3_yqasnl.png"
                alt="Founder"
              />
            </div>
            <h2>
            <a href="https://portfolio-singhal97dhruv.vercel.app/" target="_blank">
            Dhruv Singhal
            </a>
            </h2>
            <Button onClick={visitLinkedIn} color="secondary">
              Visit LinkedIn
            </Button>
            <span>
              This website delivers peoples views on the movies they watched recently.
              So that other people get some idea about the movie that would it be worth watching it or not.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <h2>Reach Us</h2>
            <a
              href="https://github.com/Singhal97dhruv"
              target="blank"
            >
              <GitHub className="githubSvgIcon" />
            </a>

            <a href="https://linkedin.com/in/singhal97" target="blank">
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>
            <a href="mailto:dhruvsinghal9876@gmail.com" target="blank">
              <MailIcon className="emailSvgIcon"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;