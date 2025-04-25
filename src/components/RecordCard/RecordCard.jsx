import Card from '../Card/Card.jsx';
import LikeIcon from '../../icons/LikeIcon.jsx';
import DislikeIcon from '../../icons/DislikeIcon.jsx';
import styles from './RecordCard.module.css';

function RecordCard({ title, author, text, createdAt, like, dislike, renderAction }) {
    return (
        <Card className={styles.recordCard} role='region'>
            <Card.Header className={styles.header}>
                <div>
                    <h3 className={`${styles.title} font-md mb2`}>{title}</h3>
                    <p className='font-xxs mb3'>by {author}</p>
                    {text && (
                        <p className={`${styles.text} font-xs`}>{text}</p>
                    )}
                </div>
                
                {renderAction && renderAction()}
            </Card.Header>

            <Card.Attribution>
                <ul aria-label={`${title} details and attribution`} className={styles.attribution}>
                    <li className='created-at font-xxs'>
                        <span>{`created at ${createdAt}`}</span>
                    </li>
                    <li className={`${styles.like} font-xxs`}>
                        <LikeIcon className={styles.icon}/>
                        <span>{like}</span>
                    </li>
                    <li className={`${styles.dislike} font-xxs`}>
                        <DislikeIcon className={styles.icon}/>
                        <span>{dislike}</span>
                    </li>
                </ul>
            </Card.Attribution>
        </Card>
    );
};

export default RecordCard;