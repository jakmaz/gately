export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-muted-foreground">
        Last updated: June 01, 2025
      </p>

      <p className="mb-4">
        Gately is a client-side logic gate simulator. Your privacy is important to us, and we want to be transparent about how data is handled.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Data Collection</h2>
      <p className="mb-4">
        This website does not collect or store any personal information by default. Circuit data is stored locally in your browser using localStorage.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Sharing Circuits</h2>
      <p className="mb-4">
        If you choose to share a circuit, its data will be stored anonymously on our servers to generate a shareable link. We do not attach any identifying information to the data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Cookies and Tracking</h2>
      <p className="mb-4">
        This site does not use cookies, analytics tools, or third-party tracking scripts.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        If this app is hosted on a platform such as Vercel, basic technical logs (e.g., IP address, request metadata) may be collected by the hosting provider for security and performance reasons. We do not access or use this data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, feel free to reach out at{" "}
        <a href="mailto:contact@jakmaz.com" className="underline hover:text-foreground">
          contact@jakmaz.com
        </a>.
      </p>
    </main>
  );
}
