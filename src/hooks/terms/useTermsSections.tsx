import CacheLink from '@/components/commons/CacheLink';
import {
  AlertCircle, Award, Eye, FileText, Gamepad2, Layers, Shield,
  Sparkles, Target, Trophy, Zap
} from 'lucide-react';
import React from 'react';

export interface TermsSection {
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  content: React.ReactNode;
}

const List = React.memo(({ items }: { items: string[] }) => (
  <ul className="space-y-1.5 ml-4">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-2">
        <span className="mt-1 flex-shrink-0 text-purple-500">•</span>
        <span className="text-purple-700">{item}</span>
      </li>
    ))}
  </ul>
));

export function useTermsSections(): TermsSection[] {
  return [
    {
      number: '1',
      title: 'Acceptation des conditions',
      icon: Shield,
      iconColor: 'bg-purple-100 text-purple-600',
      content: (
        <p>
          En jouant à <span className="font-bold text-purple-600">Diambra Puzzle</span>, vous acceptez pleinement ces conditions d'utilisation.
          Nous pouvons les modifier à tout moment pour améliorer votre expérience de jeu.
        </p>
      ),
    },
    {
      number: '2',
      title: 'Présentation du jeu',
      icon: Gamepad2,
      iconColor: 'bg-indigo-100 text-indigo-600',
      content: (
        <>
          <p>
            <strong>Diambra Puzzle</strong> est un jeu de mémoire visuelle où vous devez reproduire
            la disposition d'un <strong>plateau P1</strong> sur un <strong>plateau P2</strong> en échangeant les cases.
          </p>
          <p className="mt-2">
            Le jeu propose <strong>4 modes</strong> (Nombre, Couleur, Image, Lettre) et
            <strong>4 niveaux de difficulté</strong> allant de 2×2 à 10×10.
          </p>
        </>
      ),
    },
    {
      number: '3',
      title: 'Objectifs du jeu',
      icon: Target,
      iconColor: 'bg-emerald-100 text-emerald-600',
      content: (
        <>
          <p>Diambra Puzzle vous permet de :</p>
          <List items={[
            'Développer votre mémoire visuelle et votre concentration',
            'Renforcer votre patience et votre sens stratégique',
            'Profiter d\'un moment ludique, seul ou entre amis',
            'Vous préparer pour des compétitions et défis',
          ]} />
        </>
      ),
    },
    {
      number: '4',
      title: 'Principe du jeu',
      icon: Layers,
      iconColor: 'bg-blue-100 text-blue-600',
      content: (
        <>
          <p>Le principe est simple :</p>
          <List items={[
            'Mémorisez la disposition du plateau P1',
            'Déplacez les éléments sur le plateau P2 pour reproduire P1',
            'Utilisez votre mémoire visuelle et votre logique',
            'Résolvez le puzzle le plus rapidement possible',
          ]} />
        </>
      ),
    },
    {
      number: '5',
      title: 'Comment jouer',
      icon: Eye,
      iconColor: 'bg-amber-100 text-amber-600',
      content: (
        <>
          <p>Suivez ces 5 étapes :</p>
          <ol className="space-y-1.5 ml-4 list-decimal list-inside">
            <li><strong>Mémorisez</strong> la disposition du plateau P1 pendant quelques secondes</li>
            <li><strong>Cliquez</strong> sur deux cases du plateau P2 pour les échanger</li>
            <li>Utilisez le bouton <strong>'Voir P1'</strong> pour vérifier votre progression</li>
            <li><strong>Verrouillez</strong> les cases correctement placées avec 'Ajuster'</li>
            <li><strong>Complétez</strong> le puzzle avant la fin du temps imparti</li>
          </ol>
        </>
      ),
    },
    {
      number: '6',
      title: 'Modes de jeu',
      icon: Sparkles,
      iconColor: 'bg-fuchsia-100 text-fuchsia-600',
      content: (
        <>
          <p>4 modes différents pour varier les défis :</p>
          <List items={[
            'Mode Nombre : Mémorisez et replacez les chiffres dans l\'ordre',
            'Mode Couleur : Retrouvez la séquence de couleurs originale',
            'Mode Image : Reconstituez l\'image découpée en morceaux',
            'Mode Lettre : Réorganisez les paires de lettres alphabétiques',
          ]} />
        </>
      ),
    },
    {
      number: '7',
      title: 'Niveaux de difficulté',
      icon: Trophy,
      iconColor: 'bg-yellow-100 text-yellow-600',
      content: (
        <>
          <p>Choisissez votre niveau :</p>
          <List items={[
            '2×2 - Débutant : Parfait pour apprendre',
            '4×4 - Intermédiaire : Un peu plus de challenge',
            '6×6 - Avancé : Pour les joueurs confirmés',
            '10×10 - Expert : Le défi ultime',
          ]} />
          <p className="mt-2 text-sm text-purple-600">
            <span className="font-semibold">Commencez petit et progressez à votre rythme !</span>
          </p>
        </>
      ),
    },
    {
      number: '8',
      title: 'Évaluation et classement',
      icon: Award,
      iconColor: 'bg-purple-100 text-purple-600',
      content: (
        <>
          <p>Votre performance est mesurée par :</p>
          <List items={[
            'Le temps écoulé entre le début et la fin du match',
            'La précision de vos mouvements',
            'Le nombre de tentatives',
          ]} />
          <p className="mt-2">
            Plus vous êtes <strong>rapide et précis</strong>, meilleur sera votre score.
            <br />
            Comparez vos résultats et défiez vos amis pour devenir le champion !
          </p>
        </>
      ),
    },
    {
      number: '9',
      title: 'Conseils pratiques',
      icon: Zap,
      iconColor: 'bg-rose-100 text-rose-600',
      content: (
        <>
          <p>Quelques astuces pour progresser :</p>
          <List items={[
            'Prenez votre temps : Mémorisez bien le plateau P1 avant de commencer',
            'Commencez facile : Essayez d\'abord les niveaux 2×2 ou 3×3',
            'Pratiquez régulièrement : L\'entraînement améliore vos performances',
            'Mode automatique : Pour un défi chronométré plus intense',
          ]} />
        </>
      ),
    },
    {
      number: '10',
      title: 'Compte utilisateur',
      icon: Shield,
      iconColor: 'bg-purple-100 text-purple-600',
      content: (
        <>
          <p>Pour accéder à certaines fonctionnalités, vous pouvez créer un compte:</p>
          <List items={[
            'Sauvegarder vos scores et statistiques',
            'Suivre votre progression dans les différents modes',
            'Recevoir des défis quotidiens',
            'Comparer vos performances avec vos amis',
          ]} />
        </>
      ),
    },
    {
      number: '11',
      title: 'Utilisation acceptable',
      icon: Shield,
      iconColor: 'bg-emerald-100 text-emerald-600',
      content: (
        <>
          <p>En jouant à Diambra Puzzle, vous acceptez de ne pas :</p>
          <List items={[
            'Tricher ou utiliser des programmes automatisés',
            'Tenter de pirater ou modifier le jeu',
            'Perturber l\'expérience des autres joueurs',
            'Utiliser le jeu à des fins malveillantes',
          ]} />
        </>
      ),
    },
    {
      number: '12',
      title: 'Propriété intellectuelle',
      icon: FileText,
      iconColor: 'bg-indigo-100 text-indigo-600',
      content: (
        <p>
          Le jeu Diambra Puzzle, son code, son design, ses modes de jeu et son concept
          sont la propriété exclusive de Diambra.
          Toute reproduction ou copie sans autorisation est interdite.
        </p>
      ),
    },
    {
      number: '13',
      title: 'Limitation de responsabilité',
      icon: AlertCircle,
      iconColor: 'bg-rose-100 text-rose-600',
      content: (
        <>
          <p>Diambra Puzzle est un jeu de divertissement. Nous ne garantissons pas :</p>
          <List items={[
            'La disponibilité permanente du jeu',
            'L\'absence totale de bugs ou d\'erreurs',
            'Des performances spécifiques',
          ]} />
        </>
      ),
    },
    {
      number: '14',
      title: 'Protection des données',
      icon: Shield,
      iconColor: 'bg-teal-100 text-teal-600',
      content: (
        <p>
          Nous protégeons vos données conformément aux réglementations. Consultez notre{' '}
          <CacheLink href="/privacy" className="text-purple-600 hover:underline font-semibold">
            politique de confidentialité
          </CacheLink>.
        </p>
      ),
    },
    {
      number: '15',
      title: 'Résiliation',
      icon: AlertCircle,
      iconColor: 'bg-rose-100 text-rose-600',
      content: (
        <p>
          Nous nous réservons le droit de suspendre ou résilier un compte en cas de violation
          flagrante de ces conditions.
        </p>
      ),
    },
    {
      number: '16',
      title: 'Loi applicable',
      icon: Shield,
      iconColor: 'bg-cyan-100 text-cyan-600',
      content: (
        <p>
          Ces conditions sont régies par le droit ivoirien.
          En cas de litige, les tribunaux compétents seront saisis.
        </p>
      ),
    },
  ];
}