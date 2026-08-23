'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Cookie, FileText, Link, Lock, Mail, MapPin, Phone, Server, Shield, Target, Users } from 'lucide-react';
import CacheLink from '../commons/CacheLink';

// ============= CONSTANTES =============
const CONTACT_INFO = {
    phone: '+225 07 58 38 53 87',
    address: 'Abidjan, Côte d\'Ivoire', // À compléter
    company: 'Diambra Puzzle'
};

const LAST_UPDATED = '23 août 2026';
const EFFECTIVE_DATE = '23 août 2026';

// ============= ANIMATIONS =============

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

// ============= SOUS-COMPOSANTS =============

/** En-tête sticky */
const StickyHeader = () => (
    <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-purple-100"
    >
        <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2">
                    <CacheLink
                        href="/"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-500 transition-colors hover:text-purple-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour à l'accueil
                    </CacheLink>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 text-xs text-purple-400"
                >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Confidentiel</span>
                </motion.div>
            </div>
        </div>
    </motion.div>
);

/** En-tête de page */
const PageHeader = () => (
    <div className="relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 pt-12 pb-8 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 mb-4"
            >
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-purple-700">Protection des données</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3"
            >
                Politique de confidentialité
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-purple-500 text-sm"
            >
                Dernière mise à jour : <span className="font-semibold text-purple-700">{LAST_UPDATED}</span>
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-xs text-purple-400"
            >
                Entrée en vigueur le {EFFECTIVE_DATE}
            </motion.p>
        </div>
    </div>
);

/** Section de contenu */
interface SectionProps {
    title: string;
    number?: number;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

const Section = ({ title, number, children, icon }: SectionProps) => (
    <motion.div
         className="mb-8 last:mb-0"
    >
        <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mt-0.5">
                {icon || <FileText className="w-4 h-4 text-purple-600" />}
            </div>
            <h2 className="text-lg font-bold text-gray-800">
                {number && <span className="text-purple-500 mr-2">{number}.</span>}
                {title}
            </h2>
        </div>
        <div className="pl-11 text-sm text-gray-600 leading-relaxed space-y-3">
            {children}
        </div>
    </motion.div>
);

/** Section avec sous-sections */
const SubSection = ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <div className={title ? "mt-4" : ""}>
        {title && <h3 className="font-semibold text-purple-700 mb-2">{title}</h3>}
        <div className="space-y-2">
            {children}
        </div>
    </div>
);

/** Liste à puces */
const BulletList = ({ items, className = "" }: { items: string[]; className?: string }) => (
    <ul className={`list-disc pl-5 space-y-1.5 ${className}`}>
        {items.map((item, index) => (
            <li key={index} className="text-gray-600">{item}</li>
        ))}
    </ul>
);

/** Contact Card */
const ContactCard = () => (
    <motion.div
         className="mt-8 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-6"
    >
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            Contact
        </h3>
        <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-purple-700">
                <Phone className="w-3.5 h-3.5" />
                <span>{CONTACT_INFO.phone}</span>
            </div>
                       <div className="flex items-center gap-2 text-purple-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>{CONTACT_INFO.address}</span>
            </div>
        </div>
    </motion.div>
);

/** Mentions légales */
const LegalNotice = () => (
    <motion.div
         className="mt-8 text-center text-xs text-gray-400 border-t border-purple-100 pt-6"
    >
        <p>© 2026 {CONTACT_INFO.company} — Tous droits réservés.</p>
        <p className="mt-1">
            Conformément à la réglementation ivoirienne sur la protection des données personnelles.
        </p>
    </motion.div>
);

/** Badge sécurité */
const SecurityBadge = () => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex justify-center"
    >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-xs text-purple-600">Vos données sont protégées</span>
        </div>
    </motion.div>
);

// ============= COMPOSANT PRINCIPAL =============
export default function PrivacyPolicyPageClient() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50">
            <StickyHeader />
            <PageHeader />

            <div className="max-w-4xl mx-auto px-4 pb-16">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 sm:p-8"
                >

                    {/* 1. Responsable du traitement */}
                    <Section title="Responsable du traitement" number={1} icon={<Users className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Le responsable du traitement des données collectées dans le cadre de Diambra Puzzle est l'éditeur du Jeu.
                        </p>
                        <div className="mt-2 p-3 bg-purple-50 rounded-lg text-sm">
                            <p><strong>Jeu :</strong> {CONTACT_INFO.company}</p>
                            <p><strong>Pays :</strong> Côte d'Ivoire</p>
                            <p><strong>Téléphone du support :</strong> {CONTACT_INFO.phone}</p>
                        </div>
                                            </Section>

                    {/* 2. Données collectées */}
                    <Section title="Données susceptibles d'être collectées" number={2} icon={<Server className="w-4 h-4 text-purple-600" />}>
                        <SubSection title="2.1. Données fournies par l'utilisateur">
                            <BulletList items={[
                                "nom ou pseudonyme",
                                "adresse e-mail, lorsqu'elle est utilisée pour votre compte",
                                "numéro de téléphone, lorsqu'il est nécessaire au fonctionnement d'un service",
                                "informations liées à votre profil de joueur",
                                "informations nécessaires au fonctionnement de votre compte",
                                "communications adressées au support technique"
                            ]} />
                            <p className="text-xs text-gray-400 mt-2">
                                Nous ne demandons pas de données personnelles qui ne sont pas nécessaires au fonctionnement des fonctionnalités concernées.
                            </p>
                        </SubSection>

                        <SubSection title="2.2. Données relatives à l'utilisation du Jeu">
                            <BulletList items={[
                                "progression dans le Jeu",
                                "scores et résultats",
                                "statistiques de jeu",
                                "historique des parties ou opérations effectuées",
                                "informations nécessaires à la prévention de la fraude et des abus",
                                "informations techniques nécessaires au fonctionnement du service"
                            ]} />
                        </SubSection>

                        <SubSection title="2.3. Données techniques">
                            <BulletList items={[
                                "adresse IP",
                                "type d'appareil",
                                "système d'exploitation",
                                "navigateur utilisé",
                                "date et heure de connexion",
                                "informations relatives aux erreurs et dysfonctionnements",
                                "journaux techniques nécessaires à la sécurité du service"
                            ]} />
                        </SubSection>
                    </Section>

                    {/* 3. Données de paiement */}
                    <Section title="Données de paiement" number={3} icon={<Lock className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Lorsque Diambra Puzzle propose des fonctionnalités nécessitant un paiement, les opérations de paiement peuvent être traitées par un prestataire de paiement tiers.
                        </p>
                        <p>
                            Nous ne collectons pas nécessairement les informations bancaires complètes utilisées pour effectuer un paiement.
                        </p>
                      
                    </Section>

                    {/* 4. Finalités du traitement */}
                    <Section title="Finalités du traitement" number={4} icon={<Target className="w-4 h-4 text-purple-600" />}>
                        <SubSection title="Fonctionnement du Jeu">
                            <BulletList items={[
                                "créer et gérer un compte lorsque cette fonctionnalité existe",
                                "permettre l'accès au Jeu",
                                "sauvegarder la progression",
                                "enregistrer les scores et résultats",
                                "fournir les fonctionnalités demandées par l'utilisateur"
                            ]} />
                        </SubSection>

                        <SubSection title="Sécurité">
                            <BulletList items={[
                                "protéger les comptes",
                                "détecter les comportements frauduleux",
                                "prévenir les abus",
                                "détecter les tentatives d'accès non autorisées",
                                "assurer la sécurité de nos infrastructures"
                            ]} />
                        </SubSection>

                        <SubSection title="Paiements">
                            <BulletList items={[
                                "traiter les transactions",
                                "confirmer les paiements",
                                "gérer les achats",
                                "détecter et prévenir les transactions frauduleuses",
                                "gérer les éventuels remboursements ou litiges"
                            ]} />
                        </SubSection>

                        <SubSection title="Support">
                            <BulletList items={[
                                "répondre aux demandes des utilisateurs",
                                "résoudre les problèmes techniques",
                                "traiter les réclamations",
                                "améliorer la qualité du service"
                            ]} />
                        </SubSection>

                        <SubSection title="Amélioration du Jeu">
                            <BulletList items={[
                                "identifier les dysfonctionnements",
                                "améliorer les performances",
                                "comprendre l'utilisation générale du Jeu",
                                "améliorer l'expérience utilisateur",
                                "développer de nouvelles fonctionnalités"
                            ]} />
                        </SubSection>
                    </Section>

                    {/* 5. Base du traitement */}
                    <Section title="Base du traitement" number={5} icon={<FileText className="w-4 h-4 text-purple-600" />}>
                        <p>Les traitements de données personnelles sont réalisés conformément à la réglementation applicable en matière de protection des données personnelles.</p>
                        <p>Selon la nature du traitement, celui-ci peut notamment être fondé sur :</p>
                        <BulletList items={[
                            "l'exécution du service demandé par l'utilisateur",
                            "le consentement de l'utilisateur lorsque celui-ci est requis",
                            "le respect d'une obligation légale",
                            "la nécessité de protéger la sécurité et l'intégrité du Jeu",
                            "nos intérêts légitimes, lorsque la réglementation applicable le permet"
                        ]} />
                    </Section>

                    {/* 6. Destinataires */}
                    <Section title="Destinataires des données" number={6} icon={<Users className="w-4 h-4 text-purple-600" />}>
                        <p>Les données personnelles sont accessibles uniquement aux personnes ou prestataires qui en ont besoin pour assurer le fonctionnement du Jeu.</p>
                        <BulletList items={[
                            "les membres habilités de l'équipe exploitant Diambra Puzzle",
                            "les prestataires techniques nécessaires à l'hébergement et au fonctionnement du Jeu",
                            "les prestataires de paiement, lorsque l'utilisateur effectue une transaction",
                            "les prestataires chargés de la sécurité ou de la maintenance technique",
                            "les autorités compétentes lorsque la communication des informations est imposée par la loi"
                        ]} />
                        <p className="font-semibold text-purple-700 mt-2">Nous ne vendons pas les données personnelles des utilisateurs.</p>
                    </Section>

                    {/* 7. Hébergement */}
                    <Section title="Hébergement et prestataires techniques" number={7} icon={<Server className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Pour assurer le fonctionnement de Diambra Puzzle, certaines données peuvent être hébergées ou traitées par des prestataires techniques.
                        </p>
                        <p>
                            Ces prestataires sont sélectionnés en fonction de leurs capacités techniques et des garanties qu'ils offrent en matière de sécurité et de confidentialité.
                        </p>
                      
                    </Section>

                    {/* 8. Conservation */}
                    <Section title="Conservation des données" number={8} icon={<Clock className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Nous conservons les données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées.
                        </p>
                        <p>La durée de conservation peut notamment dépendre :</p>
                        <BulletList items={[
                            "de la durée d'existence du compte utilisateur",
                            "de la nécessité de conserver l'historique des transactions",
                            "des obligations comptables ou légales",
                            "des nécessités de sécurité",
                            "de la résolution d'un litige"
                        ]} />
                        <p>Lorsque les données ne sont plus nécessaires, elles sont supprimées ou anonymisées.</p>
                    </Section>

                    {/* 9. Cookies */}
                    <Section title="Cookies et technologies similaires" number={9} icon={<Cookie className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Diambra Puzzle peut utiliser des cookies, des mécanismes de stockage local ou des technologies similaires nécessaires au fonctionnement du Jeu.
                        </p>
                        <p>Ces technologies peuvent notamment permettre :</p>
                        <BulletList items={[
                            "de maintenir une session utilisateur",
                            "de mémoriser certaines préférences",
                            "d'assurer la sécurité",
                            "d'améliorer les performances",
                            "de conserver certaines informations nécessaires au fonctionnement du Jeu"
                        ]} />
                    </Section>

                    {/* 10. Sécurité */}
                    <Section title="Sécurité des données" number={10} icon={<Lock className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables destinées à protéger les données personnelles contre :
                        </p>
                        <BulletList items={[
                            "l'accès non autorisé",
                            "la perte",
                            "la destruction",
                            "la modification non autorisée",
                            "la divulgation",
                            "l'utilisation abusive"
                        ]} />
                        <p className="text-xs text-gray-400 mt-2">
                            Aucun système informatique ou transmission sur Internet ne peut être garanti comme étant totalement sécurisé.
                        </p>
                    </Section>

                    {/* 11. Mineurs */}
                    <Section title="Données des mineurs" number={11} icon={<Users className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Diambra Puzzle n'a pas pour objectif de collecter volontairement des données personnelles de mineurs en dehors des conditions prévues par la réglementation applicable.
                        </p>
                        <p>
                            Si nous apprenons qu'une donnée personnelle a été collectée auprès d'un mineur dans des conditions qui ne respectent pas les exigences applicables, nous prendrons les mesures raisonnables nécessaires.
                        </p>
                    </Section>

                    {/* 12. Vos droits */}
                    <Section title="Vos droits" number={12} icon={<FileText className="w-4 h-4 text-purple-600" />}>
                        <SubSection title="Droit d'accès">
                            <p>Vous pouvez demander à savoir quelles données personnelles vous concernant sont traitées et, dans les conditions prévues par la loi, obtenir une copie de ces données.</p>
                        </SubSection>
                        <SubSection title="Droit de rectification">
                            <p>Vous pouvez demander la correction de données personnelles inexactes ou incomplètes.</p>
                        </SubSection>
                        <SubSection title="Droit de suppression">
                            <p>Vous pouvez demander la suppression de vos données personnelles lorsque les conditions légales permettant cette suppression sont réunies.</p>
                        </SubSection>
                        <SubSection title="Droit d'opposition">
                            <p>Vous pouvez vous opposer à certains traitements de vos données lorsque la réglementation applicable vous reconnaît ce droit.</p>
                        </SubSection>
                        <SubSection title="Droit au retrait du consentement">
                            <p>Lorsque le traitement repose sur votre consentement, vous pouvez retirer celui-ci dans les conditions applicables.</p>
                        </SubSection>
                    </Section>

                    {/* 13. Exercice des droits */}
                    <Section title="Exercice de vos droits" number={13} icon={<Mail className="w-4 h-4 text-purple-600" />}>
                        <p>Pour exercer vos droits ou poser une question concernant la protection de vos données personnelles, vous pouvez contacter notre support :</p>
                        <div className="mt-2 p-3 bg-purple-50 rounded-lg text-sm">
                            <p><strong>Téléphone :</strong> {CONTACT_INFO.phone}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Lorsque cela est nécessaire, nous pouvons vous demander des informations permettant de vérifier votre identité.
                            </p>
                        </div>
                    </Section>

                    {/* 14. Réclamations */}
                    <Section title="Réclamations" number={14} icon={<FileText className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Si vous estimez que vos droits relatifs à vos données personnelles ne sont pas respectés, nous vous invitons à nous contacter en premier lieu.
                        </p>
                        <p>
                            En Côte d'Ivoire, l'ARTCI intervient notamment dans le domaine de la protection des données personnelles.
                        </p>
                    </Section>

                    {/* 15. Transfert */}
                    <Section title="Transfert de données" number={15} icon={<Server className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Lorsque certains de nos prestataires techniques sont situés en dehors de la Côte d'Ivoire ou lorsque des données sont traitées depuis un autre pays, les transferts concernés seront réalisés conformément aux exigences légales et réglementaires applicables.
                        </p>
                    </Section>

                    {/* 16. Liens tiers */}
                    <Section title="Liens vers des services tiers" number={16} icon={<Link className="w-4 h-4 text-purple-600" />}>
                        <p>
                            Diambra Puzzle peut éventuellement contenir des liens ou intégrer des services fournis par des tiers.
                        </p>
                        <p>
                            Nous vous recommandons de consulter les politiques de confidentialité des services tiers avant de leur communiquer des informations personnelles.
                        </p>
                        <p>Nous ne sommes pas responsables des pratiques de confidentialité de services tiers que nous ne contrôlons pas.</p>
                    </Section>

                    {/* 17. Modifications */}
                    <Section title="Modification de la présente politique" number={17} icon={<Clock className="w-4 h-4 text-purple-600" />}>
                        <p>Nous pouvons modifier cette Politique de confidentialité afin de tenir compte :</p>
                        <BulletList items={[
                            "de l'évolution du Jeu",
                            "de l'ajout ou de la modification de fonctionnalités",
                            "de l'évolution de nos pratiques",
                            "de l'évolution de la réglementation applicable",
                            "de l'évolution de nos prestataires techniques"
                        ]} />
                        <p>En cas de modification importante, une nouvelle date de mise à jour sera affichée.</p>
                    </Section>

                    {/* 18. Contact */}
                    <Section title="Contact" number={18} icon={<Mail className="w-4 h-4 text-purple-600" />}>
                        <p>Pour toute question concernant cette Politique de confidentialité :</p>
                        <ContactCard />
                     
                    </Section>

                    <SecurityBadge />
                    <LegalNotice />
                </motion.div>
            </div>
        </div>
    );
}