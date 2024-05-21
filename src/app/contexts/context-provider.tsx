'use client'

import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface Account {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface AppContextType {
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
    account: Account;
    setAccount: Dispatch<SetStateAction<Account>>;
    hasAccess: boolean;
    setHasAccess: Dispatch<SetStateAction<boolean>>;
    isAdmin: boolean;
    setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [account, setAccount] = useState<Account>({ firstName: '', lastName: '', email: '', role: '' });
    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ token, setToken, account, setAccount, hasAccess, setHasAccess, isAdmin, setIsAdmin }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
