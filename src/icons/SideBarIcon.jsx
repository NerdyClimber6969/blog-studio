import '../style/components/_svgIcon.css'

function SideBarIcon({ className='' }) {
    return (
        <svg 
            className={className}
            viewBox='0 0 24 24' 
            xmlns='http://www.w3.org/2000/svg'
        >
            <path 
                d='M5 6H12H19M5 12H19M5 18H19' 
                strokeWidth='1.5px'
            />
        </svg>
    );
};

export default SideBarIcon;