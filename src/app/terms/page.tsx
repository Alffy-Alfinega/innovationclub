import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">Innovation Club</p>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl mt-2">
          Terms of <span className="text-brand">Participation</span>
        </h1>
        <div className="mt-8 space-y-5 text-sm text-ink-muted leading-relaxed">
          <p>
            By registering, you confirm the information provided is accurate to the best of your
            knowledge and consent to Innovation Club and Makindye Secondary School using it to
            manage your membership, attendance, and participation in club activities.
          </p>
          <p>
            Registration fees, session times, and programme structure are set out in the parent
            information sheet provided at signup and may be updated between trimesters, with
            advance notice.
          </p>
          <p>
            Data collected is used solely for programme administration and is not sold or shared
            with third parties. Contact{" "}
            <a href="mailto:innovation@alfinega.com" className="text-brand hover:underline">
              innovation@alfinega.com
            </a>{" "}
            with any questions or requests regarding your data.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
