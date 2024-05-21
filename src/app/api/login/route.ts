import { authenticate } from "@/lib/db";

export async function POST(request: Request) {
    try {
        // Parsing
        const formData = await request.json();
        const { email, password } = formData;

        // Validation
        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'All fields are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Business logic
        const result = await authenticate(email, password);

        // Response
        if (result.success) {
            return new Response(JSON.stringify({ message: 'Authentication Successful', accountInfo: result.accountInfo }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Failed to Authenticate' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error in POST /api/authenticate:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
