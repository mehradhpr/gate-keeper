import { FormEvent } from "react";

import { useAppContext } from "@/app/contexts/context-provider";

export const handleClientLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { setToken, setAccount,
        setHasAccess, setIsAdmin } = useAppContext();

    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const formData = { email, password };

    // sending the form data to the server
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    response.json().then((data) => {
        if (response.ok) {
            // set the token and account info in the context
            setToken(data.accountInfo.token);
            setAccount(data.accountInfo.account);
            setHasAccess(true);
            setIsAdmin(data.accountInfo.isAdmin);
        } else {
            console.error('Failed to authenticate:', data.message);
        }
    });

}