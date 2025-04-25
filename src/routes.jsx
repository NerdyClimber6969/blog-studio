import App from './App/App.jsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import PostPage from './pages/PostPage/PostPage.jsx';
import EditPage from './pages/EditPage/EditPage.jsx';
import CommentPage from './pages/CommentPage/CommentPage.jsx';

const routes = [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <DashboardPage /> },
        { 
          path: 'posts',
          children: [
            { index: true,  element: <PostPage /> },
            { path: ':postId', element: <EditPage /> },
          ] 
        },
        { path: 'comments', element: <CommentPage /> }
      ]
    }
  ];

export default routes;