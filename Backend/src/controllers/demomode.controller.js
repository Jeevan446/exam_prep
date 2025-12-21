const examtypeModel=require('../models/examtypes.model')
async function addexamtype(req,res){
    const {name,subjects}=req.body
try{

    const examtypefound=await examtypeModel.findOne({name:name})
    if(examtypefound){
        return res.status(409).json({message:"Sorry examtype already exists"})
    }
    await examtypeModel.create({name:name,subjects:subjects})
return res.status(200).json({message:"New examtype creaated sucessfully"})

}catch(err){
    console.log("Error at add examtype function ",err)
}
}

module.exports={addexamtype}