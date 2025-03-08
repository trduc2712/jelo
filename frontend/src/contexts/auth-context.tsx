import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { getCurrentUser } from "../api/auth-api";
import { User } from "../interfaces/user";
interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchUserData = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
      }
    };

    if (accessToken) {
      fetchUserData();
    }
  }, [accessToken]);

  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
