export class API<ApiInterface> {
    async fetchData(url: string) {
        // this fetch function is builint
        let apiResponse:ApiInterface = await fetch(url).then((response)=> {
            return response.json()
        });

        return apiResponse;
    }
}