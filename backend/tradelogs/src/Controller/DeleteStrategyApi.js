class DeleteStrategyApi {
    constructor(service){
        this.service = service
    }

    async deleteStrategy(req,res){
        try{
            const {_id,strategy,strategyId} = req.body;
            await this.service.deleteStrategy({_id,strategy,strategyId});
            console.log("Strategy deleted successfully")
            res.status(204).send({success : true , message : "Stratergy deleted successfully"})
            
        }
        catch(err){
            console.log("Error deleting Strategy "+err);
            res.status(500).send({success : false ,data : err , message : "Stratergies deletion unsuccessfully"}) 
        }
    }
        
}

export default DeleteStrategyApi
