import React from 'react';

const GoogleMap = () => {
    return (
        <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106579.73143285509!2d36.34171132976303!3d33.40716527135736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518de30eb6e438b%3A0xfb1593974ba7bde3!2z2KfZhNis2KfZhdi52Kkg2KfZhNiz2YjYsdmK2Kkg2KfZhNiu2KfYtdipIFNQVQ!5e0!3m2!1sar!2snl!4v1714731324338!5m2!1sar!2snl"
                width="100%" height="600" style={{border: 0}} allowFullScreen={false} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
};

export default GoogleMap;