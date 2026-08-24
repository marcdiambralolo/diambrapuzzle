"use client";
import { useNotificationsPage } from "@/hooks/notifications/useNotificationsPage";
import FilterBar from "./components/FilterBar";
import NotificationHeader from "./components/NotificationHeader";
import NotificationList from "./components/NotificationList";
import NotificationSettingsModal from "./components/NotificationSettingsModal";

export default function NotificationsPageClient() {
  const {
    filter, filteredNotifications, showSettings, isLoading, unreadCount,
    setFilter, markAllAsRead, setShowSettings, handleNotificationClick, handleDelete,
  } = useNotificationsPage();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">

        <NotificationHeader
          unreadCount={unreadCount}
          markAllAsRead={markAllAsRead}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />

        <FilterBar filter={filter} setFilter={setFilter} />

        <NotificationList
          notifications={filteredNotifications}
          isLoading={isLoading}
          filter={filter}
          onNotificationClick={handleNotificationClick}
          onDelete={handleDelete}
        />
      </div>

      <NotificationSettingsModal
        show={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </main>
  );
}