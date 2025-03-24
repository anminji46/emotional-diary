import Title from "../component/Title";
import Footer from "../component/Footer";
import EmojiAni from "../component/EmojiAni";

import './Main.scss';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500)

    return () => clearTimeout(timer);
  }, []);

  return <div className="Main">
    <div className="bg-B9E9FC">
      <Title />
      {
        isLoading
        ?<EmojiAni />
        :navigate("/home", { replace : true })
      }
      
    </div>
      <footer>
        <Footer />
      </footer>
  </div>;
};
export default Main;