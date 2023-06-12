/**
 *
 * render the file in the UI
 * the component contains png/svg to show illustrating the file type
 * the file size
 * and the file status
 */

import { computeFileSize, isClient } from "@/utils";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  CheckCircleIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
//import 'file-icons-js/css/style.css'
export enum FileTransferStatus {
  DOWNLOADING = "downloading",
  PAUSED = "paused",
  PENDING = "pending",
  COMPLETED = "completed",
}
// the required data to render the file card component
// the data will be passed dynamically
export interface FileInterface {
  fileType: string;
  fileName: string;
  fileSize: number;
  status: FileTransferStatus;
}

// the component
export default function FileCard({
  fileName,
  fileSize,
  fileType,
  status,
}: FileInterface) {
  const fileT = fileType as any;
  return (
    <>
      <div className="flex justify-between items-center my-8 flex-wrap bg-[#edeffb]  border-gray-900  p-3 rounded-lg shadow-md shadow-gray-300 cursor-pointer dark:shadow-sm hover:shadow-sm hover:shadow-gray-400 transition-shadow ease-in-out dark:border-app-dark-500 dark:border-[1px]  dark:bg-app-dark">
        <Image
          src={`/images/mime/${fileType}.png`} // Route of the image file
          height={120} // Desired size with correct aspect ratio
          width={120} // Desired size with correct aspect ratio
          alt="file card icon"
          className="w-[48px] col-span-1" // automatic height calculation
        />

        <div className="flex flex-col text-ellipsis">
          <h5 className="font-medium text-gray-500 overflow-clip text-ellipsis">
            {fileName}
          </h5>
          <div
            className="flex gap-3 mt[1.5px] text-gray-400  italic text-xs height={30} // Desired size with correct aspect ratio
                width={30} "
          >
            <span>{computeFileSize(fileSize)}</span>{" "}
            <span>{` transfer ${status}`}</span>
          </div>
        </div>

        <div className="hidden lg:block">
          {status == FileTransferStatus.COMPLETED ? (
            <CheckCircleIcon className="w-8 h-8 text-gray-400 " />
          ) : status == FileTransferStatus.DOWNLOADING ? (
            <PauseCircleIcon className="w-8 h-8 text-gray-400 " />
          ) : status == FileTransferStatus.PAUSED ? (
            <PlayCircleIcon className="w-8 h-8 text-gray-400 " />
          ) : status == FileTransferStatus.PENDING ? (
            <ArrowUpCircleIcon className="w-8 h-8 text-gray-400 " />
          ) : (
            <ArrowDownCircleIcon className="w-8 h-8 text-gray-400 " />
          )}
        </div>
      </div>
    </>
  );
}
