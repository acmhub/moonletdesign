import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { gql } from '@apollo/client';
import { getApolloClient } from '../../lib/apollo-client';
import Layout from '../../components/App/Layout';

export default function Project({ project }) {
    return (
        <Layout title={project.title}>
            <div
                className="relative flex items-center justify-center py-32"
                style={{
                    backgroundImage: `url(${project.featuredImage.node.sourceUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <h1>{project.translation.title}</h1>
            </div>
            <div className="container-padding">
                <div
                    dangerouslySetInnerHTML={{
                        __html: project.translation.content
                    }}
                />
            </div>
        </Layout>
    );
}

export async function getStaticProps({ params, locale }) {
    const { projectSlug } = params;
    const language = locale.toUpperCase();
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            query PostBySlug($slug: String!, $language: LanguageCodeEnum!) {
                generalSettings {
                    title
                }
                postBy(slug: $slug) {
                    id
                    content
                    title
                    slug
                    translation(language: $language) {
                        id
                        slug
                        content
                        title
                        language {
                            locale
                            slug
                        }
                    }
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                }
            }
        `,
        variables: {
            slug: params.projectSlug,
            language
        }
    });

    let project = data?.data.postBy;

    const site = {
        ...data?.data.generalSettings
    };

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            project,
            language,
            path: `/portfolio/${project.slug}`,
            site
        },
        revalidate: 10
    };
}

export async function getStaticPaths({ locales }) {
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
            {
                posts(first: 10000) {
                    edges {
                        node {
                            id
                            title
                            slug
                        }
                    }
                }
            }
        `
    });

    const projects = data?.data.posts.edges.map(({ node }) => node);

    const paths = projects.map(({ slug }) => {
        return {
            params: {
                projectSlug: slug
            }
        };
    });

    return {
        paths: [
            ...paths,
            ...paths.flatMap((path) => {
                return locales.map((locale) => {
                    return {
                        ...path,
                        locale
                    };
                });
            })
        ],
        paths: [],
        fallback: 'blocking'
    };
}
