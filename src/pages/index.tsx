import PageTitle from "@/components/PageTitle";
import SearchBar from "@/components/SearchBar";
import {
  Bars3BottomLeftIcon,
  CloudArrowDownIcon,
  ComputerDesktopIcon,
  MusicalNoteIcon,
  PhotoIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface QuickAccessTab {
  name: string;
  icon: any;
}

const quickAccessTabs: QuickAccessTab[] = [
  {
    name: "Images",
    icon: (
      <PhotoIcon className="rounded-lg my-4 mx-2 flex w-[47.5px] text-gray-100 dark:text-app-dark-300" />
    ),
  },
  {
    name: "Music",
    icon: (
      <MusicalNoteIcon className="rounded-lg my-4 mx-2 flex w-[47.5px]   text-gray-100 dark:text-app-dark-300" />
    ),
  },
  {
    name: "Videos",
    icon: (
      <PlayIcon className="rounded-lg my-4 mx-2 flex w-[47.5px]   text-gray-100 dark:text-app-dark-300" />
    ),
  },
  {
    name: "Documents",
    icon: (
      <Bars3BottomLeftIcon className="rounded-lg my-4 mx-2 flex w-[47.5px]   text-gray-100 dark:text-app-dark-300" />
    ),
  },
];

const recentFiles = [
  {
    name: "image1.jpg",
    size: "1.2MB",
    lastModified: new Date().toLocaleDateString("en-us", {
      month: "short",
      year: "numeric",
      weekday: "long",
      day: "numeric",
    }),
  },
  {
    name: "image2.jpg",
    size: "1.2MB",
    lastModified: new Date().toLocaleDateString("en-us", {
      month: "short",
      year: "numeric",
      weekday: "long",
      day: "numeric",
    }),
  },
  {
    name: "image3.jpg",
    size: "1.2MB",
    lastModified: new Date().toLocaleDateString("en-us", {
      month: "short",
      year: "numeric",
      weekday: "long",
      day: "numeric",
    }),
  },
  {
    name: "image3.jpg",
    size: "1.2MB",
    lastModified: new Date().toLocaleDateString("en-us", {
      month: "short",
      year: "numeric",
      weekday: "long",
      day: "numeric",
    }),
  },
];

export default function Main() {
  return (
    <>
      <section>
        <SearchBar
          onSearch={function (city: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </section>

      <section className="my-12">
        <PageTitle title={"Quick Access"} />
        <ul className="flex flex-wrap gap-24 items-center justify-start mt-4 px-8">
          {quickAccessTabs.map((tab, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-center w-10 h-10 lg:w-20 lg:h-20"
            >
              <Link
                href={"quick-access/" + tab.name.toLowerCase()}
                className="rounded-[12px] shadow shadow-gray-500 px-3 bg-[#3074f5] dark:bg-app-dark dark:shadow-app-dark-500 "
                style={{
                  backgroundColor: "",
                }}
              >
                <div className="hover:brightness-50 sepia-0">{tab.icon}</div>
              </Link>
              <span className="text-gray-600 block mt-2 text-small">
                {tab.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/**recent files section */}
      <section className="my-16 ">
        <h2 className="flex justify-between mt-24 mb-4 ">
          <span className=" font-medium dark:text-gray-400">Recent Files</span>
          <Link
            href="/history"
            className="text-gray-500 text-violet-600 dark:text-violet"
          >
            view all
          </Link>
        </h2>

        <div className="relative overflow-x-auto bg-white dark:shadow-app-dark-700 dark:shadow-md dark:bg-app-dark-600 rounded-[24px] shadow-lg px-4 py-8 ">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-l-lg">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  Last Modified
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {recentFiles.map((file, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{file.name}</td>
                  <td className="px-6 py-4">{file.size}</td>
                  <td className="px-6 py-4">{file.lastModified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="my-16 hidden">
        <h2 className="flex justify-between mt-20 mb-8 ">
          <span className=" font-medium dark:text-gray-400">Recent Files</span>
          <span className="text-gray-500 dark:text-violet">view all</span>
        </h2>
      </section>
    </>
  );
}
