var container = document.getElementById('container');
let wrong =0;
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
            else{
                wrong++;
            }
        }
    }
    add_new_chars();
    if(wrong ===3){
        add_new_chars(3);
        wrong =0;
    }
});

function add_new_chars(a=0){
    var count = Math.floor(Math.random() * 3) + 1;
    var str = container.textContent;

    for (var i = 0; i < count+a; i++) {
        str += randomChar();
    }
    

    container.textContent = str;
};
  
