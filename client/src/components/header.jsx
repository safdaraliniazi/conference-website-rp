import React, { useContext } from "react";
import { Bars3Icon, CalendarDateRangeIcon, EnvelopeIcon, HomeIcon, MapIcon, PaperAirplaneIcon, UserCircleIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton, Navbar, Typography } from "@material-tailwind/react";
import { Drawer, Button, List, ListItem, ListItemPrefix, ListItemSuffix } from "@material-tailwind/react";
import { UserContext } from "../UserContext";
import UserAvatar from "./useravatar";
import NavItem from "./navitem";

const NAV_MENU = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/home",
  },
  {
    name: "Submission",
    icon: PaperAirplaneIcon,
    href: "/submission",
  },
  {
    name: "Important Dates",
    icon: CalendarDateRangeIcon,
    href: "/important-dates",
  },
  {
    name: "Committee",
    icon: UserGroupIcon,
    href: "/committee",
  },
  {
    name: "Venue & Accommodation",
    icon: MapIcon,
    href: "/venue-accommodation",
  },
  {
    name: "Contact Us",
    icon: EnvelopeIcon,
    href: "/contact",
  },
];

export function Header({ page = 'nothome' }) {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const { user, logout } = useContext(UserContext);
  const closeDrawer = () => setOpen(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      shadow={false}
      fullWidth
      blurred={false}
      color="transparent"
      className={`fixed top-0 z-50 border-0 transition-all duration-300 ${isScrolling
        ? 'bg-orange-900/95 backdrop-blur-md shadow-lg'
        : page === 'home'
          ? 'bg-transparent'
          : 'bg-orange-900/95 backdrop-blur-md'
        }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            alt="ipdims logo"
            src="/logos/ipdims.png"
            className="h-12 transition-all duration-300"
          />
          <img
            alt="nitr logo"
            src="/logos/nit_rourkela.png"
            className="h-12 transition-all duration-300"
          />
        </div>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem
              key={name}
              href={href}
              className="text-white hover:text-orange-300 transition-colors duration-300"
            >
              <Icon className="h-4 w-4" />
              <span>{name}</span>
            </NavItem>
          ))}
          {user ? (
            <UserAvatar />
          ) : (
            <NavItem
              href="/registration"
              className="text-white hover:text-orange-300 transition-colors duration-300"
            >
              <UserCircleIcon className="h-4 w-4" />
              <span>Registration</span>
            </NavItem>
          )}
        </ul>

        <IconButton
          variant="text"
          color="white"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden hover:bg-orange-800/50"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>

        <Drawer
          open={open}
          onClose={closeDrawer}
          placement="right"
          className="bg-orange-900"
        >
          <div className="mb-2 flex items-center justify-between p-4 border-b border-orange-800">
            <Typography variant="h5" className="font-bold text-white">
              Menu
            </Typography>
            <IconButton variant="text" color="white" onClick={closeDrawer} className="hover:bg-orange-800/50">
              <XMarkIcon className="h-5 w-5" />
            </IconButton>
          </div>
          <List className="p-4">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <ListItem
                key={name}
                onClick={closeDrawer}
                className="hover:bg-orange-800/50 focus:bg-orange-800/50"
              >
                <ListItemPrefix>
                  <Icon className="h-5 w-5 text-orange-300" />
                </ListItemPrefix>
                <a href={href} className="text-white hover:text-orange-300">
                  {name}
                </a>
              </ListItem>
            ))}
            {user ? (
              <ListItem className="hover:bg-orange-800/50 focus:bg-orange-800/50">
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 text-orange-300" />
                </ListItemPrefix>
                <div className="flex items-center justify-between w-full">
                  <span className="text-white">{user.fullName}</span>
                  <Button
                    onClick={logout}
                    size="sm"
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white"
                  >
                    Logout
                  </Button>
                </div>
              </ListItem>
            ) : (
              <ListItem
                onClick={closeDrawer}
                className="hover:bg-orange-800/50 focus:bg-orange-800/50"
              >
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 text-orange-300" />
                </ListItemPrefix>
                <a href="/registration" className="text-white hover:text-orange-300">
                  Registration
                </a>
              </ListItem>
            )}
          </List>
        </Drawer>
      </div>
    </Navbar>
  );
}

export default Header;
