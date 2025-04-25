import React from 'react';
import styles from './Card.module.css';

function Card({ className, children }) {
    const childrenArr = React.Children.toArray(children);

    const header = childrenArr.find(
        child => React.isValidElement(child) && child.type === Header
    );

    const content = childrenArr.find(
        child => React.isValidElement(child) && child.type === MainContent
    );

    const attribution = childrenArr.find(
        child => React.isValidElement(child) && child.type === Attribution
    );

    return (
        <article className={`${styles.card} ${className || ''}`} role="region">
            {header}
            {content}
            {attribution}
        </article>
    );
}

function Header({ children, className }) {
    return (
        <header className={`${className || ''}`}>
            {children}
        </header>
    );
}

function MainContent({ children, className }) {
    return (
        <section className={`${className || ''}`} aria-label="Main content">
            {children}
        </section>
    );
}

function Attribution({ children, className }) {
    return (
        <footer className={`${className || ''}`} aria-label="Attribution or metadata">
            {children}
        </footer>
    );
}

Card.Header = Header;
Card.MainContent = MainContent;
Card.Attribution = Attribution;

export default Card;
