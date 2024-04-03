'use client'
// components/custom-editor.js
import React, { useRef, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'
import {
  Base64UploadAdapter,
  SimpleUploadAdapter,
} from '@ckeditor/ckeditor5-upload'
import { uploadPlugin } from './UploadAdater'
import { useFormState } from 'react-dom'
import { State } from '@/app/lib/actions'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../button'
import { Input } from 'antd'
import { createPost } from '@/app/lib/api'
import { FormValue } from '@/app/lib/interface'
import { redirect } from 'next/navigation'

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    // 'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
  extraPlugins: [uploadPlugin],
  simpleUpload: {
    uploadUrl: `https://sample.com/files/editor`,
    fileTypes: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
  },
  image: {
    upload: { types: ['mp4', 'pdf', 'mpeg', 'jpg', 'png'] },
  },
  // extraPlugins: [MyCustomUploadAdapterPlugin],
  // plugins: [SimpleUploadAdapter],
  // simpleUpload: {
  //   // The URL that the images are uploaded to.
  //   uploadUrl: 'http://example.com',

  //   // Enable the XMLHttpRequest.withCredentials property.
  //   withCredentials: true,

  //   // Headers sent along with the XMLHttpRequest to the upload server.
  //   headers: {
  //     'X-CSRF-TOKEN': 'CSRF-Token',
  //     Authorization: 'Bearer <JSON Web Token>',
  //   },
  // },
}

function CustomEditor({
  category,
  content,
}: {
  category: string
  content: string
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [editorContent, setEditorContent] = useState<string>('')
  const submitNewPost: SubmitHandler<FormValue> = async (form_data) => {
    if (isSubmitting) return
    if (content) {
      console.log('submitModifyPost called')
      setIsSubmitting(true)

      // const matched = linkify.match(content)
      // const parsedContent = urlParsedContent({ content, matched })
    } else {
      console.log('submitNewPost called')
      setIsSubmitting(true)
      await createPost(form_data, category, editorContent)
    }
    setIsSubmitting(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitNewPost)}>
        <div className="flex flex-col gap-2">
          <div>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력해주세요."
              className="w-full max-w-[800px] border-gray-300"
              {...register('title')}
            />
          </div>
          <div>
            <CKEditor
              editor={Editor}
              config={editorConfiguration}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData()
                setEditorContent(data)
              }}
            />
          </div>
          <div className="">
            <Button
              className="w-full max-w-[800px] justify-center"
              type="submit"
            >
              확인
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CustomEditor
