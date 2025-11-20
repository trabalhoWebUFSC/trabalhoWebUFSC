import { useState, useRef, useEffect } from "react";
import "./ProfilePicture.css";

const ProfilePicture = ({ value, onChange, previewUrl, disabled = false }) => {
    const hiddenInputRef = useRef();
    const [preview, setPreview] = useState(previewUrl || null);
    
    // atualiza preview se previewUrl muda (ex: ao carregar dados)
    useEffect(() => {
        setPreview(previewUrl || null);
    }, [previewUrl]);
    
    const handleUploadedFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const urlImage = URL.createObjectURL(file);
            setPreview(urlImage);
            onChange(file);
        }
    };
    
    const onUpload = () => {
        if (!disabled) {
            hiddenInputRef.current.click();
        }
    };
    
    const onDelete = () => {
        if (!disabled) {
            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }
            setPreview(null);
            
            if (hiddenInputRef.current) {
                hiddenInputRef.current.value = '';
            }
            
            onChange(null);
        }
    };
    
    const uploadButtonLabel = preview ? "Edit" : "Upload";
   
    return (
        <div>
            <label className="profile-picture-label">Profile picture:</label>
            <div className={`profile-picture-container ${preview ? "hasImage" : ''}`}>
                <input
                    type="file"
                    ref={hiddenInputRef}
                    onChange={handleUploadedFile}
                    className="profile-picture-input"
                    accept="image/*"
                    disabled={disabled}
                />
                {preview && (
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className="profile-picture-preview"
                    />
                )}
                <div className="profile-picture-buttons">
                    <button 
                        type="button" 
                        onClick={onUpload} 
                        className="picButton"
                        disabled={disabled}
                    >
                        {uploadButtonLabel}
                    </button>
                    {preview && (
                        <button 
                            type="button" 
                            onClick={onDelete} 
                            className="picButton deleteButton"
                            disabled={disabled}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePicture;
