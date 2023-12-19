import { FC } from "react";
import { useAuthStore } from "../../services/stores/authStore";

export const Home: FC = () => {
  const setLogin = useAuthStore((s) => s.setLogin);

  return (
    <>
      Home page
      <button onClick={() => setLogin(false)}>Log out</button>
    </>
  );
};
