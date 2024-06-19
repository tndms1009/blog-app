export default function PostForm(){
    return (
        <form action="/post" method="POST" className="form">
            <div className="form__block">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" required/>
            </div>
            <div className="form__block">
                <label htmlFor="summary">요약</label>
                <input type="text" name="summary" id="summary" required/>
            </div>
            <div className="form__block">
                <label htmlFor="content">Content</label>
                <textarea name="content" id="content" required></textarea>
            </div>
            <div className="form__block">
                <input type="submit" value="제출" className="form__btn--submit"/>
            </div>
        </form>
    )
}