import Link from 'next/link';
import Image from 'next/image';

export default function Projects({ projects, t }) {
    return (
        <section>
            <div className="container-padding">
                <h2>Projects</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {projects &&
                        projects.length > 0 &&
                        projects.map((e, i) => (
                            <Link href={e.path} key={i}>
                                <a>
                                    <div className="relative h-80 w-full">
                                        <Image
                                            src={e.featuredImage.node.sourceUrl}
                                            alt={e.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <h4>{e.title}</h4>
                                </a>
                            </Link>
                        ))}

                    {!projects || (projects.length === 0 && <p>Oops, no projects found!</p>)}
                </div>
            </div>
        </section>
    );
}
