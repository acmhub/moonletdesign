import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { gql } from '@apollo/client';
import { getApolloClient } from '../lib/apollo-client';
import Layout from '../components/App/Layout';
import { Projects } from '../components/IndexComponents';

export default function Home({ projects }) {
    const { t } = useTranslation('home');
    return (
        <Layout>
            <p className="text-center lg:max-w-3xl lg:mx-auto">{t('about.description')}</p>
            <Projects projects={projects} t={t} />
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    const apolloClient = getApolloClient();
    const language = locale.toUpperCase();
    const data = await apolloClient.query({
        query: gql`
            query posts($language: LanguageCodeFilterEnum!) {
                posts(where: { language: $language }, first: 4) {
                    edges {
                        node {
                            id
                            excerpt
                            title
                            slug
                            language {
                                code
                                locale
                            }
                            featuredImage {
                                node {
                                    sourceUrl
                                }
                            }
                            tags {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
                generalSettings {
                    title
                    description
                }
            }
        `,
        variables: {
            language
        }
    });

    let projects = data?.data.posts.edges
        .map(({ node }) => node)
        .map((project) => {
            return { ...project, language, path: `/portfolio/${project.slug}` };
        });

    const page = {
        ...data?.data.generalSettings
    };

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'home'])),
            projects,
            page
        }
    };
}
