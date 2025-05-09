import Flyout from './Flyout.jsx';
import DarkModeIcon from '../../icons/DarkModeIcon.jsx';
import LightModeIcon from '../../icons/LightModeIcon.jsx';
import { useTheme } from '../../context/ThemeProvider.jsx';

function ThemeFlyout(props) {
    const { theme, handleSetTheme } = useTheme();

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
                    onClick={() => handleSetTheme('light')}
                >
                    <LightModeIcon className='svg-icon fill'/>
                    <span>Light</span>
                </Flyout.Item>
                <Flyout.Item 
                    onClick={() => handleSetTheme('dark')}
                >
                    <DarkModeIcon className='svg-icon fill'/>
                    <span>Dark Mode</span>
                </Flyout.Item>
            </Flyout.Menu>
        </Flyout>
    );
};

export default ThemeFlyout;