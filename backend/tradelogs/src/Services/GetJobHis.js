class GetJobHistory {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async JobsHis() {
        return await this.userRepository.getJobsHis();
    }
}

export default GetJobHistory;