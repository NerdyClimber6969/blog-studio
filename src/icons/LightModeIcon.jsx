import '../style/components/_svgIcon.css'

function LightModeIcon({ className }) {
    return (
        <svg 
            className={className}
            viewBox='0 0 25 25' 
            id='light-mode-icon'
            xmlns='http://www.w3.org/2000/svg'
        >
            <circle 
                cx='12' 
                cy='12' 
                r='5' 
            />
            <path 
                d='M12 2V4'
                strokeWidth='1.2' 
            />
            <path 
                d='M12 20V22' 
                strokeWidth='1.2'
            />
            <path 
                d='M4 12L2 12' 
                strokeWidth='1.2'
            />
            <path 
                d='M22 12L20 12' 
                strokeWidth='1.2'  
            />
            <path 
                d='M19.7778 4.22266L17.5558 6.25424' 
                strokeWidth='1.2'
            />
            <path 
                d='M4.22217 4.22266L6.44418 6.25424' 
                strokeWidth='1.2'
            />
            <path 
                d='M6.44434 17.5557L4.22211 19.7779'
                strokeWidth='1.2'
            />
            <path 
                d='M19.7778 19.7773L17.5558 17.5551' 
                strokeWidth='1.2'
            />
        </svg>
    );
};

export default LightModeIcon;