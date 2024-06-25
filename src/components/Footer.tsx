import { Link } from "react-router-dom";
import { BsSun , BsMoonFill } from "react-icons/bs";
import ThemeContext from "context/ThemeContext";
import { useContext } from "react";

export default function Footer(){
    const context = useContext(ThemeContext);
    console.log(context);
    return(
        <footer>
            <Link to="/posts/new">글쓰기</Link>
            <Link to="/posts">게시글</Link>
            <Link to="/profile">프로필</Link>
            <button>
                {context.theme === 'light'? <BsSun className="footer__theme-btn" onClick={context.toggleMode} /> : <BsMoonFill className="footer__theme-btn" onClick={context.toggleMode} />}
            </button>
        </footer>
    );
}