// src/components/VideoBackground.jsx
import React from 'react';
import '../Styles/VideoBackground.css'; // Importe le fichier CSS

const VideoBackground = ({ videoSrc, posterSrc, children }) => {
    return (
        <div className="video-background">
            <video autoPlay muted loop playsInline poster={posterSrc}>
                {/* On peut itérer sur les sources si on a plusieurs formats */}
                {Array.isArray(videoSrc) ? (
                    videoSrc.map((srcObj, index) => (
                        <source key={index} src={srcObj.src} type={srcObj.type} />
                    ))
                ) : (
                    <source src={videoSrc} type="video/mp4" /> // Par défaut si une seule source est donnée
                )}
                Votre navigateur ne supporte pas l'élément vidéo.
            </video>
            <div className="content">
                {children} {/* Le contenu passé en tant que props.children */}
            </div>
        </div>
    );
};

export default VideoBackground;