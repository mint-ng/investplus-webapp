import { redirect } from "next/navigation";
import { INVESTMENT_USER_TOKEN } from "@/constants";
import { cookies } from "next/headers";
import DashboardLayout from "@/components/dashboard-layout/dashboard-layout";
export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
    const Accesstoken = (await cookieStore).get(INVESTMENT_USER_TOKEN)?.value;
    console.log(INVESTMENT_USER_TOKEN)

  if (!INVESTMENT_USER_TOKEN) redirect("/");

      return <DashboardLayout>{children}</DashboardLayout>;
}
