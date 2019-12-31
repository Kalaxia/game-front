import Repository from '~/api/repository';

export default class RankingRepository extends Repository {
    getTerritorialRanking() {
        return this.call('GET', '/api/rankings/territorial');
    }

    getFinancialRanking() {
        return this.call('GET', '/api/rankings/financial');
    }
}