'use client';
import { useTermsSections } from '@/hooks/terms/useTermsSections';
import ActionButtons from './components/ActionButtons';
import AlertBanner from './components/AlertBanner';
import ContactCard from './components/ContactCard';
import ContentContainer from './components/ContentContainer';
import Divider from './components/Divider';
import Footer from './components/Footer';
import PageHeader from './components/PageHeader';
import SectionsList from './components/SectionsList';
import StickyHeader from './components/StickyHeader';

export default function TermsPageClient() {
    const sections = useTermsSections();

    return (
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50">
            <StickyHeader />
            <PageHeader />

            <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
                <ContentContainer>
                    <AlertBanner />
                    <SectionsList sections={sections} />
                    <Divider />
                    <div className="px-6 pb-6">
                        <ContactCard />
                    </div>
                    <ActionButtons />
                </ContentContainer>

                <Footer />
            </div>
        </div>
    );
}