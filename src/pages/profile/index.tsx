import Header from "components/Header";
import Profile from "components/Profile";
import Footer from "components/Footer";
import PostList from "components/PostList";

export default function ProfilePage(){
    return (
        <>
            <Header />
            <Profile />
            <PostList hesNavigation={false} />
            <Footer />
        </>
    )
};