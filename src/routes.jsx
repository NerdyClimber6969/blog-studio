import App from './App/App.jsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import PostListPage from './pages/PostListPage/PostListPage.jsx';
import PostEditPage from './pages/PostEditPage/PostEditPage.jsx';
import CommentPage from './pages/CommentPage/CommentPage.jsx';
import { PageNotFoundError, UnexpectedError } from './components/Error';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <UnexpectedError/>,
    children: [
      { index: true, element: <DashboardPage /> },
      { 
        path: 'posts',
        children: [
          { index: true,  element: <PostListPage /> },
          { path: ':postId', element: <PostEditPage /> },
        ] 
      },
      { path: 'comments', element: <CommentPage /> }
    ]
  },
  {
    path: '*',
    element: <PageNotFoundError />
  }
];

export default routes;