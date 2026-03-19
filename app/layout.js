import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    default: "The Wild Oasis",
    template: "%s The Wild Oasis",
  },

  description:
    "Luxurious cabins in the heart of the woods and mountains, where you can reconnect with nature and enjoy simple pleasures with family.",

  //* DON'T NEED TO TYPE IT SINCE IT'S NAMED icon AND THIS IS THE DEFAULT VALUE FOR FAVICON
  // * WOULD NEED TO TYPE IT IF IT HAD A DIFFERENT NAME EX: icon: "favicon.png",

  // icons: {
  //   icon: "icon.png",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} relative antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col `}
      >
        <Header />

        <div className="flex-1 px-8 py-12 ">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
