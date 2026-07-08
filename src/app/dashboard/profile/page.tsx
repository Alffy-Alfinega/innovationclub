import { auth } from "@/lib/auth";
import PageHeader from "@/components/dashboard/PageHeader";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const session = await auth();
  return (
    <div>
      <PageHeader eyebrow="Account" title="Profile." />
      <ProfileForm name={session?.user?.name || ""} email={session?.user?.email || ""} />
    </div>
  );
}
