export const metadata = {
  title: "Thank You | coolyne",
  description: "Your request has been submitted successfully."
};

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-24 text-primary">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Thank you</h1>
        <p className="mb-3 text-lg text-on-surface-variant">
          Your request has been submitted successfully.
        </p>
        <p className="text-base text-on-surface-variant">We will contact you soon.</p>
      </div>
    </main>
  );
}
