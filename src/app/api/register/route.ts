import { createAccount } from "@/lib/db";

export async function POST(request: Request) {
    // parsing
    const formData = await request.json();
    const { firstName, lastName, email, password } = formData;

    // validation
    if (!firstName || !lastName || !email || !password) {
        return new Response('All fields are required', { status: 400 });
    }

    // business logic
    const result = createAccount(firstName, lastName, email, password);

    // response
    if (result.success) {
        return new Response('Creating Account Successful', { status: 201 });
    } else {
        return new Response('Failed to Create an Account', { status: 400 });
    }
}