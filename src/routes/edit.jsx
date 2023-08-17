import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateApplication } from "../applications";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { PaperClipIcon } from "@heroicons/react/20/solid";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const position = updates.applicationFor.toLowerCase().split(" ").join("_");
  updates.attachments = [
    { title: `resume_${position}.pdf`, size: "2.4mb" },
    { title: `coverletter_${position}.pdf`, size: "4.5mb" },
  ];
  await updateApplication(params.applicationId, updates);
  return redirect(`/applications/${params.applicationId}`);
}

export default function EditApplication() {
  const { application } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Form method="post">
          <div className="space-y-12">
            <div className="border-b border-graay-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Application
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please fill out the form below to submit your job application.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={application.first}
                      type="text"
                      name="first"
                      id="first"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={application.last}
                      type="text"
                      name="last"
                      id="last"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="applicationFor"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Application for
                  </label>
                  <div className="mt-2">
                    <select
                      id="applicationFor"
                      name="applicationFor"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      defaultValue={application.applicationFor}
                    >
                      <option value="Frontend Developer">
                        Frontend Developer
                      </option>
                      <option value="Backend Developer">
                        Backend Developer
                      </option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="emailAddress"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={application.emailAddress}
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="salaryExpectation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Salary expectation
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={application.salaryExpectation}
                      id="salaryExpectation"
                      name="salaryExpectation"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={application.about}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="attachments"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Attachments
                  </label>
                  {application.attachments ? (
                    <>
                      <ul
                        role="list"
                        className="mt-2 divide-y divide-gray-100 rounded-md border border-gray-200"
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
                                Remove
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <DocumentPlusIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="attachments"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="attachments"
                                name="attachments"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PDF, DOCX, TXT up to 10MB
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <DocumentPlusIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="attachments"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="attachments"
                              name="attachments"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
