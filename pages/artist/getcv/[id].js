import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import Joi from "joi";
import { toast } from "react-toastify";

import Add from '../add';

function SavedArtist() {
    const router = useRouter();
    const [ArtistId, setArtistId] = useState("")

    useEffect(() => {
        if (router.asPath !== router.route) {
            const { id } = router.query;
            setArtistId(id);
        }
    }, [router]);

    return (
        <Add IsPrivateY={false} ArtistID={ArtistId} />
    );
}

export default SavedArtist;

