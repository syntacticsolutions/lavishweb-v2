import React, {useRef, useEffect, useState, useCallback} from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {Input, Select} from 'antd'

import Button from '../../components/common/button'
import {withLabel} from '../../components/common/hoc'
import {useAuthUser} from '../../context/user-context'
import ImageSelectorModal from '../../components/common/image-selector-modal'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import {usePermsEffect} from '../../utils'

import {
    SAVE_POST_MUTATION,
    PUBLISH_POST_MUTATION,
    GET_CATEGORIES_QUERY,
    GET_POST_QUERY
} from '../../queries/posts'

import {
    LIST_IMAGES_QUERY, UPLOAD_IMAGE_MUTATION
} from '../../queries/images'

const { Option } = Select;

const options = {
    placeholder: 'Begin typing your post...',
    theme: 'snow'
};

export default function PostCreator ({match, history}) {
    const {
        params: {id}
    } = match

    const [user] = useAuthUser()

    usePermsEffect('post', user, () => {
        history.push(`/view-post/${id}`)
    })
    
    const quillEditor = useRef(null)
    const [editorEl, setEditorEl] = useState(null)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [backgroundImageModalOpen, setBackgroundImageModalOpen] = useState(false)
    const [imageInput, setImageInput] = useState(null)
    const [modelData, setModelData] = useState({
        description: '',
        title: '',
        keyword1: '',
        keyword2: '',
        bg_src: '',
        bg_type: 1,
        categories: [],
    })

    const {data: blogImageLinks, refetch} = useQuery(LIST_IMAGES_QUERY)
    const {data: catData} = useQuery(GET_CATEGORIES_QUERY)
    const [savePost] = useMutation(SAVE_POST_MUTATION)
    const [publishPost] = useMutation(PUBLISH_POST_MUTATION)
    const [uploadImage] = useMutation(UPLOAD_IMAGE_MUTATION)
    
    useQuery(GET_POST_QUERY, {
        variables: {id},
        onCompleted: ({post}) => {
            console.log({post})
            let newModel = {}

            for (let id in modelData) {
                newModel[id] = post[id]
            }
            if (post.text) {
                editorEl.setContents(JSON.parse(post.text))
            }
            console.log({newModel})
            setModelData(newModel)
        }
    })

    const save = useCallback(async () => { // eslint-disable-line
        let text = editorEl.getContents()
        console.log({modelData})

        await savePost(
                {variables:{
                    id,
                    data: {
                        ...modelData,
                        text: JSON.stringify(text)
                    }
                }}
            )

    }, [editorEl, modelData, savePost, id])

    const publish = useCallback(async () => { // eslint-disable-line
        let savedId
        if (!id) {
            let text = editorEl.getContents()

            savedId = (
                await savePost(
                    {variables: {
                        id,
                        data: {
                            ...modelData,
                            text: JSON.stringify(text) 
                        }
                    }}
                )
            ).data.savePost
        } else {
            savedId = id
        }

        await publishPost({variables: {id: savedId}})
        
        history.replace(`/view-post/${savedId}`)

    }, [modelData, editorEl, id, history, publishPost, savePost])

    const setModel = useCallback((key) => (ev) => {
        console.log(ev)
        setModelData({
            ...modelData,
            [key]: ev.target.value
        })
    }, [modelData])

    const toBase64 = useCallback(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    }), []);

    const findImage = useCallback((image) => {
        imageInput.click()
    }, [imageInput])

    useEffect(() => {
        setEditorEl(new Quill(quillEditor.current, options))
        let imgInput = document.createElement('input')
        imgInput.type = 'file'
        imgInput.accept = 'image/*'
        imgInput.onchange = async (e) => {
            const image = await toBase64(e.target.files[0])
            uploadImage({variables: {image}})
                .then(refetch)
                .catch(console.log)
        }
        setImageInput(imgInput)
    }, []) // eslint-disable-line

    return (
        <section className="post-editor-container">
            <h3 className="align-start">{id ? 'Edit ': 'Create a '} Post</h3>
            <div className="editor-inputs">
                <div className="image-selector-input">
                    <div>
                        <h6>Background image/video:</h6>
                        {
                            modelData.bg_type === '2' ?
                                <section className="iframe-container" onClick={() => setBackgroundImageModalOpen(true)} >
                                    {modelData.bg_src &&
                                        <iframe
                                            title="background-video"
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
                            :
                            (
                                <figure onClick={() => setBackgroundImageModalOpen(true)}>
                                    <img src={
                                        modelData.bg_src ||
                                            `https://cdn5.vectorstock.com/i/thumb-large/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg`}
                                        alt="post-background"
                                    />
                                    <div className="figure-overlay" >
                                        <span>Change Background <i className={`fal fa-camera`} /> / <i className={`fal fa-video`} />
                                        </span>
                                    </div>
                                </figure>
                            )
                        }
                    </div>
                    {backgroundImageModalOpen && blogImageLinks?.listImages && (
                        <ImageSelectorModal
                            images={blogImageLinks.listImages.map(({url}) => url)}
                            showTabs={true}
                            onSelectImage={(bg_src) => {
                                setModelData({ ...modelData, bg_src })
                                setBackgroundImageModalOpen(false)
                            }}
                            onSelectTab={(bg_type) => {
                                setModelData({...modelData, bg_type})
                            }}
                            onUploadImage={findImage}
                        />
                    )} 
                </div>
                <div>
                    {modelData?.title?.length + 13}
                    { withLabel(
                        <Input
                            value={modelData.title}
                            placeholder="Post Title"
                            onChange={setModel('title')}
                        />, 'Title')
                    }
                    {modelData?.description?.length}
                    { withLabel(
                        <Input
                            value={modelData.description}
                            placeholder="Description"
                            onChange={setModel('description')}
                        />, 'Description')
                    }
                    <div className="flex keyword-inputs">
                        { 
                            withLabel(
                                <Input
                                    value={modelData.keyword1}
                                    placeholder="Keyword 1"
                                    onChange={setModel('keyword1')}
                                />,
                                'Keyword 1'
                            )
                        }
                        {
                            withLabel(
                                <Input
                                    value={modelData.keyword2}
                                    placeholder="Keyword 2"
                                    onChange={setModel('keyword2')}
                                />,
                                'Keyword 2'
                            )
                        }
                    </div>
                    {
                        catData?.categories?.length && withLabel(
                            <Select
                                value={modelData.categories.map(({id}) => id)}
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select categories"
                                onChange={(nothing, value) => {


                                    setModel('categories')({target:{
                                        value: value.map(({label, value}) =>({label, id: value}))
                                    }})
                                }}
                                optionLabelProp="label"
                            >
                                {
                                    catData.categories.map(({label, id}, index) => (

                                        <Option value={id} label={label} key={index}>
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
                    {imageModalOpen && blogImageLinks.listImages && (
                        <ImageSelectorModal
                            images={blogImageLinks.listImages.map(({url}) => url)}
                            onSelectImage={(image) => {
                                setModelData({ ...modelData, image })
                                setImageModalOpen(false)
                            }}
                            onUploadImage={findImage}
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
