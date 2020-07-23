import React, {useRef, useEffect, useState, useCallback} from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {Input} from 'antd'
import Button from '../components/common/button'
import ImageSelectorModal from '../components/common/image-selector-modal'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import featured from '../assets/mocks/featured'
import {SAVE_POST_MUTATION, PUBLISH_POST_MUTATION} from '../queries/posts'

const images = featured.map(({image}) => image)

const options = {
    placeholder: 'Begin typing your post...',
    theme: 'snow'
};

export default function PostCreator ({match, history}) {
    const {
        params: {id}
    } = match
    const quillEditor = useRef(null)
    const [, setEditorEl] = useState(null)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [backgroundImageModalOpen, setBackgroundImageModalOpen] = useState(false)
    const [data, setData] = useState({
        description: '',
        title: '',
        keyword1: '',
        keyword2: '',
        bg_src: '',
        bg_type: 1,
        categories: [] // TODO add input for this
    })

    const [savePost, {data: savedId}] = useMutation(SAVE_POST_MUTATION)
    const [publishPost, {data: publishedId}] = useMutation(PUBLISH_POST_MUTATION)

    const save = useCallback(() => {
        savePost({variables: { id, data }})
        .catch(err => {
            console.log(err)
            // TODO add toaster messages
        })
    }, [])

    const publish = useCallback(async () => {
        try {
            const savedId = await savePost({variables: {id, data}})
            const pubsishedId = await publishPost({variables: {id}})
        } catch (err) {
            console.log(err)
            // TODO add toaster messages
        }
    }, [])

    const setModel = useCallback((key) => (ev) => {
        setData({
            ...data,
            [key]: ev.target.value
        })
    }, [data])

    useEffect(() => {
        setEditorEl(new Quill(quillEditor.current, options))
    }, [])



    return (
        <section className="post-editor-container">
            <h3 className="align-start">{id ? 'Edit ': 'Create a '} Post</h3>
            <div className="editor-inputs">
                <div class="image-selector-input">
                    <div>
                        <h6>Background image/video:</h6>
                        {
                            data.bg_type === '2' &&
                                <section className="iframe-container" onClick={() => setBackgroundImageModalOpen(true)} >
                                    {data.bg_src &&
                                        <iframe
                                            width="100%"
                                            height="300px"
                                            src={data.bg_src}
                                            frameborder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                        />
                                    }
                                    <div className="figure-overlay" >
                                        <span>Change Background <i className={`fal fa-camera`} /> / <i className={`fal fa-video`} />
                                        </span>
                                    </div>
                                </section>
                            ||
                            (
                                <figure onClick={() => setBackgroundImageModalOpen(true)}>
                                    <img src={
                                        data.bg_src
                                        ? require(`../assets/images/${data.bg_src}`)
                                        : `https://cdn5.vectorstock.com/i/thumb-large/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg`}
                                    />
                                    <div className="figure-overlay" >
                                        <span>Change Background <i className={`fal fa-camera`} /> / <i className={`fal fa-video`} />
                                        </span>
                                    </div>
                                </figure>
                            )
                        }
                    </div>
                    {backgroundImageModalOpen && (
                        <ImageSelectorModal
                            images={images}
                            showTabs={true}
                            onSelectImage={(bg_src) => {
                                setData({ ...data, bg_src })
                                setBackgroundImageModalOpen(false)
                            }}
                            onSelectTab={(bg_type) => {
                                console.log({bg_type})
                                setData({...data, bg_type})
                            }}
                        />
                    )} 
                </div>
                <div>
                    { withLabel(
                        <Input
                            placeholder="Post Title"
                            onChange={setModel('title')}
                        />, 'Title')
                    }
                    { withLabel(
                        <Input
                            placeholder="Description"
                            onChange={setModel('description')}
                        />, 'Description')
                    }
                    <div className="flex keyword-inputs">
                        { withLabel(<Input placeholder="Keyword 1" onChange={setModel('keyword1')} />, 'Keyword 1')}
                        { withLabel(<Input placeholder="Keyword 1" onChange={setModel('keyword2')} />, 'Keyword 1')}
                    </div>
                    <Button type="secondary" onClick={() => setImageModalOpen(true)}>Change Thumbnail</Button>
                    <p className="text-primary mt-2">{data.image}</p>                
                    {imageModalOpen && (
                        <ImageSelectorModal
                            images={images}
                            onSelectImage={(image) => {
                                setData({ ...data, image })
                                setImageModalOpen(false)
                            }}
                        />
                    )}
                </div>
            </div>
            <div ref={quillEditor} />
            <div className="editor-button-container">
                <Button type="minimal" onClick={() => history.goBack()}>Cancel</Button>
                <Button type="secondary" onClick={() => save()}>Save</Button>
                <Button type="secondary" onClick={() => publish()}>Publish</Button>
            </div>
        </section>
    )
}

const withLabel = (component, label) => (
    <div className="input-container">
        <h6>{label}</h6>
        { component }
    </div>
)