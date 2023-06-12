import Aside from "./AppAside";
import Nav from "./AppNavigation";

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
      <div
        className="grid grid-cols-12 mb-0 pb-0"
        id="layout"
        style={{
          height: "100vh",
          overflowY: "hidden",
          marginBottom: 0,
        }}
      >
        <Nav />
        <main className="col-span-11 lg:col-span-7  pt-10 px-20 bg-[rgba(241,246,251,255)]  dark:bg-app-dark overflow-y-scroll">
          {children}
        </main>
        <Aside />
      </div>
    );
}
