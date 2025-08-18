import Login from "@/components/pages/auth/Login";
import getServerSession from "next-auth";

const LoginPage = async () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
