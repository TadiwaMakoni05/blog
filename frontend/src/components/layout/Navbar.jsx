import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import ThemeToggle from "../common/ThemeToggle";
import {
  BookOpen,
  Home,
  Compass,
  PenSquare,
  User,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSidebar } from "../../context/SidebarContext.jsx";

// eslint-disable-next-line no-unused-vars
const NavLink = ({ to, icon: Icon, label, isActive, onClick, isCollapsed }) => (
  <Link
    to={to}
    onClick={onClick}
    title={isCollapsed ? label : ""}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
      ${
        isActive
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-black dark:hover:text-white"
      } ${isCollapsed ? "justify-center" : ""}`}
  >
    <Icon className="h-[18px] w-[18px] shrink-0" />
    {!isCollapsed && <span>{label}</span>}
  </Link>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isCollapsed, toggleCollapse } = useSidebar();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const closeMobile = () => setMobileOpen(false);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div
        className={`px-5 h-16 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 shrink-0 ${isCollapsed ? "lg:px-0 lg:justify-center" : ""}`}
      >
        <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
          <BookOpen className="h-6 w-6 text-black dark:text-white" />
          {!isCollapsed && (
            <span className="font-bold text-xl tracking-tight lg:block hidden">
              Medium
            </span>
          )}
          <span className="font-bold text-xl tracking-tight lg:hidden">
            Medium
          </span>
        </Link>
        {/* Close button — visible only on mobile */}
        <button
          onClick={closeMobile}
          className="lg:hidden p-1 text-gray-500 hover:text-black dark:hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Desktop Collapse Toggle */}
        {!mobileOpen && (
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NavLink
          to="/"
          icon={Home}
          label="Home"
          isActive={isActive("/")}
          onClick={closeMobile}
          isCollapsed={isCollapsed}
        />
        <NavLink
          to="/explore"
          icon={Compass}
          label="Explore"
          isActive={isActive("/explore")}
          onClick={closeMobile}
          isCollapsed={isCollapsed}
        />

        {user && (
          <>
            <div className="h-px bg-gray-200 dark:bg-gray-800 my-3" />
            <NavLink
              to="/dashboard"
              icon={PenSquare}
              label="Write"
              isActive={isActive("/dashboard")}
              onClick={closeMobile}
              isCollapsed={isCollapsed}
            />
            <NavLink
              to="/profile/me"
              icon={User}
              label="Profile"
              isActive={isActive("/profile/me")}
              onClick={closeMobile}
              isCollapsed={isCollapsed}
            />
            <NavLink
              to="/settings"
              icon={Settings}
              label="Settings"
              isActive={isActive("/settings")}
              onClick={closeMobile}
              isCollapsed={isCollapsed}
            />
          </>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800 space-y-2 shrink-0">
        <div
          className={`flex items-center justify-between px-3 py-1 ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}
        >
          {!isCollapsed && (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              Theme
            </span>
          )}
          <ThemeToggle />
        </div>

        {user ? (
          <button
            onClick={() => {
              logout();
              closeMobile();
            }}
            title={isCollapsed ? "Log out" : ""}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-all duration-200 ${isCollapsed ? "justify-center" : ""}`}
          >
            <LogOut className="h-[18px] w-[18px]" />
            {!isCollapsed && <span>Log out</span>}
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              icon={LogIn}
              label="Log in"
              isActive={isActive("/login")}
              onClick={closeMobile}
              isCollapsed={isCollapsed}
            />
            <NavLink
              to="/register"
              icon={UserPlus}
              label="Sign up"
              isActive={isActive("/register")}
              onClick={closeMobile}
              isCollapsed={isCollapsed}
            />
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-black dark:text-white" />
          <span className="font-bold text-lg tracking-tight">TheBlog</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar — desktop: always visible, mobile: slide-in drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0 w-60" : "-translate-x-full w-60"}
          lg:translate-x-0 ${isCollapsed ? "lg:w-16" : "lg:w-60"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Navbar;
