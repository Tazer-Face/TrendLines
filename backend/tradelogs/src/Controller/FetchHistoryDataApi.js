class GetAllData {
    constructor(getService) {
        this.getService = getService;
    }
    async getAllData(req, res) {
        try {
            const data = await this.getService.getAllData();
            console.log("Data fetched successfully");
            return res.status(200).send({ success: true, data: data, message: "Data fetched successfully" });
        } catch (err) {
            console.error("Error fetching data: ", err);
            return res.status(500).send({ success: false, message: "Error fetching data", data: err });
        }
    }
}

export default  GetAllData ;