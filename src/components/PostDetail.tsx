import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PostProps } from "./PostList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";

export default function PostDetail(){
    const [post, setPost] = useState<PostProps | null>(null);
    const params = useParams();
    const navigate = useNavigate();
    //console.log(params?.id);

    const getPost = async (id: string) => {
        if(id){
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
    
            
            setPost({id: docSnap.id, ...(docSnap.data() as PostProps)});
        }

    }
    
    const heandleDelete = async () => {
        const confirm = window.confirm("정말 삭제하시겠습니까?")
        if( confirm && post && post.id){
            await deleteDoc(doc(db, "posts", post.id));
            toast.success("게시글이 삭제되었습니다.");
            navigate("/");
        }
        
    }
    
    useEffect(() => {
        if(params?.id) getPost(params?.id);
    }, [params?.id]);

    return (
        <>
        <div className="post__detail">
            {post ? (
            <div className="post__box">
                <div className="post__title">{post?.title}</div>
                <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__autheor-name">{post?.email}</div>
                    <div className="post__date">{post?.createAt}</div>
                </div>
                <div className="post__utils-box">
                    {post?.category && (
                        <div className="post__category">{post?.category}</div>
                    )}
                    <Link className="post__edit" to={`/`}>목록</Link>
                    <Link className="post__edit" to={`/posts/edit/${post?.id}`}>수정</Link>
                    <button className="post_delete" onClick={heandleDelete}>삭제</button>
                </div>
                <div className="post__text post__text--pre-wrap">
                    {post?.content}
                </div>
            </div>
            ):""}
        </div>
        </>
    )
}