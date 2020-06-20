import React from 'react'

export default function LeadershipRow({ images }) {
    return (
        <section className="container">
            <div class="row">
                {images.map((image, index) => (
                    <div class="col-lg-4 col-md-6">
                        <div class="single_team">
                            <div class="team_thumb">
                                <img src={image.path} alt={image.name} />
                                <div class="team_hover">
                                    <div class="hover_inner text-center">
                                        <ul>
                                            {image.profiles.map((profile) => (
                                                <li><a href={profile.path}> <i class={`fa fa-${profile.type}`}></i> </a></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="team_title text-center">
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