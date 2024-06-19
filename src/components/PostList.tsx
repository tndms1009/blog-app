import { useState } from "react";
import {Link} from "react-router-dom"

interface PostListProps {
    hesNavigation?: boolean;
}
type TabType = "all" | "my";

export default function PostList({hesNavigation = true}: PostListProps){
    const [activeTab, setActiveTab] = useState<TabType>("all");
    return (
        <>
            {hesNavigation && (
                <div className="post__navigation">
                    <button 
                        onClick={() => setActiveTab("all")}
                        className={activeTab === "all" ? "post__navigation--active" : ""}
                    >
                        전체
                    </button>
                    <button 
                        onClick={() => setActiveTab("my")}
                        className={activeTab === "my" ? "post__navigation--active" : ""}
                    >
                        나의 글
                    </button>
                </div>
            )}
            <div className="post__list">
                {[...Array(10)].map((e, index) => (
                    <div key={index} className="post__box">
                        <Link to={`/posts/${index}`}>
                            <div className="post__profile-box">
                                <div className="post__profile" />
                                <div className="post__autheor-name">닉네임</div>
                                <div className="post__date">2024.06.14 금요일</div>
                            </div>
                            <div className="post__title">게시글 {index}</div>
                            <div className="post__text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel pellentesque ante. Suspendisse et feugiat diam. Sed vehicula lectus ut nisi rhoncus, eget pellentesque diam vestibulum. Maecenas eget congue dui. Proin risus purus, lacinia eget mauris vel, consequat dapibus ante. Vivamus urna quam, scelerisque ut rhoncus quis, tempus sed lectus. Proin consequat metus vel ligula rutrum tempor ac ut nisi. Vivamus viverra nibh sit amet velit aliquet sollicitudin. Donec finibus nisi ac nunc auctor, sit amet accumsan est varius. Nulla dignissim ante ac mattis feugiat. Curabitur sagittis suscipit mi eget fermentum. Suspendisse luctus in lectus id porta. Nullam volutpat facilisis diam, sed posuere felis pellentesque quis. Nunc pulvinar ligula id fermentum blandit. Fusce metus lacus, tincidunt ut feugiat et, fringilla ut sem.
                            </div>
                            <div className="post__utils-box">
                                <button className="post_edit">수정</button>
                                <button className="post_delete">삭제</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}