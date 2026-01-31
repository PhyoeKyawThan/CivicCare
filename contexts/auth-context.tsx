import { LoginCredentials, SignupData, User } from "@/constants/auth";
import { useServicesEndPoints } from "@/constants/services_endpoints";
import { deleteRefreshToken, deleteToken, getToken, setRefreshToken, setToken } from "@/utils/auth/seure-storage";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    user: User | null;
    login: (data: { user: LoginCredentials; }) => Promise<void>;
    signup: (data: { user: SignupData; }) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { loginEntry, signupEntry, refreshTokenEntry } = useServicesEndPoints()

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
        try {
            const response = await fetch(loginEntry, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': data.user.email,
                    'password': data.user.password
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.non_field_errors?.[0] || 'Login Failed');
            } else {
                const resData = await response.json();
                const token = resData.access;
                const user = resData.user;
                const refreshToken = resData.refresh;
                setUser(user);
                await setToken(token);
                await setRefreshToken(refreshToken);
            }
        } catch (error) {
            let message = 'Server Error, Login failed!';

            if (error instanceof Error) {
                throw new Error(error.message ?? message);
            }
        }
    };

    const signup = async (data: { user: SignupData; }) => {
        try {
            const response = await fetch(signupEntry, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': data.user.username,
                    'full_name': data.user.fullName,
                    'phone': data.user.phone,
                    'role': data.user.role,
                    'email': data.user.email,
                    'date_of_birth': data.user.dateOfBirth,
                    'password': data.user.password
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.non_field_errors?.[0] || 'Signup failed');
            }

            const resData = await response.json();
            const token = resData.access;
            const user = resData.user;
            const refreshToken = resData.refresh;
            setUser(user);
            await setToken(token);
            await setRefreshToken(refreshToken);
        } catch (error) {
            throw new Error('Server Error, Signup failed!');
        }
    };

    const refreshToken = async () => {
        const refresh = await getToken();
        try {
            const response = await fetch(refreshTokenEntry, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refresh}`
                },
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.non_field_errors?.[0] || 'Signup failed');
            }

            const resData = await response.json();
            const token = resData.access;
            const user = resData.user;
            const refreshToken = resData.refresh;
            setUser(user);
            await setToken(token);
            await setRefreshToken(refreshToken);
        } catch (error) {
            throw new Error('Server Error, Signup failed!');
        }
    }

    const logout = async () => {
        setUser(null);
        deleteToken();
        deleteRefreshToken();
        await removeItem();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                refreshToken,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
