import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/App/Layout';
import { Projects } from '../components/IndexComponents';

export default function Home() {
    const { t } = useTranslation('home');
    return (
        <Layout>
            <p className="text-center lg:max-w-3xl lg:mx-auto">{t('about.description')}</p>
            <Projects />
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'home']))
        }
    };
}
