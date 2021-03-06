var access_token = "2255917630.9888744.b95e3dc392d54737ba31e3f4f2184586",
    access_parameters = {
        access_token: access_token
    };

$(function(){
    var form = $('#tagsearch');
    form.submit( function(ev) {
        var query = this.tag.value;;
        if(query.length) {
            //console.log(q);
            grabImages(query, 100, access_parameters);
            //grabImages(q, access_parameters);
        }
        ev.preventDefault();
    });
});

function grabImages(tag, count, access_parameters) {
    var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count;
    $.getJSON(instagramUrl, access_parameters, onDataLoaded);
}


function onDataLoaded(instagram_data) {
    var target = $("#target");
    //console.log(instagram_data);
    if (instagram_data.meta.code === 200) {
        var photos = instagram_data.data;
        //console.log(photos);
        if (photos.length > 0) {
            target.empty();
            for (var key in photos) {
                var photo = photos[key];
                target.append('<a href="' + photo.link + '"><img src="' + photo.images.thumbnail.url + '"></a>');
            }
        } else {
            target.html("nothing found");
        }
    } else {
        var error = instagram_data.meta.error_message;
        target.html(error);
    }
}

grabImages('cat',100, access_parameters);
