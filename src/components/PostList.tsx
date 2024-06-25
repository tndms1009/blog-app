import AuthContext from "context/AuthContext";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

type TabType = "all" | "my";

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createAt: string;
  updateAt?: string;
  uid: string;
  category?: CategoryType;
}

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";

export const CATEGORIES: CategoryType[] = [ "Frontend", "Backend", "Web", "Native"];

export default function PostList({ hasNavigation = true, defaultTab = "all" }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(defaultTab);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    // 초기화
    setPosts([]);
    let postsRef = collection(db, "posts");
    let postsQuery;

    if(activeTab === "my" && user) {
      postsQuery = query(postsRef, orderBy("createAt", "desc"), where("uid", "==", user.uid));
    }else if(activeTab === "all") {
      postsQuery = query(postsRef, orderBy("createAt", "desc"));
    }else{
      postsQuery = query(postsRef, orderBy("createAt", "desc"), where("category", "==", activeTab as CategoryType));
    }
    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const heandleDelete = async (id:string) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?")
    if( confirm && id){
        await deleteDoc(doc(db, "posts", id));
        toast.success("게시글이 삭제되었습니다.");
        getPosts();// 변경된 데이터를 가져옴
    }
    
  }
  
  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
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
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={activeTab === category? "post__navigation--active" : ""}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__date">{post?.createAt}</div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post__utils-box">
                    <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                      수정
                    </Link>
                    <button className="post_delete" onClick={()=>heandleDelete(post?.id as string)}>삭제</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}