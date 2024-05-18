export default function LoginForm() {
    return (
        <div className="bg-white p-6 w-80 shadow-md rounded">
            <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
            <form>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="border w-full py-2 px-3"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="border w-full py-2 px-3"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                        type="button"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}
