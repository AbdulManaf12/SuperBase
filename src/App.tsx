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
  
  if (!session) {
    return (
      <Auth supabaseClient={superbase} appearance={{ theme: ThemeSupa }} />
    );
  } else {
    return <div>Logged in with {session?.user?.email}</div>;
  }
}

export default App;
