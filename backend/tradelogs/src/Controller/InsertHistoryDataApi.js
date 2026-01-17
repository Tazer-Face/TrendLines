class InsertExternalHisData {
    constructor(insertService){
        this.insertService = insertService;
    }

    async addHisData(req,res){
       try{
        await this.insertService.addHisData();
        return res.status(201).send({ success: true, message: "Historic data inserted successfully" });
       }
       catch(err){
        return res.status(500).send({ success: false, message: "Error inserting historic data", data: err });
       }
    }
}

export default InsertExternalHisData;