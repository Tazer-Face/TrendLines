class GetAllStratergies{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async getAllStratergie(){
        return await this.userRepository.getAllStratergies();
    }
}

export default GetAllStratergies