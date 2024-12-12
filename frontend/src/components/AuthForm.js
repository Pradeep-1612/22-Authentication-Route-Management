import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData();
  const navigation = useNavigation();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {actionData && actionData.errors && (
          <ul>
            {Object.values(actionData.errors).map((itemValue) => (
              <li key="itemValue" style={{ color: "red" }}>
                {itemValue}
              </li>
            ))}
          </ul>
        )}
        {actionData && actionData.message && (
          <p style={{ color: "red" }}>{actionData.message}</p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`} type="button">
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button>{isSubmitting ? "Submitting..." : "Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
