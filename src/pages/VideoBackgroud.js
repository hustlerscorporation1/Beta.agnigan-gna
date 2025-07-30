// src/components/VideoBackground.jsx
import React from 'react';
import '../Styles/VideoBackground.css'; // Importe le fichier CSS

const VideoBackground = ({ videoSrc, posterSrc, children }) => {
    return (
        <div className="video-background">
            <video autoPlay muted loop playsInline poster={posterSrc}>
                {Array.isArray(videoSrc) ? (
                    videoSrc.map((srcObj, index) => (
                        <source key={index} src={srcObj.src} type={srcObj.type} />
                    ))
                ) : (
                    <source src={videoSrc} type="video/mp4" />
                )}
            </video>
            <div className="content">
                {children} 
            </div>
        </div>
    );
};

export default VideoBackground;