import { useEffect, useState } from "react";
import axios from 'axios';
import Configurl from "../Config";
const Slideshow = () => {
  const [img, setimg] = useState(null);
  useEffect(() => {
    getimg()
  },[])

  const getimg = async() => {
    try {
      const res =await axios.get(Configurl.Url + "/getimg")
      setimg(res.data)
    } catch (error) {
      
    }
  }
  return (
    <div className="slideshow-container relative">
      <div className="slideshow-images">
          <img
            src={img ? img.banner : ""}
            className="slide h-[500px]"
          />
      </div>
    </div>
  );
};

export default Slideshow;
