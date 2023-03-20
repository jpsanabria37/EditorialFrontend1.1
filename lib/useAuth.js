import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { jwtVerify } from "jose";

export default function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { payload } = await jwtVerify(
          token,
          `${process.env.NEXT_PUBLIC_JWT_KEY}`
        );
        setUser(payload);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("access_token");
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  function login(token) {
    localStorage.setItem("access_token", token);
    setUser(token);
    router.push("/");
  }

  function logout() {
    localStorage.removeItem("access_token");
    setUser(null);
    router.push("/login");
  }

  return { user, loading, login, logout };
}
