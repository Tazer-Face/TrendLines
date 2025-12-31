class GetAllHisDataService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAllData() {
        return await this.userRepository.getAllData();
    }
}

export default GetAllHisDataService;