export class ApiHandler<ApiInterface> {
    async fetchData(url: string) {
        // this fetch function is builint
        let apiResponse = await fetch(url).then((response)=> {
            return response.json()
        });

        console.log(apiResponse);

        return apiResponse;
    }
}