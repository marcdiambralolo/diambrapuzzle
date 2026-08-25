'use client';
import NotificationBell from '@/components/layout/HeaderContent/NotificationBell';
import { useHeaderState } from '@/hooks/commons/useHeaderState';
import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';
import { HeaderLogo } from './components/HeaderLogo';
import { HeaderNavigation } from './components/HeaderNavigation';
import { MobileHeaderActions } from './components/MobileHeaderActions';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { UserMenu } from './components/UserMenu';

export default function HeaderContent() {
  const {
    user, mounted, mobileMenuOpen, isScrolled, showUserMenu, hasMountedUser,
    scrollY, userBadge, navItems, progressWidth, setMobileMenuOpen,
    setShowUserMenu, handleLogout, closeMobileMenu,
  } = useHeaderState();

  return (
    <>
      <ScrollProgressBar scrollY={scrollY} progressWidth={progressWidth} />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className={`mb-8 fixed ${hasMountedUser ? 'top-1' : 'top-0'} left-0 right-0 z-40 transition-all duration-300
          ${isScrolled
            ? 'bg-[var(--bg-light)]/95 dark:bg-[var(--bg-dark)]/95 backdrop-blur-xl shadow-lg shadow-[var(--accent-violet)]/10 border-b border-[var(--accent-violet)]/60 dark:border-[var(--accent-gold)]/60'
            : 'bg-[var(--bg-light)]/90 dark:bg-[var(--bg-dark)]/90 backdrop-blur-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <HeaderLogo />
            <HeaderNavigation navItems={navItems} />
            <div className="hidden lg:flex items-center gap-2">
              <NotificationBell />

              <UserMenu
                user={user}
                userBadge={userBadge}
                mounted={mounted}
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
                handleLogout={handleLogout}
              />
            </div>
            <MobileHeaderActions
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
        </div>
      </motion.header>

      <MobileMenu
        userBadge={userBadge}
        mobileMenuOpen={mobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
        navItems={navItems}
        handleLogout={handleLogout}
      />
    </>
  );
}