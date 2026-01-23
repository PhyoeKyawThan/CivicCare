import { LoginCredentials, SignupData, User } from "@/constants/auth";
import { deleteToken, setToken } from "@/utils/auth/seure-storage";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    user: User | null;
    login: (data: { user: LoginCredentials; }) => Promise<void>;
    signup: (data: { user: SignupData; }) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const { getItem, setItem, removeItem } = useAsyncStorage("auth");

    useEffect(() => {
        const restoreAuth = async () => {
            try {
                const stored = await getItem();
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setUser(parsed.user);
                    // setToken(parsed.token);
                }
            } catch (e) {
                console.error("Failed to restore auth", e);
            } finally {
                setLoading(false);
            }
        };

        restoreAuth();
    }, []);

    const login = async (data: { user: LoginCredentials }) => {
        const user: User = {
            'id': 1,
            'username': 'domak',
            'email': 'domak@gmail.com',
            'fullName': 'domak',
            'role': 'citizan',
        };
        const token = "thisistokenfrom request";
        setUser(user);
        setToken(token);
        await setItem(JSON.stringify(data));
    };

    const signup = async (data: { user: SignupData;}) => {
        // let user: User = data.user;
        
        setUser(user);
        const token = "thisistokenfrom request";
        setToken(token);
        await setItem(JSON.stringify(data));
    };

    const logout = async () => {
        setUser(null);
        deleteToken();
        await removeItem();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
