class AddStratergy{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async addStratergy(data){
        return await this.userRepository.addStratergy(data);
    }
}

export default AddStratergy