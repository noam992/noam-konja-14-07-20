export class Config {

    public static serverUrl: string;

    public static _initialize() {
        if(process.env.NODE_ENV === "production") {
            Config.serverUrl = "https://my-beset-rest-ever.herokuapp.com"; // add port 
        }
        else {
            Config.serverUrl = "http://localhost:3000";
        }
    }
}

Config._initialize();