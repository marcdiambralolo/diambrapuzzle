'use client';
import CacheLink from '@/components/commons/CacheLink';
import { useLoginForm } from '@/hooks/auth/login/useLoginForm';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from "next/image";
import { LoginErrorAlert } from './components/LoginErrorAlert';
import { LoginInputField } from './components/LoginInputField';
import WelcomePageClientContent from './welcome/WelcomePageClient';

const LoginForm = () => {
  const { handleSubmit, error, isSubmitDisabled, isLoading, isPending, isHydrated, usernameProps, passwordProps, } = useLoginForm();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-white text-gray-900">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-blue-200 bg-white p-6 shadow-[0_8px_32px_-18px_rgba(46,90,166,0.10)] backdrop-blur-xl sm:p-8">
          <CacheLink href="/" className="block mb-6 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-20 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Diambra Puzzle"
                  fill
                  sizes="(max-width: 768px) 120px, 160px"
                  className="object-contain p-3"
                  priority
                />
              </div>
            </motion.div>
          </CacheLink>

          <div className="text-center mb-6">
            <h1 className="mb-2 text-2xl font-bold text-blue-900 sm:text-3xl">
              Se connecter
            </h1>

            <p className="mx-auto max-w-md text-xs text-gray-600 sm:text-sm">
              Accédez à votre jeu en utilisant votre email et votre mot de passe
            </p>
          </div>

          {error && <LoginErrorAlert message={error} />}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <LoginInputField {...usernameProps} />
            <LoginInputField {...passwordProps} />
            <motion.button
              type="submit"
              disabled={isSubmitDisabled}
              className={`
                w-full py-3 rounded-xl font-semibold text-sm
                shadow-md hover:shadow-lg
                flex items-center justify-center gap-2
                transition-all duration-200
                ${isSubmitDisabled
                  ? 'bg-gray-200 text-gray-400 border border-blue-100 cursor-not-allowed'
                  : 'border border-blue-200 bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900 hover:from-blue-200 hover:to-blue-400'
                }
              `}
              whileHover={{ scale: isSubmitDisabled ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitDisabled ? 1 : 0.98 }}
            >
              {isHydrated && (isLoading || isPending) ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                'Connexion'
              )}
            </motion.button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-700">
                Si vous n'avez pas encore de compte Diambra cliquez sur {' '}
                <CacheLink
                  href="/auth/register"
                  className="text-blue-700 font-semibold hover:underline transition-colors"
                >
                  Inscription
                </CacheLink>
              </p>
            </div>
          </div>

          <WelcomePageClientContent />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;