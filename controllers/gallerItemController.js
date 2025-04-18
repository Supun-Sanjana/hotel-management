//Create gallery item 
import GalleryItem from '../Models/galleryItem.js'; 




export function postGalleryItem(req, res) {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Login required" });
    }

    if (user.type !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
    }

    const galleryItem = req.body.item;
    const newGalleryItem = new GalleryItem(galleryItem);

    newGalleryItem.save()
        .then(() => {
            res.json({ message: "Gallery item created successfully" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Gallery item creation failed");
            console.log("User from token:", req.user); // Verify user object from the token

        });
}


export function getGalleryItem(req, res){
    GalleryItem.find().then((galleryItemList)=>{
        res.json({
            list : galleryItemList
        });
    }).catch((err)=>{
        console.log(err);
        res.send("error getting gallery items");
    })
    
}


export function deleteGalleryItem(req, res){

    if (!user) {
        return res.status(401).json({ message: "Login required" });
    }

    if (user.type !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
    }

    const deleteName = req.body.name;
    GalleryItem.deleteOne({name : deleteName}).then(()=>{
        console.log("Gallery item deleted from database");
        res.json({
            message : "delete gallery item successfully"
        });
    }).catch((err)=>{
        console.log(err);
        res.json({
            message : "failed delete gallery item"
            
        })
    })
   
    
}

