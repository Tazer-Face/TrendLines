class UpdateHisDataApi{
    constructor(insertService){
        this.insertService = insertService
    }

    async updateHisData(req,res){
        try{
        const {_id,strategy} = req.body
        await this.insertService.updateHisData({_id,strategy});
        return res.status(201).send({ success: true, message: "Historic data updated successfully" });
       }
       catch(err){
        return res.status(500).send({ success: false, message: "Error updating historic data", data: err });
       }
    }
}

export default UpdateHisDataApi;