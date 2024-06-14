import './App.css';
import { Route, Routes, Navigate, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/posts:id">Post Detail</Link></li>
        <li><Link to="/posts/new">Post new</Link></li>
        <li><Link to="/posts/edit/:id">Post edit</Link></li>
      </ul>
      <Routes>
        <Route path='/' element={<h1>Homepage</h1>}/>
        <Route path='/posts' element={<h1>Post page</h1>}/>
        <Route path='/posts:id' element={<h1>Post Detail page</h1>}/>
        <Route path='/posts/new' element={<h1>Post New page</h1>}/>
        <Route path='/posts/edit/:id' element={<h1>Post Edit page</h1>}/>
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </>
  );
}

export default App;
