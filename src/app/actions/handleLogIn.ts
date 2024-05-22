import { FormEvent } from "react";
import { LogInAPIResponse, TokenContextState } from "@/interfaces/interfaces";

export const handleClientLogIn = async (
  event: FormEvent<HTMLFormElement>,
  tokenState: TokenContextState,
): Promise<void> => {
  event.preventDefault();

  const form = event.currentTarget;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement)
    .value;

  const formData = { email, password };

  let response: LogInAPIResponse;
  try {
    // fetch the log in response
    const serverResponse = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // Get the response data
    if (serverResponse.ok) {
      response = await serverResponse.json();
    } else {
      console.error("fetching login API failed", serverResponse);
      return;
    }
  } catch (error) {
    console.error("fetching login API failed", error);
  }

  // Set the token in the context
  tokenState.setToken(response.body.accountToken);
};
