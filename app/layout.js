import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import "@/app/_styles/globals.css";

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
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer className="">Copyright &copy; by The Wild Oasis</footer>
      </body>
    </html>
  );
}
