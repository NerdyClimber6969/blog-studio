import StatCard from '../../components/StatCard/StatCard.jsx';
import useSummary from '../../hook/useSummary.jsx';
import pageStyle from './DashboardPage.module.css';

function DashboardPage(props) {
    const { summary, loading, error } = useSummary();

    return (
        <main className='dashboard-page'>
            {loading && <p className='font-sm'>Loading...</p>}
            {!loading && error && <p className='font-sm'>Error occured when fetching ...</p>}
            {!loading && summary && (
                <>
                    <h2 className='font-md mb4'>Dashboard</h2>
                    <div className={pageStyle.container}>
                        <StatCard 
                            className={pageStyle.containerChild}
                            title='Posts'
                            quantity={summary.post.quantity.total}
                            details={[
                                { label: `${summary.post.quantity.published} published` },
                                { label: `${summary.post.quantity.draft} drafts` },
                                { label: `${summary.post.likes} likes` },
                                { label: `${summary.post.dislikes} dislikes` }
                            ]}
                        />
                        <StatCard 
                            className={pageStyle.containerChild}
                            title='Comments'
                            quantity={summary.comment.quantity.total}
                            details={[
                                { label: `${summary.comment.likes} likes` },
                                { label: `${summary.comment.dislikes} dislikes` }
                            ]}
                        />
                        <StatCard 
                            className={pageStyle.containerChild}
                            title='Comments'
                            quantity={summary.comment.quantity.total}
                            details={[
                                { label: `${summary.comment.likes} likes` },
                                { label: `${summary.comment.dislikes} dislikes` }
                            ]}
                        />  
                    </div>   
                </>
            )}
        </main>     
    )
};

export default DashboardPage;