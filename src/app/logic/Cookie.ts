import Cookies from "js-cookie";

const COOKIE_NAME = "auth";

export const deleteCookie = () => Cookies.remove(COOKIE_NAME);

export const getCookie = () => Cookies.get(COOKIE_NAME);

export const setCookie = (value: string) => Cookies.set(COOKIE_NAME, value);
