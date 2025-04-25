import '../style/components/_svgIcon.css'

function Dashboard({ className='' }) {
    return (
        <svg 
            className={className}
            viewBox='0 0 24.00 24.00' 
            xmlns='http://www.w3.org/2000/svg' 
            xmlns:xlink='http://www.w3.org/1999/xlink' 
        >
            <g 
                id='SVGRepo_bgCarrier' 
                strokeWidth='0'
            />
            <g 
                id='SVGRepo_tracerCarrier' 
                strokeLinecap='round' 
                strokeLinejoin='round'
            />
            <g id='SVGRepo_iconCarrier'/> 
            <g 
                id='Dashboard' 
                strokeWidth='1' 
                fill='none' 
                fill-rule='evenodd'
            > 
                <rect 
                    id='shape-1' 
                    strokeWidth='1.2' 
                    strokeLinecap='round' 
                    x='4' 
                    y='4' 
                    width='16' 
                    height='16' 
                    rx='2'
                />
                <line 
                    x1='4' 
                    y1='9' 
                    x2='20' 
                    y2='9' 
                    id='shape-2' 
                    strokeWidth='1.2' 
                    strokeLinecap='round'
                />
                <line 
                    x1='9' 
                    y1='10' 
                    x2='9' 
                    y2='20' 
                    id='shape-3' 
                    strokeWidth='1.2' 
                    strokeLinecap='round'
                />
            </g> 
        </svg>
    );
};

export default Dashboard;