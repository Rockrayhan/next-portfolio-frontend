import { authOptions } from "@/helpers/authOptions";
import { getUserSession } from "@/helpers/getUserSession";
import { getServerSession } from "next-auth";

const DashboardHomePage = async () => {
  // const session = await getServerSession(authOptions);
  const session = await getUserSession()
  // console.log(session?.user?.id);

  return (
    <div>
      <h1>Dashboard Home Page</h1>
      <p>
        {" "}
        Welcome <b> {session?.user?.name} </b>{" "}
      </p>
    </div>
  );
};

export default DashboardHomePage;
