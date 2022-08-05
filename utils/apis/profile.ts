import { unauthInstance, authInstance } from "./instance";

export const login = (payload: {
  email: string;
  oauthType: "GOOGLE" | "NAVER" | "KAKAO";
}) => unauthInstance.post("/login", payload);

export const loginSuccess = () => authInstance.get("/login/success");

export const profiles = (payload: { username: string; categories: string[] }) =>
  authInstance.post("/profiles", payload);

export const profilesMe = () => authInstance.get("/profiles/me");
