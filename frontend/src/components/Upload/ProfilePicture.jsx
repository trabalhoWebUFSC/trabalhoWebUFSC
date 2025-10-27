import { useState, useRef } from "react";
import "./ProfilePicture.css";

const ProfilePicture = ({ value, onChange }) => {
    const hiddenInputRef = useRef();
    const [preview, setPreview] = useState();
    
    const handleUploadedFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const urlImage = URL.createObjectURL(file);
            setPreview(urlImage);
            onChange(file);
        }
    };
    
    const onUpload = () => {
        hiddenInputRef.current.click();
    };
    
    const onDelete = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        
        if (hiddenInputRef.current) {
            hiddenInputRef.current.value = '';
        }
        
        onChange(null);
    };
    
    const uploadButtonLabel = preview ? "Editar" : "Enviar";
   
    return (
        <div className="profile-picture-container">
            <label className="profile-picture-label">Foto de perfil:</label>
            <input
                type="file"
                ref={hiddenInputRef}
                onChange={handleUploadedFile}
                className="profile-picture-input"
                accept="image/*"
            />
            {preview && (
                <img 
                    src={preview} 
                    alt="Preview" 
                    className="profile-picture-preview"
                />
            )}
            <div className="profile-picture-buttons">
                <button type="button" onClick={onUpload} className="picButton">
                    {uploadButtonLabel}
                </button>
                {preview && (
                    <button type="button" onClick={onDelete} className="picButton deleteButton">
                        Excluir
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfilePicture;
