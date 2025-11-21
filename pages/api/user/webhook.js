import initStripe from "stripe";
import { buffer } from "micro";
import { useRouter } from "next/router";

// mrx : 
import Cookies from "js-cookie";

// mrx : api links ↓
import {
    TOGGLE_VERIFY_ACOUNT
} from "../index";

import { handleVerifyUSer } from '../../../Hooks/api';

// mrx : api ↓
import { PostUrl, PostAuthUrl, PutAuthUrl, GetAuthUrl, GetUrl } from "../config";

export const config = { api: { bodyParser: false } };

const handler = async (req, res) => {
    const stripe = initStripe("sk_test_51L7whJJmSWKwjCzy5cDr7Ysbjqi6m2K57uyx4YDMV1ybkSiTCHy3yyXexrlXP0ro4PBPLz4nOYNZ4Jio0XaGrGnR00wDOJxqoJ");
    const signature = req.headers["stripe-signature"];
    const signingSecret = "whsec_2854dff123ec5009a3a584c2dabc9778b0ee252f69ac1afb11dd6dfba977f49c";
    const reqBuffer = await buffer(req);
    // const router = useRouter();

    let event;

    try {
        event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
        // Handle the event
        switch (event?.type) {
            case 'identity.verification_session.verified':
                // const paymentIntent = event.data.object;
                console.log(JSON.stringify({
                    isSuccess: true,
                    message: 'user verified successfully',
                }));
                // router.push('/UserHomePage');
                handleVerifyUSer(event?.data?.object?.metadata?.user_id)
                break;
            // ... handle other event types
            default:
                console.log(`.`);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }
    // console.log({ event });

    // Return a 200 response to acknowledge receipt of the event
    // response.send();
};

export default handler;