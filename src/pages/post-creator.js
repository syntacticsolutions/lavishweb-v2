import React, {useRef, useEffect, useState, useCallback} from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {Input, Select} from 'antd'

import Button from '../components/common/button'
import {withLabel} from '../components/common/hoc'
import {useAuthUser} from '../context/user-context'
import ImageSelectorModal from '../components/common/image-selector-modal'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import featured from '../assets/mocks/featured'
import {SAVE_POST_MUTATION, PUBLISH_POST_MUTATION, GET_CATEGORIES_QUERY} from '../queries/posts'

const { Option } = Select;

const images = featured.map(({image}) => image)

const options = {
    placeholder: 'Begin typing your post...',
    theme: 'snow'
};

export default function PostCreator ({match, history}) {
    const {
        params: {id}
    } = match

    const [user, setUser] = useAuthUser()

    const quillEditor = useRef(null)
    const [editorEl, setEditorEl] = useState(null)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [backgroundImageModalOpen, setBackgroundImageModalOpen] = useState(false)
    const [modelData, setModelData] = useState({
        description: '',
        title: '',
        keyword1: '',
        keyword2: '',
        bg_src: '',
        bg_type: 1,
        categories: [],
        text: ''
    })

    const [savePost, {data: savedId}] = useMutation(SAVE_POST_MUTATION)
    const [publishPost, {data: publishedId}] = useMutation(PUBLISH_POST_MUTATION)
    const {data: catData, error, loading} = useQuery(GET_CATEGORIES_QUERY)

    const save = useCallback(async () => {
        let text = editorEl.getContents()
        let {data} = await savePost({variables: { id, data: {...modelData, text: JSON.stringify(text) }}})
            .catch(err => {
                console.log(err)
                // TODO add toaster messages
            })
        history.replace(`/edit-post/${data.savePost}`)

    }, [editorEl, modelData, savedId])

    const publish = useCallback(async () => {
        let savedId
        if (!id) {
            const postData = await savePost({variables: {id, modelData}})
        } else {
            savedId = id
        }
        const pubsishedId = await publishPost({variables: {id: savedId}})

    }, [modelData, editorEl, id])

    const setModel = useCallback((key) => (ev) => {
        setModelData({
            ...modelData,
            [key]: ev.target.value
        })
    }, [modelData])

    useEffect(async () => {
        setEditorEl(new Quill(quillEditor.current, options))
    }, [])

    return (
        <section className="post-editor-container">
            <h3 className="align-start">{id ? 'Edit ': 'Create a '} Post</h3>
            <div className="editor-inputs">
                <div className="image-selector-input">
                    <div>
                        <h6>Background image/video:</h6>
                        {
                            modelData.bg_type === '2' &&
                                <section className="iframe-container" onClick={() => setBackgroundImageModalOpen(true)} >
                                    {modelData.bg_src &&
                                        <iframe
                                            width="100%"
                                            height="300px"
                                            src={modelData.bg_src}
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
                                        modelData.bg_src
                                        ? require(`../assets/images/${modelData.bg_src}`)
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
                                setModelData({ ...modelData, bg_src })
                                setBackgroundImageModalOpen(false)
                            }}
                            onSelectTab={(bg_type) => {
                                setModelData({...modelData, bg_type})
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
                    {
                        catData?.categories && withLabel(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select categories"
                                onChange={(val) => console.log(val)}
                                optionLabelProp="label"
                            >
                                {
                                    catData.categories.map(({label, id}) => (

                                        <Option value={id} label={label}>
                                            <div className="demo-option-label-item">
                                                {label}
                                            </div>
                                        </Option>
                                    ))
                                }
                            </Select>,
                            'Categories'
                        )
                    }
                    <Button type="secondary" onClick={() => setImageModalOpen(true)}>Change Thumbnail</Button>
                    <p className="text-primary mt-2">{modelData.image}</p>                
                    {imageModalOpen && (
                        <ImageSelectorModal
                            images={images}
                            onSelectImage={(image) => {
                                setModelData({ ...modelData, image })
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
