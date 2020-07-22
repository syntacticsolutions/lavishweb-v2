import React, {useRef, useEffect, useState, useCallback} from 'react'
import {useLocation, useHistory, withRouter} from 'react-router'
import {Input} from 'antd'
import Button from '../components/common/button'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import featured from '../assets/mocks/featured'

const images = featured.map(({image}) => image)

const options = {
    placeholder: 'Begin typing your post...',
    // readOnly: true,
    theme: 'snow'
};

export default function PostCreator ({match, history}) {
    const {
        params: {id}
    } = match
    const quillEditor = useRef(null)
    const [editorEl, setEditorEl] = useState(null)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [data, setData] = useState({
        description: '',
        title: '',
        keyword1: '',
        keyword2: '',
        imageUrl: '',
        videoUrl: ''
    })

    console.log(data)

    const save = useCallback(() => {

    }, [])

    const publish = useCallback(() => {

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
                    <figure onClick={() => setImageModalOpen(true)}>
                        <img src={data.image ? require(`../assets/images/${data.image}`) : `https://cdn5.vectorstock.com/i/thumb-large/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg`} />
                        <div className="figure-overlay" >
                            <span>Change Photo <i className={`fal fa-camera`} /></span>
                        </div>
                    </figure>
                    {imageModalOpen && (
                        <div className="image-selector-modal">
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
                            <div className="image-selector-images">
                                {images.map((image) => (
                                    <figure onClick={() => {
                                        setData({ ...data, image })
                                        setImageModalOpen(false)    
                                    }}>
                                        <img src={require(`../assets/images/${image}`)} />
                                    </figure>
                                ))}
                            </div>
                        </div>
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
        <span>{label}</span>
        { component }
    </div>
)