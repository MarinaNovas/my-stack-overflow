import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constans/routes";

const Home = () => {
  return (
    <>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
};

export default Home;
