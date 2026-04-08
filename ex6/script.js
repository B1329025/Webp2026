var container = document.getElementById('container');
function randomChar() {
    var chars = "abcdefghijklmnopqrstuvwxyz";
    return chars[Math.floor(Math.random() * chars.length)];
}
window.onload = function() {
    var len = Math.floor(Math.random() * 3); 
    var str = "";

    for (var i = 0; i < len; i++) {
    str += randomChar();
    }
    container.textContent = str;
};
window.addEventListener("keyup", function(e) {
    console.log(e.key);
    var str = container.textContent;
    if (e.key) {
        if (e.key.length === 1) {
            if (str.charAt(0) === e.key) {
                container.textContent = str.substring(1);
            }
        }
    }
    add_new_chars();
});

function add_new_chars(){
    var count = Math.floor(Math.random() * 3) + 1;
    var str = container.textContent;

    for (var i = 0; i < count; i++) {
        str += randomChar();
    }

    container.textContent = str;
};
  
