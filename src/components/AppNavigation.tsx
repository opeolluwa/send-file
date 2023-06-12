// import Home from '@/pages/home'
import {
  Cog8ToothIcon,
  HomeIcon,
  FolderOpenIcon,
  InformationCircleIcon,
  ShareIcon,
  ClockIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import {
  Cog8ToothIcon as SolidCog8ToothIcon,
  HomeIcon as SolidHomeIcon,
  FolderOpenIcon as SolidFolderIconOpen,
  InformationCircleIcon as SolidInformationIcon,
  ShareIcon as SolidShareIcon,
  SignalIcon as SolidSignalIcon,
  ClockIcon as SolidClockIcon,
} from "@heroicons/react/24/solid";
import { DialogFilter, message, ask } from "@tauri-apps/api/dialog";
import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { allowedExtension, goToPage as gotoPage } from "@/utils";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import QRCode from "react-qr-code";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
/**
 * @function openFileManager - opens a file manager
 * @returns {Array<Files>} an array of selected files
 */
async function openFileManager() /* : Array<File> */ {
  // Open a selection dialog for directories
  const selected = await open({
    directory: true,
    multiple: true,
    filters: allowedExtension,
    // defaultPath: await appDir(),
  }).catch((err) => {
    message("error opening file manager", {
      title: "Access error",
      type: "error",
    }).then((result) => {
      console.log(result);
    });
  });
  if (Array.isArray(selected)) {
    // user selected multiple directories
  } else if (selected === null) {
    // user cancelled the selection
  } else {
    // user selected a single directory
  }
}

interface Route {
  icon: any; // the route icon
  name: string; // the route name
  alternateIcon: any; // the icon to show on hover or active state
  action?: () => any; // action that will be executed when the route is clicked
  path?: string; // the path string
  isActive?: any;
}
// the port on which th application urn for the sender PC
interface SenderProps {
  port: number;
}

// use this to display the available memory
const ProgressComponent = ({
  systemName,
  freeMemory,
}: {
  systemName: string;
  freeMemory: string;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        left: 0,
        bottom: "45px",
      }}
      className="hidden lg:block"
    >
      <div className="flex justify-between mb-2 px-4 dark:text-gray-400">
        {
          <span className=" font-medium text-blue-700 text-sm capitalize ">
            {systemName}
          </span>
        }

        <span className=" font-medium text-blue-700 text-sm">
          {freeMemory} of 100GB
        </span>
      </div>
      <div className="w-fill bg-gray-200 rounded-md mx-4 h-2">
        <div
          className="bg-app-400  dark:bg-app-dark-50 h-2 rounded-full"
          style={{ width: "45%" }}
        ></div>
      </div>
    </div>
  );
};

interface SystemInformation {
  /// the current user name eg - drizzle
  systemName: string;
  /// available store
  freeMemory: string;
  /// the port on which the core server runs
  port: number;
  /// the system ip address,ex:  192.168.213.230
  ipAddress: string;
  /// the uptime e.g 2 hours
  uptime: string;
}

/**
 * @function QRConnect - display QR code in which URL  for connection is embedded
 * @param url - the core application URl
 * @param serverId, the serverId the application
 * @return UI
 */
function QRConnect({ url }: { url: string }) {
  return (
    <>
      <div
        style={{ background: "white", padding: "4px" }}
        className="flex flex-col items-center rounded"
      >
        <QRCode
          fgColor={"#1e293b"}
          value={url.trim()}
          className="m-4"
          style={{ boxSizing: "border-box", maxWidth: "180px" }}
        />
      </div>
    </>
  );
}

function SendFileComponent() {
  return (
    <form action="">
      <div className="flex flex-col align-center justify-center">
        <label htmlFor="connectionID " className="text-gray-600 sr-only">
          connection ID
        </label>
        <div className="flex items-center my-4 justify-center mx-auto">
          <Image
            src="/icons/Computer-Tablet-and-Phone-Vectors---1.0.0.svg"
            alt="recieve files"
            className="w-[150px]"
            width={400}
            height={400}
          />
        </div>
        <input
          type="text"
          maxLength={6}
          name="connectionID"
          placeholder="enter connection ID"
          id="connectionID"
          className="border-2 placeholder:text-small my-0 w-2/3 mt-10 mx-auto border-gray-300 rounded-md p-2"
        />
      </div>
    </form>
  );
}

//
function ReceiveConfig({
  serverId,
  ipAddress,
}: {
  serverId: number;
  ipAddress: string;
}) {
  return (
    <div className="h-full">
      <div>
        <QRConnect url={`http://${ipAddress.trim()}:${serverId}/`} />
      </div>
      <div className=" font-mono my-2 text-center text-gray-600">
        <strong>ID:</strong>
        {serverId}
      </div>
    </div>
  );
}

export default function AppNavigation() {
  const router = useRouter()
  let [isModalOpen, setModalState] = useState(false);
  const [activeRoute, setActiveRoute] = useState<any>(router.route);
  let [systemInformation, setSystemInformation] = useState(
    {} as SystemInformation
  );
  console.log(router.route)
  console.log(activeRoute)

  useEffect(() => {
    // fetch sys information from app core
    invoke("get_system_information").then((sysInfo) => {
      setSystemInformation((sysInfo as any).data);
    });
  });

  const closeModal = () => setModalState(false);
  const openModal = () => setModalState(true);

  let [showSendConfig, setSendConfig] = useState(false);
  let [showReceiveConfig, setReceiveConfig] = useState(true);

  const showSendComponent = () => {
    setSendConfig(true);
    setReceiveConfig(false);
  };
  const showReceiveComponent = () => {
    setReceiveConfig(true);
    setSendConfig(false);
  };

  const MouseLeave = () => {
    if(activeRoute) {
      setActiveRoute(router.route)
    } else if(router.route !== activeRoute) {
      setActiveRoute(router.route)
    } else {
      setActiveRoute("")
    }
  }

  const routes: Route[] = [
    {
      path: "/",
      icon: <HomeIcon className="w-6 h-6" />,
      name: "home",
      alternateIcon: <SolidHomeIcon className="w-6 h-6" />,
      action: () => gotoPage({ routePath: "/" }),
      isActive: activeRoute === "/",
    },
    {
      icon: <SignalIcon className="w-6 h-6" />,
      name: "Connection",
      alternateIcon: <SolidSignalIcon className="w-6 h-6" />,
      action: openModal,
      isActive: activeRoute === "/connection",
      path:  "/connection",
    },
    {
      path: "/history",
      icon: <ClockIcon className="w-6 h-6" />,
      name: "History",
      alternateIcon: <SolidClockIcon className="w-6 h-6" />,
      action: () => gotoPage({ routePath: "history" }),
      isActive: activeRoute === "/history",
    },
    {
      path: "/files",
      icon: <FolderOpenIcon className="w-6 h-6" />,
      action: openFileManager,
      alternateIcon: <SolidFolderIconOpen className="w-6 h-6" />,
      name: "File Manager",
      isActive: activeRoute === "/files",
    },

    {
      path: "/share",
      icon: <ShareIcon className="w-6 h-6" />,
      name: "Shared files",
      alternateIcon: <SolidShareIcon className="w-6 h-6" />,
      action: () => gotoPage({ routePath: "shared-files" }),
      isActive: activeRoute === "/share",
    },
    {
      path: "/settings",
      icon: <Cog8ToothIcon className="w-6 h-6" />,
      alternateIcon: <SolidCog8ToothIcon className="w-6 h-6" />,
      action: () => gotoPage({ routePath: "settings" }),
      name: "settings",
      isActive: activeRoute === "/settings",
    },
    {
      path: "/help",
      icon: <InformationCircleIcon className="w-6 h-6" />,
      alternateIcon: <SolidInformationIcon className="w-6 h-6" />,
      action: () => gotoPage({ routePath: "help" }),
      name: "help",
      isActive: activeRoute === "/help",
    },
  ];

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto py-10">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full dark:bg-gray-200  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all mb-8">
                  <Dialog.Title
                    as="h3"
                    className="text-sm text-gray-500 text-center"
                  >
                    {showSendConfig &&
                      "Input the connection ID below in the recipient computer"}
                    {showReceiveConfig &&
                      "Scan QR Code or provide Connection ID"}
                  </Dialog.Title>
                  <div className="mt-6 ">
                    {showSendConfig && <SendFileComponent />}
                    {showReceiveConfig && (
                      <ReceiveConfig
                        serverId={systemInformation.port}
                        ipAddress={systemInformation.ipAddress}
                      />
                    )}
                    <div className="text-sm flex justify-center gap-5 text-gray-500 mt-6">
                      <button
                        type="button"
                        className={
                          showReceiveConfig
                            ? "inline-flex justify-center rounded-md   px-4 py-2 text-sm font-medium border bg-gray-600 text-gray-100 border-mirage-500"
                            : "inline-flex justify-center rounded-md   px-4 py-2 text-sm font-medium border border-mirage-500"
                        }
                        onClick={showReceiveComponent}
                      >
                        Send files
                      </button>

                      <button
                        type="button"
                        className={
                          showSendConfig
                            ? "inline-flex justify-center rounded-md   px-4 py-2 text-sm font-medium border bg-gray-600 text-gray-100 border-mirage-500"
                            : "inline-flex justify-center rounded-md   px-4 py-2 text-sm font-medium border border-mirage-500"
                        }
                        onClick={showSendComponent}
                      >
                        Recieve files
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <nav
        className="col-span-1 lg:col-span-2 bg-[rgba(249,250,254,255)]  dark:bg-app-dark-600 px-[1px]   text-gray-600  pt-10"
        style={{
          height: "calc(100vh-200px)",
          overflowY: "hidden",
          position: "relative",
        }}
      >
        <ul className="flex flex-col px-4 pl-6">
          {/**
           * show the icon and the name side by side on full screen mode
           * otherwise, hide the name and show the icons only
           */}
          {routes.map((route, index) => (
            <Link key={index} href={`${route.path}`} legacyBehavior={true}>
              <a
                className={`flex h-6 my-8 lg:my-8 first:mt-10  text-gray-500 cursor-pointer ${
                  route.isActive ? "hover:text-app-600" : "hover:text-gray-700"
                }`}
                onMouseEnter={() => setActiveRoute(route.path)}
                onMouseLeave={() => MouseLeave()}
              >
                <span onClick={route.action} className="cursor-pointer">
                  <span className="sr-only">{route.path}</span>
                  <div className="gap-2 justify-center align-center flex capitalize">
                    {route.isActive ? route.alternateIcon : route.icon}
                    <span className="hidden lg:block" id="route__name">
                      {route.name}
                    </span>
                  </div>
                </span>
              </a>
            </Link>
          ))}
        </ul>

        <ProgressComponent
          systemName={systemInformation.systemName}
          freeMemory={systemInformation.freeMemory}
        />
      </nav>
    </>
  );
}
