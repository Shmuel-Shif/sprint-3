export function NoteImg({ url }) {
    return (
        <div className="note-img">
            <img 
                src={url} 
                alt="Note Image" 
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} 
            />
        </div>
    )
}
