import IconBase from './IconBase.jsx';

function Dashboard(props) {
    return (
        <IconBase {...props} variant='strokeOnly'>
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
                fillRule='evenodd'
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
        </IconBase>
    );
};

export default Dashboard;