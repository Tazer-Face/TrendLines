class UpdateHisData{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async updateHisData(data){
        return await this.userRepository.updateHisData(data)
    }
}

export default UpdateHisData