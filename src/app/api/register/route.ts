import { createAccount } from "@/lib/db";

export async function POST(request: Request) {
    try {
        // Parsing
        const formData = await request.json();
        const { firstName, lastName, email, password } = formData;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // Business logic
        const result = await createAccount(firstName, lastName, email, password);

        if (result.success) {
            return new Response(JSON.stringify({ message: 'Creating Account Successful' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
        } else {
            return new Response(JSON.stringify({ message: 'Failed to Create an Account' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        console.error('Error in POST /api/register:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
