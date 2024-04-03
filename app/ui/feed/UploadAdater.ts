import axios from 'axios'

// upload Adaptor
function uploadAdapter(loader: any) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const fd = new FormData()
        loader.file.then((file: any) => {
          // here check the mimetype and send request
          // to relevant backend api endpoint
          axios
            .post(`https://sample.com/files/`, fd)
            .then((res) => {
              resolve({
                default: res.data[0].fileAddress,
              })
            })
            .catch((err) => {
              reject(err)
            })
        })
      })
    },
  }
}

export function uploadPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return uploadAdapter(loader)
  }

  // when upload completes, replace tag
  // const imageUploadEditing = editor.plugins.get('ImageUploadEditing')
  // imageUploadEditing.on('uploadComplete', (evt, { data, imageElement }) => {
  //   editor.model.change((writer) => {
  //     const view = editor.data.processor.toView(
  //       data.mediaType === 'video'
  //         ? `<video src='${data.default}' controls="controls"></video>`
  //         : data.mediaType === 'audio'
  //         ? `<audio src='${data.default}' controls="controls"></audio>`
  //         : `<img src='${data.default}' />`,
  //     )
  //     const model = editor.data.toModel(view)
  //     editor.model.insertContent(model, editor.model.document.selection)
  //   })

  //   evt.stop()
  //   editor.editing.view.focus()
  // })
}
