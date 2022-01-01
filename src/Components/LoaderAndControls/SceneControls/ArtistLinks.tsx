import React from "react";
import "./artistLinks.css";

interface artistLinksProps {}

const ArtistLinks: React.FC<artistLinksProps> = ({}) => {
  return (
    <div className="links-wrapper">
      <a href="https://github.com/khongchai" target="_blank">
        <img
          src="github.svg"
          alt="github logo link that links to Khongchai's github"
        />
      </a>
      <a
        href="https://open.spotify.com/artist/25znyDCY8EmPkMAT5g4oPw"
        target="_blank"
      >
        <img
          src="spotify.svg"
          alt="github logo link that links to Khongchai's Spotify artist profile"
        />
      </a>
      <a
        href="https://www.youtube.com/channel/UCagev05Hu01B8Q3p3CLFz2A"
        target="_blank"
      >
        <img
          src="youtube.svg"
          alt="github logo link that links to Khongchai's YouTube channel"
        />
      </a>
      <a
        href="https://music.apple.com/th/artist/khongthefork/1162677049"
        target="_blank"
      >
        <img
          src="apple-music.svg"
          alt="github logo link that links to Khongchai's Apple Music artist profile"
        />
      </a>
    </div>
  );
};

export default ArtistLinks;
