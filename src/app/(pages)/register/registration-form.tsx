export default function RegistrationForm() {
    return (
        <div className="bg-white p-6 w-80 shadow-md rounded">
            <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
            <form>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="border w-full py-2 px-3"
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                    />
                </div>

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

                <div className="mb-6">
                    <label className="block font-bold mb-2" htmlFor="confirm-password">
                        Confirm Password
                    </label>
                    <input
                        className="border w-full py-2 px-3"
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        name="confirm-password"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                        type="button"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
