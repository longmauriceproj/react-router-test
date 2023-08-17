import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getApplication, updateApplication } from "../applications";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

export async function action({ request, params }) {
  let formData = await request.formData();
  console.log(
    "troubleshooting",
    params.applicationId,
    formData.get("available")
  );
  return updateApplication(params.applicationId, {
    available: formData.get("available") === "true",
  });
}

export async function loader({ params }) {
  const application = await getApplication(params.applicationId);
  if (!application) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { application };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Application() {
  const { application } = useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Application Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <Available application={application} />
        </div>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.first || application.last ? (
                  <>
                    {application.first} {application.last}
                  </>
                ) : (
                  <i>No Name</i>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Application for
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.applicationFor}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.emailAddress}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Salary expectation
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.salaryExpectation}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.about}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Attachments
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {application.attachments && (
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    {application.attachments.map((attachment) => (
                      <li
                        key={attachment.title}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {attachment.title}
                            </span>
                            <span className="flex-shrink-0 text-gray-400">
                              {attachment.size}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="flex">
                <Form action="edit">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit
                  </button>
                </Form>
                <Form
                  method="post"
                  action="destroy"
                  onSubmit={(event) => {
                    if (
                      !confirm("Please confirm you want to delete this record.")
                    ) {
                      event.preventDefault();
                    }
                  }}
                >
                  <button
                    type="submit"
                    className="ml-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </Form>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function Available({ application }) {
  const fetcher = useFetcher();
  // const [enabled, setEnabled] = useState(application.available ? true : false);
  let available = application.available;
  if (fetcher.formData) {
    available = fetcher.formData.get("available") === "true";
  }

  return (
    <fetcher.Form method="post" className="flex items-center pt-6">
      <button name="available" value={available ? "false" : "true"}>
        {available ? (
          <SolidBookmarkIcon className="h-5 w-5 flex-shrink-0 fill-indigo-600" />
        ) : (
          <OutlineBookmarkIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
        )}
      </button>
    </fetcher.Form>
  );

  // return (
  //   <Switch.Group as="div" className="flex items-center justify-between pt-6">
  //     <span className="flex flex-grow flex-col">
  //       <Switch.Label
  //         as="span"
  //         className="text-sm font-medium leading-6 text-gray-900"
  //         passive
  //       >
  //         Available to hire
  //       </Switch.Label>
  //       <Switch.Description as="span" className="text-sm text-gray-500">
  //         Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
  //       </Switch.Description>
  //     </span>
  //     <fetcher.Form method="post">
  //       <Switch
  //         name="available"
  //         value="true"
  //         checked={enabled}
  //         onChange={setEnabled}
  //         className={classNames(
  //           enabled ? "bg-indigo-600" : "bg-gray-200",
  //           "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
  //         )}
  //       >
  //         <span
  //           aria-hidden="true"
  //           className={classNames(
  //             enabled ? "translate-x-5" : "translate-x-0",
  //             "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
  //           )}
  //         />
  //       </Switch>
  //     </fetcher.Form>
  //   </Switch.Group>
  // );
}
