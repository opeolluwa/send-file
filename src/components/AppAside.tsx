import FileCard, { FileInterface, FileTransferStatus } from "./FileCard";
import Image from "next/image";

const sampleFIles: FileInterface[] = [
  {
    fileType: "png",
    fileName: "LeonaMillie.mp4.",
    fileSize: 235809,
    status: FileTransferStatus.COMPLETED,
  },

  {
    fileType: "docx",
    fileName: "memo.docx",
    fileSize: 52146,
    status: FileTransferStatus.PENDING,
  },
  {
    fileType: "exe",
    fileSize: 24790181,
    status: FileTransferStatus.PAUSED,
    fileName: "sendfile.exe",
  },
  {
    fileType: "pdf",
    fileName: "2023 financial report",
    fileSize: 235809,
    status: FileTransferStatus.COMPLETED,
  },

  {
    fileType: "mp4",
    fileName: "avatar-2 way of the water",
    fileSize: 452902146,
    status: FileTransferStatus.COMPLETED,
  },
  {
    fileType: "xls",
    fileName: "Student Information.xls",
    fileSize: 241,
    status: FileTransferStatus.COMPLETED,
  },
];

export default function Aside() {
  return (
    <aside className="hidden lg:block lg:flex-col items-center lg:col-span-3 pt-10 px-8  h-full bg-[rgba(226,233,252,255)] dark:bg-app-dark-700">
      {
        <h2 className="font-bold  dark:text-gray-400 flex items-center justify-between mb-10">
          Sent Files
        </h2>
      }
      {/**
       * use state management to display files here
       * a procedure to determine the file type and the right file icon should be added
       */}
      {sampleFIles.length == 0 ? (
        <div
          className="flex flex-col items-center gap-4"
          style={{
            transform: "translateY(-50%)",
            position: "relative",
            top: "50%",
            margin: "o auto",
            width: "200px",
            // left:'50%'
          }}
        >
          <Image
            src={"/icons/empty-state.svg"} // Route of the image file
            height={100} // Desired size with correct aspect ratio
            width={100} // Desired size with correct aspect ratio
            alt="file card icon"
            className="" // automatic height calculation
          />
          <h3 className="text-gray-400 mt-4">No recent files </h3>
        </div>
      ) : (
        sampleFIles.map((file, index) => (
          <FileCard
            key={index}
            fileType={file.fileType}
            fileName={file.fileName}
            fileSize={file.fileSize}
            status={file.status}
          />
        ))
      )}
    </aside>
  );
}
