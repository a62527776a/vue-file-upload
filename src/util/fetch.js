export default async (host, url, body, options = {}) => {
  try {
    let result = await fetch(host + url, {
      method: 'POST',
      body
    })
    result = await result.json()
    return result
  } catch (e) {
    console.error(e)
  }
}
