import request from 'request';

export abstract class API<T> {
  protected abstract url: string;

  // Set Params according to the requirement of the API
  protected abstract buildUrl(params: any): void;
  protected abstract parseResponse(res: any): T;

  // Fetch
  protected async fetch(): Promise<T> {
    const res = await this.request();

    return this.parseResponse(res);
  }

  //  Make request and return promise.
  protected request() {
    return new Promise((resolve: any, reject: any) => {
      request({ url: this.url, json: true }, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
}
