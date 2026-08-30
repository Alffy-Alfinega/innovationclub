import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { prisma } from "@/lib/prisma";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  const schools = await prisma.school.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-16">
        <RegisterForm schools={schools} />
      </main>
      <Footer />
    </>
  );
}
