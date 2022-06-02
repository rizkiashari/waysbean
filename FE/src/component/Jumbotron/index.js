import Style from "./Jumbotron.module.css";

import React from "react";
import { Image } from "react-bootstrap";

import icon from "../../assets/icon/Icon.png";
import coffee from "../../assets/icon/coffee.png";
import wave from "../../assets/icon/Waves.png";

const JB = () => {
  return (
    <div className='mt-2'>
      <div className={Style.jbContainer}>
        <div className={Style.jbContent}>
          <Image src={icon} alt='.' style={{ marginBottom: "10px" }} />
          <h3 style={{ margin: "20px 0px", fontWeight: 500 }}>
            BEST QUALITY COFFEE BEANS
          </h3>
          <p style={{ fontSize: "14px", margin: "10px 0" }}>
            Quality freshly roasted coffee made just for you. Pour, brew and
            enjoy
          </p>
        </div>
        <div>
          <Image src={coffee} alt='.' className={Style.Coffee} />
          <Image src={wave} alt='.' className={Style.Wave} />
        </div>
      </div>
    </div>
  );
};

export default JB;
