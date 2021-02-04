const {createReadStream, createWriteStream, stat} = require('fs')
const {createServer} = require('http')
const {promisify} = require('util')
const file = './copy.mp4'
const port = 3000

const fileInfo = promisify(stat)
const respondWithVideo = async (req,res) => {
  // grab size of the video - wait until this is done to write response
  const {size} = await fileInfo(file)
  // range requests (bytes=0-)
  const range = req.headers.range
  // handling range request if exists - will allow to jump into parts of the video (skip)
  let [start, end] = range.replace(/bytes=/,'').split('-')
  start = parseInt(start, 10)
  end = end ? parseInt(end, 10) : size - 1 // the end as integer or the video length
  // response headers (206 = partial response)
  res.writeHead(206, {
    'Content-Range': `bytes ${start} - ${end}/${size}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': (end - start) + 1,
    'Content-Type': 'video/mp4'
  })
  // now, we stream
  createReadStream(file, {start, end}).pipe(res)
}

createServer((req, res) => {
  if(req.url === '/') {
    respondWithVideo(req, res)
  }
}).listen(port, () => console.log(`Server running on ${port}`))
