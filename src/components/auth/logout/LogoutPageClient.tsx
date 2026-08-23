'use client';
import { useLogoutPage } from "@/hooks/auth/logout/useLogoutPage";
import Background from "./components/Background";
import { ContentContainer } from "./components/ContentContainer";
import { ErrorState } from "./components/ErrorState";
import { LoadingState } from "./components/LoadingState";
import { StarField } from "./components/StarField";
import { SuccessState } from "./components/SuccessState";

export default function LogoutPageClient() {
  const { progress, status } = useLogoutPage();

  const renderContent = (() => {
    switch (status) {
      case "loading": return <LoadingState progress={progress} />;
      case "success": return <SuccessState />;
      case "error": return <ErrorState />;
    }
  })();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#070B1A] via-[#0F1C3F] to-[#070B1A] p-3 sm:p-6">
      <Background />

      <StarField />

      <ContentContainer>
        {renderContent}
      </ContentContainer>
    </div>
  );
}