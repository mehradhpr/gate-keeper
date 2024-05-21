// A simple memory-based database

type account = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const db: account[] = [];

export function createAccount(firstName: string, lastName: string, email: string, password: string) {
    // verifying if the account already exists
    const existingAccount = db.find(acc => acc.email === email);
    if (existingAccount) {
        return { success: false, message: 'Account already exists' };
    }
    else {
        db.push({ firstName, lastName, email, password });
        return { success: true, message: 'Account created successfully' };
    }
}

export function authenticate(email: string, password: string): { success: boolean; accountInfo: account | undefined } {
    const account = db.find(acc => acc.email === email && acc.password === password);
    return {
        success: !!account,
        accountInfo: account
    };
}