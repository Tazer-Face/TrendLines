class FetchAllStratergies {
    constructor(service){
        this.service = service
    }

    async getAllStratergies(req,res){
        try{
            const data = await this.service.getAllStratergie();
            console.log("Stratergies fetched successfully")
            res.status(200).send({success : true ,data : data , message : "Stratergies Data fetched successfully"})
            
        }
        catch(err){
            console.log("Error fetching Stratergies ");
            res.status(500).send({success : false ,data : err , message : "Stratergies Data fetching is unsuccessfully"}) 
        }
    }
        
}

export default FetchAllStratergies

