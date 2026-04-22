var dataUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1';

function add_new_img(dataset) {
    var gal = document.getElementById("gallery");

    dataset.forEach(function(item) {
        var imgUrl = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`;
        
        var img = document.createElement("img");
        img.setAttribute("src", imgUrl);
        
        gal.appendChild(img);
    });
}

function getimg() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            var data = JSON.parse(this.responseText);
            if (data.photos && data.photos.photo) {
                add_new_img(data.photos.photo);
            } else {
                console.error("API 回傳格式不正確或金鑰失效");
            }
        }
    };
}
