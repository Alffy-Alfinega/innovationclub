import { auth } from "@/lib/auth";
import PageHeader from "@/components/dashboard/PageHeader";
import AccountForm from "./AccountForm";

export default async function AccountPage() {
  const session = await auth();
  return (
    <div>
      <PageHeader eyebrow="Account" title="Update your details." />
      <AccountForm name={session?.user?.name || ""} email={session?.user?.email || ""} />
    </div>
  );
}
