import { FC, useEffect } from "react";
import { useAuthStore } from "../../services/stores/authStore";
import ButtonPrimary, {
  ButtonSizes,
} from "@bookd/bookd-ui/components/buttons/ButtonPrimary";
import useRooms from "../../services/entities/rooms";
import { trpc } from "../../services/trpc";
import useBookings from "../../services/entities/booking";

export const Login: FC = () => {
  const setLogin = useAuthStore((s) => s.setLogin);

  // Example usage
  const { data } = trpc.bookings.getBookings.useQuery("hello world");
  const {
    updateRoom: { updateRoom },
  } = useRooms();
  const { bookings } = useBookings();
  // const { mutate: mutateLogin } = trpc.auth.login.useMutation()
  
  console.log(bookings.data?.result);

  useEffect(() => {
    const fetch = async () => {
      const data = await updateRoom({
        message: "hello",
      });
      console.log(data);
    };
    fetch();

    // mutateLogin({
    //   phoneNumber: '40733989550',
    //   password: 'parola'
    // })
  }, []);

  return (
    <>
      Login
      <ButtonPrimary
        text="click me!"
        size={ButtonSizes.default}
        onClick={() => console.log("clicked!!!")}
      />
      {data?.result}
      <button onClick={() => setLogin(true)}>Log in</button>
    </>
  );
};
