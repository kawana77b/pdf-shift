import { Header } from "@/components/header";
import { Workspace } from "@/components/Workspace";

import { Overlay } from "./Overlay";

const MainLayout = async () => {
  return (
    <div className="relative flex flex-col w-screen h-screen">
      <Header />
      <Workspace />
      <Overlay />
    </div>
  );
};

export default function Root() {
  return (
    <main className="h-full">
      <MainLayout />
    </main>
  );
}
