export function NoteVideo({ url }) {
    // const embedUrl = videoUrl.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/") 
console.log(url)
// console.log(embedUrl)

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
