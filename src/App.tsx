import { useEffect, useState } from "react";
import "./App.css";
import { superbase } from "../superbaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";

function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    superbase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = superbase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await superbase.auth.signOut();
    if (error) console.log("Error signing out:", error.message);
  };
  if (!session) {
    return (
      <Auth supabaseClient={superbase} appearance={{ theme: ThemeSupa }} />
    );
  } else {
    return (
      <div>
        <h1> Logged in with {session?.user?.email}</h1>
        <button onClick={signOut}>Signout</button>
      </div>
    );
  }
}

export default App;
