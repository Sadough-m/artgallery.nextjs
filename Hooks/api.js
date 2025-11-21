// mrx : api links ↓
import {
    TOGGLE_VERIFY_ACOUNT,
} from "../pages/api/index";

// mrx : 
import Cookies from "js-cookie";

// mrx : api ↓
import { PostUrl, PostAuthUrl, PutAuthUrl, GetAuthUrlSSR, GetUrl } from "../pages/api/config";

export const handleVerifyUSer = async (UserID) => {
    if (UserID) {
        const requestOptions = {
            method: 'GET',
        };

        fetch(`https://backend.artor.net/api/User/ToggleVerifyAccount/${UserID}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("message : " + data?.message);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
}