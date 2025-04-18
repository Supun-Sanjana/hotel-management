import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        }
    }
)

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
export default GalleryItem;