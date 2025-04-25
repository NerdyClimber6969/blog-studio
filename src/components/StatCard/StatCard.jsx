import Card from '../Card/Card.jsx';
import styles from './StatCard.module.css';

const StatCard = ({ title, quantity, details, className }) => {
  const sectionId = `${title.toLowerCase().replace(/\s+/g, '-')}-title`;

  return (
    <Card 
      className={`${styles.statCard} ${className ? className : ''}`} 
      role='region' 
      aria-labelledby={sectionId}
    >
        <Card.Header className='mb4'>
            <h3 id={sectionId} className='font-sm mb2'>{title}</h3>
            <p className='font-md' aria-label={`${title} total quantity`}>
              {quantity}
            </p>
        </Card.Header>

        <Card.Attribution>
            <ul aria-label={`${title} details`} className={styles.attribution}>
              {details.map((item, index) => (
                  <li key={index} className={item.className}>
                    <span className='font-xxs'>{item.label || item}</span>
                  </li>
              ))}
            </ul>
        </Card.Attribution>
    </Card>
  );
};

export default StatCard;