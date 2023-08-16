import { redirect } from "react-router-dom";
import { deleteApplication } from "../applications";

export async function action({ params }) {
  await deleteApplication(params.applicationId);
  return redirect("/");
}
