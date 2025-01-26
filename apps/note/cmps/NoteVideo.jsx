export function NoteVideo({ url }) {
    return (
        <div className="note-video">
            <iframe 
                width="100%" 
                height="220" 
                src={url}
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            >
            </iframe>
        </div>
    )
}
