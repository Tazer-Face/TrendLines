class AddNewStrategy {
    constructor(service){
        this.service = service
    }

    async addStratergy(req,res){
        try{
            const {strategyName} = req.body;
            await this.service.addStratergy(strategyName);
            console.log("Stratergies inserted successfully")
            res.status(200).send({success : true , message : "Stratergy inserted successfully"})
            
        }
        catch(err){
            console.log("Error adding Stratergy : "+err);
            res.status(500).send({success : false ,data : err , message : "Stratergies insertion unsuccessful"}) 
        }
    }
        
}

export default AddNewStrategy
