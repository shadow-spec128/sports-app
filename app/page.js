import { signIn, signOut, auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  async function handleSignIn() {
    "use server";
    await signIn("google");
  }

  async function handleSignOut() {
    "use server";
    await signOut();
  }

  if (session) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <img
          src={session.user.image}
          alt="Profile"
          style={{ borderRadius: "50%", width: "80px", height: "80px" }}
        />
        <h2>Welcome, {session.user.name}!</h2>
        <p>{session.user.email}</p>
        <form action={handleSignOut}>
          <button type="submit">Sign out</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Welcome to Sports App</h2>
      <form action={handleSignIn}>
        <button type="submit">Sign in with Google</button>
      </form>
    </div>
  );
}