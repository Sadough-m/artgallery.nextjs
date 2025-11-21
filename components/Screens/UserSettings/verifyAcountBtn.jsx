import React, { useEffect, useState } from "react";
import Image from "next/image";
import { loadStripe } from '@stripe/stripe-js';

// gm : styles ↓
import Style from "../../../styles/UserSettings.module.css";

// mrx : material ui 
import { Hidden, Grid, Button } from "@material-ui/core";

// mrx : files -->
import checkSvg from "../../../public/images/icons/Check - Circle.svg";

// mrx : 
import Cookies from "js-cookie";
import { CREATE_SESSION } from "../../../pages/api";

class VerifyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { submitted: false };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        this.setState({ stripe: await this.props.stripePromise });
    }

    async handleClick(event) {
        // handleVerifyUSer()
        // Block native event handling.
        event.preventDefault();

        const { stripe } = this.state;

        if (!stripe) {
            // Stripe.js has not loaded yet. Make sure to disable
            // the button until Stripe.js has loaded.
            return;
        }

        // Call your backend to create the VerificationSession.
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ UserID: Cookies.get("USER_ID") })
        };

        const response = await fetch(CREATE_SESSION, requestOptions);
        const session = await response.json();

        // Show the verification modal.
        const { error } = await stripe.verifyIdentity(session?.data?.url);

        if (error) {
            console.log('[error]', error);
        } else {
            // console.log('Verification submitted!');
            location.reload();
            this.setState({ submitted: true });
        }
    };

    render() {
        const { stripe, submitted } = this.state;

        return (
            <Button
                variant="contained"
                color="secondary"
                startIcon={<Image src={checkSvg} />}
                className={Style.btn_verify_account}
                disabled={!stripe}
                onClick={this.handleClick}
            >
                Verify Account
            </Button>
        );
    }
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51L7whJJmSWKwjCzyeAWfAe59eyDJMW1usHoB9mxIFDAQK0LwE6R9uYAKqhMxo2DenBpduvZo6L8UYtmyohpw9Zab00pnohSOSj');

const App = () => {
    return (
        <VerifyButton stripePromise={stripePromise} />
    );
};

export default App;