import React, { useContext } from 'react';
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    PowerIcon,
    UserCircleIcon,
    Squares2X2Icon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const menuItems = [
    {
        label: "My Dashboard",
        icon: Squares2X2Icon,
        href: "/user/dashboard"
    },
    {
        label: "My Profile",
        icon: UserCircleIcon,
        href: "/user/profile"
    },
    {
        label: "Help",
        icon: QuestionMarkCircleIcon,
        href: "/help"
    }
];

export function UserAvatar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="white"
                    className="flex items-center gap-3 rounded-full py-0.5 pr-2 pl-0.5 hover:bg-orange-800/50 transition-colors"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="User"
                        className="border border-orange-300/50 p-0.5"
                        src={user?.profileImage || "https://docs.material-tailwind.com/img/face-2.jpg"}
                    />
                    <Typography className="text-sm font-normal text-white">
                        {user?.fullName?.split(' ')[0]}
                    </Typography>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-4 w-4 text-white transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>

            <MenuList className="p-2">
                {menuItems.map(({ label, icon: Icon, href }, index) => {
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => {
                                navigate(href);
                                closeMenu();
                            }}
                            className={`flex items-center gap-3 rounded-lg hover:bg-orange-500/10 hover:text-orange-500 focus:bg-orange-500/10 focus:text-orange-500 ${index === menuItems.length - 1 ? "" : "mb-1"
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            <Typography
                                as="span"
                                variant="small"
                                className="font-medium"
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}

                <hr className="my-2 border-blue-gray-50" />

                <MenuItem
                    onClick={() => {
                        logout();
                        closeMenu();
                    }}
                    className="flex items-center gap-3 rounded-lg hover:bg-red-500/10 hover:text-red-500 focus:bg-red-500/10 focus:text-red-500"
                >
                    <PowerIcon className="h-5 w-5" />
                    <Typography
                        as="span"
                        variant="small"
                        className="font-medium"
                    >
                        Sign Out
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default UserAvatar;