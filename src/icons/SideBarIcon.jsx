import IconBase from './IconBase.jsx';

function SideBarIcon(props) {
    return (
        <IconBase {...props} variant='strokeOnly'>
            <path 
                d='M5 6H12H19M5 12H19M5 18H19' 
                strokeWidth='1.5px'
            />
        </IconBase>
    );
};

export default SideBarIcon;