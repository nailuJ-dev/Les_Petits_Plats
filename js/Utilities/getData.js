export default class GetData {
    async getDatasApi () {
        const url = '../Data/recipes.json'
        let dataReturn = await fetch(url);
        let data = await dataReturn.json();
        return data;
    };
};