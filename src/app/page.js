import { Inter } from "next/font/google";

import LeoChatbot from "./Components/LeoChatBot";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container">
      <LeoChatbot />
    </div>
  );
}
