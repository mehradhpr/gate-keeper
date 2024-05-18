import LoginPage from "@/app/(pages)/login/page";
import RegistrationPage from "@/app/(pages)/register/page";

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex space-x-4">
                <LoginPage />
                <RegistrationPage />
            </div>
        </div>
    );
}
