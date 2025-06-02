import Card from '../Card/Card.jsx';
import { LikeIcon, DislikeIcon } from '../../icons';
import styles from './RecordCard.module.css';

function RecordCard({ title, author, text, createdAt, like, dislike, renderAction }) {
    return (
        <Card className={styles.recordCard} role='region'>
            <Card.Header>
                <div>
                    <h3 className='font-md mb2'>{title}</h3>
                    <p className='font-xxs mb3'>by {author}</p>
                    {text && (
                        <p className='font-xs'>{text}</p>
                    )}
                </div>
                
                {renderAction && renderAction()}
            </Card.Header>

            <Card.Attribution>
                <ul aria-label={`${title} details and attribution`} className={styles.attribution}>
                    <li className='created-at font-xxs'>
                        <span>{`created at ${createdAt}`}</span>
                    </li>
                    <li className='font-xxs'>
                        <LikeIcon size={23}/>
                        <span>{like}</span>
                    </li>
                    <li className='font-xxs'>
                        <DislikeIcon size={23}/>
                        <span>{dislike}</span>
                    </li>
                </ul>
            </Card.Attribution>
        </Card>
    );
};

export default RecordCard;