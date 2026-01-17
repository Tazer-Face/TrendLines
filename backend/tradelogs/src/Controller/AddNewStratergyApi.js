class AddNewStratergy {
    constructor(service){
        this.service = service
    }

    async addStratergy(req,res){
        try{
            const {stratergyName} = req.body;
            await this.service.addStratergy(stratergyName);
            console.log("Stratergies inserted successfully")
            res.status(200).send({success : true , message : "Stratergy inserted successfully"})
            
        }
        catch(err){
            console.log("Error adding Stratergy ");
            res.status(500).send({success : false ,data : err , message : "Stratergies insertion unsuccessfully"}) 
        }
    }
        
}

export default AddNewStratergy
