// See your keys here: https://dashboard.stripe.com/apikeys
const Stripe = require('stripe')(
    'sk_test_51L7whJJmSWKwjCzy5cDr7Ysbjqi6m2K57uyx4YDMV1ybkSiTCHy3yyXexrlXP0ro4PBPLz4nOYNZ4Jio0XaGrGnR00wDOJxqoJ'
);

// mrx : 
import Cookies from "js-cookie";

export default async (req, res) => {
    const data = req?.body;
    let UserID = data['UserID'];
    try {
        const verificationSession = await Stripe.identity.verificationSessions.create({
            type: 'document',
            metadata: {
                user_id: UserID,
            },
        });

        const url = verificationSession.client_secret;

        res.status(200).json({
            isSuccess: true,
            message: 'Verification session',
            data: {
                url: url
            }
        });
    } catch (error) {
        res.status(200).json({
            isSuccess: false,
            message: error.message,
        });
    }
};
