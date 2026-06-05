import { createSingleCategory, getCategories } from "../queries/categoriesQueries.js";

export async function createCategory(req,res){
    try{
     const {id, name, kind, group} = req.body
     const category = await createSingleCategory(id, name, kind, group)
     if (!category){
        return res.status(404).json({message: "unable to create category"})
     }
     res.status(200).json({message: "category has been created"})

    }catch(error){
     res.status(500).json({error : error.message})
     console.error(error)
    }
    
}

export async function getUserCatergories(req, res) {
    try{
        const {userId} = req.params
        const categories = await getCategories(userId)
        if (categories.length === 0){
            return res.status(404).json({message: "not finding any categoreis broski"})
        }
        res.status(200).json({categories: categories})
    }catch(error){
        res.status(500).json({error: error.message})
        console.error(error)
    }
}