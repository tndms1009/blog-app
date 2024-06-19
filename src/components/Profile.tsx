import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { useContext } from "react";

import { toast } from "react-toastify";
const onSignOut = async() => {
    try{
        const auth = getAuth(app);
        await signOut(auth);
        toast.success("로그아웃에 성공했습니다.");
    }catch(e:any){
        console.log(e);
        toast.error("로그아웃에 실패했습니다.");
    }
}
export default function Profile(){
    const { user } = useContext(AuthContext);
    
    console.log(user);
    return(
        <div className="profile__box">
            <div className="profile__box-lg">
                <div className="profile__image" />
                <div>
                    <div className="profile__emaile">{user?.email}</div>
                    <div className="profile__name">{user?.displayName || '사용자'}</div>
                </div>
            </div>
            <button 
            className="profile__logout"
            onClick={onSignOut}
            >
                로그아웃
            </button>
        </div>
    )
}