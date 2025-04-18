import Category from "../Models/category.js";

export function postCategory(req, res) {

    if (req.user == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.type !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }

    const newCategory = new Category(req.body);
    newCategory.save()
        .then((result) => {
            
            res.json({
                message : "Category created successfully",
                 result : result
        });
           
        })
        .catch((err) => {
            console.error(err);
            res.json({ 
                message: "Category creation failed" });
                console.log(err);
                
        });

}



export function getCategory(req, res) {
    Category.find().then((categoryList) => {

        res.status(200).json({
            list : categoryList
        });

    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    });
}




export function deleteCategory(req, res){
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Login required" }); 
    }

    if (user.type !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
    }
 
    const deleteName = req.params.name;
    Category.deleteOne({name : deleteName}).then(()=>{
        res.json({
            message : "delete category successfully"
        });
    }).catch((err)=>{
        console.log(err);
        res.json({
            message : "failed delete gallery item"
            
        })
    })
   
    
}


export function getCategoryByName(req, res) {
    const categoryName = req.params.name;
    Category.findOne({ name: categoryName }).then((result) => {
       if(!result){
            return res.status(404).json({ message: "Category not found" });
        }
        else{
            res.json({
                list : result
            });
        }
       }
        ).catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
    }


 export function updateCategory(req, res){

    if(!isAdminValid(req)) {
         return res.status(403).json({ message: "Permission denied" });
    }
        
    const categoryName = req.params.name;
    Category.updateOne({ name: categoryName },req.body).then(()=>{
        res.json({
            message : "Category updated successfully"
        });
    }).catch((err) => {
        console.error(err);
        res.json({ message: "Failed to update category" });
    })
    }



function isAdminValid(req){
    if (req.user == null) {
        return false; 
    }

    if (req.user.type !== "admin") {
        return false;
    }
    return true;
}