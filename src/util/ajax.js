export default async (host, url, body, progressFunc) => {
  let xhr = new XMLHttpRequest()
  xhr.open('post', host + url)
  xhr.upload.onprogress = progressFunc
  xhr.send(body)
}
