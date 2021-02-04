# Range Request

This repository is a simple HTTP web-server built with NodeJs which demonstrates how you can stream large media files efficiently with the help of partial requests (Range requests)

The script uses both Read and Write Streams to handle a video transfer to the HTTP response. And also performs bytes calculation to specify a custom response header that fit the HTTP Response required


## HTTP's Range Request

The formal definition states that "HTTP range requests allow to send only a portion of an HTTP message from a server to a client. Partial requests are useful for large media or downloading files with pause and resume functions"

By setting this to a range request, it can let you jump into parts of your video or audio

The response header should contain, at least 4 values:

0. The returning status is the `206`
1. `Content-Range` which has the bytes for the partial messages chunk and the length (also in bytes)
2. The `Accept-Ranges` indicates that Accept Ranges are accepted
3. The `Content-Length` is the length of the video to stream in bytes
4. The `Content-Type` sets the mime-type of the file to stream


You can detailed information [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests)

## Credits

 - [David E Lares](https://twitter.com/davidlares3)

## License

 - [MIT](https://opensource.org/licenses/MIT)
