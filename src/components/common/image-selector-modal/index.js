import React, { useState } from 'react'
import { Tabs, Input } from 'antd';
import Button from '../button'

const { TabPane } = Tabs;

export default function ImageSelectorModal({ images, onSelectImage, onSelectTab, showTabs }) {
    const [tab, setTab] = useState('1')
    const [link, setLink] = useState('')
    return (
        <div className="image-selector-modal">
            {tab === '1' && (
                <div className="image-selector-header">
                    <h5>Select an Image</h5>
                    <Button
                        type="flashy"
                        rounded
                    >
                        <span>
                            Upload Image <i className={`fal fa-camera`} />
                        </span>
                    </Button>
                </div>
            )}
            {tab === '2' &&
                <h5>Enter your YT video link</h5>
            }
            {showTabs ? (
                <Tabs defaultActiveKey="1" onChange={(data) => {
                    setTab(data)
                    onSelectTab && onSelectTab(data)
                }}>
                    <TabPane tab="Image" key="1">
                        <ImageList onSelect={onSelectImage} images={images} />
                    </TabPane>
                    <TabPane tab="YouTube Video" key="2">
                        <div className="youtube-embed">
                            <h6>YouTube Video ID:</h6>
                            <Input placeholder="copy link here" onChange={({target}) => setLink(target.value)}/>
                            {
                                link && (
                                    <iframe
                                        width="100%"
                                        height="350px"
                                        src={`https://www.youtube.com/embed/${link}`}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    />
                                )
                            }
                            <Button
                                type="flashy"
                                onClick={() => onSelectImage(`https://www.youtube.com/embed/${link}`)}>
                                    Done
                            </Button>
                        </div>
                    </TabPane>
                </Tabs>
            ) : 
            <ImageList onSelect={onSelectImage} images={images} />}
        </div>
    )
}

const ImageList = ({images, onSelect}) => (
    <div className="image-selector-images">
        {images.map((image) => (
            <figure onClick={() =>
                onSelect(image)
            }>
                <img src={image} />
            </figure>
        ))}
    </div>
)