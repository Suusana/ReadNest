import { OneFunProps } from "@/types/staticData";
import { useEffect, useState } from "react";

const useFadeOut = ({ onClose }: OneFunProps) => {
    const [visible, setVisible] = useState(true);
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadingOut(true);
            // fading out
            setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 1000);
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return { visible, fadingOut };
};

export default useFadeOut;