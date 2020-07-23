import React from 'react'

export default function LeadershipRow({ images }) {
    return (
        <section className="container">
            <div className="row">
                {images.map((image, index) => (
                    <div className="col-lg-4 col-md-6">
                        <div className="single_team">
                            <div className="team_thumb">
                                <img src={image.path} alt={image.name} />
                                <div className="team_hover">
                                    <div className="hover_inner text-center">
                                        <ul>
                                            {image.profiles.map((profile) => (
                                                <li><a href={profile.path}> <i className={`fa fa-${profile.type}`}></i> </a></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="team_title text-center">
                                <h3>{image.name}</h3>
                                <p>{image.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
} 