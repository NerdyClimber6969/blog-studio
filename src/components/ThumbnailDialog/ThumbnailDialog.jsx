import ReactCrop, { makeAspectCrop, centerCrop } from 'react-image-crop';
import { useState, useRef } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import Dialog from '../Dialog/Dialog.jsx';
import styles from './Thumbnail.module.css';

const ASPECT_RATIO = 16 / 9;
const MAX_WIDTH = 800;
const MAX_HEIGHT = 450;
const MIN_WIDTH = 200;
const MIN_HEIGHT = 112.5;

function ThumbnailDialog({ isOpen, onClose, onConfirm }) {
    const [crop, setCrop] = useState();
    const [thumbnailSrc, setThumbnailSrc] = useState();
    const thumbnailRef = useRef();
    const previewCanvasRef = useRef();

    function onSelectImage(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                const imageURL = reader.result?.toString() || '';
                setThumbnailSrc(imageURL);
            });

            reader.readAsDataURL(e.target.files[0])
        };
    };

    function onImageLoaded(e) {
        const {width, height} = e.target;
        const crop = makeAspectCrop(
            {
                unit: 'px',
                width: MAX_WIDTH
            },
            ASPECT_RATIO,
            width,
            height
        );
        setCrop(centerCrop(crop, width, height));
    };

    function setPreviewCanvas(image, canvas, crop, preview) {
        if (!crop || !canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('No 2d context');
        };

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const pixelRatio = window.devicePixelRatio;

        canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

        const cropX = crop.x * scaleX * pixelRatio;
        const cropY = crop.y * scaleY * pixelRatio;

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = 'high';

        ctx.save();

        ctx.translate(-cropX, -cropY);
        ctx.drawImage(
            image,
            0, 0,
            image.naturalWidth, image.naturalHeight,
            0, 0,
            image.naturalWidth, image.naturalHeight
        );

        canvas.toBlob((blob) => onConfirm(blob));
        onClose();
        ctx.restore();
    };

    return (
        <Dialog
            className={styles.thumbnailDialog}
            isOpen={isOpen}
            title="Select and Crop Thumbnail"
            confirmBtn={"Confirm"}
            cancelBtn={"Cancel"}
            onClose={onClose}
            onConfirm={() => setPreviewCanvas(thumbnailRef.current, previewCanvasRef.current, crop)}
            confirmBtnDisabled={thumbnailSrc ? false : true}
        >   
            <div>
                <input type="file" accept="image/*" onChange={onSelectImage} className='font-sm' style={{border: 'none'}}/>
            </div>

            {thumbnailSrc && (
                <div className={styles.thumbnailCropper}>
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, pecentCrop) => setCrop(pixelCrop)}
                        aspect={ASPECT_RATIO}
                    >   
                        <img 
                            ref={thumbnailRef}
                            src={thumbnailSrc} 
                            alt="Thumbnail" 
                            onLoad={(e) => onImageLoaded(e)} 
                        />
                    </ReactCrop>
                </div>
            )}

            <canvas
                ref={previewCanvasRef}
                style={{border: '1px solid white', objectFit: 'contain', display: 'none'}}
            />
        </Dialog>
    );
};

export default ThumbnailDialog;