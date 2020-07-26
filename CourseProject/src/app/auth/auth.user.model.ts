export class User {
    constructor(
        public email,
        public id: string,
        private _token: string,
        private _tokenExpirationDate) { }


    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}