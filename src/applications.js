import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getApplications(query) {
  await fakeNetwork(`getApplications:${query}`);
  let applications = await localforage.getItem("applications");
  if (!applications) applications = [];
  if (query) {
    applications = matchSorter(applications, query, {
      keys: ["first", "last"],
    });
  }
  return applications.sort(sortBy("last", "createdAt"));
}

export async function createApplication() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let application = { id, createdAt: Date.now() };
  let applications = await getApplications();
  applications.unshift(application);
  await set(applications);
  return application;
}

export async function getApplication(id) {
  await fakeNetwork(`application:${id}`);
  let applications = await localforage.getItem("applications");
  let application = applications.find((application) => application.id === id);
  return application ?? null;
}

export async function updateApplication(id, updates) {
  await fakeNetwork();
  let applications = await localforage.getItem("applications");
  let application = applications.find((application) => application.id === id);
  if (!application) throw new Error("No application found for", id);
  Object.assign(application, updates);
  await set(applications);
  return application;
}

export async function deleteApplication(id) {
  let applications = await localforage.getItem("applications");
  let index = applications.findIndex((application) => application.id === id);
  if (index > -1) {
    applications.splice(index, 1);
    await set(applications);
    return true;
  }
  return false;
}

function set(applications) {
  return localforage.setItem("applications", applications);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
