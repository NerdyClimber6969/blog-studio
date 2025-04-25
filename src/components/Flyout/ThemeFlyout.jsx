import { useEffect, useState } from 'react';
import Flyout from './Flyout.jsx';
import DarkModeIcon from '../../icons/DarkModeIcon.jsx';
import LightModeIcon from '../../icons/LightModeIcon.jsx';

function ThemeFlyout(props) {
    const getDefaultTheme = () => {
        const isDark = window.matchMedia('prefers-color-scheme: dark').matches
        const theme = isDark ? 'dark' : 'light';
        return theme;
    };

    const [theme, setTheme] = useState(getDefaultTheme());

    useEffect(() => {
        const root = document.documentElement;
        root.className = theme;
        return;
    }, [theme]);

    return (
        <Flyout>
            <Flyout.Toggle iconRender={() => (
                    theme === 'dark' ? (
                        <LightModeIcon className='svg-icon fill'/>
                    ) : (
                        <DarkModeIcon className='svg-icon fill'/>
                    )
            )}/>
            <Flyout.Menu>
                <Flyout.Item 
                    onClick={() => setTheme('light')}
                >
                    <LightModeIcon className='svg-icon fill'/>
                    <span>Light</span>
                </Flyout.Item>
                <Flyout.Item 
                    onClick={() => setTheme('dark')}
                >
                    <DarkModeIcon className='svg-icon fill'/>
                    <span>Dark Mode</span>
                </Flyout.Item>
            </Flyout.Menu>
        </Flyout>
    );
};

export default ThemeFlyout;