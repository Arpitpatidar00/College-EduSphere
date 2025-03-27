import NProgress from 'nprogress';
import { useEffect } from 'react';

const NProgressBar = () => {
    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        };
    }, []);

    return null; // No UI needed, nprogress handles the bar
};

export default NProgressBar;