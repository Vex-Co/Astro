export class ApiHandler {
    async fetchData(url) {
        // this fetch function is builint
        let apiResponse = await fetch(url).then((response) => {
            return response.json();
        });
        console.log(apiResponse);
        return apiResponse;
    }
}
