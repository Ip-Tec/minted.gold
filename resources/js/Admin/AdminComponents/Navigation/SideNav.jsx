import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Category from "@/Components/icons/Category";
import Logout from "@/Components/icons/Logout";
import Order from "@/Components/icons/Order";
import ProductIcon from "@/Components/icons/ProductIcon";
import Setting from "@/Components/icons/Setting";
import { Link, router, usePage } from "@inertiajs/react";

export default function SideNav({ show }) {
    const { props, scrollRegions, rememberedState } = usePage();

    const inactiveLink = "flex gap-1 p-4 my-4 text-lg hover:bg-highlight ";
    const activeLink = inactiveLink + " bg-highlight text-black rounded-md";
    const inactiveIcon = "w-6 h-6";
    const activeIcon = inactiveIcon + " text-primary";

    return (
        <aside
            className={
                "left-0 fixed text-gray-500 w-auto transition-all h-full bg-slate-300 border-r-slate-600 border-red pl-0 pt-0"
            }
        >
            <nav className="flex flex-col gap-2 h-screen  bg-slate-300 text-black w-full relative ">
                <ResponsiveNavLink
                    className="text-black flex h-16 items-center justify-between"
                    href={route("admin.dashboard")}
                    active={route().current("admin.dashboard")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        // className={pathname === "/" ? activeIcon : inactiveIcon}
                        className={activeIcon}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                    </svg>
                    Dashboard
                </ResponsiveNavLink>

                <ResponsiveNavLink
                    className="text-black flex h-16 items-center justify-between w-full"
                    href={route("admin.product")}
                    active={route().current("admin.product")}
                >
                    <ProductIcon stroke={1.5} classname={activeIcon} />
                    Products
                </ResponsiveNavLink>
                <ResponsiveNavLink
                    href={route("admin.categories.index")}
                    active={route().current("admin.categories.index")}
                    className="text-black flex h-16 items-center justify-between w-full"
                >
                    <Category stroke={1.5} classname={activeIcon} />
                    Categories
                </ResponsiveNavLink>
                <ResponsiveNavLink
                    href={route("admin.orders.index")}
                    className="text-black flex h-16 items-center justify-between"
                >
                    <Order strok={1.5} classname={activeIcon} />
                    Orders
                </ResponsiveNavLink>
                <ResponsiveNavLink
                    href={route("admin.profile.index")}
                    active={route().current("admin.setting")}
                    className="text-black flex h-16 items-center justify-between"
                >
                    <Setting classname={activeIcon} strok={1.5} />
                    Settings
                </ResponsiveNavLink>
                <ResponsiveNavLink
                    href={route("admin.websiteSetting.index")}
                    active={route().current("admin.websiteSetting.index")}
                    className="text-black flex h-16 items-center justify-between"
                >
                    <svg
                        fill="#000000"
                        width="30px"
                        height="30px"
                        viewBox="0 0 100 100"
                        version="1.1"
                        className={activeIcon}
                    >
                        <g id="configuration">
                            <g>
                                <path d="M85,4H29c-2.8,0-5,2.2-5,5l0,34.6C17,48.2,12.4,56.1,12,65h-1c-0.6,0-1,0.4-1,1v7.1c0,0.5,0.4,0.9,0.9,1l3.5,0.5    c0.5,1.7,1.2,3.4,2.1,4.9l-2.1,2.8c-0.3,0.4-0.3,1,0.1,1.3l8.2,8c0.4,0.3,0.9,0.4,1.3,0.1l2.8-2.1c1.6,0.9,3.3,1.6,5,2.1l0.5,3.4    c0.1,0.5,0.5,0.9,1,0.9h11.5c0.5,0,0.9-0.4,1-0.9l0.5-3.4c1.7-0.5,3.4-1.2,5-2.1l2.8,2.1c0.4,0.3,0.9,0.3,1.3-0.1l8.2-8    c0.4-0.4,0.4-0.9,0.1-1.3l-2.1-2.8c0.9-1.6,1.6-3.2,2.1-4.9l3.5-0.5c0.5-0.1,0.9-0.5,0.9-1V70h17c2.8,0,5-2.2,5-5V9    C90,6.2,87.8,4,85,4z M29,6h56c1.7,0,3,1.4,3,3v7H26l0-7C26,7.4,27.4,6,29,6z M32,42c-2.6,2.4-4.8,6.2-6.2,10.8    c-4.6,1.4-8.4,3.6-10.8,6.2C17.4,50.8,23.9,44.4,32,42z M40,53c3.8,0.1,7.4,0.6,10.5,1.5c0.9,3.2,1.4,6.7,1.5,10.5H40L40,53z     M40,51l0-9.9c4.1,0.6,7.7,4.9,9.9,11.1C46.8,51.5,43.5,51.1,40,51z M38,41.1l0,9.9c-3.5,0.1-6.8,0.5-9.8,1.2    C30.3,46,33.9,41.7,38,41.1z M38,53l0,12H26c0.1-3.8,0.6-7.4,1.5-10.5C30.6,53.6,34.2,53.1,38,53z M24,65h-9.9    c0.6-4.1,4.9-7.7,11.1-9.8C24.5,58.2,24.1,61.5,24,65z M38,67l0,12.1c-6.5-0.5-11.5-5.6-12-12.1H38z M40,79.1L40,67h12    C51.5,73.6,46.5,78.6,40,79.1z M54,65c-0.1-3.5-0.5-6.8-1.2-9.8c6.3,2.2,10.5,5.7,11.1,9.8H54z M52.2,52.8    c-1.4-4.6-3.6-8.4-6.2-10.8c8.2,2.4,14.6,8.8,17,17C60.6,56.4,56.8,54.3,52.2,52.8z M66,72.2l-3.3,0.5c-0.4,0.1-0.7,0.3-0.8,0.7    c-0.5,2-1.3,3.9-2.4,5.7c-0.2,0.3-0.2,0.8,0.1,1.1l2,2.6l-6.9,6.8l-2.7-2c-0.3-0.2-0.7-0.3-1.1-0.1c-1.8,1-3.7,1.8-5.8,2.4    c-0.4,0.1-0.7,0.4-0.7,0.8L43.9,94h-9.8l-0.5-3.2c-0.1-0.4-0.3-0.7-0.7-0.8c-2-0.5-3.9-1.3-5.8-2.4c-0.3-0.2-0.8-0.2-1.1,0.1    l-2.7,2l-6.9-6.8l2-2.6c0.2-0.3,0.3-0.8,0.1-1.1c-1.1-1.8-1.9-3.7-2.4-5.7c-0.1-0.4-0.4-0.7-0.8-0.7L12,72.2V67h12    c0.5,8,6.9,14.2,15,14.2S53.5,75,54,67h12V72.2z M85,68H68v-2c0-0.6-0.4-1-1-1h-1c-0.5-14.4-12.4-26-27-26c-4.7,0-9.2,1.2-13,3.4    L26,18h62v47C88,66.6,86.6,68,85,68z" />

                                <circle cx="81" cy="11" r="2" />

                                <circle cx="74" cy="11" r="2" />

                                <circle cx="67" cy="11" r="2" />

                                <path d="M83,21h-7c-0.6,0-1,0.4-1,1s0.4,1,1,1h7c0.6,0,1-0.4,1-1S83.6,21,83,21z" />

                                <path d="M83,25h-7c-0.6,0-1,0.4-1,1s0.4,1,1,1h7c0.6,0,1-0.4,1-1S83.6,25,83,25z" />

                                <path d="M83,29h-7c-0.6,0-1,0.4-1,1s0.4,1,1,1h7c0.6,0,1-0.4,1-1S83.6,29,83,29z" />
                            </g>
                        </g>
                    </svg>
                    Website Setting
                </ResponsiveNavLink>
                <ResponsiveNavLink
                    method="post"
                    href={route("admin.logout")}
                    active={route().current("admin.logout")}
                    as="button"
                    className="text-white flex h-16 bottom-0 items-center justify-between bg-rose-500 hover:border-rose-500"
                >
                    <Logout classname={activeIcon} strok={1.5} />
                    Logout
                </ResponsiveNavLink>
            </nav>
        </aside>
    );
}
