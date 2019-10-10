
function check(parent, button) {
    button.style.display = "none";
    parent.classList.remove("bg-danger");
    parent.classList.add("bg-success");
};
window.onload = init;
function init(){
    var res = null;
    document.getElementById('send').addEventListener('click', add);
    // document.getElementById('send').addEventListener('click', function(){
    //     add();
    // });
    function add(){
        // var name = document.getElementById('name').value;
        // var count = document.getElementById('count').value;

        // console.log(document.forms[0].name);
        var name = document.forms[0].name.value;
        var count = document.forms[0].count.value;
        var g = {"name": name, "count": count, "confirmed": true};
        res.push(g);
        // console.log(res);
        
        build(res, 'output');
    }
    
    function loadJSON(m, u, c){
        var xHR = new XMLHttpRequest;
        xHR.open(m, u, true);
        xHR.onreadystatechange = function(){
            if(this.status == 200 && this.readyState == 4){
                res = JSON.parse(this.response);
                c(res);
                // setTimeout(function(){
                    //     c(res);
                // }, 100000);
            }
            document.getElementsByClassName('loader')[0].style.display = 'none';
        }
       
        xHR.send();
    }
    function build(d, id){
        var html = "";
        for(var i = 0 ; i < d.length ; i++){
            if (d[i].confirmed){
                html += '<div class="bg-success px-3 py-2 my-2 rounded text-white">';
                html +=  d[i].name;
                html += '</div>';
            }
            else{
                html += '<div id="harchi" class="bg-danger px-3 py-2 my-2 rounded text-white">';
                html +=  d[i].name;
                html += '<button id="btn" class="mx-4" onclick="check(this.parentElement,this)">' + 'ok'+ '</button>'
                html += '</div>';
            }

        }

        document.getElementById(id).innerHTML = html;
    }    
    loadJSON('GET', 'https://api.myjson.com/bins/14zh8x', function(data){
        build(data, 'output');
    });
   

}
