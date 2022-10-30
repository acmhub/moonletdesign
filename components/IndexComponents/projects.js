export default function Projects({ projects, t }) {
    return (
        <section>
            <div className="container-padding">
                <h2>Projects</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {projects.map((e, i) => (
                        <div key={i}>
                            <h4>{e.title}</h4>
                            <div dangerouslySetInnerHTML={{ __html: e.excerpt }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
