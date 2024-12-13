import Svg from './svg';
import { AlertProps } from '@/types/staticData';
import useFadeOut from '@/hooks/useFadeOut';

const Alert: React.FC<AlertProps> = ({ content, alertType, onClose }) => {
    const { visible, fadingOut } = useFadeOut({ onClose });
    if (!visible) return null;

    return (
        <div
            role="alert"
            className={`alert ${alertType} fixed top-4 left-1/2 transform -translate-x-1/2 z-9999
             flex items-center shadow-lg transition-opacity duration-1000 max-w-2xl
                ${fadingOut ? 'opacity-0' : 'opacity-100'}`}
        >
            <Svg Link='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'/>
            <span>{content}</span>
        </div>
    );
};

export default Alert;
