import { authenticate } from "@/lib/db";

export async function POST(request: Request) {
    // parsing
    const formData = await request.json();
    const { email, password } = formData;

    // validation
    if (!email || !password) {
        return new Response('All fields are required', { status: 400 });
    }

    // business logic
    const result = authenticate(email, password);

    // response
    if (result.success) {
        return new Response('Login successful', { status: 200 });
    } else {
        return new Response('Invalid credentials', { status: 401 });
    }
}