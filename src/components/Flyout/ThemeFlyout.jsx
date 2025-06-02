import Flyout from './Flyout.jsx';
import { DarkModeIcon, LightModeIcon } from '../../icons';
import { useTheme } from '../../context/ThemeProvider.jsx';

function ThemeFlyout(props) {
    const { theme, handleSetTheme } = useTheme();

    return (
        <Flyout>
            <Flyout.Toggle iconRender={() => (
                    theme === 'dark' ? (
                        <LightModeIcon/>
                    ) : (
                        <DarkModeIcon/>
                    )
            )}/>
            <Flyout.Menu>
                <Flyout.Item 
                    onClick={() => handleSetTheme('light')}
                >
                    <LightModeIcon/>
                    <span>Light Mode</span>
                </Flyout.Item>
                <Flyout.Item 
                    onClick={() => handleSetTheme('dark')}
                >
                    <DarkModeIcon/>
                    <span>Dark Mode</span>
                </Flyout.Item>
            </Flyout.Menu>
        </Flyout>
    );
};

export default ThemeFlyout;