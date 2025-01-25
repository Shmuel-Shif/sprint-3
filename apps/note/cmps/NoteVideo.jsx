export function NoteVideo({ videoUrl }) {
    // const embedUrl = videoUrl.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")

    return (
        <div className="note-video">
            <iframe 
                width="100%" 
                height="220" 
                // src={embedUrl} 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
        </div>
    );
}
