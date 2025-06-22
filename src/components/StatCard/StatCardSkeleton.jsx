import cardStyles from '../Card/Card.module.css';
import { SkeletonBox, SkeletonText } from '../Skeleton';

function StatCardSkeleton({ className }) {
    return (
        <div className={`${cardStyles.card} ${className}`}>
            <SkeletonText
                lines={2}
                width={200} 
                height={20} 
                gap={10} 
                className='mb4'
            />
            <SkeletonBox height={15}  className='mb2'/>
        </div>
    );
};


export default StatCardSkeleton;