import AuthForm from "../components/AuthForm";
import { data, redirect } from "react-router-dom";

function Authentication() {
  return <AuthForm />;
}

export default Authentication;

export async function authAction({ request }) {

  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw data(
      { message: "Could not authenticate the user." },
      { status: 500 }
    );
  }

  const resData = await response.json();
  localStorage.setItem('token', resData.token);

  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 1);
  localStorage.setItem('expiration', expirationTime.toISOString());

  return redirect("/");
}
