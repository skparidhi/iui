$(document).ready(function(){
    $('#search').keyup(function(){
        var searchValue = ($('#search').val()).trim();
        
        if(searchValue != '' && event.keyCode == 13) {
            $.getJSON('list.json', function(result){
                var list = result.list;
                var options = {
                    shouldSort: true,
                    tokenize: true,
                    findAllMatches: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: [
                      "title",
                      "author.firstName",
                      "author.lastName",
                      "link",
                      "img"
                    ]
                };
                $('#results').empty();
                $('#results').append('<div class="it"><h3>The similar solutions are ..</h3></div>');
                var fuse = new Fuse(list, options);
                var searchResult = fuse.search(searchValue); 
                if(searchResult.length > 0) {
                    if(searchResult[0].cad != '')
                        {$('#results').append('<center><div class="fres"><model-viewer src="'+searchResult[0].cad+'"  background-color="#ffffff" shadow-intensity="1" camera-controls auto-rotate ar></model-viewer><br/>'+searchResult[0].title+'</div></center>')}
                    else
                        {$('#results').append('<center><div class="fres"><model-viewer src="paridhi.glb"  background-color="#ffffff" camera-controls auto-rotate ar></model-viewer><br/><h5>No CAD Models found</h5><br/>'+searchResult[0].title+'</div></center>')}

                    for(i=0; i < searchResult.length; i++) {
                        
                        $('#results').append('<div class="res"><br/><h3><a href="'+searchResult[i].link+'" style="text-decoration: none;">'+searchResult[i].title+'</a></h3><p>'+searchResult[i].author.firstName+' '+searchResult[i].author.lastName+'</p><img width=50px height=50px src="'+searchResult[i].img+'"></div>')
                    }
                }
                else {
                    $('#results').empty();
                    $('#results').html('No Results found.')
                }
            })
        }
    })
})