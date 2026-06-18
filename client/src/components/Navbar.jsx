// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { CiMenuFries } from "react-icons/ci"

const navItems = [
  { name: "Home",        href: "/#hero"        },
  { name: "Skills",      href: "/#skills"      },
  { name: "Experiences", href: "/#experiences" },
  { name: "Education",   href: "/#education"   },
  { name: "Projects",    href: "/#projects"    },
  { name: "Why me?",     href: "/#whyme"   },
  { name: "Contact",     href: "/#contact"     },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 sticky",
        isScrolled
          ? "py-2 bg-black/60 backdrop-blur-md shadow-md"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center px-8">
        
        {/* 1) Logo on the left */}
        <div className="flex-shrink-0">
          <a href="#hero">
            <span className="text-gradient text-3xl font-poppins-bold">
              Justin.
            </span>
          </a>
        </div>

        {/* 2) Nav links centered */}
        <div className="flex-1 hidden md:flex justify-center items-center">
          <ul className="flex justify-center space-x-12 text-white/80">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative px-1 py-2 font-poppins-semibold uppercase"
                >
                  {item.name}
                  <span
                    className="
                      absolute bottom-0 left-0 h-[2px] w-full
                      bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-900
                      transform origin-center scale-x-0
                      group-hover:scale-x-100
                      transition-transform duration-300
                    "
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden ml-auto">
            <Sheet>
                <SheetTrigger className= "flex justify-center items-center">
                    <CiMenuFries className= "text-[32px] text-accent"/>
                </SheetTrigger>
                <SheetContent className = "flex flex-col">
                    <SheetHeader>
                        <SheetTitle className="sr-only"> Navigation Menu  </SheetTitle>
                    </SheetHeader>
                    <div className="mt-24 mb-12 text-center text-2xl">
                        <a href="#hero">
                            <span className="bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-900 bg-clip-text text-transparent text-3xl font-poppins-bold">
                            Justin.
                            </span>
                        </a>
                    </div>
                    <nav className="flex flex-col justify-center items-center gap-5 text-white/80">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="group relative px-1 py-2 font-poppins-semibold uppercase"
                            >
                                {item.name}
                            <span
                                className="
                                    absolute bottom-0 left-0 h-[2px] w-full
                                    bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-900
                                    transform origin-center scale-x-0
                                    group-hover:scale-x-100
                                    transition-transform duration-300
                                "
                                />
                            </a>
                            ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>

        
      </div>
    </nav>
  );
}
