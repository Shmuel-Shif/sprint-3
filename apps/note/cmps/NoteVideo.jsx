export function NoteVideo({ url }) {
    return (
        <div className="note-video">
            <video width="100%" controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
