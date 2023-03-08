export const getCharLen = (str) => {
  let len = 0;
  if (!str) return len;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
};

// 判断是否是视频
export const isVideo = (url) => {
  return url && /\.flv|mp4|mov|avi|wmv|3gp|mkv|rmvb|rm/.test(url.toLowerCase())
}


export const getVideoBase64 = (url) => {
return new Promise(function (resolve, reject) {
    let dataURL = '';
    let video: any = document.createElement("video");
    video.setAttribute('crossOrigin', 'anonymous');//处理跨域
    video.setAttribute('src', url);
    video.setAttribute('width', '400');
    video.setAttribute('height', '240');
    video.setAttribute('controls', 'false');
    video.setAttribute('autoPlay', 'true');
    video.setAttribute('preload', 'auto');
    video.setAttribute('muted', 'true');
    video.setAttribute('x5-video-player-type', 'h5');
    video.style.display = 'none';
    console.log(dataURL, 'dataURLdataURLdataURL')
    video.addEventListener('loadeddata', function () {
        let canvas:any = document.createElement("canvas"),
            width = video.width, //canvas的尺寸和图片一样
            height = video.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
        dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
        video.setAttribute("poster", dataURL);
        resolve(dataURL);
        video = null;
    });
    video.addEventListener('loadstart', function () {
      if (video.currentTime > 0) {
        video.pause();
        video.setAttribute('autoPlay', false);
      }
    })
  })
}

export const downVideo = (url, name) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';    // 返回类型blob
  console.log(url, 'downVideodownVideo')
  xhr.onload = function () {
     if (xhr.readyState === 4 && xhr.status === 200) {
        let blob = this.response;
        // 转换一个blob链接
        let u = window.URL.createObjectURL(new Blob([blob]))
        let a = document.createElement('a');
        a.download = name;
        a.href = u;
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click();
        a.remove();
     }
  };
  xhr.send()
}