const Category = require('../models/category.js');


exports.getCategoryById = (req,res,next,id)=>{
     Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error : "category not found in DB"
            })
        }

        req.category = category;
        next();

     })

    }
   

exports.createCategory = (req,res)=>{

    const category =new Category(req.body);

    category.save((err,category)=>{

        if(err || !category){
            return res.status(400).json({
                error : "category not found in DB"
            })
        }
        
        res.json(category);
    })

}


//read
exports.getCategory = (req,res)=>{
         res.json(req.category);
}
exports.getAllCategories = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error : "category not found in DB"
            })
        }
        res.json(categories);
    })
}

//update
exports.updateCategory =(req,res)=>{
    const category = req.category
    console.log(category);
    if(category == null){
        return res.status(400).json({
            error : "category not found in DB"
        })
    }
    category.name = req.body.name;
    
    
    category.save((err,category)=>{

        if(err || !category){
            return res.status(400).json({
                error : "category not found in DB"
            })
        }
        
        res.json(category);
    });

   /*Category.findByIdAndUpdate({_id : req.category._id},{$set : req.body.name},{new : true,useFindAndModify : false},(err,category)=>{
        if(err){
            return res.status(400).json({
                error : "category not found in DB"
            })
        }
        res.json(category);
    })*/

}

exports.deleteCategory = (req,res)=>{
    const category = req.category;
    if(category == null){
        return res.status(400).json({
            error : "category not found in DB"
        })
    }
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error : "category not found in DB"
            })
            
            
        }
        res.json({message:category});
    })

}