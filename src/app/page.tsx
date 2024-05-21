// src/app/(pages)/home/page.tsx

import LoginPage from "@/app/(pages)/login/page";
import RegistrationPage from "@/app/(pages)/register/page";
import DashboardPage from "@/app/(pages)/dashboard/page";

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex space-x-4">
                <LoginPage />
                <RegistrationPage />
                <DashboardPage />
            </div>
        </div>
    );
}
