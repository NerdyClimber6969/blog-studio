import StatCard from '../../components/StatCard/StatCard.jsx';
import { useProfile } from '../../context/ProfileProvider.jsx';
import pageStyle from './DashboardPage.module.css';

function DashboardPage(props) {
    const { summary, loading } = useProfile();

    return (
        !loading && <main className='dashboard-page'>
            <h2 className='font-md mb4'>Dashboard</h2>
            <div className={pageStyle.container}>
                <StatCard 
                    className={pageStyle.containerChild}
                    title='Posts'
                    quantity={summary.posts.quantity}
                    details={[
                        { label: `${summary.posts.published} published` },
                        { label: `${summary.posts.drafted} drafts` },
                        { label: `${summary.posts.like} likes` },
                        { label: `${summary.posts.dislike} dislikes` }
                    ]}
                />
                <StatCard 
                    className={pageStyle.containerChild}
                    title='Comments'
                    quantity={summary.comments.quantity}
                    details={[
                        { label: `${summary.comments.like} likes` },
                        { label: `${summary.comments.dislike} dislikes` }
                    ]}
                />
                <StatCard 
                    className={pageStyle.containerChild}
                    title='Comments'
                    quantity={summary.comments.quantity}
                    details={[
                        { label: `${summary.comments.like} likes` },
                        { label: `${summary.comments.dislike} dislikes` }
                    ]}
                />  
            </div>   
        </main>
    )
};

export default DashboardPage;